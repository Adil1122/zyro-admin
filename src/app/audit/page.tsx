'use client';
import React, { useState, useMemo } from 'react';
import { FULL_AUDIT_LOG } from '@/lib/data';

const TYPE_CHIPS = [
  { label: 'All', value: 'all' },
  { label: 'Impersonation', value: 'impersonation' },
  { label: 'Billing', value: 'billing' },
  { label: 'PII unmask', value: 'pii' },
  { label: 'Account changes', value: 'account' },
];

export default function AuditPage() {
  const [filterType, setFilterType] = useState('all');
  const [searchQ, setSearchQ] = useState('');

  const filtered = useMemo(() => {
    let list = FULL_AUDIT_LOG.filter(a => filterType === 'all' || a.type === filterType);
    if (searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(a => a.admin.toLowerCase().includes(q) || a.tenant.toLowerCase().includes(q) || a.action.toLowerCase().includes(q));
    }
    return list;
  }, [filterType, searchQ]);

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
          Showing {filtered.length} of {FULL_AUDIT_LOG.length} events
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
              {filtered.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24, color: 'var(--text-3)' }}>No matching events.</td></tr>
              ) : filtered.slice(0, 50).map((a, i) => (
                <tr key={i}>
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
