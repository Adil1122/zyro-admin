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
    <div className="v6-modal-overlay show" onClick={e => e.target === e.currentTarget && closeReasonModal()}>
      <div className="v6-modal-card">
        <h3>{reasonModal.title}</h3>
        <p>{reasonModal.sub}</p>
        <div className="v6-modal-field">
          <label>Reason (required)</label>
          <textarea
            ref={inputRef}
            rows={3}
            placeholder="e.g. Customer requested via support ticket"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        </div>
        <div className="v6-modal-actions">
          <button className="v6-btn-sm" onClick={closeReasonModal}>Cancel</button>
          <button className="v6-btn-sm v6-btn-impersonate" onClick={() => confirmReasonModal(reason)}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
