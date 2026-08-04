'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TENANTS } from '@/lib/data';
import type { Tenant, HealthBand } from '@/lib/types';
import { useApp } from '@/lib/context';

type SortKey = 'name' | 'plan' | 'mrr' | 'status' | 'health' | 'orders30d';
type FilterBand = 'all' | HealthBand;
const FILTER_CHIPS: { key: FilterBand; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'healthy', label: 'Healthy' },
  { key: 'watch', label: 'Watch' },
  { key: 'atrisk', label: 'At risk' },
  { key: 'critical', label: 'Critical' },
];
const PAGE_SIZES = [25, 50, 100];

function SkeletonRows({ n }: { n: number }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <tr key={i} className="v6-skeleton-row">
          <td><div className="v6-skeleton-cell" style={{ width: 16, height: 16, borderRadius: 5 }} /></td>
          {[70, 50, 40, 60, 30, 35].map((w, j) => (
            <td key={j}><div className="v6-skeleton-cell" style={{ width: `${w}%` }} /></td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function TenantsPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterBand>('all');
  const [sortKey, setSortKey] = useState<SortKey>('mrr');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    let list = TENANTS.filter(t => filter === 'all' || t.band === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.owner.toLowerCase().includes(q) || t.phone.includes(q));
    }
    list = [...list].sort((a, b) => {
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return list;
  }, [search, filter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function handleSort(key: SortKey) {
    setLoading(true);
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
    setPage(1);
    setTimeout(() => setLoading(false), 220);
  }

  function handleFilter(f: FilterBand) {
    setFilter(f);
    setPage(1);
    setLoading(true);
    setTimeout(() => setLoading(false), 220);
  }

  function handleSearch(q: string) {
    setSearch(q);
    setPage(1);
  }

  const toggleSelect = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  function togglePageAll() {
    const ids = pageItems.map(t => t.id);
    const allSelected = ids.every(id => selected.has(id));
    setSelected(prev => {
      const next = new Set(prev);
      ids.forEach(id => allSelected ? next.delete(id) : next.add(id));
      return next;
    });
  }

  function SortArrow({ k }: { k: SortKey }) {
    const active = sortKey === k;
    return <span className={`v6-sort-arrow${active ? ' active' : ''}${active && sortDir === 'desc' ? ' desc' : ''}`}>▾</span>;
  }

  function StatusPill({ status }: { status: Tenant['status'] }) {
    const cls = status === 'active' ? 'active' : status === 'trial' ? 'trial' : 'past_due';
    const label = status === 'past_due' ? 'Past due' : status.charAt(0).toUpperCase() + status.slice(1);
    return <span className={`v6-status-pill ${cls}`}>{label}</span>;
  }

  function HealthPip({ t }: { t: Tenant }) {
    return (
      <span className="v6-health-pip">
        <span className={`v6-health-dot ${t.band}`} />
        {t.health}
      </span>
    );
  }

  // Pagination pages array
  const pages: (number | '…')[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - safePage) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }

  return (
    <div>
      <div className="v6-page-head">
        <h1>Tenants</h1>
        <div className="v6-page-sub">Search, filter, and drill into any tenant account</div>
      </div>

      <div className="v6-zone">
        {/* Controls */}
        <div className="v6-table-controls">
          <div className="v6-search-box">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <input placeholder="Search by name, phone, email…" value={search} onChange={e => handleSearch(e.target.value)} />
          </div>
          {FILTER_CHIPS.map(chip => (
            <button key={chip.key} className={`v6-filter-chip${filter === chip.key ? ' active' : ''}`} onClick={() => handleFilter(chip.key)}>
              {chip.label}
            </button>
          ))}
        </div>

        <div className="v6-tenant-meta">{filtered.length === TENANTS.length ? `${TENANTS.length} tenants` : `Showing ${filtered.length} of ${TENANTS.length} tenants`}</div>

        {/* Table */}
        <div className="v6-card v6-track-scroll">
          <table className="v6-tenant-table">
            <thead>
              <tr>
                <th className="v6-th-select">
                  <span
                    className={`v6-select-checkbox${pageItems.every(t => selected.has(t.id)) && pageItems.length > 0 ? ' checked' : ''}`}
                    onClick={togglePageAll}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="var(--v6-accent-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </th>
                {(['name','plan','mrr','status','health','orders30d'] as SortKey[]).map(k => (
                  <th key={k} className="v6-sortable" onClick={() => handleSort(k)}>
                    {k === 'name' ? 'Tenant' : k === 'mrr' ? 'MRR' : k === 'orders30d' ? 'Orders (30d)' : k.charAt(0).toUpperCase() + k.slice(1)}
                    <SortArrow k={k} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows n={Math.min(pageSize, 8)} />
              ) : pageItems.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--v6-text-3)' }}>No tenants match this search or filter</td></tr>
              ) : (
                pageItems.map(t => (
                  <tr key={t.id} className="v6-tenant-row" onClick={() => router.push(`/tenants/${t.id}`)}>
                    <td className="v6-td-select">
                      <span
                        className={`v6-select-checkbox${selected.has(t.id) ? ' checked' : ''}`}
                        onClick={e => toggleSelect(t.id, e)}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5L8.5 2" stroke="var(--v6-accent-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </td>
                    <td>
                      <div className="v6-t-name">{t.name}</div>
                      <div className="v6-t-sub">{t.owner} · {t.city}</div>
                    </td>
                    <td>{t.plan}</td>
                    <td className="num">Rs {t.mrr.toLocaleString('en-US')}</td>
                    <td><StatusPill status={t.status} /></td>
                    <td><HealthPip t={t} /></td>
                    <td className="num">{t.orders30d}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="v6-pagination-bar">
          <div className="v6-pagination-info">
            {filtered.length === 0 ? 'No results' : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, filtered.length)} of ${filtered.length}`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <select className="v6-page-size-select" value={pageSize} onChange={e => { setPageSize(+e.target.value); setPage(1); }}>
              {PAGE_SIZES.map(s => <option key={s} value={s}>{s} / page</option>)}
            </select>
            <div className="v6-pagination-controls">
              <button className="v6-page-btn" disabled={safePage === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {pages.map((p, i) =>
                p === '…'
                  ? <span key={i} className="v6-page-btn" style={{ cursor: 'default', border: 'none', background: 'none' }}>…</span>
                  : <button key={p} className={`v6-page-btn${safePage === p ? ' active' : ''}`} onClick={() => setPage(p as number)}>{p}</button>
              )}
              <button className="v6-page-btn" disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          </div>
        </div>

        {/* Bulk bar */}
        {selected.size > 0 && (
          <div className="v6-bulk-bar">
            <strong>{selected.size} selected</strong>
            <button className="v6-bulk-clear" onClick={() => setSelected(new Set())}>Clear</button>
            <div className="v6-bulk-actions">
              <button className="v6-btn-sm" onClick={() => showToast(`Extended trial for ${selected.size} tenants`)}>Extend trial</button>
              <button className="v6-btn-sm" onClick={() => showToast(`Tagged ${selected.size} tenants`)}>Tag cohort</button>
              <button className="v6-btn-sm" onClick={() => showToast(`Exporting ${selected.size} tenants to CSV…`)}>Export CSV</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
