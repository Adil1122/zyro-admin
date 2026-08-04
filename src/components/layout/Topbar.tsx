'use client';
import React from 'react';
import { useApp } from '@/lib/context';

interface Props { onHamburger: () => void; onCmdK: () => void; }

export default function Topbar({ onHamburger, onCmdK }: Props) {
  const { logout } = useApp();
  return (
    <div className="topbar">
      <button className="hamburger-btn" onClick={onHamburger} aria-label="Open menu">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="env-pill"><span className="env-dot" />Production</div>
      <button className="topbar-search" onClick={onCmdK}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.6"/>
        </svg>
        <span style={{ color: 'var(--text-3)', flex: 1, textAlign: 'left' }}>
          Search tenants, or jump anywhere…
        </span>
        <span className="cmdk-hint">⌘K</span>
      </button>
      <button className="signout-btn" onClick={logout}>Sign out</button>
    </div>
  );
}
