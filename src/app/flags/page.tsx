'use client';
import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import { logAudit } from '@/lib/audit-client';

interface Flag {
  name: string;
  flag_type: 'kill' | 'rollout';
  description: string;
  owner: string;
  enabled: boolean;
  rollout: number;
}

export default function FlagsPage() {
  const { openReasonModal, showToast } = useApp();
  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/flags')
      .then(r => r.json())
      .then(data => setFlags(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const killSwitches = flags.filter(f => f.flag_type === 'kill');
  const rolloutFlags = flags.filter(f => f.flag_type === 'rollout');

  function toggleKill(name: string) {
    const k = flags.find(f => f.name === name)!;
    if (k.enabled) {
      openReasonModal(
        `Disable ${k.name}?`,
        `This pauses "${k.description.toLowerCase()}" for every tenant on the platform, not just one.`,
        async (reason: string) => {
          await fetch('/api/flags', { method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, enabled: false }) });
          setFlags(prev => prev.map(f => f.name === name ? { ...f, enabled: false } : f));
          showToast(`${name} disabled platform-wide`);
          await logAudit({ type: 'account', action: `Disabled kill switch: ${name}`, reason });
        }
      );
    } else {
      fetch('/api/flags', { method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, enabled: true }) });
      setFlags(prev => prev.map(f => f.name === name ? { ...f, enabled: true } : f));
      showToast(`${name} re-enabled`);
      logAudit({ type: 'account', action: `Re-enabled kill switch: ${name}` });
    }
  }

  function updateRollout(name: string, rollout: number) {
    fetch('/api/flags', { method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rollout }) });
    setFlags(prev => prev.map(f => f.name === name ? { ...f, rollout } : f));
    showToast(`${name} rollout set to ${rollout}%`);
    logAudit({ type: 'account', action: `Set rollout for ${name} to ${rollout}%` });
  }

  if (loading) return (
    <div className="page-anim">
      <div className="page-head"><h1>Feature Flags</h1><div className="page-sub">Kill switches for emergencies, gradual rollout for everything else — different risk profiles, different controls</div></div>
      <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-3)' }}>Loading…</div>
    </div>
  );

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Feature Flags</h1>
        <div className="page-sub">Kill switches for emergencies, gradual rollout for everything else — different risk profiles, different controls</div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Kill switches</span>
          <span className="zone-sub">Default on. Only ever flipped off during an active incident.</span>
        </div>
        <div>
          {killSwitches.map((k, i) => (
            <div
              key={k.name}
              className="switch-row"
              style={{ background: 'var(--destructive-tint)', borderColor: 'rgba(242,114,107,0.3)', marginBottom: i === killSwitches.length - 1 ? 0 : 8 }}
            >
              <div className="sw-text">
                <div className="sw-title" style={{ fontFamily: 'monospace', fontSize: 12 }}>{k.name}</div>
                <div className="sw-sub">{k.description} · Owner: {k.owner}</div>
              </div>
              <button
                className={`switch${k.enabled ? ' on' : ''}`}
                role="switch"
                aria-checked={k.enabled}
                onClick={() => toggleKill(k.name)}
              >
                <span className="knob" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">Rollout flags</span>
          <span className="zone-sub">Gradual percentage rollout, never 0% to 100% in one step</span>
        </div>
        <div className="card" style={{ padding: 4 }}>
          {rolloutFlags.map((f, i) => (
            <div
              key={f.name}
              className="switch-row"
              style={{ marginBottom: 0, borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: i === 0 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="sw-text">
                <div className="sw-title" style={{ fontFamily: 'monospace', fontSize: 12.5 }}>{f.name}</div>
                <div className="sw-sub">{f.description} · Owner: {f.owner}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={f.rollout}
                  onChange={e => setFlags(prev => prev.map(x => x.name === f.name ? { ...x, rollout: parseInt(e.target.value) } : x))}
                  onMouseUp={e => updateRollout(f.name, parseInt((e.target as HTMLInputElement).value))}
                  style={{ width: 100, accentColor: 'var(--accent)' }}
                />
                <span className="num" style={{ fontSize: 12, fontWeight: 700, width: 36, textAlign: 'right' }}>
                  {f.rollout}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
