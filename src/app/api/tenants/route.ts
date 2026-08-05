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

function computeHealth(status: string, orders30d: number, integrationCount: number, onboarded: boolean): number {
  const subScore  = status === 'active' ? 100 : status === 'trial' ? 70 : 0;
  const orderScore = Math.min(100, orders30d * 2);
  const featScore  = Math.min(100, integrationCount * 20);
  const onbScore   = onboarded ? 100 : 30;
  return Math.round(subScore * 0.35 + orderScore * 0.30 + featScore * 0.20 + onbScore * 0.15);
}

function integrationList(u: Row): string[] {
  const list: string[] = [];
  if (u.connected_source)  list.push(u.connected_source);
  if (u.connected_courier) list.push(u.connected_courier);
  if (u.wa_is_active)      list.push('WhatsApp');
  if (u.meta_ads_enabled)  list.push('Meta Ads');
  if (u.google_ads_enabled) list.push('Google Ads');
  return list;
}

export async function GET() {
  const sb = getSupabase();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // 1 — all users
  const { data: users, error: ue } = await sb
    .from('users')
    .select('id,name,email,phone,business_name,created_at,subscription_status,plan_id,trial_ends_at,last_payment_amount,connected_source,connected_courier,wa_is_active,meta_ads_enabled,google_ads_enabled,onboarding_completed');
  if (ue) return NextResponse.json({ error: ue.message }, { status: 500 });
  if (!users?.length) return NextResponse.json([]);

  // 2 — plans lookup
  const planIds = [...new Set(users.map(u => u.plan_id).filter(Boolean))];
  const { data: plans } = planIds.length
    ? await sb.from('plans').select('id,name,price').in('id', planIds)
    : { data: [] as Row[] };
  const planMap: Record<string, { name: string; price: number }> = {};
  for (const p of plans ?? []) planMap[p.id] = { name: p.name, price: Number(p.price) };

  // 3 — order stats per user (last 30d)
  const { data: orders } = await sb
    .from('orders')
    .select('user_id,total_amount')
    .gte('created_at', since);
  const orderStats: Record<string, { count: number; revenue: number }> = {};
  for (const o of orders ?? []) {
    if (!o.user_id) continue;
    if (!orderStats[o.user_id]) orderStats[o.user_id] = { count: 0, revenue: 0 };
    orderStats[o.user_id].count++;
    orderStats[o.user_id].revenue += Number(o.total_amount) || 0;
  }

  const tenants = users.map(u => {
    const stats  = orderStats[u.id] || { count: 0, revenue: 0 };
    const plan   = planMap[u.plan_id] || { name: 'Starter', price: 0 };
    const mrr    = u.last_payment_amount ? Math.round(Number(u.last_payment_amount)) : plan.price;
    const status = mapStatus(u.subscription_status, u.trial_ends_at);
    const intgs  = integrationList(u);
    const health = computeHealth(status, stats.count, intgs.length, u.onboarding_completed ?? false);
    const name   = u.business_name || u.name || u.email || 'Unknown';

    return {
      id:       u.id,
      name,
      initials: name.split(' ').map((w: string) => w[0] ?? '').join('').slice(0, 2).toUpperCase() || '??',
      owner:    u.name || '',
      phone:    u.phone || '',
      email:    u.email || '',
      city:     '',
      signedUp: new Date(u.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      plan:     plan.name,
      mrr,
      status,
      health,
      band:        healthBand(health),
      orders30d:   stats.count,
      dunningDays: status === 'past_due' ? 7 : undefined,
      integrations: intgs,
      breakdown: [
        ['Subscription status', 35, status === 'active' ? 100 : status === 'trial' ? 70 : 0],
        ['Order volume (30d)',  30, Math.min(100, stats.count * 2)],
        ['Feature adoption',   20, Math.min(100, intgs.length * 20)],
        ['Onboarding',         15, u.onboarding_completed ? 100 : 30],
      ] as [string, number, number][],
      deepDive: {
        salesTotal: stats.revenue, orders30d: stats.count,
        aiCost: 0, optInRate: u.wa_is_active ? 65 : 0, messagesSent: 0,
        adSpend: 0, blendedRoas: '0.00', campaigns: [],
        products: [], waTemplates: [],
        totalSkus: 0, stockValue: 0, lowStock: [], deadStockCount: 0,
        courierPerf: [], dunningDays: status === 'past_due' ? 7 : 0,
      },
    };
  });

  return NextResponse.json(tenants);
}
