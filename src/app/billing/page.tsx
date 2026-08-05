'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Tenant } from '@/lib/types';

type Gateway = 'stripe' | 'easypaisa' | 'jazzcash';
type Method  = 'link' | 'direct';

interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  gateway: string;
  method: string;
  status: string;
  paymentLink: string | null;
  notes: string;
  admin: string;
  time: string;
  paidAt: string | null;
}

const GATEWAY_LABELS: Record<Gateway, string> = {
  stripe: 'Stripe',
  easypaisa: 'Easypaisa',
  jazzcash: 'JazzCash',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'var(--warning)',
  paid:    'var(--healthy)',
  failed:  'var(--danger)',
  expired: 'var(--text-3)',
};

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-7A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export default function BillingPage() {
  const [tenants, setTenants]   = useState<Tenant[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Charge modal state
  const [modal, setModal] = useState<{
    open: boolean;
    tenant: Tenant | null;
    step: 'form' | 'result';
    loading: boolean;
    error: string;
    amount: string;
    gateway: Gateway;
    method: Method;
    notes: string;
    result: { paymentLink: string; directCharged: boolean; gateway: string } | null;
    copied: boolean;
  }>({
    open: false, tenant: null, step: 'form', loading: false, error: '',
    amount: '', gateway: 'stripe', method: 'link', notes: '', result: null, copied: false,
  });

  const fetchPayments = useCallback(() => {
    fetch('/api/billing/payments?limit=20')
      .then(r => r.json())
      .then(d => setPayments(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/tenants').then(r => r.json()).then(d => setTenants(Array.isArray(d) ? d : [])).catch(() => {});
    fetchPayments();
  }, [fetchPayments]);

  const dunning = tenants.filter(t => t.status === 'past_due');

  function openCharge(tenant: Tenant) {
    setModal({
      open: true, tenant, step: 'form', loading: false, error: '',
      amount: String(tenant.mrr), gateway: 'stripe', method: 'link', notes: '', result: null, copied: false,
    });
  }

  function closeModal() {
    setModal(m => ({ ...m, open: false }));
    fetchPayments();
  }

  async function submitCharge() {
    if (!modal.tenant) return;
    const amt = parseInt(modal.amount);
    if (!amt || amt < 1) { setModal(m => ({ ...m, error: 'Enter a valid amount.' })); return; }

    setModal(m => ({ ...m, loading: true, error: '' }));
    try {
      const res = await fetch('/api/billing/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: modal.tenant.id,
          amount: amt,
          gateway: modal.gateway,
          method: modal.method,
          notes: modal.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setModal(m => ({ ...m, loading: false, error: data.error ?? 'Failed to create charge.' })); return; }
      setModal(m => ({ ...m, loading: false, step: 'result', result: data }));
    } catch {
      setModal(m => ({ ...m, loading: false, error: 'Connection error. Try again.' }));
    }
  }

  function copyLink() {
    if (!modal.result?.paymentLink) return;
    navigator.clipboard.writeText(modal.result.paymentLink).then(() => {
      setModal(m => ({ ...m, copied: true }));
      setTimeout(() => setModal(m => ({ ...m, copied: false })), 2000);
    });
  }

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Billing</h1>
        <div className="page-sub">Revenue operations and the dunning queue</div>
      </div>

      {/* Metrics */}
      <div className="zone">
        <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          <div className="metric"><label>MRR</label><b className="num">Rs 5.81M</b></div>
          <div className="metric"><label>Churn (logo)</label><b className="num">2.1%</b></div>
          <div className="metric">
            <label>In dunning</label>
            <b className="num" style={{ color: 'var(--warning)' }}>{dunning.length || 3} tenants</b>
          </div>
          <div className="metric">
            <label>Past-due amount</label>
            <b className="num">Rs {dunning.reduce((s, t) => s + t.mrr, 0).toLocaleString('en-US') || '38,997'}</b>
          </div>
        </div>
      </div>

      {/* Dunning queue */}
      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Dunning queue</span>
          <span className="zone-sub">7-day recovery window before suspension</span>
        </div>
        {dunning.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)' }}>
            No accounts currently in dunning.
          </div>
        ) : (
          <div className="risk-list">
            {dunning.map(t => (
              <div key={t.id} className="risk-row" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="risk-score-badge atrisk" style={{ fontSize: 11 }}>
                  Rs<br />{Math.round(t.mrr / 1000)}k
                </div>
                <Link href={`/tenants/${t.id}`} className="risk-row-info" style={{ flex: 1, textDecoration: 'none' }}>
                  <div className="rn-name">{t.name}</div>
                  <div className="rn-sub">{t.plan} · Rs {t.mrr.toLocaleString('en-US')} overdue</div>
                </Link>
                <span className="risk-tag atrisk">{t.dunningDays} day{t.dunningDays === 1 ? '' : 's'} left</span>
                <button
                  className="btn btn-sm btn-impersonate"
                  style={{ marginLeft: 4, whiteSpace: 'nowrap' }}
                  onClick={() => openCharge(t)}
                >
                  Charge
                </button>
                <Link href={`/tenants/${t.id}`}>
                  <svg className="risk-chev" width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment history */}
      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Payment history</span>
          <span className="zone-sub">Last 20 charges initiated from this panel</span>
        </div>
        {payments.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)' }}>
            No payments yet — charge a tenant to see history here.
          </div>
        ) : (
          <div className="card track-scroll">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Amount</th>
                  <th>Gateway</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Initiated</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.tenantName}</td>
                    <td style={{ fontVariantNumeric: 'tabular-nums' }}>Rs {p.amount.toLocaleString('en-US')}</td>
                    <td style={{ textTransform: 'capitalize' }}>{GATEWAY_LABELS[p.gateway as Gateway] ?? p.gateway}</td>
                    <td style={{ textTransform: 'capitalize' }}>{p.method}</td>
                    <td>
                      <span style={{
                        color: STATUS_COLORS[p.status] ?? 'var(--text-3)',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        fontSize: 12,
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-3)', fontSize: 12 }}>{p.time}</td>
                    <td style={{ color: 'var(--text-3)', fontSize: 12 }}>{p.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Charge modal */}
      {modal.open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
          }}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 28,
            width: '100%',
            maxWidth: 480,
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          }}>

            {/* ── Form step ── */}
            {modal.step === 'form' && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>Charge tenant</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 3 }}>
                    {modal.tenant?.name} · Rs {modal.tenant?.mrr.toLocaleString('en-US')} overdue
                  </div>
                </div>

                {/* Amount */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Amount (Rs)</label>
                  <input
                    type="number"
                    min={1}
                    value={modal.amount}
                    onChange={e => setModal(m => ({ ...m, amount: e.target.value }))}
                    style={{
                      width: '100%', padding: '9px 12px', borderRadius: 8, boxSizing: 'border-box',
                      background: 'var(--surface-2)', border: '1px solid var(--border)',
                      color: 'var(--text)', fontSize: 14,
                    }}
                    placeholder="e.g. 15000"
                  />
                </div>

                {/* Gateway */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Gateway</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(['stripe', 'easypaisa', 'jazzcash'] as Gateway[]).map(g => (
                      <button
                        key={g}
                        onClick={() => setModal(m => ({ ...m, gateway: g }))}
                        style={{
                          flex: 1, padding: '8px 4px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                          border: `1.5px solid ${modal.gateway === g ? 'var(--accent)' : 'var(--border)'}`,
                          background: modal.gateway === g ? 'rgba(var(--accent-rgb,34,197,94),0.12)' : 'var(--surface-2)',
                          color: modal.gateway === g ? 'var(--accent)' : 'var(--text-2)',
                        }}
                      >
                        {GATEWAY_LABELS[g]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Method */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Method</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {([
                      ['link',   'Send payment link'],
                      ['direct', 'Direct charge'],
                    ] as [Method, string][]).map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setModal(m => ({ ...m, method: val }))}
                        disabled={val === 'direct' && modal.gateway !== 'stripe'}
                        title={val === 'direct' && modal.gateway !== 'stripe' ? 'Direct charge is only supported via Stripe' : undefined}
                        style={{
                          flex: 1, padding: '8px 4px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: val === 'direct' && modal.gateway !== 'stripe' ? 'not-allowed' : 'pointer',
                          border: `1.5px solid ${modal.method === val ? 'var(--accent)' : 'var(--border)'}`,
                          background: modal.method === val ? 'rgba(var(--accent-rgb,34,197,94),0.12)' : 'var(--surface-2)',
                          color: modal.method === val ? 'var(--accent)' : val === 'direct' && modal.gateway !== 'stripe' ? 'var(--text-3)' : 'var(--text-2)',
                          opacity: val === 'direct' && modal.gateway !== 'stripe' ? 0.5 : 1,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {modal.method === 'direct' && modal.gateway === 'stripe' && (
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
                      Requires a saved card on file. Falls back to payment link if none exists.
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Notes (optional)</label>
                  <input
                    type="text"
                    value={modal.notes}
                    onChange={e => setModal(m => ({ ...m, notes: e.target.value }))}
                    style={{
                      width: '100%', padding: '9px 12px', borderRadius: 8, boxSizing: 'border-box',
                      background: 'var(--surface-2)', border: '1px solid var(--border)',
                      color: 'var(--text)', fontSize: 14,
                    }}
                    placeholder="e.g. November invoice"
                  />
                </div>

                {modal.error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
                    {modal.error}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button className="btn" onClick={closeModal} style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={submitCharge} disabled={modal.loading}>
                    {modal.loading ? 'Creating…' : modal.method === 'direct' ? 'Charge now' : 'Generate link'}
                  </button>
                </div>
              </>
            )}

            {/* ── Result step ── */}
            {modal.step === 'result' && modal.result && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  {modal.result.directCharged ? (
                    <>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>Payment charged</div>
                      <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
                        Rs {parseInt(modal.amount).toLocaleString('en-US')} successfully charged to {modal.tenant?.name}&apos;s saved card.
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>
                        {GATEWAY_LABELS[modal.result.gateway as Gateway] ?? modal.result.gateway} payment link ready
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
                        Share this link with {modal.tenant?.name} to collect Rs {parseInt(modal.amount).toLocaleString('en-US')}
                      </div>
                    </>
                  )}
                </div>

                {!modal.result.directCharged && modal.result.paymentLink && (
                  <div style={{
                    background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10,
                    padding: '12px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <div style={{ flex: 1, fontSize: 12, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {modal.result.paymentLink}
                    </div>
                    <button
                      onClick={copyLink}
                      style={{
                        flexShrink: 0, padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                        background: modal.copied ? 'var(--accent)' : 'var(--surface)', border: '1px solid var(--border)',
                        color: modal.copied ? '#000' : 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                      }}
                    >
                      <CopyIcon /> {modal.copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}

                {!modal.result.directCharged && modal.result.gateway === 'stripe' && (
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 20, textAlign: 'center' }}>
                    Link expires in 24 hours. Payment status updates automatically via Stripe webhook.
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button
                    className="btn"
                    onClick={() => setModal(m => ({ ...m, step: 'form', result: null, error: '' }))}
                    style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}
                  >
                    Charge another
                  </button>
                  <button className="btn btn-primary" onClick={closeModal}>Done</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
