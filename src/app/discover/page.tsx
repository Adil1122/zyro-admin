'use client';
import React, { useMemo } from 'react';
import { TENANTS } from '@/lib/data';

export default function DiscoverPage() {
  const topProducts = useMemo(() => {
    const totals: Record<string, number> = {};
    TENANTS.forEach(t => t.deepDive.products.forEach(p => {
      totals[p.name] = (totals[p.name] || 0) + p.unitsSold;
    }));
    return Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, []);

  const adObjectives = useMemo(() => {
    const obj: Record<string, { spend: number; roasSum: number; count: number }> = {};
    TENANTS.forEach(t => t.deepDive.campaigns.forEach(c => {
      const key = c.name.split(' — ')[0];
      if (!obj[key]) obj[key] = { spend: 0, roasSum: 0, count: 0 };
      obj[key].spend += c.spend;
      obj[key].roasSum += c.roas;
      obj[key].count += 1;
    }));
    return Object.entries(obj).sort((a, b) => (b[1].roasSum / b[1].count) - (a[1].roasSum / a[1].count));
  }, []);

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Discover</h1>
        <div className="page-sub">Cross-tenant intelligence — what&apos;s working across the platform</div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Trending products</span>
          <span className="zone-sub">By total units sold across all stores</span>
        </div>
        <div className="card" style={{ padding: '16px 20px' }}>
          {topProducts.map(([name, units], i) => (
            <div key={name} className="product-row">
              <span className="product-rank">{i + 1}</span>
              <div className="product-info">
                <div className="p-name">{name}</div>
                <div className="p-sub">Across {TENANTS.filter(t => t.deepDive.products.some(p => p.name === name)).length} stores</div>
              </div>
              <span className="product-revenue num">{units.toLocaleString('en-US')} units</span>
            </div>
          ))}
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Winning ad objectives</span>
          <span className="zone-sub">Ranked by average ROAS across all campaigns</span>
        </div>
        <div className="card track-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Objective</th>
                <th>Campaigns</th>
                <th>Avg ROAS</th>
                <th>Total spend</th>
              </tr>
            </thead>
            <tbody>
              {adObjectives.map(([name, d]) => (
                <tr key={name}>
                  <td style={{ fontWeight: 700 }}>{name}</td>
                  <td className="num">{d.count}</td>
                  <td className="num" style={{ color: 'var(--accent-light)' }}>{(d.roasSum / d.count).toFixed(2)}x</td>
                  <td className="num">Rs {d.spend.toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
