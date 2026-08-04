'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/context';

const AUDIENCE_OPTIONS = ['All tenants', 'Pro plan only', 'Growth plan only', 'Trial users'];

const HISTORY_INITIAL = [
  { icon: '📢', text: 'Scheduled maintenance completed — all systems normal', audience: 'All tenants', time: '3 days ago' },
  { icon: '🎉', text: 'New: Multi-warehouse routing now available on Pro plan', audience: 'Pro plan only', time: '1 week ago' },
];

export default function AnnouncementsPage() {
  const { showToast } = useApp();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('All tenants');
  const [history, setHistory] = useState(HISTORY_INITIAL);

  function publish() {
    if (!title.trim() || !body.trim()) { showToast('Add a title and a message before publishing'); return; }
    setHistory(prev => [{ icon: '📢', text: title, audience, time: 'just now' }, ...prev]);
    setTitle('');
    setBody('');
    showToast(`Published to ${audience}`);
  }

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Announcements</h1>
        <div className="page-sub">Broadcast messages to tenants — in-app banners and email</div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">New announcement</span>
          <span className="zone-sub">Will be shown as an in-app banner to the selected audience</span>
        </div>
        <div className="card" style={{ padding: '20px 22px' }}>
          <div className="modal-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Scheduled maintenance on Saturday 02:00–04:00 PKT"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Message</label>
            <textarea
              rows={4}
              placeholder="What do tenants need to know? Plain language, no jargon."
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Audience</label>
            <div className="toggle-row">
              {AUDIENCE_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`toggle-chip${audience === opt ? ' on' : ''}`}
                  onClick={() => setAudience(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto', padding: '0 24px' }} onClick={publish}>
            Publish announcement
          </button>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Published history</span>
        </div>
        <div className="audit-feed">
          {history.map((a, i) => (
            <div key={i} className="audit-row">
              <span className="ic">{a.icon}</span>
              <span className="at-text">
                {a.text} <span style={{ color: 'var(--text-3)' }}>· {a.audience}</span>
              </span>
              <span className="at-time">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
