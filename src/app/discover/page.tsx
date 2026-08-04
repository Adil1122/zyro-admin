'use client';
import React, { useMemo } from 'react';
import { TENANTS } from '@/lib/data';

export default function DiscoverPage() {
  const { products, objectives } = useMemo(() => {
    // Aggregate products across all tenants
    const prodMap = new Map<string, { name: string; totalRevenue: number; totalUnits: number; count: number }>();
    for (const t of TENANTS) {
      for (const p of t.deepDive.products) {
        const key = p.name;
        if (!prodMap.has(key)) prodMap.set(key, { name: p.name, totalRevenue: 0, totalUnits: 0, count: 0 });
        const e = prodMap.get(key)!;
        e.totalRevenue += p.revenue;
        e.totalUnits += p.unitsSold;
        e.count += 1;
      }
    }
    const products = [...prodMap.values()]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 12);

    // Aggregate campaign objectives by ROAS
    const objMap = new Map<string, { name: string; totalRoas: number; count: number }>();
    const objNames = ['Traffic', 'Conversions', 'Catalog', 'Reach', 'Engagement', 'Lead gen'];
    for (const t of TENANTS) {
      for (const c of t.deepDive.campaigns) {
        const obj = objNames[c.name.length % objNames.length];
        if (!objMap.has(obj)) objMap.set(obj, { name: obj, totalRoas: 0, count: 0 });
        const e = objMap.get(obj)!;
        e.totalRoas += c.roas;
        e.count += 1;
      }
    }
    const objectives = [...objMap.values()]
      .map(o => ({ ...o, avgRoas: o.count > 0 ? +(o.totalRoas / o.count).toFixed(1) : 0 }))
      .sort((a, b) => b.avgRoas - a.avgRoas);

    return { products, objectives };
  }, []);

  const maxRevenue = products[0]?.totalRevenue ?? 1;
  const maxRoas = objectives[0]?.avgRoas ?? 1;

  return (
    <div>
      <div className="v6-page-head">
        <h1>Discover</h1>
        <div className="v6-page-sub">Cross-tenant trends — aggregated, never tenant-attributed</div>
      </div>

      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Trending products</span>
          <span className="v6-zone-sub">By aggregate revenue across all stores (last 30 days)</span>
        </div>
        <div className="v6-card" style={{ padding: '16px 20px' }}>
          {products.map((p, i) => (
            <div key={p.name} className="v6-product-row">
              <span className="v6-product-rank">{i + 1}</span>
              <div className="v6-product-info">
                <div className="v6-p-name">{p.name}</div>
                <div className="v6-p-sub">{p.totalUnits.toLocaleString('en-US')} units · {p.count} stores</div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="v6-compare-bar-track" style={{ flex: 1 }}>
                  <span className="v6-compare-bar-fill" style={{ width: `${(p.totalRevenue / maxRevenue * 100).toFixed(0)}%`, background: 'var(--v6-accent)' }} />
                </div>
                <span className="v6-product-revenue num" style={{ minWidth: 100, textAlign: 'right' }}>
                  Rs {p.totalRevenue.toLocaleString('en-US')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Winning ad objectives by ROAS</span>
          <span className="v6-zone-sub">Average across all stores running that objective type</span>
        </div>
        <div className="v6-card" style={{ padding: '16px 20px' }}>
          {objectives.map(obj => (
            <div key={obj.name} className="v6-wa-template-row">
              <span style={{ width: 130, flexShrink: 0 }}>{obj.name}</span>
              <div className="v6-compare-bar-track" style={{ flex: 1 }}>
                <span className="v6-compare-bar-fill" style={{
                  width: `${(obj.avgRoas / maxRoas * 100).toFixed(0)}%`,
                  background: obj.avgRoas >= 4 ? 'var(--v6-accent)' : obj.avgRoas >= 2.5 ? 'var(--v6-meta-blue)' : 'var(--v6-warning)',
                }} />
              </div>
              <span className="v6-wt-count num" style={{ minWidth: 60, textAlign: 'right' }}>
                <b style={{ color: 'var(--v6-accent-light)' }}>{obj.avgRoas}x</b>
                <span style={{ color: 'var(--v6-text-3)', fontWeight: 400, marginLeft: 6 }}>({obj.count} camps)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
