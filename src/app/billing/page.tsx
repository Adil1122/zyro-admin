'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TENANTS } from '@/lib/data';

const dunning = TENANTS
  .filter(t => t.status === 'past_due')
  .map(t => ({ ...t, daysLeft: t.deepDive.dunningDays }))
  .sort((a, b) => a.daysLeft - b.daysLeft);

const totalMrr = TENANTS.reduce((s, t) => s + t.mrr, 0);
const dunningMrr = dunning.reduce((s, t) => s + t.mrr, 0);

export default function BillingPage() {
  const router = useRouter();

  return (
    <div>
      <div className="v6-page-head">
        <h1>Billing</h1>
        <div className="v6-page-sub">MRR trends, churn, and dunning queue</div>
      </div>

      <div className="v6-metric-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="v6-metric">
          <label>MRR</label>
          <b className="num">Rs {(totalMrr / 1000000).toFixed(2)}M</b>
          <div className="v6-trend up">↑ 3.2% vs last month</div>
        </div>
        <div className="v6-metric">
          <label>Churn (30d)</label>
          <b className="num" style={{ color: 'var(--v6-warning)' }}>2.1%</b>
          <div className="v6-trend" style={{ color: 'var(--v6-text-3)' }}>Industry avg 3.4%</div>
        </div>
        <div className="v6-metric">
          <label>In dunning</label>
          <b className="num" style={{ color: dunning.length > 0 ? 'var(--v6-warning)' : 'var(--v6-accent-light)' }}>{dunning.length} tenants</b>
          <div className="v6-trend" style={{ color: 'var(--v6-text-3)' }}>Past due accounts</div>
        </div>
        <div className="v6-metric">
          <label>Past-due MRR</label>
          <b className="num" style={{ color: 'var(--v6-destructive)' }}>Rs {dunningMrr.toLocaleString('en-US')}</b>
          <div className="v6-trend" style={{ color: 'var(--v6-text-3)' }}>At risk of churning</div>
        </div>
      </div>

      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Dunning queue</span>
          <span className="v6-zone-sub">{dunning.length} past-due accounts — sorted by days remaining</span>
        </div>
        {dunning.length === 0 ? (
          <div className="v6-card" style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>
            No past-due accounts
          </div>
        ) : (
          <div className="v6-risk-list" id="dunningList">
            {dunning.map(t => (
              <div
                key={t.id}
                className="v6-risk-row"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/tenants/${t.id}`)}
              >
                <div className="v6-risk-score-badge atrisk" style={{ fontSize: 11 }}>
                  Rs<br />{(t.mrr / 1000).toFixed(0)}k
                </div>
                <div className="v6-risk-row-info">
                  <div className="v6-rn-name">{t.name}</div>
                  <div className="v6-rn-sub">{t.plan} · Rs {t.mrr.toLocaleString('en-US')} overdue</div>
                </div>
                <span className={`v6-risk-tag atrisk`}>
                  {t.daysLeft} day{t.daysLeft !== 1 ? 's' : ''} left
                </span>
                <svg className="v6-risk-chev" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
