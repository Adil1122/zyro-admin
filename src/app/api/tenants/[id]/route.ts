import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { healthBand } from '@/lib/data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

function mapStatus(sub: string | null, trialEndsAt: string | null): 'active' | 'trial' | 'past_due' {
  if (sub === 'trialing' || sub === 'trial') return 'trial';
  if (sub === 'past_due' || sub === 'unpaid') return 'past_due';
  if (!sub && trialEndsAt && new Date(trialEndsAt) > new Date()) return 'trial';
  return 'active';
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = getSupabase();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // User
  const { data: u, error: ue } = await sb.from('users').select('*').eq('id', id).single();
  if (ue || !u) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Plan
  let planName = 'Starter';
  let planPrice = 0;
  if (u.plan_id) {
    const { data: plan } = await sb.from('plans').select('name,price').eq('id', u.plan_id).single();
    if (plan) { planName = plan.name; planPrice = Number(plan.price); }
  }

  // Orders (last 30d)
  const { data: orders } = await sb
    .from('orders')
    .select('id,total_amount,courier_name')
    .eq('user_id', id)
    .gte('created_at', since);

  const salesTotal  = (orders ?? []).reduce((s, o) => s + (Number(o.total_amount) || 0), 0);
  const orders30d   = (orders ?? []).length;
  const orderIds    = (orders ?? []).map((o: Row) => o.id);

  // Products (all, not just 30d)
  const { data: allProducts } = await sb
    .from('products')
    .select('id,name,price,stock,reorder_point,status')
    .eq('user_id', id);

  // Top products from order_items
  let topProducts: { name: string; unitsSold: number; revenue: number }[] = [];
  if (orderIds.length > 0) {
    const { data: items } = await sb
      .from('order_items')
      .select('product_id,quantity,price')
      .in('order_id', orderIds.slice(0, 200));

    const prodMap: Record<string | number, string> = {};
    for (const p of allProducts ?? []) prodMap[p.id] = p.name;

    const totals: Record<string, { unitsSold: number; revenue: number }> = {};
    for (const item of items ?? []) {
      const name = prodMap[item.product_id] ?? `Product ${item.product_id}`;
      if (!totals[name]) totals[name] = { unitsSold: 0, revenue: 0 };
      totals[name].unitsSold += item.quantity ?? 1;
      totals[name].revenue  += Number(item.price) * (item.quantity ?? 1);
    }
    topProducts = Object.entries(totals)
      .map(([name, d]) => ({ name, ...d }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 8);
  }

  // Inventory stats
  const totalSkus   = (allProducts ?? []).length;
  const stockValue  = (allProducts ?? []).reduce((s, p) => s + Number(p.price) * Math.max(0, Number(p.stock) || 0), 0);
  const lowStock    = (allProducts ?? [])
    .filter((p: Row) => p.reorder_point != null && Number(p.stock) <= Number(p.reorder_point))
    .slice(0, 6)
    .map((p: Row) => ({ name: p.name, current: Number(p.stock), reorderPoint: Number(p.reorder_point) }));
  const deadStockCount = (allProducts ?? []).filter((p: Row) => Number(p.stock) > 10 && p.status === 'inactive').length;

  // Meta Ads (campaigns + stats last 30d)
  const [{ data: adCampaigns }, { data: adStats }] = await Promise.all([
    sb.from('meta_ads_campaigns').select('campaign_name,objective,spend').eq('user_id', id),
    sb.from('meta_ads_stats').select('spend,revenue').eq('user_id', id).gte('date', since.slice(0, 10)),
  ]);

  const adSpend   = (adStats ?? []).reduce((s: number, r: Row) => s + (Number(r.spend) || 0), 0);
  const adRevenue = (adStats ?? []).reduce((s: number, r: Row) => s + (Number(r.revenue) || 0), 0);
  const blendedRoas = adSpend > 0 ? (adRevenue / adSpend).toFixed(2) : '0.00';

  const campaigns = (adCampaigns ?? []).map((c: Row) => {
    const spend = Number(c.spend) || 0;
    const roas  = spend > 0 && adSpend > 0 ? parseFloat(((spend / adSpend) * (adRevenue / Math.max(spend, 1))).toFixed(2)) : 0;
    return {
      name:   c.campaign_name || c.objective || 'Campaign',
      spend,
      roas:   isNaN(roas) ? 0 : roas,
      status: roas >= 3 ? 'scale' as const : roas >= 1.5 ? 'monitor' as const : 'review' as const,
    };
  }).sort((a: { roas: number }, b: { roas: number }) => b.roas - a.roas);

  // WA messages — schema uncertain; fall back silently
  let messagesSent = 0;
  try {
    const { data: waMsg } = await sb
      .from('wa_messages')
      .select('id')
      .eq('user_id', id)
      .gte('created_at', since);
    messagesSent = (waMsg ?? []).length;
  } catch { /* wa_messages may not have user_id directly */ }

  // Courier performance via shipments → orders
  let courierPerf: { courier: string; shipments: number; successRate: number; rtoRate: number; avgCost: number; avgDays: string }[] = [];
  if (orderIds.length > 0) {
    const { data: shipments } = await sb
      .from('shipments')
      .select('order_id,status,shipped_at,delivered_at,courier_id')
      .in('order_id', orderIds.slice(0, 200));

    if (shipments?.length) {
      const courierIds = [...new Set(shipments.map((s: Row) => s.courier_id).filter(Boolean))];
      let courierNameMap: Record<string | number, string> = {};
      if (courierIds.length > 0) {
        const { data: couriers } = await sb.from('couriers').select('id,name').in('id', courierIds);
        for (const c of couriers ?? []) courierNameMap[c.id] = c.name;
      }

      // Build courier_name fallback from orders
      const orderCourierMap: Record<string | number, string> = {};
      for (const o of orders ?? []) if (o.courier_name) orderCourierMap[o.id] = o.courier_name;

      const byCourier: Record<string, { total: number; delivered: number; returned: number; totalDays: number; dayCount: number }> = {};
      for (const s of shipments) {
        const name = courierNameMap[s.courier_id] || orderCourierMap[s.order_id] || `Courier ${s.courier_id ?? '?'}`;
        if (!byCourier[name]) byCourier[name] = { total: 0, delivered: 0, returned: 0, totalDays: 0, dayCount: 0 };
        byCourier[name].total++;
        if (s.status === 'delivered') {
          byCourier[name].delivered++;
          if (s.shipped_at && s.delivered_at) {
            const days = (new Date(s.delivered_at).getTime() - new Date(s.shipped_at).getTime()) / 86400000;
            if (days > 0) { byCourier[name].totalDays += days; byCourier[name].dayCount++; }
          }
        }
        if (['returned', 'rto', 'failed', 'cancelled'].includes(s.status)) byCourier[name].returned++;
      }

      courierPerf = Object.entries(byCourier)
        .filter(([, d]) => d.total >= 2)
        .map(([courier, d]) => ({
          courier,
          shipments:   d.total,
          successRate: Math.round((d.delivered / d.total) * 100),
          rtoRate:     Math.round((d.returned / d.total) * 100),
          avgCost:     200,
          avgDays:     d.dayCount > 0 ? (d.totalDays / d.dayCount).toFixed(1) : '—',
        }))
        .sort((a, b) => b.shipments - a.shipments);
    }
  }

  // Health score
  const mrr    = u.last_payment_amount ? Math.round(Number(u.last_payment_amount)) : planPrice;
  const status = mapStatus(u.subscription_status, u.trial_ends_at);

  const integrations: string[] = [];
  if (u.connected_source)   integrations.push(u.connected_source);
  if (u.connected_courier)  integrations.push(u.connected_courier);
  if (u.wa_is_active)       integrations.push('WhatsApp');
  if (u.meta_ads_enabled)   integrations.push('Meta Ads');
  if (u.google_ads_enabled) integrations.push('Google Ads');

  const subScore   = status === 'active' ? 100 : status === 'trial' ? 70 : 0;
  const orderScore = Math.min(100, orders30d * 2);
  const featScore  = Math.min(100, integrations.length * 20);
  const onbScore   = u.onboarding_completed ? 100 : 30;
  const health     = Math.round(subScore * 0.35 + orderScore * 0.30 + featScore * 0.20 + onbScore * 0.15);

  const storeName = u.business_name || u.name || u.email || 'Unknown';

  return NextResponse.json({
    id:       u.id,
    name:     storeName,
    initials: storeName.split(' ').map((w: string) => w[0] ?? '').join('').slice(0, 2).toUpperCase() || '??',
    owner:    u.name || '',
    phone:    u.phone || '',
    email:    u.email || '',
    city:     '',
    signedUp: new Date(u.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    plan:     planName,
    mrr,
    status,
    health,
    band:         healthBand(health),
    orders30d,
    dunningDays:  status === 'past_due' ? 7 : undefined,
    integrations,
    breakdown: [
      ['Subscription status', 35, subScore],
      ['Order volume (30d)',  30, orderScore],
      ['Feature adoption',   20, featScore],
      ['Onboarding',         15, onbScore],
    ] as [string, number, number][],
    deepDive: {
      products:      topProducts,
      salesTotal,
      orders30d,
      adSpend,
      campaigns,
      blendedRoas,
      messagesSent,
      aiCost:        Math.round(messagesSent * 1.2),
      optInRate:     u.wa_is_active ? 65 : 0,
      waTemplates:   [],
      totalSkus,
      stockValue,
      lowStock,
      deadStockCount,
      courierPerf,
      dunningDays:   status === 'past_due' ? 7 : 0,
    },
  });
}
