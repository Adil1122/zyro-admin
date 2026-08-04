'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TENANTS } from '@/lib/data';

const dunning = TENANTS
  .filter(t => t.status === 'past_due')
  .map(t => ({ ...t, dunningDays: t.deepDive.dunningDays }))
  .sort((a, b) => b.dunningDays - a.dunningDays);

export default function BillingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dunning' | 'mrr'>('dunning');

  return (
    <div>
      <div className="v6-page-head">
        <h1>Billing</h1>
        <div className="v6-page-sub">MRR trends, churn, and dunning queue</div>
      </div>

      <div className="v6-mini-metric-grid" style={{ marginBottom: 20 }}>
        <div className="v6-mini-metric"><label>MRR</label><b className="num">Rs 5.81M</b></div>
        <div className="v6-mini-metric"><label>Net MRR growth</label><b className="num" style={{ color: 'var(--v6-accent-light)' }}>+6.8%</b></div>
        <div className="v6-mini-metric"><label>Churn (30d)</label><b className="num" style={{ color: 'var(--v6-warning)' }}>2.4%</b></div>
        <div className="v6-mini-metric"><label>Past due</label><b className="num" style={{ color: 'var(--v6-destructive)' }}>{dunning.length}</b></div>
        <div className="v6-mini-metric"><label>Failed revenue</label><b className="num">Rs {dunning.reduce((s, t) => s + t.mrr, 0).toLocaleString('en-US')}</b></div>
      </div>

      <div className="v6-detail-tabs" style={{ marginBottom: 16 }}>
        <button className={`v6-detail-tab${activeTab === 'dunning' ? ' active' : ''}`} onClick={() => setActiveTab('dunning')}>Dunning queue</button>
        <button className={`v6-detail-tab${activeTab === 'mrr' ? ' active' : ''}`} onClick={() => setActiveTab('mrr')}>MRR breakdown</button>
      </div>

      {activeTab === 'dunning' && (
        <div className="v6-zone">
          <div className="v6-zone-head">
            <span className="v6-zone-title">Dunning queue</span>
            <span className="v6-zone-sub">{dunning.length} past-due accounts — sorted by overdue duration</span>
          </div>
          <div className="v6-card v6-track-scroll">
            <table className="v6-tenant-table">
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Plan</th>
                  <th>MRR</th>
                  <th>Days overdue</th>
                  <th>Health</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dunning.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--v6-text-3)' }}>No past-due accounts</td></tr>
                ) : (
                  dunning.map(t => (
                    <tr key={t.id} className="v6-tenant-row" onClick={() => router.push(`/tenants/${t.id}`)}>
                      <td>
                        <div className="v6-t-name">{t.name}</div>
                        <div className="v6-t-sub">{t.owner} · {t.city}</div>
                      </td>
                      <td>{t.plan}</td>
                      <td className="num">Rs {t.mrr.toLocaleString('en-US')}</td>
                      <td className="num">
                        <span style={{
                          color: t.dunningDays >= 14 ? 'var(--v6-destructive)' : t.dunningDays >= 7 ? 'var(--v6-warning)' : 'var(--v6-text-2)'
                        }}>{t.dunningDays}d</span>
                      </td>
                      <td>
                        <span className={`v6-health-pip`}>
                          <span className={`v6-health-dot ${t.band}`} />
                          {t.health}
                        </span>
                      </td>
                      <td>
                        <span className="v6-btn-sm" style={{ cursor: 'default', fontSize: 11 }}>
                          {t.dunningDays >= 21 ? 'Suspend' : t.dunningDays >= 14 ? '2nd notice' : '1st notice'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'mrr' && (
        <div className="v6-zone">
          <div className="v6-zone-head"><span className="v6-zone-title">MRR by plan</span></div>
          <div className="v6-card" style={{ padding: '16px 20px' }}>
            {[
              { plan: 'Pro', count: TENANTS.filter(t => t.plan === 'Pro').length, mrr: TENANTS.filter(t => t.plan === 'Pro').reduce((s, t) => s + t.mrr, 0) },
              { plan: 'Growth', count: TENANTS.filter(t => t.plan === 'Growth').length, mrr: TENANTS.filter(t => t.plan === 'Growth').reduce((s, t) => s + t.mrr, 0) },
              { plan: 'Starter', count: TENANTS.filter(t => t.plan === 'Starter').length, mrr: TENANTS.filter(t => t.plan === 'Starter').reduce((s, t) => s + t.mrr, 0) },
            ].map(row => {
              const total = TENANTS.reduce((s, t) => s + t.mrr, 0);
              const pct = Math.round(row.mrr / total * 100);
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
      )}
    </div>
  );
}
