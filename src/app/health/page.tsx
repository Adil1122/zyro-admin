'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { TENANTS, seededRand } from '@/lib/data';

const ALL_COURIERS = ['TCS','Leopards','PostEx','Trax','M&P','BlueEX','FedEx','Daewoo','Rider','SLG Trax','tranzo','BarqRaftar','Call Courier','DoDeliver'];
const QUEUES: [string, number, string, number][] = [
  ['order-processing', 12, '340/min', 0],
  ['whatsapp-outbound', 340, '1.2k/min', 2],
  ['courier-booking', 8, '95/min', 0],
  ['ai-scoring', 4, '210/min', 0],
  ['notification-dispatch', 56, '480/min', 1],
  ['fbr-invoice-export', 2, '30/min', 0],
  ['health-score-batch', 0, 'idle', 0],
  ['webhook-delivery', 91, '150/min', 5],
];

export default function HealthPage() {
  const courierHealth = useMemo(() => {
    const rand = seededRand('courier-health-v1');
    return ALL_COURIERS.map(name => {
      const r = rand();
      const status = r > 0.93 ? 'down' : r > 0.8 ? 'degraded' : 'healthy';
      const successRate = status === 'down' ? Math.floor(r * 20) : status === 'degraded' ? 70 + Math.floor(r * 15) : 95 + Math.floor(r * 5);
      return {
        name, status,
        successRate,
        latency: Math.floor(rand() * 400) + 120,
        affectedTenants: status === 'healthy' ? 0 : Math.floor(rand() * 30) + 3,
      };
    });
  }, []);

  const atRiskWa = TENANTS.filter(t => t.health < 65 && t.deepDive.messagesSent > 400).slice(0, 6);

  function statusPill(status: string) {
    if (status === 'healthy') return <span className="mini-pill scale">Healthy</span>;
    if (status === 'degraded') return <span className="mini-pill monitor">Degraded</span>;
    return <span className="mini-pill review">Down</span>;
  }

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Platform Health</h1>
        <div className="page-sub">Shared infrastructure — affects every tenant using it, not just one</div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Courier API status</span>
          <span className="zone-sub">Live, all 14 integrations</span>
        </div>
        <div className="card track-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Courier</th>
                <th>Status</th>
                <th>Success rate (1h)</th>
                <th>Avg latency</th>
                <th>Affected tenants</th>
              </tr>
            </thead>
            <tbody>
              {courierHealth.map(c => (
                <tr key={c.name}>
                  <td style={{ fontWeight: 700 }}>{c.name}</td>
                  <td>{statusPill(c.status)}</td>
                  <td className="num">{c.successRate}%</td>
                  <td className="num">{c.latency}ms</td>
                  <td className="num">{c.affectedTenants > 0 ? c.affectedTenants : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">WhatsApp number quality — at risk</span>
          <span className="zone-sub">Approaching Meta suspension risk, before it happens</span>
        </div>
        <div className="risk-list">
          {atRiskWa.length === 0 ? (
            <div className="risk-row" style={{ cursor: 'default' }}>
              <div className="risk-row-info"><div className="rn-sub">No numbers currently at risk.</div></div>
            </div>
          ) : atRiskWa.map(t => {
            const quality = Math.max(20, Math.min(65, t.health - 15));
            return (
              <Link key={t.id} href={`/tenants/${t.id}`} className="risk-row">
                <div className="risk-score-badge atrisk">{quality}</div>
                <div className="risk-row-info">
                  <div className="rn-name">{t.name}</div>
                  <div className="rn-sub">Quality score dropping · {t.deepDive.messagesSent.toLocaleString('en-US')} messages/30d</div>
                </div>
                <span className="risk-tag atrisk">Watch</span>
                <svg className="risk-chev" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Background job queues</span>
          <span className="zone-sub">Order processing, notifications, sync jobs</span>
        </div>
        <div className="card track-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Queue</th>
                <th>Depth</th>
                <th>Processing rate</th>
                <th>Failed (24h)</th>
              </tr>
            </thead>
            <tbody>
              {QUEUES.map(([name, depth, rate, failed]) => (
                <tr key={name}>
                  <td style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: 11.5 }}>{name}</td>
                  <td className="num">{depth}</td>
                  <td className="num">{rate}</td>
                  <td className="num" style={{ color: failed > 0 ? 'var(--warning)' : 'var(--text-3)' }}>{failed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
