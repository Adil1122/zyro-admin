'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/context';

export default function ReasonModal() {
  const { reasonModal, closeReasonModal, confirmReasonModal } = useApp();
  const [reason, setReason] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (reasonModal.open) {
      setReason('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [reasonModal.open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeReasonModal(); };
    if (reasonModal.open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [reasonModal.open, closeReasonModal]);

  if (!reasonModal.open) return null;

  return (
    <div className="modal-overlay show" onClick={e => e.target === e.currentTarget && closeReasonModal()}>
      <div className="modal-card">
        <div className="modal-icon">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 6v5M10 14v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
        </div>
        <h3>{reasonModal.title}</h3>
        <p>{reasonModal.sub}</p>
        <div className="modal-field">
          <label>Reason (required)</label>
          <textarea
            ref={inputRef}
            rows={3}
            placeholder="e.g. Customer requested via support ticket"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="btn-sm" onClick={closeReasonModal}>Cancel</button>
          <button className="btn-sm btn-impersonate" onClick={() => confirmReasonModal(reason)}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
