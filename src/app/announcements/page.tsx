'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/context';

const AUDIENCE_OPTIONS = [
  { label: 'All tenants (742)', value: 'all' },
  { label: 'At-risk only', value: 'atrisk' },
  { label: 'Pro plan only', value: 'pro' },
];

const HISTORY_INITIAL = [
  { icon: '📢', text: 'Scheduled maintenance completed — all systems normal', audience: 'All tenants', time: '3 days ago' },
  { icon: '🎉', text: 'New: Multi-warehouse routing now available on Pro plan', audience: 'Pro plan only', time: '1 week ago' },
];

export default function AnnouncementsPage() {
  const { showToast } = useApp();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [history, setHistory] = useState(HISTORY_INITIAL);

  function publish() {
    if (!title.trim() || !body.trim()) { showToast('Add a title and a message before publishing'); return; }
    const audienceLabel = AUDIENCE_OPTIONS.find(o => o.value === audience)?.label ?? audience;
    setHistory(prev => [{ icon: '📢', text: title, audience: audienceLabel, time: 'just now' }, ...prev]);
    setTitle('');
    setBody('');
    showToast(`Published to ${audienceLabel}`);
  }

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Announcements</h1>
        <div className="page-sub">Publish to every merchant, or a specific segment</div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">New announcement</span>
        </div>
        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="field" style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 7 }}>Title</label>
            <input
              type="text"
              placeholder="e.g. Scheduled maintenance — Sunday 2 AM PKT"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', height: 40, background: 'var(--card-2)', border: '1px solid var(--border-strong)', borderRadius: 9, padding: '0 12px', color: 'var(--text)', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div className="field" style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 7 }}>Message</label>
            <textarea
              rows={3}
              placeholder="What merchants need to know…"
              value={body}
              onChange={e => setBody(e.target.value)}
              style={{ width: '100%', background: 'var(--card-2)', border: '1px solid var(--border-strong)', borderRadius: 9, padding: '10px 12px', color: 'var(--text)', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>
          <div className="field" style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 7 }}>Audience</label>
            <div className="toggle-row">
              {AUDIENCE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`toggle-chip${audience === opt.value ? ' on' : ''}`}
                  onClick={() => setAudience(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-sm btn-impersonate" style={{ width: 'auto', padding: '0 20px' }} onClick={publish}>
            Publish announcement
          </button>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Published</span>
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
