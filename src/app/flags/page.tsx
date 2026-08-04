'use client';
import React, { useState } from 'react';
import { KILL_SWITCHES, FEATURE_FLAGS } from '@/lib/data';
import { useApp } from '@/lib/context';
import type { KillSwitch, FeatureFlag } from '@/lib/types';

export default function FlagsPage() {
  const { openReasonModal, showToast } = useApp();
  const [switches, setSwitches] = useState<KillSwitch[]>(KILL_SWITCHES);
  const [flags, setFlags] = useState<FeatureFlag[]>(FEATURE_FLAGS);

  function toggleKillSwitch(ks: KillSwitch) {
    if (ks.active) {
      openReasonModal(
        `Disable "${ks.name}"`,
        `Turning off this kill switch will ${ks.effect}. This action is logged.`,
        () => {
          setSwitches(prev => prev.map(k => k.id === ks.id ? { ...k, active: false } : k));
          showToast(`Kill switch "${ks.name}" disabled`);
        },
      );
    } else {
      setSwitches(prev => prev.map(k => k.id === ks.id ? { ...k, active: true } : k));
      showToast(`Kill switch "${ks.name}" enabled`);
    }
  }

  function updateFlag(id: string, pct: number) {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, rolloutPct: pct } : f));
  }

  return (
    <div>
      <div className="v6-page-head">
        <h1>Feature Flags</h1>
        <div className="v6-page-sub">Kill switches and gradual rollout controls</div>
      </div>

      {/* Kill switches */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Kill switches</span>
          <span className="v6-zone-sub">Disabling requires a logged reason. Re-enabling does not.</span>
        </div>
        {switches.map(ks => (
          <div key={ks.id} className={`v6-switch-row${ks.active ? ' ks-active' : ''}`}>
            <div className="v6-sw-text">
              <div className="v6-sw-title">{ks.name}</div>
              <div className="v6-sw-sub">{ks.effect} · Owner: {ks.owner}</div>
            </div>
            <button
              className={`v6-css-switch${ks.active ? ' on' : ''}`}
              onClick={() => toggleKillSwitch(ks)}
              aria-label={ks.active ? 'Disable' : 'Enable'}
            >
              <span className="v6-css-switch-knob" />
            </button>
          </div>
        ))}
      </div>

      {/* Feature flags */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Feature flags</span>
          <span className="v6-zone-sub">Gradual rollout — drag slider to set % of tenants receiving the feature</span>
        </div>
        <div className="v6-flags-card">
          {flags.map(f => (
            <div key={f.id} className="v6-switch-row">
              <div className="v6-sw-text">
                <div className="v6-sw-title">{f.name}</div>
                <div className="v6-sw-sub">{f.description} · Owner: {f.owner}</div>
              </div>
              <div className="v6-flag-control">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={f.rolloutPct}
                  className="v6-flag-slider"
                  onChange={e => updateFlag(f.id, +e.target.value)}
                  onMouseUp={() => showToast(`"${f.name}" set to ${f.rolloutPct}%`)}
                />
                <span className="v6-flag-pct num">{f.rolloutPct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
