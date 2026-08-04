'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import type { Tenant, ReasonModalState, MfaStepUpState } from './types';

interface ToastState { visible: boolean; msg: string; }

interface AppContextValue {
  // Auth
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  // Current tenant (for detail view, persists across nav)
  currentTenant: Tenant | null;
  setCurrentTenant: (t: Tenant | null) => void;

  // Impersonation
  impersonating: boolean;
  impersonatedName: string;
  impersonationCountdown: string;
  startImpersonation: (tenant: Tenant) => void;
  endImpersonation: () => void;

  // Reason modal
  reasonModal: ReasonModalState;
  openReasonModal: (title: string, sub: string, onConfirm: () => void) => void;
  closeReasonModal: () => void;
  confirmReasonModal: (reason: string) => void;

  // MFA step-up modal
  mfaStepUp: MfaStepUpState;
  openMfaStepUp: (reason: string, onConfirm: () => void) => void;
  closeMfaStepUp: () => void;
  confirmMfaStepUp: () => void;

  // Toast
  toast: ToastState;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);

  // Impersonation
  const [impersonating, setImpersonating] = useState(false);
  const [impersonatedName, setImpersonatedName] = useState('');
  const [impersonationCountdown, setImpersonationCountdown] = useState('15:00');
  const impersonationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const impersonationSeconds = useRef(0);

  // Reason modal
  const [reasonModal, setReasonModal] = useState<ReasonModalState>({ open: false, title: '', sub: '', onConfirm: null });

  // MFA step-up
  const [mfaStepUp, setMfaStepUp] = useState<MfaStepUpState>({ open: false, reason: '', onConfirm: null });

  // Toast
  const [toast, setToast] = useState<ToastState>({ visible: false, msg: '' });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Auth ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Verify session cookie via API (middleware handles redirects on full navigations,
    // this handles expiry while the user is already on the page)
    fetch('/api/auth/me')
      .then(r => setIsLoggedIn(r.ok))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const login = useCallback(() => {
    // Session cookie is set by /api/auth/verify — no client-side storage needed
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
      setIsLoggedIn(false);
      window.location.href = '/login';
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Impersonation ─────────────────────────────────────────────────────────
  const endImpersonation = useCallback(() => {
    if (impersonationInterval.current) {
      clearInterval(impersonationInterval.current);
      impersonationInterval.current = null;
    }
    if (impersonating) showToast('Impersonation session ended');
    setImpersonating(false);
    setImpersonatedName('');
    setImpersonationCountdown('15:00');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [impersonating]);

  const startImpersonation = useCallback((tenant: Tenant) => {
    // Clear any existing session — never stack two intervals
    if (impersonationInterval.current) clearInterval(impersonationInterval.current);

    setImpersonatedName(tenant.name);
    setImpersonating(true);
    impersonationSeconds.current = 15 * 60;
    setImpersonationCountdown('15:00');

    impersonationInterval.current = setInterval(() => {
      impersonationSeconds.current -= 1;
      if (impersonationSeconds.current <= 0) {
        endImpersonation();
        return;
      }
      const m = Math.floor(impersonationSeconds.current / 60);
      const s = impersonationSeconds.current % 60;
      setImpersonationCountdown(`${m}:${String(s).padStart(2, '0')}`);
    }, 1000);

    showToast('Impersonation session started — read-only, logged');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endImpersonation]);

  // ── Reason modal ──────────────────────────────────────────────────────────
  const openReasonModal = useCallback((title: string, sub: string, onConfirm: () => void) => {
    setReasonModal({ open: true, title, sub, onConfirm });
  }, []);

  const closeReasonModal = useCallback(() => {
    setReasonModal(m => ({ ...m, open: false, onConfirm: null }));
  }, []);

  const confirmReasonModal = useCallback((reason: string) => {
    if (reason.trim().length < 4) { showToast('A reason is required for this action'); return; }
    const cb = reasonModal.onConfirm;
    closeReasonModal();
    cb?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasonModal.onConfirm, closeReasonModal]);

  // ── MFA step-up ───────────────────────────────────────────────────────────
  const openMfaStepUp = useCallback((reason: string, onConfirm: () => void) => {
    setMfaStepUp({ open: true, reason, onConfirm });
  }, []);

  const closeMfaStepUp = useCallback(() => {
    setMfaStepUp(m => ({ ...m, open: false, onConfirm: null }));
  }, []);

  const confirmMfaStepUp = useCallback(() => {
    const cb = mfaStepUp.onConfirm;
    closeMfaStepUp();
    cb?.();
  }, [mfaStepUp.onConfirm, closeMfaStepUp]);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, msg });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2600);
  }, []);

  return (
    <AppContext.Provider value={{
      isLoggedIn, login, logout,
      currentTenant, setCurrentTenant,
      impersonating, impersonatedName, impersonationCountdown,
      startImpersonation, endImpersonation,
      reasonModal, openReasonModal, closeReasonModal, confirmReasonModal,
      mfaStepUp, openMfaStepUp, closeMfaStepUp, confirmMfaStepUp,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
