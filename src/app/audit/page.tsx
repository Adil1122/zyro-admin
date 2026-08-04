'use client';
import React, { useState, useMemo } from 'react';
import { FULL_AUDIT_LOG } from '@/lib/data';

const TYPE_CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'impersonation', label: 'Impersonation' },
  { key: 'pii', label: 'PII unmask' },
  { key: 'billing', label: 'Billing' },
  { key: 'account', label: 'Account changes' },
];

export default function AuditPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(() => {
    return FULL_AUDIT_LOG.filter(a => {
      const matchType = typeFilter === 'all' || a.type === typeFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || a.admin.toLowerCase().includes(q) || a.tenant.toLowerCase().includes(q) || a.action.toLowerCase().includes(q);
      return matchType && matchSearch;
    }).slice(0, 50);
  }, [search, typeFilter]);

  return (
    <div>
      <div className="v6-page-head">
        <h1>Audit Log</h1>
        <div className="v6-page-sub">All admin actions — immutable, append-only</div>
      </div>

      <div className="v6-zone">
        <div className="v6-table-controls">
          <div className="v6-search-box">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <input
              placeholder="Search by admin, tenant, or action…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {TYPE_CHIPS.map(chip => (
            <button
              key={chip.key}
              className={`v6-filter-chip${typeFilter === chip.key ? ' active' : ''}`}
              onClick={() => setTypeFilter(chip.key)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <div className="v6-tenant-meta" style={{ marginBottom: 10 }}>
          {filtered.length === Math.min(FULL_AUDIT_LOG.length, 50)
            ? `${filtered.length} entries`
            : `${filtered.length} of ${FULL_AUDIT_LOG.length} matching`}
        </div>

        <div className="v6-card v6-track-scroll">
          {filtered.length === 0 ? (
            <p style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>No entries match this filter</p>
          ) : (
            <table className="v6-compare-table">
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
                {filtered.map((a, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--v6-text-3)', whiteSpace: 'nowrap', fontSize: 12 }}>{a.time}</td>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{a.admin}</td>
                    <td>
                      <span className={`v6-audit-type-chip ${a.type}`} style={{ marginRight: 8 }}>
                        {TYPE_CHIPS.find(c => c.key === a.type)?.label ?? a.type}
                      </span>
                      {a.action}
                    </td>
                    <td style={{ color: 'var(--v6-text-2)' }}>{a.tenant || '—'}</td>
                    <td style={{ color: 'var(--v6-text-3)', fontStyle: a.reason ? 'italic' : 'normal', fontSize: 12 }}>
                      {a.reason || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
