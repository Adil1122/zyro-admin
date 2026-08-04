'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TENANTS } from '@/lib/data';

const dunning = TENANTS
  .filter(t => t.status === 'past_due')
  .map(t => ({ ...t, daysLeft: t.deepDive.dunningDays }))
  .sort((a, b) => a.daysLeft - b.daysLeft); // fewest days left = most urgent

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

      <div className="v6-mini-metric-grid" style={{ marginBottom: 24 }}>
        <div className="v6-mini-metric"><label>MRR</label><b className="num">Rs {(totalMrr / 1000000).toFixed(2)}M</b></div>
        <div className="v6-mini-metric"><label>Churn (30d)</label><b className="num" style={{ color: 'var(--v6-warning)' }}>2.1%</b></div>
        <div className="v6-mini-metric"><label>In dunning</label><b className="num" style={{ color: dunning.length > 0 ? 'var(--v6-warning)' : 'var(--v6-accent-light)' }}>{dunning.length} tenants</b></div>
        <div className="v6-mini-metric"><label>Past-due amount</label><b className="num" style={{ color: 'var(--v6-destructive)' }}>Rs {dunningMrr.toLocaleString('en-US')}</b></div>
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
          <div className="v6-risk-list">
            {dunning.map(t => (
              <div
                key={t.id}
                className="v6-risk-row"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/tenants/${t.id}`)}
              >
                <div className="v6-risk-score-badge atrisk" style={{ flexDirection: 'column', gap: 0, lineHeight: 1.1 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--v6-text-3)', textTransform: 'uppercase' }}>Rs</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#fcd34d' }}>{(t.mrr / 1000).toFixed(0)}k</span>
                </div>
                <div className="v6-risk-row-info">
                  <div className="v6-rn-name">{t.name}</div>
                  <div className="v6-rn-sub">{t.plan} · {t.owner} · {t.city}</div>
                </div>
                <span className={`v6-risk-tag ${t.daysLeft <= 2 ? 'critical' : 'atrisk'}`}>
                  {t.daysLeft} day{t.daysLeft !== 1 ? 's' : ''} left
                </span>
                <svg className="v6-risk-chev" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="v6-zone">
        <div className="v6-zone-head"><span className="v6-zone-title">MRR by plan</span></div>
        <div className="v6-card" style={{ padding: '16px 20px' }}>
          {[
            { plan: 'Pro', count: TENANTS.filter(t => t.plan === 'Pro').length, mrr: TENANTS.filter(t => t.plan === 'Pro').reduce((s, t) => s + t.mrr, 0) },
            { plan: 'Growth', count: TENANTS.filter(t => t.plan === 'Growth').length, mrr: TENANTS.filter(t => t.plan === 'Growth').reduce((s, t) => s + t.mrr, 0) },
            { plan: 'Starter', count: TENANTS.filter(t => t.plan === 'Starter').length, mrr: TENANTS.filter(t => t.plan === 'Starter').reduce((s, t) => s + t.mrr, 0) },
          ].map(row => {
            const pct = Math.round(row.mrr / totalMrr * 100);
            return (
              <div key={row.plan} className="v6-usage-bar-row">
                <div className="v6-usage-bar-top">
                  <label>{row.plan} <span style={{ color: 'var(--v6-text-3)', fontWeight: 400 }}>({row.count} tenants)</span></label>
                  <b className="num">Rs {row.mrr.toLocaleString('en-US')} <span style={{ color: 'var(--v6-text-3)', fontWeight: 400 }}>{pct}%</span></b>
                </div>
                <div className="v6-usage-bar"><span style={{ width: `${pct}%` }} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
