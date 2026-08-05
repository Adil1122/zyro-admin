import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const sb = getSupabase();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // 1 — recent order IDs (last 30d)
  const { data: recentOrders } = await sb
    .from('orders')
    .select('id')
    .gte('created_at', since);
  const orderIds = (recentOrders ?? []).map(o => o.id);

  // 2 — top products by units sold
  let topProducts: { name: string; unitsSold: number; storeCount: number }[] = [];
  if (orderIds.length > 0) {
    const { data: items } = await sb
      .from('order_items')
      .select('product_id, quantity')
      .in('order_id', orderIds.slice(0, 500));

    const prodIds = [...new Set((items ?? []).map(i => i.product_id).filter(Boolean))];
    if (prodIds.length > 0) {
      const { data: prods } = await sb.from('products').select('id, name, user_id').in('id', prodIds);
      const prodMap: Record<string | number, { name: string; user_id: string }> = {};
      for (const p of prods ?? []) prodMap[p.id] = { name: p.name, user_id: p.user_id };

      const totals: Record<string, { unitsSold: number; storeIds: Set<string> }> = {};
      for (const item of items ?? []) {
        const prod = prodMap[item.product_id];
        if (!prod) continue;
        if (!totals[prod.name]) totals[prod.name] = { unitsSold: 0, storeIds: new Set() };
        totals[prod.name].unitsSold += item.quantity ?? 1;
        totals[prod.name].storeIds.add(prod.user_id);
      }
      topProducts = Object.entries(totals)
        .map(([name, d]) => ({ name, unitsSold: d.unitsSold, storeCount: d.storeIds.size }))
        .sort((a, b) => b.unitsSold - a.unitsSold)
        .slice(0, 8);
    }
  }

  // 3 — ad campaigns aggregated across all merchants
  const [{ data: campaigns }, { data: adStats }] = await Promise.all([
    sb.from('meta_ads_campaigns').select('campaign_name, objective'),
    sb.from('meta_ads_stats').select('spend, revenue').gte('date', since.slice(0, 10)),
  ]);

  const totalAdSpend  = (adStats ?? []).reduce((s, r) => s + (Number(r.spend) || 0), 0);
  const totalAdRevenue = (adStats ?? []).reduce((s, r) => s + (Number(r.revenue) || 0), 0);

  const obj: Record<string, { spend: number; roasSum: number; count: number }> = {};
  for (const c of campaigns ?? []) {
    const key = (c.campaign_name ?? c.objective ?? 'Unknown').split(' — ')[0];
    if (!obj[key]) obj[key] = { spend: 0, roasSum: 0, count: 0 };
    obj[key].count++;
    // Approximate spend per campaign = proportional share of total
  }
  // If we have total stats, distribute evenly (best we can do without campaign-level stats)
  const campaignCount = Object.keys(obj).length || 1;
  for (const key of Object.keys(obj)) {
    const share = totalAdSpend / campaignCount;
    obj[key].spend = share;
    obj[key].roasSum = totalAdSpend > 0 ? totalAdRevenue / totalAdSpend : 0;
  }

  const adObjectives = Object.entries(obj)
    .sort((a, b) => (b[1].roasSum / Math.max(b[1].count, 1)) - (a[1].roasSum / Math.max(a[1].count, 1)));

  return NextResponse.json({ topProducts, adObjectives: adObjectives.map(([name, d]) => ({ name, ...d })) });
}
