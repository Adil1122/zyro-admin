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

  // WA watch list: health < 65 AND messagesSent > 400
  const waWatchList = TENANTS
    .filter(t => t.health < 65 && t.deepDive.messagesSent > 400)
    .map(t => ({ ...t, qualityScore: Math.max(20, Math.min(65, t.health - 15)) }))
    .sort((a, b) => a.qualityScore - b.qualityScore)
    .slice(0, 10);

  const operationalCount = COURIER_HEALTH.filter(c => c.status === 'operational').length;
  const stalledCount = JOB_QUEUES.filter(q => q.status === 'stalled').length;

  return (
    <div>
      <div className="v6-page-head">
        <h1>Platform Health</h1>
        <div className="v6-page-sub">API integrations, message quality, and job queues</div>
      </div>

      <div className="v6-mini-metric-grid" style={{ marginBottom: 24 }}>
        <div className="v6-mini-metric"><label>Courier APIs operational</label><b className="num" style={{ color: operationalCount === COURIER_HEALTH.length ? 'var(--v6-accent-light)' : 'var(--v6-warning)' }}>{operationalCount}/{COURIER_HEALTH.length}</b></div>
        <div className="v6-mini-metric"><label>WA watch list</label><b className="num" style={{ color: waWatchList.length > 0 ? 'var(--v6-warning)' : 'var(--v6-accent-light)' }}>{waWatchList.length}</b></div>
        <div className="v6-mini-metric"><label>Stalled queues</label><b className="num" style={{ color: stalledCount > 0 ? 'var(--v6-destructive)' : 'var(--v6-accent-light)' }}>{stalledCount}</b></div>
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
            <span className="v6-zone-sub">Stores with health &lt;65 and &gt;400 messages sent — at risk of Meta review</span>
          </div>
          <div className="v6-card v6-track-scroll">
            {waWatchList.length === 0 ? (
              <p style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>No stores currently in the watch list.</p>
            ) : (
              <table className="v6-tenant-table">
                <thead>
                  <tr><th>Tenant</th><th>Quality score</th><th>Messages sent (30d)</th><th>AI cost (30d)</th></tr>
                </thead>
                <tbody>
                  {waWatchList.map(t => (
                    <tr key={t.id} className="v6-tenant-row" onClick={() => router.push(`/tenants/${t.id}`)}>
                      <td>
                        <div className="v6-t-name">{t.name}</div>
                        <div className="v6-t-sub">{t.owner}</div>
                      </td>
                      <td className="num" style={{ color: 'var(--v6-destructive)', fontWeight: 700 }}>{t.qualityScore}</td>
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
          <div className="v6-card v6-track-scroll">
            <table className="v6-compare-table">
              <thead>
                <tr>
                  <th>Queue</th>
                  <th>Depth (pending)</th>
                  <th>Processing rate</th>
                  <th>Failed (24h)</th>
                </tr>
              </thead>
              <tbody>
                {JOB_QUEUES.map(q => (
                  <tr key={q.name}>
                    <td style={{ fontFamily: 'monospace', fontSize: 11.5, fontWeight: 700 }}>{q.name}</td>
                    <td className="num">{q.pending.toLocaleString('en-US')}</td>
                    <td className="num">{q.processing.toLocaleString('en-US')}/min</td>
                    <td className="num" style={{ color: q.failed > 0 ? 'var(--v6-warning)' : 'var(--v6-text-3)' }}>
                      {q.failed > 0 ? q.failed : '—'}
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
