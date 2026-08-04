'use client';
import React from 'react';
import Link from 'next/link';
import { TENANTS, FULL_AUDIT_LOG } from '@/lib/data';

const AUDIT_ICON: Record<string, string> = { impersonation: '👁', pii: '🔒', billing: '💳', account: '🚩' };

export default function OverviewPage() {
  const risky = TENANTS
    .filter(t => t.band === 'atrisk' || t.band === 'critical')
    .sort((a, b) => a.health - b.health);

  return (
    <div>
      <div className="v6-page-head">
        <h1>Overview</h1>
        <div className="v6-page-sub">Platform-wide, not tenant-scoped — Wednesday, 29 July 2026</div>
      </div>

      {/* Metric row */}
      <div className="v6-zone">
        <div className="v6-metric-grid">
          <div className="v6-metric"><label>Active tenants</label><b className="num">742</b><div className="v6-trend up">↑ 4.2% this month</div></div>
          <div className="v6-metric"><label>MRR</label><b className="num">Rs 5.81M</b><div className="v6-trend up">↑ 6.8% this month</div></div>
          <div className="v6-metric"><label>Trial → paid</label><b className="num">31%</b><div className="v6-trend down">↓ 2pt this month</div></div>
          <div className="v6-metric"><label>AI spend today</label><b className="num">Rs 8,240</b><div className="v6-trend" style={{color:'var(--v6-text-3)'}}>of Rs 15,000 budget</div></div>
          <div className="v6-metric"><label>Courier health</label><b className="num" style={{color:'var(--v6-accent-light)'}}>13/14</b><div className="v6-trend down">Leopards degraded</div></div>
        </div>
      </div>

      {/* At-risk queue */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">At-risk tenant queue</span>
          <span className="v6-zone-sub">Health score below 60 — weekly customer-success review list</span>
        </div>
        <div className="v6-risk-list">
          {risky.map(t => (
            <Link key={t.id} href={`/tenants/${t.id}`} className="v6-risk-row">
              <div className={`v6-risk-score-badge ${t.band === 'critical' ? 'critical' : 'atrisk'}`}>{t.health}</div>
              <div className="v6-risk-row-info">
                <div className="v6-rn-name">{t.name}</div>
                <div className="v6-rn-sub">{t.plan} · {t.orders30d} orders / 30d · {t.city}</div>
              </div>
              <span className={`v6-risk-tag ${t.band === 'critical' ? 'critical' : 'atrisk'}`}>
                {t.band === 'critical' ? 'Critical — call today' : 'At risk'}
              </span>
              <svg className="v6-risk-chev" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent admin activity — reads from the same FULL_AUDIT_LOG as the Audit Log page */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Recent admin activity</span>
          <span className="v6-zone-sub">Last 24 hours, all admins</span>
        </div>
        <div className="v6-audit-feed">
          {FULL_AUDIT_LOG.slice(0, 4).map((a, i) => (
            <div key={i} className="v6-audit-row">
              <span className="v6-audit-ic">{AUDIT_ICON[a.type] || '•'}</span>
              <span className="v6-audit-text"><strong>{a.admin}</strong> {a.action.toLowerCase()} — <strong>{a.tenant}</strong></span>
              <span className="v6-audit-time">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
