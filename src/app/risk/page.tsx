'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/lib/context';
import type { Tenant } from '@/lib/types';

interface Appeal {
  id: string;
  phone: string;
  tenant: string;
  reason: string;
  status: string;
}

export default function RiskPage() {
  const { showToast } = useApp();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [appeals, setAppeals] = useState<Appeal[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState<string | null>(null);

  const loadAppeals = useCallback(() => {
    fetch('/api/risk/appeals')
      .then(r => r.json())
      .then(data => setAppeals(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/tenants')
      .then(r => r.json())
      .then(data => { setTenants(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
    fetch('/api/risk/stats')
      .then(r => r.json())
      .then(data => setStats(typeof data === 'object' ? data : {}))
      .catch(() => {});
    loadAppeals();
  }, [loadAppeals]);

  async function handleAppeal(id: string, status: 'approved' | 'denied') {
    setActioning(id);
    try {
      const res = await fetch(`/api/risk/appeals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      showToast(status === 'approved' ? 'Appeal approved — risk score cleared' : 'Appeal denied — flag stands');
      setAppeals(prev => prev.filter(a => a.id !== id));
    } catch {
      showToast('Failed to update appeal — try again');
    } finally {
      setActioning(null);
    }
  }

  const rtoOptInRate = tenants.length > 0
    ? Math.round(tenants.reduce((sum, t) => sum + (t.deepDive?.optInRate ?? 0), 0) / tenants.length)
    : 0;

  const nearThreshold = tenants.filter(t => {
    const annual = (t.deepDive?.salesTotal ?? 0) * 12;
    return annual > 5500000 && annual < 8500000;
  }).slice(0, 6);

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Risk &amp; Compliance</h1>
        <div className="page-sub">Cross-tenant data — exists at the platform level, not visible to any single merchant</div>
      </div>

      <div className="zone">
        <div className="mini-metric-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="mini-metric">
            <label>RTO intel opt-in rate</label>
            <b className="num">{loading ? '—' : `${rtoOptInRate}%`}</b>
            <span className="note">Avg across all tenants</span>
          </div>
          <div className="mini-metric">
            <label>Pending appeals</label>
            <b className="num" style={{ color: appeals.length > 0 ? 'var(--warning)' : 'var(--accent)' }}>
              {appeals.length}
            </b>
          </div>
          <div className="mini-metric">
            <label>Blocklisted numbers</label>
            <b className="num">{stats.blocklist_count ?? '—'}</b>
          </div>
          <div className="mini-metric">
            <label>Unregistered (no NTN)</label>
            <b className="num">{stats.unregistered_count ?? '—'}</b>
            <span className="note">Below FBR threshold</span>
          </div>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Fake-return appeal queue</span>
          <span className="zone-sub">A wrongly blocked genuine customer is real harm — these need review, not auto-resolution</span>
        </div>
        <div className="risk-list">
          {appeals.length === 0 ? (
            <div className="risk-row" style={{ cursor: 'default' }}>
              <div className="risk-row-info">
                <div className="rn-sub" style={{ color: 'var(--accent)' }}>No pending appeals — queue is clear.</div>
              </div>
            </div>
          ) : appeals.map(a => (
            <div key={a.id} className="risk-row" style={{ cursor: 'default' }}>
              <div className="risk-score-badge atrisk" style={{ fontSize: 10 }}>?</div>
              <div className="risk-row-info">
                <div className="rn-name">{a.phone} · {a.tenant}</div>
                <div className="rn-sub">{a.reason}</div>
              </div>
              <button
                className="btn-sm"
                style={{ height: 30, padding: '0 10px', fontSize: 11 }}
                disabled={actioning === a.id}
                onClick={() => handleAppeal(a.id, 'approved')}
              >
                Approve
              </button>
              <button
                className="btn-sm btn-danger-outline"
                style={{ height: 30, padding: '0 10px', fontSize: 11 }}
                disabled={actioning === a.id}
                onClick={() => handleAppeal(a.id, 'denied')}
              >
                Deny
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">FBR compliance — approaching revenue threshold</span>
          <span className="zone-sub">Unregistered tenants nearing the Rs 7.5M mandatory-registration line</span>
        </div>
        <div className="card track-scroll">
          <table className="compare-table">
            <thead><tr><th>Tenant</th><th>12-month revenue</th><th>Threshold</th><th>Status</th></tr></thead>
            <tbody>
              {nearThreshold.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 20, color: 'var(--text-3)' }}>No unregistered tenants currently near the threshold.</td></tr>
              ) : nearThreshold.map(t => {
                const annualRev = (t.deepDive?.salesTotal ?? 0) * 12;
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700 }}>{t.name}</td>
                    <td className="num">Rs {annualRev.toLocaleString('en-US')}</td>
                    <td className="num">Rs 7,500,000</td>
                    <td><span className={`mini-pill ${annualRev > 7000000 ? 'review' : 'monitor'}`}>{annualRev > 7000000 ? 'Alert sent' : 'Approaching'}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
