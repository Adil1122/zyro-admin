'use client';
import React, { useState } from 'react';
import { INITIAL_ANNOUNCEMENTS } from '@/lib/data';
import type { Announcement } from '@/lib/types';
import { useApp } from '@/lib/context';

type Audience = 'All tenants' | 'At-risk tenants' | 'Pro plan only';
const AUDIENCES: Audience[] = ['All tenants', 'At-risk tenants', 'Pro plan only'];

const AUD_ICON: Record<string, string> = {
  'All tenants': '📢',
  'At-risk tenants': '⚠️',
  'Pro plan only': '⭐',
};

export default function AnnouncementsPage() {
  const { showToast } = useApp();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<Audience>('All tenants');
  const [history, setHistory] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  const canPublish = title.trim().length > 0 && message.trim().length > 0;

  function handlePublish() {
    if (!canPublish) return;
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const timeStr = `${now.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][now.getMonth()]} · ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const sentTo = audience === 'All tenants' ? 742 : audience === 'Pro plan only' ? 183 : 47;
    const entry: Announcement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      audience,
      publishedAt: timeStr,
      sentTo,
    };
    setHistory(prev => [entry, ...prev]);
    setTitle('');
    setMessage('');
    showToast(`Announcement sent to ${sentTo} tenants`);
  }

  return (
    <div>
      <div className="v6-page-head">
        <h1>Announcements</h1>
        <div className="v6-page-sub">Push in-app notices to all or a subset of tenants</div>
      </div>

      <div className="v6-detail-grid">
        {/* Compose panel */}
        <div>
          <div className="v6-zone">
            <div className="v6-zone-head"><span className="v6-zone-title">Compose</span></div>
            <div className="v6-card" style={{ padding: '18px 20px' }}>
              <div className="v6-modal-field">
                <label>Title</label>
                <input
                  className="v6-ann-input"
                  placeholder="e.g. Eid update — new WhatsApp template live"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxLength={120}
                />
              </div>
              <div className="v6-modal-field" style={{ marginTop: 14 }}>
                <label>Message</label>
                <textarea
                  className="v6-ann-input"
                  style={{ minHeight: 120 }}
                  placeholder="Write a clear, actionable message for your merchants…"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              <div style={{ marginTop: 14 }}>
                <label style={{ fontSize: 12, color: 'var(--v6-text-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Audience</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {AUDIENCES.map(a => (
                    <button
                      key={a}
                      className={`v6-filter-chip${audience === a ? ' active' : ''}`}
                      onClick={() => setAudience(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="v6-btn-sm v6-btn-impersonate"
                  disabled={!canPublish}
                  onClick={handlePublish}
                  style={{ opacity: canPublish ? 1 : 0.45, cursor: canPublish ? 'pointer' : 'not-allowed' }}
                >
                  Publish announcement
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* History — audit-feed style */}
        <div>
          <div className="v6-zone">
            <div className="v6-zone-head"><span className="v6-zone-title">History</span><span className="v6-zone-sub">{history.length} sent</span></div>
            {history.length === 0 ? (
              <div className="v6-card" style={{ padding: 32, textAlign: 'center', color: 'var(--v6-text-3)' }}>
                No announcements yet
              </div>
            ) : (
              <div className="v6-audit-feed">
                {history.map(ann => (
                  <div key={ann.id} className="v6-audit-row">
                    <span className="v6-audit-ic">{AUD_ICON[ann.audience] ?? '📢'}</span>
                    <div className="v6-audit-text" style={{ flex: 1 }}>
                      <strong>{ann.title}</strong>
                      <span style={{ color: 'var(--v6-text-3)' }}> · {ann.audience} · {ann.sentTo} tenants</span>
                    </div>
                    <span className="v6-audit-time">{ann.publishedAt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
