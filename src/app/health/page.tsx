'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { COURIER_HEALTH, JOB_QUEUES, TENANTS } from '@/lib/data';

const STATUS_CLASS: Record<string, string> = {
  operational: 'scale',
  degraded: 'monitor',
  down: 'review',
};
const STATUS_LABEL: Record<string, string> = {
  operational: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
};

export default function HealthPage() {
  const router = useRouter();

  const waWatchList = TENANTS
    .filter(t => t.health < 65 && t.deepDive.messagesSent > 400)
    .map(t => ({ ...t, qualityScore: Math.max(20, Math.min(65, t.health - 15)) }))
    .sort((a, b) => a.qualityScore - b.qualityScore)
    .slice(0, 10);

  return (
    <div>
      <div className="v6-page-head">
        <h1>Platform Health</h1>
        <div className="v6-page-sub">API integrations, message quality, and job queues</div>
      </div>

      {/* Courier APIs */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Courier API status</span>
          <span className="v6-zone-sub">All {COURIER_HEALTH.length} couriers</span>
        </div>
        <div className="v6-card v6-track-scroll">
          <table className="v6-tenant-table">
            <thead>
              <tr>
                <th>Courier</th>
                <th>Status</th>
                <th>Success rate (7d)</th>
                <th>P95 latency</th>
                <th>Affected tenants</th>
              </tr>
            </thead>
            <tbody>
              {COURIER_HEALTH.map(c => (
                <tr key={c.name} className="v6-tenant-row" style={{ cursor: 'default' }}>
                  <td style={{ fontWeight: 700 }}>{c.name}</td>
                  <td>
                    <span className={`v6-mini-pill ${STATUS_CLASS[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="num" style={{ color: c.successRate >= 95 ? 'var(--v6-accent-light)' : c.successRate >= 80 ? 'var(--v6-warning)' : 'var(--v6-destructive)' }}>
                    {c.successRate}%
                  </td>
                  <td className="num" style={{ color: c.latencyMs > 2000 ? 'var(--v6-destructive)' : c.latencyMs > 800 ? 'var(--v6-warning)' : 'var(--v6-text-2)' }}>
                    {c.latencyMs}ms
                  </td>
                  <td className="num">{c.affectedTenants > 0 ? c.affectedTenants : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WhatsApp quality — risk-list style */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">WhatsApp quality watch list</span>
          <span className="v6-zone-sub">Stores with health &lt;65 and &gt;400 messages sent — at risk of Meta review</span>
        </div>
        {waWatchList.length === 0 ? (
          <div className="v6-card" style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>
            No stores currently in the watch list.
          </div>
        ) : (
          <div className="v6-risk-list">
            {waWatchList.map(t => (
              <div
                key={t.id}
                className="v6-risk-row"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/tenants/${t.id}`)}
              >
                <div className="v6-risk-score-badge atrisk">{t.qualityScore}</div>
                <div className="v6-risk-row-info">
                  <div className="v6-rn-name">{t.name}</div>
                  <div className="v6-rn-sub">Quality score dropping · {t.deepDive.messagesSent.toLocaleString('en-US')} messages/30d</div>
                </div>
                <span className="v6-risk-tag atrisk">Watch</span>
                <svg className="v6-risk-chev" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job queues */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Job queues</span>
        </div>
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
    </div>
  );
}
