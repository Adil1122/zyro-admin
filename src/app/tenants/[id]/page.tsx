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
  healthy: 'var(--accent)', watch: 'var(--meta-blue)',
  atrisk: 'var(--warning)', critical: 'var(--destructive)',
};

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { openReasonModal, openMfaStepUp, startImpersonation, showToast } = useApp();
  const [tab, setTab] = useState<Tab>('overview');
  const [phoneUnmasked, setPhoneUnmasked] = useState(false);
  const [emailUnmasked, setEmailUnmasked] = useState(false);

  const tenant = TENANTS.find(x => x.id === id);
  if (!tenant) return <div className="page-head"><h1>Tenant not found</h1></div>;
  const t = tenant;
  const d = t.deepDive;
  const maxWa = Math.max(...d.waTemplates.map(w => w.count), 1);
  const maxShip = Math.max(...d.courierPerf.map(c => c.shipments), 1);
  const aov = d.orders30d > 0 ? Math.round(d.salesTotal / d.orders30d) : 0;

  function requireReason(title: string, sub: string, msg: string) {
    openReasonModal(title, sub, () => showToast(msg));
  }

  function handleImpersonate() {
    openMfaStepUp(
      `Viewing as ${t.name} requires step-up verification, even within an active session.`,
      () => startImpersonation(t),
    );
  }

  return (
    <div className="page-anim">
      <Link href="/tenants" className="back-link">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M10 3.5L5 8l5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to tenants
      </Link>

      <div className="detail-head">
        <div className="detail-head-left">
          <div className="detail-avatar">{t.initials}</div>
          <div>
            <div className="detail-name">{t.name}</div>
            <div className="detail-meta">{t.plan} plan · {t.city} · Signed up {t.signedUp}</div>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn-sm" onClick={() => requireReason('Extend trial', `Extending ${t.name}'s trial. This is logged to the admin audit trail with your name and the reason below.`, `Trial extended for ${t.name}`)}>Extend trial</button>
          <button className="btn-sm" onClick={() => requireReason('Issue credit', `Issuing a credit to ${t.name}. This is logged to the admin audit trail.`, `Credit issued to ${t.name}`)}>Issue credit</button>
          <button className="btn-sm btn-impersonate" onClick={handleImpersonate}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5l7.5 4v7l-7.5 4-7.5-4v-7z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            View as merchant
          </button>
        </div>
      </div>

      <div className="detail-tabs">
        {TABS.map(tb => (
          <button key={tb} className={`detail-tab${tab === tb ? ' active' : ''}`} onClick={() => setTab(tb)}>
            {TAB_LABELS[tb]}
          </button>
        ))}
      </div>

      {/* Overview */}
      <div className={`detail-tab-panel${tab === 'overview' ? ' active' : ''}`} id="tab-overview">
        <div className="detail-grid">
          <div>
            <div className="zone">
              <div className="zone-head"><span className="zone-title">Account</span></div>
              <div className="card" style={{ padding: '16px 20px' }}>
                <div className="field-row"><label>Owner</label><div className="val">{t.owner}</div></div>
                <div className="field-row">
                  <label>Phone</label>
                  <div className="val">
                    <span>{phoneUnmasked ? t.phone : maskPhone(t.phone)}</span>
                    <button className="unmask-btn" onClick={() => { setPhoneUnmasked(v => !v); if (!phoneUnmasked) showToast('Phone unmasked — logged to audit trail'); }}>
                      {phoneUnmasked ? 'Mask' : 'Unmask'}
                    </button>
                  </div>
                </div>
                <div className="field-row">
                  <label>Email</label>
                  <div className="val">
                    <span>{emailUnmasked ? t.email : '[REDACTED]'}</span>
                    <button className="unmask-btn" onClick={() => { setEmailUnmasked(v => !v); if (!emailUnmasked) showToast('Email unmasked — logged to audit trail'); }}>
                      {emailUnmasked ? 'Mask' : 'Unmask'}
                    </button>
                  </div>
                </div>
                <div className="field-row">
                  <label>Status</label>
                  <div className="val">
                    <span className={`status-pill ${t.status}`}>{t.status === 'past_due' ? 'Past due' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span>
                  </div>
                </div>
                <div className="field-row"><label>MRR</label><div className="val num">Rs {t.mrr.toLocaleString('en-US')}</div></div>
              </div>
            </div>

            <div className="zone">
              <div className="zone-head"><span className="zone-title">Integrations</span></div>
              <div className="card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {t.integrations.map(i => <span key={i} className="status-pill active" style={{ background: 'var(--card-2)', color: 'var(--text-2)' }}>{i}</span>)}
              </div>
            </div>
          </div>

          <div>
            <div className="zone">
              <div className="zone-head">
                <span className="zone-title">Health score</span>
                <span className="zone-sub num" style={{ color: HEALTH_COLORS[t.band], fontWeight: 800, fontSize: 18 }}>{t.health}</span>
              </div>
              <div className="card" style={{ padding: '16px 20px' }}>
                <div className="health-breakdown">
                  {t.breakdown.map(([label, weight, pct]) => (
                    <div key={label} className="hb-row">
                      <span className="hb-label">{label}</span>
                      <div className="hb-bar">
                        <span style={{ width: `${pct}%`, background: pct >= 70 ? 'var(--accent)' : pct >= 40 ? 'var(--warning)' : 'var(--destructive)' }} />
                      </div>
                      <span className="hb-weight">{weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="zone">
              <div className="zone-head"><span className="zone-title">Manual actions</span></div>
              <div className="card" style={{ padding: 14 }}>
                <div className="manual-actions">
                  <button className="btn-sm" onClick={() => requireReason('Suspend account', `Suspending ${t.name} — they will lose access immediately. This is logged to the admin audit trail.`, `${t.name} suspended`)}>Suspend account</button>
                  <button className="btn-sm btn-danger-outline" onClick={() => requireReason('Start deletion flow', `Starts the 90-day soft-delete window for ${t.name}, per the tenant deletion policy — this does not delete anything immediately.`, `Deletion flow started for ${t.name}`)}>Start deletion flow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales & Products */}
      <div className={`detail-tab-panel${tab === 'sales' ? ' active' : ''}`} id="tab-sales">
        <div className="mini-metric-grid">
          <div className="mini-metric"><label>Revenue (30d)</label><b className="num">Rs {d.salesTotal.toLocaleString('en-US')}</b></div>
          <div className="mini-metric"><label>Orders (30d)</label><b className="num">{d.orders30d}</b></div>
          <div className="mini-metric"><label>Avg. order value</label><b className="num">Rs {aov.toLocaleString('en-US')}</b></div>
          <div className="mini-metric"><label>Top product</label><b>{d.products[0]?.name ?? '—'}</b></div>
        </div>
        <div className="zone">
          <div className="zone-head"><span className="zone-title">Top-selling products</span><span className="zone-sub">Last 30 days</span></div>
          <div className="card" style={{ padding: '16px 20px' }}>
            {d.products.map((p, i) => (
              <div key={p.name} className="product-row">
                <span className="product-rank">{i + 1}</span>
                <div className="product-info"><div className="p-name">{p.name}</div><div className="p-sub">{p.unitsSold} units sold</div></div>
                <span className="product-revenue num">Rs {p.revenue.toLocaleString('en-US')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing & Ads */}
      <div className={`detail-tab-panel${tab === 'marketing' ? ' active' : ''}`} id="tab-marketing">
        <div className="mini-metric-grid">
          <div className="mini-metric"><label>Ad spend (30d)</label><b className="num">Rs {d.adSpend.toLocaleString('en-US')}</b></div>
          <div className="mini-metric"><label>Blended ROAS</label><b className="num" style={{ color: 'var(--accent-light)' }}>{d.blendedRoas}x</b></div>
          <div className="mini-metric"><label>Active campaigns</label><b className="num">{d.campaigns.length}</b></div>
          <div className="mini-metric"><label>Best performer</label><b>{d.campaigns[0] ? `${d.campaigns[0].roas}x` : '—'}</b><span className="note">{d.campaigns[0]?.name ?? ''}</span></div>
        </div>
        <div className="zone">
          <div className="zone-head"><span className="zone-title">Campaigns</span></div>
          <div className="card" style={{ padding: '16px 20px' }}>
            {d.campaigns.map(c => (
              <div key={c.name} className="product-row">
                <div className="product-info"><div className="p-name">{c.name}</div><div className="p-sub">Rs {c.spend.toLocaleString('en-US')} spent</div></div>
                <span className={`mini-pill ${c.status}`}>{c.status === 'scale' ? 'Scale' : c.status === 'monitor' ? 'Monitor' : 'Review'} · {c.roas}x</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <div className={`detail-tab-panel${tab === 'whatsapp' ? ' active' : ''}`} id="tab-whatsapp">
        <div className="mini-metric-grid">
          <div className="mini-metric"><label>Messages sent (30d)</label><b className="num">{d.messagesSent.toLocaleString('en-US')}</b></div>
          <div className="mini-metric"><label>AI cost (30d)</label><b className="num">Rs {d.aiCost.toLocaleString('en-US')}</b></div>
          <div className="mini-metric"><label>Opt-in rate</label><b className="num">{d.optInRate}%</b></div>
          <div className="mini-metric"><label>Cost per message</label><b className="num">{d.messagesSent > 0 ? `Rs ${(d.aiCost / d.messagesSent).toFixed(2)}` : '—'}</b></div>
        </div>
        {d.messagesSent === 0 && (
          <div style={{ padding: '10px 16px', fontSize: 11.5, color: 'var(--text-3)', borderTop: '1px solid var(--border)' }}>No WhatsApp activity yet this cycle.</div>
        )}
        <div className="zone">
          <div className="zone-head"><span className="zone-title">Message templates in use</span></div>
          <div className="card" style={{ padding: '16px 20px' }}>
            {d.waTemplates.map(w => (
              <div key={w.name} className="whatsapp-template-row">
                <span style={{ width: 170, flexShrink: 0 }}>{w.name}</span>
                <div className="wt-bar"><span style={{ width: `${(w.count / maxWa * 100).toFixed(0)}%` }} /></div>
                <span className="wt-count num">{w.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className={`detail-tab-panel${tab === 'inventory' ? ' active' : ''}`} id="tab-inventory">
        <div className="mini-metric-grid">
          <div className="mini-metric"><label>Total SKUs</label><b className="num">{d.totalSkus}</b></div>
          <div className="mini-metric"><label>Stock value</label><b className="num">Rs {d.stockValue.toLocaleString('en-US')}</b></div>
          <div className="mini-metric"><label>Low stock items</label><b className="num" style={{ color: d.lowStock.length > 0 ? 'var(--warning)' : 'var(--accent-light)' }}>{d.lowStock.length}</b></div>
          <div className="mini-metric"><label>Dead stock items</label><b className="num">{d.deadStockCount}</b></div>
        </div>
        <div className="zone">
          <div className="zone-head"><span className="zone-title">Low stock items</span><span className="zone-sub">Below reorder point</span></div>
          <div className="card" style={{ padding: '16px 20px' }}>
            {d.lowStock.length === 0
              ? <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 12.5 }}>Nothing below reorder point right now.</div>
              : d.lowStock.map(item => (
                <div key={item.name} className="product-row">
                  <div className="product-info"><div className="p-name">{item.name}</div><div className="p-sub">Reorder point: {item.reorderPoint} units</div></div>
                  <span className="mini-pill review">{item.current} left</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Couriers */}
      <div className={`detail-tab-panel${tab === 'couriers' ? ' active' : ''}`} id="tab-couriers">
        <div className="zone">
          <div className="zone-head"><span className="zone-title">Courier performance</span><span className="zone-sub">Last 30 days for this store</span></div>
          <div className="card track-scroll">
            {d.courierPerf.length === 0
              ? <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-3)' }}>Not enough shipment volume yet for courier performance data.</div>
              : (
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Courier</th>
                      <th>Shipments (30d)</th>
                      <th>Success rate</th>
                      <th>RTO rate</th>
                      <th>Avg cost</th>
                      <th>Avg delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.courierPerf.map(c => (
                      <tr key={c.courier}>
                        <td style={{ fontWeight: 700 }}>{c.courier}</td>
                        <td className="num">
                          <div className="compare-bar-cell">
                            <div className="compare-bar-track">
                              <span className="compare-bar-fill" style={{ width: `${(c.shipments / maxShip * 100).toFixed(0)}%`, background: 'var(--accent)' }} />
                            </div>
                            {c.shipments}
                          </div>
                        </td>
                        <td className="num" style={{ color: c.successRate >= 90 ? 'var(--accent-light)' : c.successRate >= 75 ? 'var(--warning)' : 'var(--destructive)' }}>{c.successRate}%</td>
                        <td className="num" style={{ color: c.rtoRate <= 5 ? 'var(--accent-light)' : c.rtoRate <= 12 ? 'var(--warning)' : 'var(--destructive)' }}>{c.rtoRate}%</td>
                        <td className="num">Rs {c.avgCost}</td>
                        <td className="num">{c.avgDays} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
