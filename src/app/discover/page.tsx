'use client';
import React, { useMemo } from 'react';
import { TENANTS } from '@/lib/data';

export default function DiscoverPage() {
  const { products, objectives } = useMemo(() => {
    // Aggregate products across all tenants — sort by units sold
    const prodMap = new Map<string, { name: string; totalUnits: number; storeCount: number }>();
    for (const t of TENANTS) {
      for (const p of t.deepDive.products) {
        if (!prodMap.has(p.name)) prodMap.set(p.name, { name: p.name, totalUnits: 0, storeCount: 0 });
        const e = prodMap.get(p.name)!;
        e.totalUnits += p.unitsSold;
        e.storeCount += 1;
      }
    }
    const products = [...prodMap.values()]
      .sort((a, b) => b.totalUnits - a.totalUnits)
      .slice(0, 12);

    // Aggregate campaign objectives — extract from campaign name via split(' — ')[0]
    const objMap = new Map<string, { name: string; totalRoas: number; campaignCount: number; totalSpend: number; tenantSet: Set<string> }>();
    for (const t of TENANTS) {
      for (const c of t.deepDive.campaigns) {
        const obj = c.name.split(' — ')[0] || c.name;
        if (!objMap.has(obj)) objMap.set(obj, { name: obj, totalRoas: 0, campaignCount: 0, totalSpend: 0, tenantSet: new Set() });
        const e = objMap.get(obj)!;
        e.totalRoas += c.roas;
        e.campaignCount += 1;
        e.totalSpend += c.spend;
        e.tenantSet.add(t.id);
      }
    }
    const objectives = [...objMap.values()]
      .map(o => ({
        name: o.name,
        avgRoas: o.campaignCount > 0 ? +(o.totalRoas / o.campaignCount).toFixed(1) : 0,
        tenantsCount: o.tenantSet.size,
        totalSpend: o.totalSpend,
      }))
      .sort((a, b) => b.avgRoas - a.avgRoas);

    return { products, objectives };
  }, []);

  const maxUnits = products[0]?.totalUnits ?? 1;

  return (
    <div>
      <div className="v6-page-head">
        <h1>Discover</h1>
        <div className="v6-page-sub">Cross-tenant trends — aggregated, never tenant-attributed</div>
      </div>

      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Trending products</span>
          <span className="v6-zone-sub">By units sold across all stores (last 30 days)</span>
        </div>
        <div className="v6-card" style={{ padding: '16px 20px' }}>
          {products.map((p, i) => (
            <div key={p.name} className="v6-product-row">
              <span className="v6-product-rank">{i + 1}</span>
              <div className="v6-product-info">
                <div className="v6-p-name">{p.name}</div>
                <div className="v6-p-sub">{p.storeCount} stores</div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="v6-compare-bar-track" style={{ flex: 1 }}>
                  <span className="v6-compare-bar-fill" style={{ width: `${(p.totalUnits / maxUnits * 100).toFixed(0)}%`, background: 'var(--v6-accent)' }} />
                </div>
                <span className="v6-product-revenue num" style={{ minWidth: 90, textAlign: 'right' }}>
                  {p.totalUnits.toLocaleString('en-US')} units
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Winning ad objectives</span>
          <span className="v6-zone-sub">By average ROAS across all stores running that objective</span>
        </div>
        <div className="v6-card v6-track-scroll">
          <table className="v6-compare-table">
            <thead>
              <tr>
                <th>Objective</th>
                <th>Tenants running it</th>
                <th>Avg ROAS</th>
                <th>Total spend</th>
              </tr>
            </thead>
            <tbody>
              {objectives.map(obj => (
                <tr key={obj.name}>
                  <td style={{ fontWeight: 600 }}>{obj.name}</td>
                  <td className="num">{obj.tenantsCount}</td>
                  <td className="num" style={{ color: obj.avgRoas >= 4 ? 'var(--v6-accent-light)' : obj.avgRoas >= 2.5 ? 'var(--v6-text-1)' : 'var(--v6-warning)', fontWeight: 700 }}>
                    {obj.avgRoas}x
                  </td>
                  <td className="num" style={{ color: 'var(--v6-text-2)' }}>Rs {obj.totalSpend.toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
