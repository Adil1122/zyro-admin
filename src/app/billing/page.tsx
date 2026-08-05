'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Tenant } from '@/lib/types';

function fmtMrr(n: number) {
  if (n >= 1_000_000) return `Rs ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `Rs ${(n / 1_000).toFixed(1)}k`;
  return `Rs ${n.toLocaleString('en-US')}`;
}

export default function BillingPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tenants')
      .then(r => r.json())
      .then(data => { setTenants(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const dunning = tenants.filter(t => t.status === 'past_due');
  const activeTenants = tenants.filter(t => t.status === 'active');
  const totalMrr = tenants.reduce((sum, t) => sum + t.mrr, 0);
  const pastDueAmount = dunning.reduce((sum, t) => sum + t.mrr, 0);
  const churnRate = tenants.length > 0
    ? ((dunning.length / tenants.length) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Billing</h1>
        <div className="page-sub">Revenue operations and the dunning queue</div>
      </div>

      <div className="zone">
        <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="metric"><label>MRR</label><b className="num">{loading ? '—' : fmtMrr(totalMrr)}</b></div>
          <div className="metric"><label>At-risk rate</label><b className="num">{loading ? '—' : `${churnRate}%`}</b><div className="trend up">of all tenants past due</div></div>
          <div className="metric"><label>In dunning</label><b className="num" style={{ color: 'var(--warning)' }}>{loading ? '—' : `${dunning.length} tenants`}</b></div>
          <div className="metric"><label>Past-due amount</label><b className="num">{loading ? '—' : fmtMrr(pastDueAmount)}</b></div>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Dunning queue</span>
          <span className="zone-sub">7-day recovery window before suspension</span>
        </div>
        {dunning.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)' }}>
            No accounts currently in dunning.
          </div>
        ) : (
          <div className="risk-list">
            {dunning.map(t => (
              <Link key={t.id} href={`/tenants/${t.id}`} className="risk-row">
                <div className="risk-score-badge atrisk" style={{ fontSize: 11 }}>
                  Rs<br />{Math.round(t.mrr / 1000)}k
                </div>
                <div className="risk-row-info">
                  <div className="rn-name">{t.name}</div>
                  <div className="rn-sub">{t.plan} · Rs {t.mrr.toLocaleString('en-US')} overdue</div>
                </div>
                <span className="risk-tag atrisk">{t.dunningDays} day{t.dunningDays === 1 ? '' : 's'} left</span>
                <svg className="risk-chev" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
