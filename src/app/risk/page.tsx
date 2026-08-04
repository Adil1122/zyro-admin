'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { TENANTS } from '@/lib/data';
import { useApp } from '@/lib/context';

const APPEAL_INITIAL = [
  { id: 'a1', tenant: 'Urban Thread Co.', tenantId: 'urban-thread', reason: 'Order fulfilled but courier marked returned — seeking re-credit', days: 4, amount: 'Rs 12,400' },
  { id: 'a2', tenant: 'Noor Skincare', tenantId: 'noor-skincare', reason: 'Customer claimed non-delivery but tracking shows delivered to gate', days: 2, amount: 'Rs 3,200' },
  { id: 'a3', tenant: 'HarvestCart', tenantId: 'harvestcart', reason: 'Fraudulent chargeback on order #HC-44812', days: 7, amount: 'Rs 8,750' },
];

export default function RiskPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [appeals, setAppeals] = useState(APPEAL_INITIAL);
  const [tab, setTab] = useState<'appeals' | 'fbr'>('appeals');

  const fbrTable = useMemo(() => {
    return TENANTS
      .map(t => ({ ...t, annualRevenue: t.deepDive.salesTotal * 12 }))
      .filter(t => t.annualRevenue >= 8_000_000)
      .sort((a, b) => b.annualRevenue - a.annualRevenue)
      .slice(0, 15);
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

      <div className="v6-mini-metric-grid" style={{ marginBottom: 20 }}>
        <div className="v6-mini-metric"><label>Platform RTO rate</label><b className="num" style={{ color: 'var(--v6-warning)' }}>11.2%</b></div>
        <div className="v6-mini-metric"><label>Open appeals</label><b className="num">{appeals.length}</b></div>
        <div className="v6-mini-metric"><label>FBR-threshold stores</label><b className="num">{fbrTable.length}</b></div>
        <div className="v6-mini-metric"><label>Chargeback rate (30d)</label><b className="num" style={{ color: 'var(--v6-destructive)' }}>0.78%</b></div>
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
            appeals.map(a => (
              <div key={a.id} className="v6-card" style={{ padding: '16px 20px', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div>
                    <button className="v6-t-name" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', color: 'var(--v6-text-1)', fontWeight: 700 }}
                      onClick={() => router.push(`/tenants/${a.tenantId}`)}>
                      {a.tenant}
                    </button>
                    <div style={{ color: 'var(--v6-text-2)', fontSize: 13, margin: '4px 0 8px' }}>{a.reason}</div>
                    <div style={{ color: 'var(--v6-text-3)', fontSize: 12 }}>{a.days}d old · {a.amount}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button className="v6-btn-sm" style={{ background: 'var(--v6-accent)', color: 'var(--v6-accent-ink)', border: 'none' }} onClick={() => handleAppeal(a.id, 'approve')}>Approve</button>
                    <button className="v6-btn-sm v6-btn-danger-outline" onClick={() => handleAppeal(a.id, 'deny')}>Deny</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'fbr' && (
        <div className="v6-zone">
          <div className="v6-zone-head">
            <span className="v6-zone-title">FBR turnover threshold</span>
            <span className="v6-zone-sub">Stores projected above Rs 8M annual — may require FBR registration</span>
          </div>
          <div className="v6-card v6-track-scroll">
            <table className="v6-tenant-table">
              <thead>
                <tr><th>Tenant</th><th>Plan</th><th>MRR</th><th>Projected annual revenue</th><th>Status</th></tr>
              </thead>
              <tbody>
                {fbrTable.map(t => (
                  <tr key={t.id} className="v6-tenant-row" onClick={() => router.push(`/tenants/${t.id}`)}>
                    <td>
                      <div className="v6-t-name">{t.name}</div>
                      <div className="v6-t-sub">{t.city}</div>
                    </td>
                    <td>{t.plan}</td>
                    <td className="num">Rs {t.mrr.toLocaleString('en-US')}</td>
                    <td className="num" style={{ color: t.annualRevenue >= 25_000_000 ? 'var(--v6-destructive)' : 'var(--v6-warning)', fontWeight: 700 }}>
                      Rs {t.annualRevenue.toLocaleString('en-US')}
                    </td>
                    <td>
                      <span className={`v6-mini-pill ${t.annualRevenue >= 25_000_000 ? 'review' : 'monitor'}`}>
                        {t.annualRevenue >= 25_000_000 ? 'Urgent' : 'Monitor'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
