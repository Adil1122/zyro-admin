'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COURIER_HEALTH, JOB_QUEUES, TENANTS } from '@/lib/data';

const STATUS_COLORS: Record<string, string> = {
  operational: 'var(--v6-accent-light)',
  degraded: 'var(--v6-warning)',
  down: 'var(--v6-destructive)',
};

export default function HealthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'couriers' | 'whatsapp' | 'queues'>('couriers');

  // Tenants whose opt-in rate is < 30% (WhatsApp watch list)
  const waWatchList = TENANTS
    .filter(t => t.deepDive.messagesSent > 0 && t.deepDive.optInRate < 30)
    .sort((a, b) => a.deepDive.optInRate - b.deepDive.optInRate)
    .slice(0, 8);

  const operationalCount = COURIER_HEALTH.filter(c => c.status === 'operational').length;

  return (
    <div>
      <div className="v6-page-head">
        <h1>Platform Health</h1>
        <div className="v6-page-sub">API integrations, message quality, and job queues</div>
      </div>

      <div className="v6-mini-metric-grid" style={{ marginBottom: 20 }}>
        <div className="v6-mini-metric"><label>Courier APIs operational</label><b className="num" style={{ color: operationalCount === COURIER_HEALTH.length ? 'var(--v6-accent-light)' : 'var(--v6-warning)' }}>{operationalCount}/{COURIER_HEALTH.length}</b></div>
        <div className="v6-mini-metric"><label>WA watch list</label><b className="num" style={{ color: waWatchList.length > 0 ? 'var(--v6-warning)' : 'var(--v6-accent-light)' }}>{waWatchList.length}</b></div>
        <div className="v6-mini-metric"><label>Stalled queues</label><b className="num" style={{ color: JOB_QUEUES.filter(q => q.status === 'stalled').length > 0 ? 'var(--v6-destructive)' : 'var(--v6-accent-light)' }}>{JOB_QUEUES.filter(q => q.status === 'stalled').length}</b></div>
        <div className="v6-mini-metric"><label>Jobs processing</label><b className="num">{JOB_QUEUES.reduce((s, q) => s + q.processing, 0).toLocaleString('en-US')}</b></div>
      </div>

      <div className="v6-detail-tabs" style={{ marginBottom: 16 }}>
        <button className={`v6-detail-tab${tab === 'couriers' ? ' active' : ''}`} onClick={() => setTab('couriers')}>Courier APIs</button>
        <button className={`v6-detail-tab${tab === 'whatsapp' ? ' active' : ''}`} onClick={() => setTab('whatsapp')}>WhatsApp quality</button>
        <button className={`v6-detail-tab${tab === 'queues' ? ' active' : ''}`} onClick={() => setTab('queues')}>Job queues</button>
      </div>

      {tab === 'couriers' && (
        <div className="v6-zone">
          <div className="v6-zone-head"><span className="v6-zone-title">Courier API status</span><span className="v6-zone-sub">All 14 couriers</span></div>
          <div className="v6-card v6-track-scroll">
            <table className="v6-tenant-table">
              <thead>
                <tr><th>Courier</th><th>Status</th><th>Success rate (7d)</th><th>P95 latency</th><th>Affected tenants</th></tr>
              </thead>
              <tbody>
                {COURIER_HEALTH.map(c => (
                  <tr key={c.name} className="v6-tenant-row" style={{ cursor: 'default' }}>
                    <td style={{ fontWeight: 700 }}>{c.name}</td>
                    <td>
                      <span style={{ color: STATUS_COLORS[c.status], fontWeight: 600, textTransform: 'capitalize' }}>
                        ● {c.status}
                      </span>
                    </td>
                    <td className="num" style={{ color: c.successRate >= 95 ? 'var(--v6-accent-light)' : c.successRate >= 80 ? 'var(--v6-warning)' : 'var(--v6-destructive)' }}>
                      {c.successRate}%
                    </td>
                    <td className="num" style={{ color: c.latencyMs > 2000 ? 'var(--v6-destructive)' : c.latencyMs > 800 ? 'var(--v6-warning)' : 'var(--v6-text-2)' }}>
                      {c.latencyMs}ms
                    </td>
                    <td className="num">{c.affectedTenants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'whatsapp' && (
        <div className="v6-zone">
          <div className="v6-zone-head">
            <span className="v6-zone-title">WhatsApp quality watch list</span>
            <span className="v6-zone-sub">Stores with opt-in rate below 30% — at risk of Meta account review</span>
          </div>
          <div className="v6-card v6-track-scroll">
            {waWatchList.length === 0 ? (
              <p style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>All active stores are above the 30% opt-in threshold.</p>
            ) : (
              <table className="v6-tenant-table">
                <thead>
                  <tr><th>Tenant</th><th>Opt-in rate</th><th>Messages sent (30d)</th><th>AI cost (30d)</th></tr>
                </thead>
                <tbody>
                  {waWatchList.map(t => (
                    <tr key={t.id} className="v6-tenant-row" onClick={() => router.push(`/tenants/${t.id}`)}>
                      <td>
                        <div className="v6-t-name">{t.name}</div>
                        <div className="v6-t-sub">{t.owner}</div>
                      </td>
                      <td className="num" style={{ color: 'var(--v6-destructive)', fontWeight: 700 }}>{t.deepDive.optInRate}%</td>
                      <td className="num">{t.deepDive.messagesSent.toLocaleString('en-US')}</td>
                      <td className="num">Rs {t.deepDive.aiCost.toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {tab === 'queues' && (
        <div className="v6-zone">
          <div className="v6-zone-head"><span className="v6-zone-title">Job queues</span></div>
          <div className="v6-card" style={{ padding: '16px 20px' }}>
            {JOB_QUEUES.map(q => (
              <div key={q.name} className="v6-product-row">
                <div className="v6-product-info">
                  <div className="v6-p-name">{q.name}</div>
                  <div className="v6-p-sub">{q.processing} processing · {q.pending} pending · {q.failed} failed</div>
                </div>
                <span className={`v6-mini-pill ${q.status === 'healthy' ? 'scale' : q.status === 'stalled' ? 'review' : 'monitor'}`} style={{ textTransform: 'capitalize' }}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
