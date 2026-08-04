'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { TENANTS } from '@/lib/data';
import { useApp } from '@/lib/context';

const FBR_THRESHOLD = 7_500_000;

const APPEAL_INITIAL = [
  { id: 'a1', phone: '+9230xxxx1122', tenant: "Sana's Boutique", reason: "Customer says courier marked RTO but they never received a delivery attempt" },
  { id: 'a2', phone: '+9230xxxx7788', tenant: 'Lahore Kicks', reason: "Flagged after 2 refused deliveries — customer says wrong address on file, now corrected" },
  { id: 'a3', phone: '+9230xxxx4411', tenant: 'Glow Cosmetics', reason: "Blocked for suspected fake return, customer disputes and has photo proof of unopened package" },
];

export default function RiskPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [appeals, setAppeals] = useState(APPEAL_INITIAL);
  const [tab, setTab] = useState<'appeals' | 'fbr'>('appeals');

  // FBR: approaching threshold range 5.5M–8.5M annual
  const fbrTable = useMemo(() => {
    return TENANTS
      .map(t => ({ ...t, annualRevenue: t.deepDive.salesTotal * 12 }))
      .filter(t => t.annualRevenue > 5_500_000 && t.annualRevenue < 8_500_000)
      .sort((a, b) => b.annualRevenue - a.annualRevenue)
      .slice(0, 20);
  }, []);

  function handleAppeal(id: string, action: 'approve' | 'deny') {
    const a = appeals.find(x => x.id === id);
    if (!a) return;
    setAppeals(prev => prev.filter(x => x.id !== id));
    showToast(`Appeal ${action === 'approve' ? 'approved' : 'denied'} — ${a.tenant}`);
  }

  return (
    <div>
      <div className="v6-page-head">
        <h1>Risk & Compliance</h1>
        <div className="v6-page-sub">RTO intelligence, appeal queue, and FBR revenue threshold tracking</div>
      </div>

      <div className="v6-mini-metric-grid" style={{ marginBottom: 24 }}>
        <div className="v6-mini-metric"><label>RTO intel opt-in rate</label><b className="num" style={{ color: 'var(--v6-accent-light)' }}>78%</b></div>
        <div className="v6-mini-metric"><label>Pending appeals</label><b className="num" style={{ color: appeals.length > 0 ? 'var(--v6-warning)' : 'var(--v6-accent-light)' }}>{appeals.length}</b></div>
        <div className="v6-mini-metric"><label>Blocklisted numbers</label><b className="num">142</b></div>
        <div className="v6-mini-metric"><label>Unregistered (no NTN)</label><b className="num" style={{ color: 'var(--v6-warning)' }}>18</b></div>
      </div>

      <div className="v6-detail-tabs" style={{ marginBottom: 16 }}>
        <button className={`v6-detail-tab${tab === 'appeals' ? ' active' : ''}`} onClick={() => setTab('appeals')}>
          Appeal queue {appeals.length > 0 && <span className="v6-nav-badge red" style={{ marginLeft: 6 }}>{appeals.length}</span>}
        </button>
        <button className={`v6-detail-tab${tab === 'fbr' ? ' active' : ''}`} onClick={() => setTab('fbr')}>FBR threshold</button>
      </div>

      {tab === 'appeals' && (
        <div className="v6-zone">
          <div className="v6-zone-head"><span className="v6-zone-title">Pending appeals</span><span className="v6-zone-sub">RTO & chargeback dispute resolution</span></div>
          {appeals.length === 0 ? (
            <div className="v6-card" style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>
              No open appeals
            </div>
          ) : (
            <div className="v6-risk-list">
              {appeals.map(a => (
                <div key={a.id} className="v6-risk-row" style={{ cursor: 'default' }}>
                  <div className="v6-risk-score-badge atrisk" style={{ fontSize: 10 }}>?</div>
                  <div className="v6-risk-row-info">
                    <div className="v6-rn-name">{a.tenant} <span style={{ color: 'var(--v6-text-3)', fontWeight: 400, fontSize: 12 }}>{a.phone}</span></div>
                    <div className="v6-rn-sub">{a.reason}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button className="v6-btn-sm" style={{ background: 'var(--v6-vivid-gradient)', color: '#fff', border: 'none' }} onClick={() => handleAppeal(a.id, 'approve')}>Approve</button>
                    <button className="v6-btn-sm v6-btn-danger-outline" onClick={() => handleAppeal(a.id, 'deny')}>Deny</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'fbr' && (
        <div className="v6-zone">
          <div className="v6-zone-head">
            <span className="v6-zone-title">FBR turnover threshold</span>
            <span className="v6-zone-sub">Stores approaching Rs 7.5M annual — may require FBR registration</span>
          </div>
          <div className="v6-card v6-track-scroll">
            <table className="v6-tenant-table">
              <thead>
                <tr><th>Tenant</th><th>Plan</th><th>Projected annual revenue</th><th>Threshold</th><th>Status</th></tr>
              </thead>
              <tbody>
                {fbrTable.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>No stores in threshold range</td></tr>
                ) : (
                  fbrTable.map(t => {
                    const alertSent = t.annualRevenue > 7_000_000;
                    return (
                      <tr key={t.id} className="v6-tenant-row" onClick={() => router.push(`/tenants/${t.id}`)}>
                        <td>
                          <div className="v6-t-name">{t.name}</div>
                          <div className="v6-t-sub">{t.city}</div>
                        </td>
                        <td>{t.plan}</td>
                        <td className="num" style={{ color: alertSent ? 'var(--v6-destructive)' : 'var(--v6-warning)', fontWeight: 700 }}>
                          Rs {t.annualRevenue.toLocaleString('en-US')}
                        </td>
                        <td className="num" style={{ color: 'var(--v6-text-3)' }}>
                          Rs {FBR_THRESHOLD.toLocaleString('en-US')}
                        </td>
                        <td>
                          <span className={`v6-mini-pill ${alertSent ? 'review' : 'monitor'}`}>
                            {alertSent ? 'Alert sent' : 'Approaching'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
