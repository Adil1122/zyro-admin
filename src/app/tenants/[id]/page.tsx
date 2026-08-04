'use client';
import React, { useState, use } from 'react';
import Link from 'next/link';
import { TENANTS, maskPhone } from '@/lib/data';
import { useApp } from '@/lib/context';

const TABS = ['overview', 'sales', 'marketing', 'whatsapp', 'inventory', 'couriers'] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = {
  overview: 'Overview', sales: 'Sales & Products', marketing: 'Marketing & Ads',
  whatsapp: 'WhatsApp', inventory: 'Inventory', couriers: 'Couriers',
};
const HEALTH_COLORS: Record<string, string> = {
  healthy: 'var(--v6-accent-light)', watch: 'var(--v6-meta-blue)',
  atrisk: 'var(--v6-warning)', critical: 'var(--v6-destructive)',
};

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { openReasonModal, openMfaStepUp, startImpersonation, showToast } = useApp();
  const [tab, setTab] = useState<Tab>('overview');
  const [phoneUnmasked, setPhoneUnmasked] = useState(false);
  const [emailUnmasked, setEmailUnmasked] = useState(false);

  const tenant = TENANTS.find(x => x.id === id);
  if (!tenant) return <div className="v6-page-head"><h1>Tenant not found</h1></div>;
  const t = tenant;

  const d = t.deepDive;
  const maxWa = Math.max(...d.waTemplates.map(w => w.count), 1);
  const maxShip = Math.max(...d.courierPerf.map(c => c.shipments), 1);
  const aov = d.orders30d > 0 ? Math.round(d.salesTotal / d.orders30d) : 0;

  function handleImpersonate() {
    openMfaStepUp(
      `Viewing as ${t.name} requires step-up verification, even within an active session.`,
      () => startImpersonation(t),
    );
  }

  function requireReason(title: string, sub: string, msg: string) {
    openReasonModal(title, sub, () => showToast(msg));
  }

  return (
    <div>
      <Link href="/tenants" className="v6-back-link">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M10 3.5L5 8l5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to tenants
      </Link>

      {/* Header */}
      <div className="v6-detail-head">
        <div className="v6-detail-head-left">
          <div className="v6-detail-avatar">{t.initials}</div>
          <div>
            <div className="v6-detail-name">{t.name}</div>
            <div className="v6-detail-meta">{t.plan} plan · {t.city} · Signed up {t.signedUp}</div>
          </div>
        </div>
        <div className="v6-detail-actions">
          <button className="v6-btn-sm" onClick={() => requireReason('Extend trial', `Extending ${t.name}'s trial. This is logged to the admin audit trail with your name and the reason below.`, `Trial extended for ${t.name}`)}>Extend trial</button>
          <button className="v6-btn-sm" onClick={() => requireReason('Issue credit', `Issuing a credit to ${t.name}. This is logged to the admin audit trail.`, `Credit issued to ${t.name}`)}>Issue credit</button>
          <button className="v6-btn-sm v6-btn-impersonate" onClick={handleImpersonate}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5l7.5 4v7l-7.5 4-7.5-4v-7z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            View as merchant
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="v6-detail-tabs">
        {TABS.map(tb => (
          <button key={tb} className={`v6-detail-tab${tab === tb ? ' active' : ''}`} onClick={() => setTab(tb)}>
            {TAB_LABELS[tb]}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === 'overview' && (
        <div className="v6-detail-grid">
          <div>
            <div className="v6-zone">
              <div className="v6-zone-head"><span className="v6-zone-title">Account</span></div>
              <div className="v6-card" style={{ padding: '16px 20px' }}>
                <div className="v6-field-row"><label>Owner</label><div className="v6-val">{t.owner}</div></div>
                <div className="v6-field-row">
                  <label>Phone</label>
                  <div className="v6-val">
                    <span>{phoneUnmasked ? t.phone : maskPhone(t.phone)}</span>
                    <button className="v6-unmask-btn" onClick={() => { setPhoneUnmasked(v => !v); if (!phoneUnmasked) showToast('Phone unmasked — logged to audit trail'); }}>
                      {phoneUnmasked ? 'Mask' : 'Unmask'}
                    </button>
                  </div>
                </div>
                <div className="v6-field-row">
                  <label>Email</label>
                  <div className="v6-val">
                    <span>{emailUnmasked ? t.email : '[REDACTED]'}</span>
                    <button className="v6-unmask-btn" onClick={() => { setEmailUnmasked(v => !v); if (!emailUnmasked) showToast('Email unmasked — logged to audit trail'); }}>
                      {emailUnmasked ? 'Mask' : 'Unmask'}
                    </button>
                  </div>
                </div>
                <div className="v6-field-row">
                  <label>Subscription status</label>
                  <div className="v6-val"><span className={`v6-status-pill ${t.status}`}>{t.status === 'past_due' ? 'Past due' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span></div>
                </div>
              </div>
            </div>

            <div className="v6-zone">
              <div className="v6-zone-head"><span className="v6-zone-title">Usage this cycle</span></div>
              <div className="v6-card" style={{ padding: '16px 20px' }}>
                {[
                  { label: 'Orders', val: '1,247', max: '1,500', pct: 83, warn: false },
                  { label: 'WhatsApp messages', val: '3,420', max: '5,000', pct: 68, warn: false },
                  { label: 'AI calls', val: '892', max: '1,000', pct: 89, warn: true },
                ].map(({ label, val, max, pct, warn }) => (
                  <div key={label} className="v6-usage-bar-row">
                    <div className="v6-usage-bar-top"><label>{label}</label><b>{val} / {max}</b></div>
                    <div className="v6-usage-bar"><span className={warn ? 'warn' : ''} style={{ width: `${pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="v6-zone">
              <div className="v6-zone-head"><span className="v6-zone-title">Connected integrations</span></div>
              <div className="v6-card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {t.integrations.map(i => <span key={i} className="v6-status-pill" style={{ background: 'var(--v6-card-2)', color: 'var(--v6-text-2)' }}>{i}</span>)}
              </div>
            </div>
          </div>

          <div>
            <div className="v6-zone">
              <div className="v6-zone-head">
                <span className="v6-zone-title">Health score</span>
                <span className="v6-zone-sub num" style={{ color: HEALTH_COLORS[t.band] }}>{t.health}</span>
              </div>
              <div className="v6-card" style={{ padding: '16px 20px' }}>
                <div className="v6-health-breakdown">
                  {t.breakdown.map(([label, weight, pct]) => (
                    <div key={label} className="v6-hb-row">
                      <span className="v6-hb-label">{label}</span>
                      <div className="v6-hb-bar">
                        <span style={{ width: `${pct}%`, background: pct >= 70 ? 'var(--v6-accent)' : pct >= 40 ? 'var(--v6-warning)' : 'var(--v6-destructive)' }} />
                      </div>
                      <span className="v6-hb-weight">{weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="v6-zone">
              <div className="v6-zone-head"><span className="v6-zone-title">Manual actions</span></div>
              <div className="v6-card" style={{ padding: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button className="v6-btn-sm" style={{ width: '100%', textAlign: 'left' }} onClick={() => requireReason('Suspend account', `Suspending ${t.name} — they will lose access immediately.`, `${t.name} suspended`)}>Suspend account</button>
                  <button className="v6-btn-sm v6-btn-danger-outline" style={{ width: '100%', textAlign: 'left' }} onClick={() => requireReason('Start deletion flow', `Starts the 90-day soft-delete window for ${t.name}, per the tenant deletion policy.`, `Deletion flow started for ${t.name}`)}>Start deletion flow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales & Products tab */}
      {tab === 'sales' && (
        <div>
          <div className="v6-mini-metric-grid" style={{ marginBottom: 18 }}>
            <div className="v6-mini-metric"><label>Revenue (30d)</label><b className="num">Rs {d.salesTotal.toLocaleString('en-US')}</b></div>
            <div className="v6-mini-metric"><label>Orders (30d)</label><b className="num">{d.orders30d}</b></div>
            <div className="v6-mini-metric"><label>Avg. order value</label><b className="num">Rs {aov.toLocaleString('en-US')}</b></div>
            <div className="v6-mini-metric"><label>Top product</label><b>{d.products[0]?.name ?? '—'}</b></div>
          </div>
          <div className="v6-zone">
            <div className="v6-zone-head"><span className="v6-zone-title">Top-selling products</span><span className="v6-zone-sub">Last 30 days</span></div>
            <div className="v6-card" style={{ padding: '16px 20px' }}>
              {d.products.map((p, i) => (
                <div key={p.name} className="v6-product-row">
                  <span className="v6-product-rank">{i + 1}</span>
                  <div className="v6-product-info"><div className="v6-p-name">{p.name}</div><div className="v6-p-sub">{p.unitsSold} units sold</div></div>
                  <span className="v6-product-revenue num">Rs {p.revenue.toLocaleString('en-US')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Marketing & Ads tab */}
      {tab === 'marketing' && (
        <div>
          <div className="v6-mini-metric-grid" style={{ marginBottom: 18 }}>
            <div className="v6-mini-metric"><label>Ad spend (30d)</label><b className="num">Rs {d.adSpend.toLocaleString('en-US')}</b></div>
            <div className="v6-mini-metric"><label>Blended ROAS</label><b className="num" style={{ color: 'var(--v6-accent-light)' }}>{d.blendedRoas}x</b></div>
            <div className="v6-mini-metric"><label>Active campaigns</label><b className="num">{d.campaigns.length}</b></div>
            <div className="v6-mini-metric"><label>Best performer</label><b>{d.campaigns[0] ? `${d.campaigns[0].roas}x` : '—'}</b></div>
          </div>
          <div className="v6-zone">
            <div className="v6-zone-head"><span className="v6-zone-title">Campaigns</span></div>
            <div className="v6-card" style={{ padding: '16px 20px' }}>
              {d.campaigns.map(c => (
                <div key={c.name} className="v6-product-row">
                  <div className="v6-product-info"><div className="v6-p-name">{c.name}</div><div className="v6-p-sub">Rs {c.spend.toLocaleString('en-US')} spent</div></div>
                  <span className={`v6-mini-pill ${c.status}`}>{c.status === 'scale' ? 'Scale' : c.status === 'monitor' ? 'Monitor' : 'Review'} · {c.roas}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp tab */}
      {tab === 'whatsapp' && (
        <div>
          <div className="v6-mini-metric-grid" style={{ marginBottom: 18 }}>
            <div className="v6-mini-metric"><label>Messages sent (30d)</label><b className="num">{d.messagesSent.toLocaleString('en-US')}</b></div>
            <div className="v6-mini-metric"><label>AI cost (30d)</label><b className="num">Rs {d.aiCost.toLocaleString('en-US')}</b></div>
            <div className="v6-mini-metric"><label>Opt-in rate</label><b className="num">{d.optInRate}%</b></div>
            <div className="v6-mini-metric"><label>Cost per message</label><b className="num">{d.messagesSent > 0 ? `Rs ${(d.aiCost / d.messagesSent).toFixed(2)}` : '—'}</b></div>
          </div>
          {d.messagesSent === 0 && <p style={{ color: 'var(--v6-text-3)', fontSize: 12.5, marginBottom: 16 }}>No WhatsApp activity yet this cycle.</p>}
          <div className="v6-zone">
            <div className="v6-zone-head"><span className="v6-zone-title">Message templates in use</span></div>
            <div className="v6-card" style={{ padding: '16px 20px' }}>
              {d.waTemplates.map(w => (
                <div key={w.name} className="v6-wa-template-row">
                  <span style={{ width: 170, flexShrink: 0 }}>{w.name}</span>
                  <div className="v6-wt-bar"><span style={{ width: `${(w.count / maxWa * 100).toFixed(0)}%` }} /></div>
                  <span className="v6-wt-count num">{w.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Inventory tab */}
      {tab === 'inventory' && (
        <div>
          <div className="v6-mini-metric-grid" style={{ marginBottom: 18 }}>
            <div className="v6-mini-metric"><label>Total SKUs</label><b className="num">{d.totalSkus}</b></div>
            <div className="v6-mini-metric"><label>Stock value</label><b className="num">Rs {d.stockValue.toLocaleString('en-US')}</b></div>
            <div className="v6-mini-metric"><label>Low stock items</label><b className="num" style={{ color: d.lowStock.length > 0 ? 'var(--v6-warning)' : 'var(--v6-accent-light)' }}>{d.lowStock.length}</b></div>
            <div className="v6-mini-metric"><label>Dead stock items</label><b className="num">{d.deadStockCount}</b></div>
          </div>
          <div className="v6-zone">
            <div className="v6-zone-head"><span className="v6-zone-title">Low stock</span><span className="v6-zone-sub">Below reorder point</span></div>
            <div className="v6-card" style={{ padding: '16px 20px' }}>
              {d.lowStock.length === 0
                ? <p style={{ color: 'var(--v6-text-3)', fontSize: 12.5 }}>Nothing below reorder point right now.</p>
                : d.lowStock.map(item => (
                  <div key={item.name} className="v6-product-row">
                    <div className="v6-product-info"><div className="v6-p-name">{item.name}</div><div className="v6-p-sub">Reorder point: {item.reorderPoint} units</div></div>
                    <span className="v6-mini-pill review">{item.current} left</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Couriers tab */}
      {tab === 'couriers' && (
        <div className="v6-zone">
          <div className="v6-zone-head"><span className="v6-zone-title">Courier performance for this store</span></div>
          <div className="v6-card v6-track-scroll" style={{ padding: '6px 8px' }}>
            {d.courierPerf.length === 0 ? (
              <p style={{ padding: 24, color: 'var(--v6-text-3)', textAlign: 'center' }}>Not enough shipment volume yet for courier performance data.</p>
            ) : (
              <table className="v6-compare-table">
                <thead><tr><th>Courier</th><th>Shipments (30d)</th><th>Success rate</th><th>RTO rate</th><th>Avg cost</th><th>Avg delivery</th></tr></thead>
                <tbody>
                  {d.courierPerf.map(c => (
                    <tr key={c.courier}>
                      <td style={{ fontWeight: 700 }}>{c.courier}</td>
                      <td className="num">
                        <div className="v6-compare-bar-cell">
                          <div className="v6-compare-bar-track"><span className="v6-compare-bar-fill" style={{ width: `${(c.shipments / maxShip * 100).toFixed(0)}%`, background: 'var(--v6-accent)' }} /></div>
                          {c.shipments}
                        </div>
                      </td>
                      <td className="num" style={{ color: c.successRate >= 90 ? 'var(--v6-accent-light)' : c.successRate >= 75 ? 'var(--v6-warning)' : 'var(--v6-destructive)' }}>{c.successRate}%</td>
                      <td className="num" style={{ color: c.rtoRate <= 5 ? 'var(--v6-accent-light)' : c.rtoRate <= 12 ? 'var(--v6-warning)' : 'var(--v6-destructive)' }}>{c.rtoRate}%</td>
                      <td className="num">Rs {c.avgCost}</td>
                      <td className="num">{c.avgDays} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
