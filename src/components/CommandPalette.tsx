'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TENANTS } from '@/lib/data';
import type { Tenant } from '@/lib/types';

const NAV_ITEMS = [
  { label: 'Overview', path: '/' },
  { label: 'Tenants', path: '/tenants' },
  { label: 'Billing', path: '/billing' },
  { label: 'Discover', path: '/discover' },
  { label: 'Platform Health', path: '/health' },
  { label: 'Risk & Compliance', path: '/risk' },
  { label: 'Feature Flags', path: '/flags' },
  { label: 'Audit Log', path: '/audit' },
  { label: 'Announcements', path: '/announcements' },
];

type CmdItem =
  | { type: 'nav'; label: string; path: string }
  | { type: 'tenant'; tenant: Tenant };

interface Props { open: boolean; onClose: () => void; }

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();

  const items: CmdItem[] = (() => {
    const q = query.trim().toLowerCase();
    const navMatches = q
      ? NAV_ITEMS.filter(n => n.label.toLowerCase().includes(q))
      : NAV_ITEMS;
    const tenantMatches = q
      ? TENANTS.filter(t => t.name.toLowerCase().includes(q) || t.owner.toLowerCase().includes(q) || t.phone.includes(q)).slice(0, 8)
      : [];
    return [
      ...navMatches.map(n => ({ type: 'nav' as const, ...n })),
      ...tenantMatches.map(t => ({ type: 'tenant' as const, tenant: t })),
    ];
  })();

  useEffect(() => { setActiveIdx(0); }, [query]);
  useEffect(() => { if (open) { setQuery(''); setActiveIdx(0); } }, [open]);

  const select = useCallback((item: CmdItem) => {
    onClose();
    if (item.type === 'nav') router.push(item.path);
    else router.push(`/tenants/${item.tenant.id}`);
  }, [onClose, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(items.length - 1, i + 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(0, i - 1)); }
      if (e.key === 'Enter') { e.preventDefault(); if (items[activeIdx]) select(items[activeIdx]); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, items, activeIdx, select, onClose]);

  if (!open) return null;

  const navItems = items.filter(i => i.type === 'nav') as { type: 'nav'; label: string; path: string }[];
  const tenantItems = items.filter(i => i.type === 'tenant') as { type: 'tenant'; tenant: Tenant }[];
  let idx = 0;

  return (
    <div className="cmdk-overlay show" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cmdk-box">
        <div className="cmdk-input-row">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          <input
            autoFocus
            placeholder="Search tenants, or jump to a section…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="cmdk-hint">esc</span>
        </div>
        <div className="cmdk-results">
          {items.length === 0 && <div className="cmdk-empty">No matches for &ldquo;{query}&rdquo;</div>}
          {navItems.length > 0 && (
            <>
              <div className="cmdk-section-label">Go to</div>
              {navItems.map(item => {
                const i = idx++;
                return (
                  <button key={item.path} className={`cmdk-item${i === activeIdx ? ' active' : ''}`}
                    onMouseEnter={() => setActiveIdx(i)} onClick={() => select(item)}>
                    <span className="ic">→</span>
                    {item.label}
                  </button>
                );
              })}
            </>
          )}
          {tenantItems.length > 0 && (
            <>
              <div className="cmdk-section-label">Tenants</div>
              {tenantItems.map(item => {
                const i = idx++;
                return (
                  <button key={item.tenant.id} className={`cmdk-item${i === activeIdx ? ' active' : ''}`}
                    onMouseEnter={() => setActiveIdx(i)} onClick={() => select(item)}>
                    <span className="ic">{item.tenant.initials}</span>
                    {item.tenant.name}
                    <span className="sub">{item.tenant.plan} · health {item.tenant.health}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
