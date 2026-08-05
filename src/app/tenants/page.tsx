'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import type { Tenant } from '@/lib/types';

type SortKey = 'name' | 'plan' | 'mrr' | 'status' | 'health' | 'orders30d';
type HealthFilter = 'all' | 'healthy' | 'watch' | 'atrisk' | 'critical';

const SKELETON_ROWS = Array.from({ length: 8 });

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton-cell" style={{ width: 16, height: 16, borderRadius: 5 }} /></td>
      <td><div className="skeleton-cell" style={{ width: '70%' }} /></td>
      <td><div className="skeleton-cell" style={{ width: '50%' }} /></td>
      <td><div className="skeleton-cell" style={{ width: '40%' }} /></td>
      <td><div className="skeleton-cell" style={{ width: '60%' }} /></td>
      <td><div className="skeleton-cell" style={{ width: '30%' }} /></td>
      <td><div className="skeleton-cell" style={{ width: '35%' }} /></td>
    </tr>
  );
}

export default function TenantsPage() {
  const [allTenants, setAllTenants] = useState<Tenant[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [healthFilter, setHealthFilter] = useState<HealthFilter>('all');
  const [searchQ, setSearchQ] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('mrr');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    fetch('/api/tenants')
      .then(r => r.json())
      .then(data => setAllTenants(Array.isArray(data) ? data : []))
      .finally(() => setInitialLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = allTenants.filter(t => healthFilter === 'all' || t.band === healthFilter);
    if (searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.owner.toLowerCase().includes(q) || t.phone.includes(q));
    }
    list = [...list].sort((a, b) => {
      let av: string | number = a[sortKey as keyof typeof a] as string | number;
      let bv: string | number = b[sortKey as keyof typeof b] as string | number;
      if (typeof av === 'string') { av = av.toLowerCase(); bv = (bv as string).toLowerCase(); }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [allTenants, healthFilter, searchQ, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
    setPage(1);
    setShowSkeleton(true);
    setTimeout(() => setShowSkeleton(false), 220);
  }

  function toggleSelect(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function toggleSelectAll() {
    const ids = pageItems.map(t => t.id);
    const allSel = ids.every(id => selected.has(id));
    setSelected(prev => { const n = new Set(prev); ids.forEach(id => allSel ? n.delete(id) : n.add(id)); return n; });
  }

  function sortTh(key: SortKey, label: string) {
    const active = sortKey === key;
    return (
      <th
        className={`sortable${active ? ' sort-active' : ''}${active && sortDir === 'desc' ? ' sort-desc' : ''}`}
        onClick={() => handleSort(key)}
      >
        {label}<span className="sort-arrow">▾</span>
      </th>
    );
  }

  const pages: (number | '…')[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - safePage) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Tenants</h1>
        <div className="page-sub">Search, filter, and drill into any tenant account</div>
      </div>

      <div className="zone">
        <div className="table-controls" style={{ marginBottom: 14 }}>
          <div className="search-box">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
            <input
              placeholder="Search by name, phone, email…"
              value={searchQ}
              onChange={e => { setSearchQ(e.target.value); setPage(1); setShowSkeleton(true); setTimeout(() => setShowSkeleton(false), 220); }}
            />
          </div>
          {(['all', 'healthy', 'watch', 'atrisk', 'critical'] as HealthFilter[]).map(f => (
            <button
              key={f}
              className={`filter-chip${healthFilter === f ? ' active' : ''}`}
              onClick={() => { setHealthFilter(f); setPage(1); setShowSkeleton(true); setTimeout(() => setShowSkeleton(false), 220); }}
            >
              {f === 'all' ? 'All' : f === 'atrisk' ? 'At risk' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 10 }}>
          {initialLoading ? 'Loading tenants…' : `Showing ${filtered.length} of ${allTenants.length} tenants`}
        </div>

        <div className="card track-scroll">
          <table className="tenant-table">
            <thead>
              <tr>
                <th className="th-select">
                  <span className="select-checkbox" onClick={toggleSelectAll}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="#04231a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </th>
                {sortTh('name', 'Tenant')}
                {sortTh('plan', 'Plan')}
                {sortTh('mrr', 'MRR')}
                {sortTh('status', 'Status')}
                {sortTh('health', 'Health')}
                {sortTh('orders30d', 'Orders (30d)')}
              </tr>
            </thead>
            <tbody>
              {(initialLoading || showSkeleton)
                ? SKELETON_ROWS.map((_, i) => <SkeletonRow key={i} />)
                : pageItems.length === 0
                ? <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--text-3)' }}>No tenants match this search or filter</td></tr>
                : pageItems.map(t => (
                  <tr key={t.id} className="tenant-row">
                    <td className="td-select">
                      <span
                        className={`select-checkbox${selected.has(t.id) ? ' checked' : ''}`}
                        onClick={e => toggleSelect(t.id, e)}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5L8.5 2" stroke="#04231a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </td>
                    <td>
                      <Link href={`/tenants/${t.id}`}>
                        <div className="t-name">{t.name}</div>
                        <div className="t-sub">{t.owner} · {t.city}</div>
                      </Link>
                    </td>
                    <td><Link href={`/tenants/${t.id}`}>{t.plan}</Link></td>
                    <td className="num"><Link href={`/tenants/${t.id}`}>Rs {t.mrr.toLocaleString('en-US')}</Link></td>
                    <td>
                      <Link href={`/tenants/${t.id}`}>
                        <span className={`status-pill ${t.status}`}>
                          {t.status === 'past_due' ? 'Past due' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/tenants/${t.id}`}>
                        <span className="health-pip">
                          <span className={`health-dot ${t.band}`} />
                          {t.health}
                        </span>
                      </Link>
                    </td>
                    <td className="num"><Link href={`/tenants/${t.id}`}>{t.orders30d}</Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="pagination-bar">
          <div className="pagination-info">
            {filtered.length === 0 ? 'No results' : `Showing ${start + 1}–${Math.min(safePage * pageSize, filtered.length)} of ${filtered.length}`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <select
              className="page-size-select"
              value={pageSize}
              onChange={e => { setPageSize(parseInt(e.target.value)); setPage(1); }}
            >
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>
            <div className="pagination-controls">
              <button className="page-btn" disabled={safePage === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {pages.map((p, i) =>
                p === '…'
                  ? <span key={i} className="page-btn" style={{ cursor: 'default', border: 'none', background: 'none' }}>…</span>
                  : <button key={p} className={`page-btn${p === safePage ? ' active' : ''}`} onClick={() => setPage(p as number)}>{p}</button>
              )}
              <button className="page-btn" disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          </div>
        </div>

        {selected.size > 0 && (
          <div className="bulk-bar show">
            <b>{selected.size} selected</b>
            <button className="bulk-clear" onClick={() => setSelected(new Set())}>Clear</button>
            <div className="bulk-actions">
              <button className="btn-sm" onClick={() => {}}>Extend trial</button>
              <button className="btn-sm" onClick={() => {}}>Tag cohort</button>
              <button className="btn-sm" onClick={() => {}}>Export CSV</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
