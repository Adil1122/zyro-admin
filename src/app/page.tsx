'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Tenant } from '@/lib/types';

const AUDIT_ICON: Record<string, string> = { impersonation: '👁', pii: '🔒', billing: '💳', account: '🚩' };

interface AuditRow { id: string; type: string; admin: string; action: string; tenant: string; time: string; }

export default function OverviewPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [audit, setAudit] = useState<AuditRow[]>([]);

  useEffect(() => {
    fetch('/api/tenants')
      .then(r => r.json())
      .then(data => setTenants(Array.isArray(data) ? data : []))
      .catch(() => {});
    fetch('/api/audit?limit=4')
      .then(r => r.json())
      .then(data => setAudit(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const risky = tenants
    .filter(t => t.band === 'atrisk' || t.band === 'critical')
    .sort((a, b) => a.health - b.health);

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Overview</h1>
        <div className="page-sub">Platform-wide, not tenant-scoped — Wednesday, 29 July 2026</div>
      </div>

      <div className="zone">
        <div className="metric-grid">
          <div className="metric"><label>Active tenants</label><b className="num">742</b><div className="trend up">↑ 4.2% this month</div></div>
          <div className="metric"><label>MRR</label><b className="num">Rs 5.81M</b><div className="trend up">↑ 6.8% this month</div></div>
          <div className="metric"><label>Trial → paid</label><b className="num">31%</b><div className="trend down">↓ 2pt this month</div></div>
          <div className="metric"><label>AI spend today</label><b className="num">Rs 8,240</b><div className="trend up">of Rs 15,000 budget</div></div>
          <div className="metric"><label>Courier health</label><b className="num" style={{ color: 'var(--accent-light)' }}>13/14</b><div className="trend down">Leopards degraded</div></div>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">At-risk tenant queue</span>
          <span className="zone-sub">Health score below 60 — weekly customer-success review list</span>
        </div>
        <div className="risk-list">
          {risky.length === 0
            ? <div className="risk-row" style={{ cursor: 'default' }}><div className="risk-row-info"><div className="rn-sub">No at-risk tenants right now.</div></div></div>
            : risky.map(t => (
              <Link key={t.id} href={`/tenants/${t.id}`} className="risk-row">
                <div className={`risk-score-badge ${t.band === 'critical' ? 'critical' : 'atrisk'}`}>{t.health}</div>
                <div className="risk-row-info">
                  <div className="rn-name">{t.name}</div>
                  <div className="rn-sub">{t.plan} · {t.orders30d} orders / 30d · {t.city}</div>
                </div>
                <span className={`risk-tag ${t.band === 'critical' ? 'critical' : 'atrisk'}`}>
                  {t.band === 'critical' ? 'Critical — call today' : 'At risk'}
                </span>
                <svg className="risk-chev" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Recent admin activity</span>
          <span className="zone-sub">Last 24 hours, all admins</span>
        </div>
        <div className="audit-feed">
          {audit.length === 0
            ? <div className="audit-row" style={{ color: 'var(--text-3)' }}>No recent activity.</div>
            : audit.map((a, i) => (
              <div key={a.id ?? i} className="audit-row">
                <span className="ic">{AUDIT_ICON[a.type] || '•'}</span>
                <span className="at-text"><b>{a.admin}</b> {a.action.toLowerCase()} — <b>{a.tenant}</b></span>
                <span className="at-time">{a.time}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
