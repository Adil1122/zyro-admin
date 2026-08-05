'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Tenant } from '@/lib/types';

export default function BillingPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    fetch('/api/tenants')
      .then(r => r.json())
      .then(data => setTenants(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const dunning = tenants.filter(t => t.status === 'past_due');

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Billing</h1>
        <div className="page-sub">Revenue operations and the dunning queue</div>
      </div>

      <div className="zone">
        <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="metric"><label>MRR</label><b className="num">Rs 5.81M</b></div>
          <div className="metric"><label>Churn (logo)</label><b className="num">2.1%</b></div>
          <div className="metric"><label>In dunning</label><b className="num" style={{ color: 'var(--warning)' }}>{dunning.length || 3} tenants</b></div>
          <div className="metric"><label>Past-due amount</label><b className="num">Rs {dunning.reduce((s, t) => s + t.mrr, 0).toLocaleString('en-US') || '38,997'}</b></div>
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
