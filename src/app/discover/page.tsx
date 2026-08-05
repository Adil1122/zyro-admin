'use client';
import React, { useMemo, useEffect, useState } from 'react';
import type { Tenant } from '@/lib/types';

export default function DiscoverPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    fetch('/api/tenants')
      .then(r => r.json())
      .then(data => setTenants(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const topProducts = useMemo(() => {
    const totals: Record<string, number> = {};
    tenants.forEach(t => (t.deepDive?.products ?? []).forEach((p: { name: string; unitsSold: number }) => {
      totals[p.name] = (totals[p.name] || 0) + p.unitsSold;
    }));
    return Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [tenants]);

  const adObjectives = useMemo(() => {
    const obj: Record<string, { spend: number; roasSum: number; count: number }> = {};
    tenants.forEach(t => (t.deepDive?.campaigns ?? []).forEach((c: { name: string; spend: number; roas: number }) => {
      const key = c.name.split(' — ')[0];
      if (!obj[key]) obj[key] = { spend: 0, roasSum: 0, count: 0 };
      obj[key].spend += c.spend;
      obj[key].roasSum += c.roas;
      obj[key].count += 1;
    }));
    return Object.entries(obj).sort((a, b) => (b[1].roasSum / b[1].count) - (a[1].roasSum / a[1].count));
  }, [tenants]);

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Discover</h1>
        <div className="page-sub">Patterns across every store on Zyro — no single merchant can see this, only the platform can</div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Trending products right now</span>
          <span className="zone-sub">Aggregated units sold, all tenants, last 30 days</span>
        </div>
        <div className="card" style={{ padding: '14px 20px' }}>
          {topProducts.length === 0
            ? <div style={{ padding: '12px 0', color: 'var(--text-3)' }}>Loading…</div>
            : topProducts.map(([name, units], i) => (
              <div key={name} className="product-row">
                <span className="product-rank">{i + 1}</span>
                <div className="product-info">
                  <div className="p-name">{name}</div>
                  <div className="p-sub">Across {tenants.filter(t => (t.deepDive?.products ?? []).some((p: { name: string }) => p.name === name)).length} stores</div>
                </div>
                <span className="product-revenue num">{units.toLocaleString('en-US')} units</span>
              </div>
            ))}
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Winning ad approaches</span>
          <span className="zone-sub">Which campaign objectives are actually converting platform-wide</span>
        </div>
        <div className="card track-scroll">
          <table className="compare-table">
            <thead><tr><th>Objective</th><th>Tenants running it</th><th>Avg. ROAS</th><th>Total spend</th></tr></thead>
            <tbody>
              {adObjectives.length === 0
                ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: 20, color: 'var(--text-3)' }}>Loading…</td></tr>
                : adObjectives.map(([name, d]) => (
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
