'use client';
import React from 'react';
import { useApp } from '@/lib/context';

export default function ImpersonationBanner() {
  const { impersonating, impersonatedName, impersonationCountdown, endImpersonation } = useApp();

  return (
    <div id="impersonateBanner" className={impersonating ? 'show' : ''}>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l7.5 4v7l-7.5 4-7.5-4v-7z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="2.5" stroke="#fff" strokeWidth="1.6"/>
      </svg>
      <span>Viewing as <b>{impersonatedName}</b> — logged in as <b>Anes Khan</b></span>
      <span className="countdown">ends in <b>{impersonationCountdown}</b></span>
      <button className="end-btn" onClick={endImpersonation}>End session</button>
    </div>
  );
}
