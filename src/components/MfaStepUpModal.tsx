'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/context';

export default function MfaStepUpModal() {
  const { mfaStepUp, closeMfaStepUp, confirmMfaStepUp, showToast } = useApp();
  const [code, setCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mfaStepUp.open) { setCode(''); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [mfaStepUp.open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMfaStepUp(); };
    if (mfaStepUp.open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mfaStepUp.open, closeMfaStepUp]);

  function handleVerify() {
    if (code.trim().length !== 6) { showToast('Enter the 6-digit code'); return; }
    confirmMfaStepUp();
  }

  if (!mfaStepUp.open) return null;

  return (
    <div className="v6-modal-overlay show" onClick={e => e.target === e.currentTarget && closeMfaStepUp()}>
      <div className="v6-modal-card">
        <div className="v6-modal-icon">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M6 9V6a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
        </div>
        <h3>Re-enter your MFA code</h3>
        <p>{mfaStepUp.reason}</p>
        <div className="v6-modal-field">
          <label>6-digit code</label>
          <input
            ref={inputRef}
            type="text"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            onKeyDown={e => e.key === 'Enter' && handleVerify()}
          />
        </div>
        <div className="v6-modal-actions">
          <button className="v6-btn-sm" onClick={closeMfaStepUp}>Cancel</button>
          <button className="v6-btn-sm v6-btn-impersonate" onClick={handleVerify}>Verify</button>
        </div>
      </div>
    </div>
  );
}
