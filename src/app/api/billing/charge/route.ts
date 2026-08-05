import { NextResponse } from 'next/server';
import { createHmac, createHash } from 'crypto';
import { getSupabase } from '@/lib/supabase';
import { getStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.json();
  const { tenantId, amount, gateway, method, notes } = body as {
    tenantId: string;
    amount: number;
    gateway: 'stripe' | 'easypaisa' | 'jazzcash';
    method: 'link' | 'direct';
    notes?: string;
  };

  if (!tenantId || !amount || !gateway) {
    return NextResponse.json({ error: 'tenantId, amount, and gateway are required' }, { status: 400 });
  }

  const sb = getSupabase();
  const { data: tenant, error: te } = await sb.from('tenants').select('*').eq('id', tenantId).single();
  if (te || !tenant) return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });

  const base = (process.env.NEXT_PUBLIC_URL ?? 'https://zyro-admin.vercel.app').replace(/\/$/, '');
  let paymentLink = '';
  let stripeSessionId = '';
  let directCharged = false;

  // ── Stripe ─────────────────────────────────────────────────────────────────
  if (gateway === 'stripe') {
    const stripe = getStripe();

    if (method === 'direct' && tenant.stripe_customer_id) {
      // Direct charge using saved payment method
      const customer = await stripe.customers.retrieve(tenant.stripe_customer_id) as import('stripe').Stripe.Customer;
      const pmId = typeof customer.invoice_settings?.default_payment_method === 'string'
        ? customer.invoice_settings.default_payment_method
        : null;

      if (pmId) {
        await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: 'pkr',
          customer: tenant.stripe_customer_id,
          payment_method: pmId,
          confirm: true,
          off_session: true,
          description: `Zyro subscription — ${tenant.name}`,
          metadata: { tenantId },
        });
        directCharged = true;
        paymentLink = '';
      } else {
        // No saved payment method — fall back to checkout link
        method === 'direct' && console.warn(`No saved PM for ${tenant.name}, falling back to link`);
      }
    }

    if (!directCharged) {
      // Ensure Stripe customer exists
      let customerId = tenant.stripe_customer_id as string | undefined;
      if (!customerId) {
        const customer = await stripe.customers.create({
          name: tenant.name,
          email: tenant.email,
          metadata: { tenantId },
        });
        customerId = customer.id;
        await sb.from('tenants').update({ stripe_customer_id: customerId }).eq('id', tenantId);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'pkr',
            product_data: { name: `Zyro subscription — ${tenant.name}` },
            unit_amount: amount * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        customer: customerId,
        success_url: `${base}/billing?paid=1&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${base}/billing?cancelled=1`,
        metadata: { tenantId },
        expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      });

      paymentLink = session.url!;
      stripeSessionId = session.id;
    }
  }

  // ── Easypaisa (EasyPay hosted checkout) ───────────────────────────────────
  else if (gateway === 'easypaisa') {
    const storeId = process.env.EASYPAISA_STORE_ID;
    const hashKey = process.env.EASYPAISA_HASH_KEY;
    if (!storeId || !hashKey) {
      return NextResponse.json({ error: 'Easypaisa credentials not configured. Add EASYPAISA_STORE_ID and EASYPAISA_HASH_KEY.' }, { status: 500 });
    }

    const orderRef = `ZO-${tenantId.slice(0, 4).toUpperCase()}-${Date.now()}`;
    const postBackUrl = `${base}/api/billing/webhook/easypaisa`;
    // Hash format per EasyPay docs: amount + storeId + orderRefNum + postBackUrl + hashKey
    const hashStr = `${amount}.00${storeId}${orderRef}${postBackUrl}${hashKey}`;
    const hash = createHash('md5').update(hashStr).digest('hex');

    paymentLink =
      `https://easypay.easypaisa.com.pk/easypay/?` +
      `storeId=${storeId}&orderId=${orderRef}&amount=${amount}.00` +
      `&orderDesc=${encodeURIComponent(`Zyro subscription - ${tenant.name}`)}` +
      `&merchantPaymentMethod=MA_PAYMENT` +
      `&postBackURL=${encodeURIComponent(postBackUrl)}` +
      `&emailAddress=${encodeURIComponent(tenant.email)}` +
      `&mobileNumber=${encodeURIComponent(tenant.easypaisa_number ?? tenant.phone)}` +
      `&hash=${hash}`;
  }

  // ── JazzCash (hosted checkout) ─────────────────────────────────────────────
  else if (gateway === 'jazzcash') {
    const merchantId = process.env.JAZZCASH_MERCHANT_ID;
    const password = process.env.JAZZCASH_PASSWORD;
    const salt = process.env.JAZZCASH_INTEGRITY_SALT;
    if (!merchantId || !password || !salt) {
      return NextResponse.json({ error: 'JazzCash credentials not configured. Add JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, and JAZZCASH_INTEGRITY_SALT.' }, { status: 500 });
    }

    const pad = (n: number, l = 2) => String(n).padStart(l, '0');
    const now = new Date();
    const fmt = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

    const txnRef = `T${Date.now()}`;
    const txnDateTime = fmt(now);
    const txnExpiry = fmt(new Date(Date.now() + 60 * 60 * 1000));
    const amountPaisa = (amount * 100).toString();

    // JazzCash HMAC-SHA256 hash: salt & sorted key=value pairs
    const hashInput = [
      salt, amountPaisa, 'PKR', merchantId, password,
      txnRef, txnDateTime, txnExpiry,
    ].join('&');
    const secureHash = createHmac('sha256', salt).update(hashInput).digest('hex').toUpperCase();

    paymentLink =
      `https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/?` +
      `pp_MerchantID=${merchantId}&pp_Password=${password}` +
      `&pp_TxnRefNo=${txnRef}&pp_Amount=${amountPaisa}&pp_TxnCurrency=PKR` +
      `&pp_TxnDateTime=${txnDateTime}&pp_TxnExpiryDateTime=${txnExpiry}` +
      `&pp_BillReference=${encodeURIComponent(`zyro-${tenant.name.slice(0, 12)}`)}&pp_Description=${encodeURIComponent(`Zyro subscription`)}` +
      `&pp_MobileNumber=${encodeURIComponent(tenant.jazzcash_number ?? tenant.phone)}` +
      `&pp_SecureHash=${secureHash}`;
  }

  // ── Persist payment record ─────────────────────────────────────────────────
  const { data: payment, error: pe } = await sb.from('payments').insert([{
    tenant_id: tenantId,
    tenant_name: tenant.name,
    amount,
    gateway,
    method: directCharged ? 'direct' : 'link',
    status: directCharged ? 'paid' : 'pending',
    payment_link: paymentLink || null,
    stripe_session_id: stripeSessionId || null,
    notes: notes ?? '',
  }]).select().single();

  if (pe) return NextResponse.json({ error: pe.message }, { status: 500 });

  // Audit log
  await sb.from('audit_log').insert([{
    type: 'billing',
    action: directCharged
      ? `Directly charged Rs ${amount.toLocaleString('en-US')} via Stripe`
      : `Created ${gateway} payment link for Rs ${amount.toLocaleString('en-US')}`,
    tenant: tenant.name,
    reason: notes ?? '',
  }]);

  return NextResponse.json({
    paymentId: payment?.id,
    paymentLink,
    directCharged,
    gateway,
  });
}
