'use client';
import React from 'react';
import { useApp } from '@/lib/context';

interface Props { onHamburger: () => void; onCmdK: () => void; }

export default function Topbar({ onHamburger, onCmdK }: Props) {
  const { logout } = useApp();
  return (
    <header className="v6-topbar">
      <button className="v6-hamburger" onClick={onHamburger} aria-label="Open menu">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="v6-env-pill"><span className="v6-env-dot" />Production</div>
      <button className="v6-topbar-search" onClick={onCmdK}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6"/>
        </svg>
        <span style={{ color: 'var(--v6-text-3)', flex: 1, textAlign: 'left' }}>
          Search tenants, or jump anywhere…
        </span>
        <span className="v6-cmdk-hint">⌘K</span>
      </button>
      <button className="v6-signout-btn" onClick={logout}>Sign out</button>
    </header>
  );
}
