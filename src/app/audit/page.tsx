'use client';
import React, { useState, useEffect, useCallback } from 'react';

const TYPE_CHIPS = [
  { label: 'All', value: 'all' },
  { label: 'Impersonation', value: 'impersonation' },
  { label: 'Billing', value: 'billing' },
  { label: 'PII unmask', value: 'pii' },
  { label: 'Account changes', value: 'account' },
];

interface AuditRow {
  id: string;
  admin: string;
  action: string;
  tenant: string;
  type: string;
  reason: string;
  time: string;
}

export default function AuditPage() {
  const [filterType, setFilterType] = useState('all');
  const [searchQ, setSearchQ] = useState('');
  const [entries, setEntries] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (filterType !== 'all') params.set('type', filterType);
    if (searchQ) params.set('search', searchQ);
    fetch(`/api/audit?${params}`)
      .then(r => r.json())
      .then(data => setEntries(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [filterType, searchQ]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Audit Log</h1>
        <div className="page-sub">Every admin action — append-only, never edited or deleted</div>
      </div>

      <div className="zone">
        <div className="table-controls" style={{ marginBottom: 14 }}>
          <div className="search-box">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <input
              placeholder="Search by admin, tenant, or action…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
          </div>
          {TYPE_CHIPS.map(c => (
            <button
              key={c.value}
              className={`filter-chip${filterType === c.value ? ' active' : ''}`}
              onClick={() => setFilterType(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 10 }}>
          {loading ? 'Loading…' : `Showing ${entries.length} events`}
        </div>

        <div className="card track-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Admin</th>
                <th>Action</th>
                <th>Tenant</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24, color: 'var(--text-3)' }}>Loading…</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24, color: 'var(--text-3)' }}>No matching events.</td></tr>
              ) : entries.map(a => (
                <tr key={a.id}>
                  <td className="num" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{a.time}</td>
                  <td style={{ fontWeight: 700 }}>{a.admin}</td>
                  <td>{a.action}</td>
                  <td>{a.tenant}</td>
                  <td style={{ color: 'var(--text-3)' }}>{a.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
