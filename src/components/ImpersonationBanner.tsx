'use client';
import React from 'react';
import { useApp } from '@/lib/context';

export default function ImpersonationBanner() {
  const { impersonating, impersonatedName, impersonationCountdown, endImpersonation } = useApp();
  if (!impersonating) return null;
  return (
    <div className="v6-impersonate-banner" id="impersonateBanner">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l7.5 4v7l-7.5 4-7.5-4v-7z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="2.5" stroke="#fff" strokeWidth="1.6"/>
      </svg>
      <span>Viewing as <strong>{impersonatedName}</strong> — logged in as <strong>Anes Khan</strong></span>
      <span className="v6-imp-countdown">ends in <strong className="num">{impersonationCountdown}</strong></span>
      <button className="v6-imp-end" onClick={endImpersonation}>End session</button>
    </div>
  );
}
