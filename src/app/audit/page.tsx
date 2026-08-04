'use client';
import React, { useState, useMemo } from 'react';
import { FULL_AUDIT_LOG } from '@/lib/data';

const TYPE_CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'impersonation', label: 'Impersonation' },
  { key: 'pii', label: 'PII access' },
  { key: 'billing', label: 'Billing' },
  { key: 'account', label: 'Account' },
];

const AUDIT_ICON: Record<string, string> = {
  impersonation: '👁',
  pii: '🔒',
  billing: '💳',
  account: '🚩',
};

export default function AuditPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(() => {
    return FULL_AUDIT_LOG.filter(a => {
      const matchType = typeFilter === 'all' || a.type === typeFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || a.admin.toLowerCase().includes(q) || a.tenant.toLowerCase().includes(q) || a.action.toLowerCase().includes(q);
      return matchType && matchSearch;
    });
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
        <div className="v6-tenant-meta" style={{ marginBottom: 8 }}>
          {filtered.length === FULL_AUDIT_LOG.length
            ? `${FULL_AUDIT_LOG.length} entries`
            : `${filtered.length} of ${FULL_AUDIT_LOG.length} entries`}
        </div>

        <div className="v6-card" style={{ padding: '6px 0' }}>
          {filtered.length === 0 ? (
            <p style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>No entries match this filter</p>
          ) : (
            filtered.map((a, i) => (
              <div key={i} className="v6-audit-row v6-audit-row-full">
                <span className="v6-audit-ic">{AUDIT_ICON[a.type] ?? '•'}</span>
                <div className="v6-audit-body">
                  <div className="v6-audit-text">
                    <strong>{a.admin}</strong> <span style={{ color: 'var(--v6-text-3)' }}>→</span> {a.action} — <strong>{a.tenant}</strong>
                  </div>
                  {a.reason && <div className="v6-audit-reason">"{a.reason}"</div>}
                </div>
                <div className="v6-audit-right">
                  <span className={`v6-audit-type-chip ${a.type}`}>{TYPE_CHIPS.find(c => c.key === a.type)?.label ?? a.type}</span>
                  <span className="v6-audit-time">{a.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
