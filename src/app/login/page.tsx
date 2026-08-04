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

  // Step 1: credentials
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [step1Err, setStep1Err] = useState('');
  const [step1Loading, setStep1Loading] = useState(false);

  // Step 2: OTP
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
    if (!email.trim() || !password) { setStep1Err('Enter your email and password.'); return; }
    setStep1Loading(true);
    setStep1Err('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStep1Err(data.error ?? 'Something went wrong. Try again.');
        return;
      }
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
    const lastFilled = Math.min(text.length, 5);
    digitRefs.current[lastFilled]?.focus();
  }

  function handleDigitKey(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      digitRefs.current[i - 1]?.focus();
    }
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

  function handleBack() {
    setStep(1);
    setDigits(['', '', '', '', '', '']);
    setStep2Err('');
  }

  return (
    <div className="v6-login-root">
      <div className="v6-login-card">

        {step === 1 && (
          <form onSubmit={handleStep1} noValidate>
            <div className="v6-login-logo">
              <span className="v6-logo-mark">Z</span>
              <span className="v6-logo-text">Zyro</span>
              <span className="v6-ops-badge">OPS</span>
            </div>
            <p className="v6-login-sub">Internal platform administration — not the merchant product</p>

            <div className="v6-login-notice">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--v6-meta-blue)', flexShrink: 0, marginTop: 1 }}>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>A 6-digit verification code will be emailed to the registered admin address. Codes expire in 5 minutes.</span>
            </div>

            <div className="v6-login-field">
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
            <div className="v6-login-field">
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

            {step1Err && <p className="v6-login-err show">{step1Err}</p>}

            <button type="submit" className="v6-login-btn" disabled={step1Loading}>
              {step1Loading ? 'Sending code…' : 'Continue'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2} noValidate>
            <div className="v6-login-logo">
              <span className="v6-logo-mark">Z</span>
              <span className="v6-logo-text">Zyro</span>
              <span className="v6-ops-badge">OPS</span>
            </div>

            <p className="v6-login-sub">
              We emailed a 6-digit code to <strong style={{ color: 'var(--v6-text-1)' }}>{maskEmail(sentTo)}</strong>.
              It expires in 5 minutes.
            </p>

            <div className="v6-mfa-row" onPaste={handleDigitPaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { digitRefs.current[i] = el; }}
                  className="v6-mfa-digit"
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

            {step2Err && <p className="v6-login-err show">{step2Err}</p>}

            <button type="submit" className="v6-login-btn" disabled={step2Loading || digits.some(d => !d)}>
              {step2Loading ? 'Verifying…' : 'Verify & sign in'}
            </button>

            <button type="button" className="v6-back-btn" style={{ display: 'flex', marginTop: 14 }} onClick={handleBack}>
              ← Try a different email
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
