'use client';
import React, { useEffect, useState } from 'react';

interface TopProduct { name: string; unitsSold: number; storeCount: number; }
interface AdObjective { name: string; spend: number; roasSum: number; count: number; }

export default function DiscoverPage() {
  const [topProducts, setTopProducts]   = useState<TopProduct[]>([]);
  const [adObjectives, setAdObjectives] = useState<AdObjective[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/discover')
      .then(r => r.json())
      .then(data => {
        if (data.topProducts)  setTopProducts(data.topProducts);
        if (data.adObjectives) setAdObjectives(data.adObjectives);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const maxShip = Math.max(...topProducts.map(p => p.unitsSold), 1);

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
          {loading
            ? <div style={{ padding: '12px 0', color: 'var(--text-3)' }}>Loading…</div>
            : topProducts.length === 0
            ? <div style={{ padding: '12px 0', color: 'var(--text-3)' }}>No order data in the last 30 days yet.</div>
            : topProducts.map((p, i) => (
              <div key={p.name} className="product-row">
                <span className="product-rank">{i + 1}</span>
                <div className="product-info">
                  <div className="p-name">{p.name}</div>
                  <div className="p-sub">Across {p.storeCount} store{p.storeCount === 1 ? '' : 's'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
                  <div className="compare-bar-track" style={{ width: 80 }}>
                    <span className="compare-bar-fill" style={{ width: `${(p.unitsSold / maxShip * 100).toFixed(0)}%`, background: 'var(--accent)' }} />
                  </div>
                  <span className="product-revenue num">{p.unitsSold.toLocaleString('en-US')} units</span>
                </div>
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
            <thead><tr><th>Objective</th><th>Campaigns</th><th>Avg. ROAS</th><th>Total spend</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: 20, color: 'var(--text-3)' }}>Loading…</td></tr>
                : adObjectives.length === 0
                ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: 20, color: 'var(--text-3)' }}>No ad campaign data yet.</td></tr>
                : adObjectives.map(o => (
                  <tr key={o.name}>
                    <td style={{ fontWeight: 700 }}>{o.name}</td>
                    <td className="num">{o.count}</td>
                    <td className="num" style={{ color: 'var(--accent-light)' }}>{(o.roasSum / Math.max(o.count, 1)).toFixed(2)}x</td>
                    <td className="num">Rs {Math.round(o.spend).toLocaleString('en-US')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
