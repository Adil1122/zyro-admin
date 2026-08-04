'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();

  const [step, setStep] = React.useState<1 | 2>(1);
  const [password, setPassword] = React.useState('');
  const [err1, setErr1] = React.useState(false);
  const [err2, setErr2] = React.useState(false);
  const [digits, setDigits] = React.useState(['', '', '', '', '', '']);
  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 2) digitRefs.current[0]?.focus();
  }, [step]);

  function handleStep1() {
    if (!password.trim()) { setErr1(true); return; }
    setErr1(false);
    setStep(2);
  }

  function handleDigitInput(i: number, val: string) {
    const cleaned = val.replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[i] = cleaned;
    setDigits(next);
    if (cleaned && i < 5) digitRefs.current[i + 1]?.focus();
  }

  function handleDigitKey(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      digitRefs.current[i - 1]?.focus();
    }
  }

  function handleStep2() {
    if (digits.some(d => !d)) { setErr2(true); return; }
    setErr2(false);
    login();
    router.replace('/');
  }

  return (
    <div className="v6-login-shell">
      <div className="v6-login-card">
        {step === 1 && (
          <>
            <div className="v6-login-logo">
              <span className="v6-logo-mark">Z</span>
              <span className="v6-logo-text">Zyro</span>
              <span className="v6-ops-badge">OPS</span>
            </div>
            <p className="v6-login-sub">Internal platform administration — not the merchant product</p>

            <div className="v6-login-notice">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span>This panel is only reachable from an allowlisted network and requires MFA on every sign-in — no exceptions, including founder accounts.</span>
            </div>

            <div className="v6-login-field">
              <label>Work email</label>
              <input type="text" defaultValue="anes@zyrocloud.com" />
            </div>
            <div className="v6-login-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStep1()}
              />
            </div>
            {err1 && <p className="v6-login-err">Enter your password to continue</p>}
            <button className="v6-btn-primary" onClick={handleStep1}>Continue</button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="v6-login-logo">
              <span className="v6-logo-mark">Z</span>
              <span className="v6-logo-text">Zyro</span>
              <span className="v6-ops-badge">OPS</span>
            </div>
            <p className="v6-login-sub">Enter the 6-digit code from your authenticator app</p>

            <div className="v6-mfa-row">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { digitRefs.current[i] = el; }}
                  className="v6-mfa-digit"
                  maxLength={1}
                  inputMode="numeric"
                  value={d}
                  onChange={e => handleDigitInput(i, e.target.value)}
                  onKeyDown={e => handleDigitKey(i, e)}
                />
              ))}
            </div>
            {err2 && <p className="v6-login-err">Enter all 6 digits</p>}
            <button className="v6-btn-primary" onClick={handleStep2}>Verify &amp; sign in</button>
          </>
        )}
      </div>
    </div>
  );
}
