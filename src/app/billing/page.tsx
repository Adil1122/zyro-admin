'use client';
import React from 'react';
import Link from 'next/link';
import { TENANTS } from '@/lib/data';

export default function BillingPage() {
  const dunning = TENANTS.filter(t => t.status === 'past_due');

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Billing</h1>
        <div className="page-sub">Revenue health, dunning management, and subscription status</div>
      </div>

      <div className="zone">
        <div className="metric-grid">
          <div className="metric"><label>MRR</label><b className="num">Rs 5.81M</b><div className="trend up">↑ 6.8% this month</div></div>
          <div className="metric"><label>ARR</label><b className="num">Rs 69.7M</b><div className="trend up">↑ 6.8% this month</div></div>
          <div className="metric"><label>Churn rate</label><b className="num">2.1%</b><div className="trend down">↑ 0.3pt this month</div></div>
          <div className="metric"><label>Trial → paid</label><b className="num">31%</b><div className="trend down">↓ 2pt this month</div></div>
          <div className="metric"><label>Past due</label><b className="num" style={{ color: 'var(--warning)' }}>{dunning.length}</b><div className="trend down">accounts at risk</div></div>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Dunning queue</span>
          <span className="zone-sub">Accounts with failed payments — automated retry in progress</span>
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
