'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  return `${user.slice(0, 1)}${'*'.repeat(Math.min(user.length - 1, 4))}@${domain}`;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [step1Err, setStep1Err] = useState('');
  const [step1Loading, setStep1Loading] = useState(false);

  const [step, setStep]         = useState<1 | 2>(1);
  const [sentTo, setSentTo]     = useState('');
  const [digits, setDigits]     = useState(['', '', '', '', '', '']);
  const [step2Err, setStep2Err] = useState('');
  const [step2Loading, setStep2Loading] = useState(false);
  const digitRefs               = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 2) digitRefs.current[0]?.focus();
  }, [step]);

  async function handleStep1(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email.trim() || !password) { setStep1Err('Enter your email and password to continue.'); return; }
    setStep1Loading(true);
    setStep1Err('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) { setStep1Err(data.error ?? 'Something went wrong. Try again.'); return; }
      setSentTo(email.trim());
      setStep(2);
    } catch {
      setStep1Err('Could not connect to the server. Check your connection.');
    } finally {
      setStep1Loading(false);
    }
  }

  function handleDigitInput(i: number, val: string) {
    const cleaned = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = cleaned;
    setDigits(next);
    if (cleaned && i < 5) digitRefs.current[i + 1]?.focus();
  }

  function handleDigitPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = ['', '', '', '', '', ''];
    text.split('').forEach((c, i) => { next[i] = c; });
    setDigits(next);
    digitRefs.current[Math.min(text.length, 5)]?.focus();
  }

  function handleDigitKey(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) digitRefs.current[i - 1]?.focus();
  }

  async function handleStep2(e?: React.FormEvent) {
    e?.preventDefault();
    const otp = digits.join('');
    if (otp.length < 6) { setStep2Err('Enter all 6 digits.'); return; }
    setStep2Loading(true);
    setStep2Err('');
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStep2Err(data.error ?? 'Verification failed. Try again.');
        setDigits(['', '', '', '', '', '']);
        digitRefs.current[0]?.focus();
        return;
      }
      router.replace('/');
    } catch {
      setStep2Err('Could not connect to the server. Check your connection.');
    } finally {
      setStep2Loading(false);
    }
  }

  return (
    <div className="login-root">
      <div className="login-card">

        {step === 1 && (
          <form onSubmit={handleStep1} noValidate>
            <div className="login-logo">
              <span className="login-logo-mark">Z</span>
              <span className="login-logo-text">Zyro</span>
              <span className="ops-badge">OPS</span>
            </div>
            <div className="login-sub">Internal platform administration — not the merchant product</div>

            <div className="login-notice">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span>This panel requires MFA on every sign-in — no exceptions, including founder accounts. A 6-digit code will be emailed to the registered admin address.</span>
            </div>

            <div className="login-field">
              <label>Work email</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@zyrocloud.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={step1Loading}
              />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={step1Loading}
              />
            </div>

            {step1Err && <div className="login-err show">{step1Err}</div>}

            <button type="submit" className="btn btn-primary" disabled={step1Loading}>
              {step1Loading ? 'Sending code…' : 'Continue'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2} noValidate>
            <div className="login-logo">
              <span className="login-logo-mark">Z</span>
              <span className="login-logo-text">Zyro</span>
              <span className="ops-badge">OPS</span>
            </div>
            <div className="login-sub">
              Enter the 6-digit code emailed to <strong style={{ color: 'var(--text)' }}>{maskEmail(sentTo)}</strong>. It expires in 5 minutes.
            </div>

            <div className="mfa-row" onPaste={handleDigitPaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { digitRefs.current[i] = el; }}
                  className="mfa-digit"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleDigitInput(i, e.target.value)}
                  onKeyDown={e => handleDigitKey(i, e)}
                  disabled={step2Loading}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {step2Err && <div className="login-err show">{step2Err}</div>}

            <button type="submit" className="btn btn-primary" disabled={step2Loading || digits.some(d => !d)}>
              {step2Loading ? 'Verifying…' : 'Verify & sign in'}
            </button>

            <button
              type="button"
              className="back-link-btn"
              onClick={() => { setStep(1); setDigits(['', '', '', '', '', '']); setStep2Err(''); }}
            >
              ← Try a different email
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
