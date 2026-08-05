'use client';
import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { logAudit } from '@/lib/audit-client';

const AUDIENCE_OPTIONS = [
  { label: 'All tenants (742)', value: 'all' },
  { label: 'At-risk only', value: 'atrisk' },
  { label: 'Pro plan only', value: 'pro' },
];

interface HistoryEntry {
  id?: string;
  icon: string;
  text: string;
  audience: string;
  time: string;
}

export default function AnnouncementsPage() {
  const { showToast } = useApp();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then((data: Array<{ id: string; title: string; audience: string; time: string }>) => {
        if (Array.isArray(data)) {
          setHistory(data.map(a => ({ id: a.id, icon: '📢', text: a.title, audience: a.audience, time: a.time })));
        }
      })
      .catch(() => {});
  }, []);

  async function publish() {
    if (!title.trim() || !body.trim()) { showToast('Add a title and a message before publishing'); return; }
    setPublishing(true);
    const audienceLabel = AUDIENCE_OPTIONS.find(o => o.value === audience)?.label ?? audience;
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, audience }),
      });
      if (!res.ok) throw new Error('Failed to publish');
      setHistory(prev => [{ icon: '📢', text: title, audience: audienceLabel, time: 'just now' }, ...prev]);
      setTitle('');
      setBody('');
      showToast(`Published to ${audienceLabel}`);
      await logAudit({ type: 'account', action: `Published announcement: ${title}`, reason: `Audience: ${audienceLabel}` });
    } catch {
      showToast('Failed to publish — try again');
    } finally {
      setPublishing(false);
    }
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
          <button className="btn-sm btn-impersonate" style={{ width: 'auto', padding: '0 20px', opacity: publishing ? 0.6 : 1 }} onClick={publish} disabled={publishing}>
            {publishing ? 'Publishing…' : 'Publish announcement'}
          </button>
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Published</span>
        </div>
        <div className="audit-feed">
          {history.length === 0
            ? <div className="audit-row" style={{ color: 'var(--text-3)' }}>No announcements yet.</div>
            : history.map((a, i) => (
              <div key={a.id ?? i} className="audit-row">
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
