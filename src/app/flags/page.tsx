'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/context';

const INITIAL_KILL_SWITCHES = [
  { name: 'kill-platform-whatsapp-outbound', desc: 'Emergency stop — pauses all outbound WhatsApp sends, every tenant, immediately', owner: 'Anes Khan', on: true },
  { name: 'kill-platform-courier-autobooking', desc: 'Emergency stop — pauses all automatic courier booking platform-wide', owner: 'Anes Khan', on: true },
  { name: 'kill-platform-ai-order-from-chat', desc: 'Forces AI order-from-chat into shadow mode for every tenant, no auto-orders placed', owner: 'Anes Khan', on: true },
];

const FEATURE_FLAGS = [
  { name: 'release-whatsapp-order-from-chat-v2', desc: 'Improved intent classification for order-from-chat WhatsApp flow', owner: 'Hamza Ops', rollout: 35 },
  { name: 'release-couriers-scoring-12signal', desc: 'Full 12-signal AI courier scoring (vs. legacy 4-signal)', owner: 'Anes Khan', rollout: 100 },
  { name: 'release-finance-fbr-autoexport', desc: 'Automatic monthly FBR export for registered tenants', owner: 'Fatima Support Lead', rollout: 80 },
  { name: 'release-finance-profitcalc-v2', desc: 'Redesigned profit calculator with COD-fee breakdown', owner: 'Hamza Ops', rollout: 15 },
  { name: 'release-inventory-multiwarehouse-routing', desc: 'Route orders to nearest warehouse automatically', owner: 'Anes Khan', rollout: 60 },
  { name: 'release-whatsapp-sms-fallback', desc: 'SMS delivery for the ~20% of customers without WhatsApp', owner: 'Fatima Support Lead', rollout: 100 },
];

export default function FlagsPage() {
  const { openReasonModal, showToast } = useApp();
  const [killSwitches, setKillSwitches] = useState(INITIAL_KILL_SWITCHES);
  const [rollouts, setRollouts] = useState(() => FEATURE_FLAGS.map(f => f.rollout));

  function toggleKill(idx: number) {
    const k = killSwitches[idx];
    if (k.on) {
      openReasonModal(
        `Disable ${k.name}?`,
        `This pauses "${k.desc.toLowerCase()}" for every tenant on the platform, not just one.`,
        () => {
          setKillSwitches(prev => prev.map((s, i) => i === idx ? { ...s, on: false } : s));
          showToast(`${k.name} disabled platform-wide`);
        }
      );
    } else {
      setKillSwitches(prev => prev.map((s, i) => i === idx ? { ...s, on: true } : s));
      showToast(`${k.name} re-enabled`);
    }
  }

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
                <div className="sw-sub">{k.desc} · Owner: {k.owner}</div>
              </div>
              <button
                className={`switch${k.on ? ' on' : ''}`}
                role="switch"
                aria-checked={k.on}
                onClick={() => toggleKill(i)}
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
          {FEATURE_FLAGS.map((f, i) => (
            <div
              key={f.name}
              className="switch-row"
              style={{ marginBottom: 0, borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: i === 0 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="sw-text">
                <div className="sw-title" style={{ fontFamily: 'monospace', fontSize: 12.5 }}>{f.name}</div>
                <div className="sw-sub">{f.desc} · Owner: {f.owner}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={rollouts[i]}
                  onChange={e => setRollouts(prev => prev.map((v, j) => j === i ? parseInt(e.target.value) : v))}
                  onMouseUp={e => showToast(`${f.name} rollout set to ${(e.target as HTMLInputElement).value}%`)}
                  style={{ width: 100, accentColor: 'var(--accent)' }}
                />
                <span className="num" style={{ fontSize: 12, fontWeight: 700, width: 36, textAlign: 'right' }}>
                  {rollouts[i]}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
