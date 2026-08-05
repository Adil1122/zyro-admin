import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event;
  try {
    const raw = await req.text();
    event = getStripe().webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const sb = getSupabase();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as import('stripe').Stripe.Checkout.Session;
    await sb.from('payments')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('stripe_session_id', session.id);

    const tenantId = session.metadata?.tenantId;
    if (tenantId) {
      const amount = (session.amount_total ?? 0) / 100;
      await sb.from('audit_log').insert([{
        type: 'billing',
        action: `Stripe payment confirmed — Rs ${amount.toLocaleString('en-US')} received`,
        tenant: session.customer_details?.name ?? tenantId,
        reason: 'Stripe checkout.session.completed webhook',
      }]);
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as import('stripe').Stripe.Checkout.Session;
    await sb.from('payments')
      .update({ status: 'expired' })
      .eq('stripe_session_id', session.id);
  }

  if (event.type === 'payment_intent.payment_failed') {
    const pi = event.data.object as import('stripe').Stripe.PaymentIntent;
    await sb.from('payments')
      .update({ status: 'failed' })
      .eq('stripe_session_id', pi.id);
  }

  return NextResponse.json({ received: true });
}
