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
      // Disabling a kill switch requires a reason
      openReasonModal(
        `Disable "${ks.name}"`,
        `Turning off this kill switch will ${ks.effect}. This action is logged.`,
        () => {
          setSwitches(prev => prev.map(k => k.id === ks.id ? { ...k, active: false } : k));
          showToast(`Kill switch "${ks.name}" disabled`);
        },
      );
    } else {
      // Re-enabling needs no reason
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
          <div key={ks.id} className={`v6-card v6-kill-switch-card${ks.active ? ' active' : ''}`}>
            <div className="v6-ks-info">
              <div className="v6-ks-name">{ks.name}</div>
              <div className="v6-ks-effect">{ks.effect}</div>
            </div>
            <div className="v6-ks-right">
              <span className={`v6-ks-badge${ks.active ? ' on' : ' off'}`}>{ks.active ? 'ACTIVE' : 'OFF'}</span>
              <button
                className={`v6-toggle-btn${ks.active ? ' on' : ''}`}
                onClick={() => toggleKillSwitch(ks)}
                aria-label={ks.active ? 'Disable' : 'Enable'}
              >
                <span className="v6-toggle-knob" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature flags */}
      <div className="v6-zone">
        <div className="v6-zone-head">
          <span className="v6-zone-title">Feature flags</span>
          <span className="v6-zone-sub">Gradual rollout — drag slider to set % of tenants receiving the feature</span>
        </div>
        {flags.map(f => (
          <div key={f.id} className="v6-card v6-flag-card">
            <div className="v6-flag-info">
              <div className="v6-ks-name">{f.name}</div>
              <div className="v6-ks-effect">{f.description}</div>
            </div>
            <div className="v6-flag-control">
              <span className="v6-flag-pct num">{f.rolloutPct}%</span>
              <input
                type="range"
                min={0}
                max={100}
                value={f.rolloutPct}
                className="v6-flag-slider"
                onChange={e => updateFlag(f.id, +e.target.value)}
                onMouseUp={() => showToast(`"${f.name}" set to ${f.rolloutPct}%`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
