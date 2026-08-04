'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppProvider, useApp } from '@/lib/context';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import ImpersonationBanner from '@/components/ImpersonationBanner';
import ReasonModal from '@/components/ReasonModal';
import MfaStepUpModal from '@/components/MfaStepUpModal';
import CommandPalette from '@/components/CommandPalette';
import Toast from '@/components/Toast';

function AppShell({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, impersonating } = useApp();
  const router = useRouter();
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (impersonating) {
      document.body.classList.add('impersonating');
    } else {
      document.body.classList.remove('impersonating');
    }
  }, [impersonating]);

  const openCmdk = useCallback(() => setCmdkOpen(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdkOpen(o => !o);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <>
      <ImpersonationBanner />
      <div className="app-shell">
        {drawerOpen && (
          <div className="drawer-backdrop show" onClick={() => setDrawerOpen(false)} />
        )}
        <Sidebar drawerOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <div className="main">
          <Topbar onHamburger={() => setDrawerOpen(true)} onCmdK={openCmdk} />
          <div className="content">{children}</div>
        </div>
      </div>
      <CommandPalette open={cmdkOpen} onClose={() => setCmdkOpen(false)} />
      <ReasonModal />
      <MfaStepUpModal />
      <Toast />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  return (
    <AppProvider>
      {isLogin ? children : <AppShell>{children}</AppShell>}
    </AppProvider>
  );
}
