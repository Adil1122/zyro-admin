import React from 'react';
import { 
  LayoutDashboard, Users, TrendingUp, BarChart3, 
  Activity, Sparkles, FileText, LifeBuoy, 
  Plug, ShieldCheck, Settings, ChevronsUpDown,
  User, CreditCard, LogOut, Keyboard, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">Z</div>
        <div>
          <div className="brand-title">Zyro</div>
          <div className="brand-sub">Operations</div>
        </div>
      </div>

      <div className="nav-group">
        <div className="nav-label">Workspace</div>
        <Link href="/" className="nav-item">
          <LayoutDashboard className="nav-icon" />
          <span>Command Center</span>
          <span className="nav-badge red">3</span>
        </Link>
      </div>

      <div className="nav-group">
        <div className="nav-label">Business</div>
        <Link href="/merchants" className="nav-item">
          <Users className="nav-icon" />
          <span>Merchants</span>
          <span className="nav-badge">847</span>
        </Link>
        <Link href="/financials" className="nav-item">
          <TrendingUp className="nav-icon" />
          <span>Financials</span>
        </Link>
        <Link href="/intel" className="nav-item">
          <BarChart3 className="nav-icon" />
          <span>Intelligence</span>
        </Link>
      </div>

      <div className="nav-group">
        <div className="nav-label">Operations</div>
        <Link href="/operations" className="nav-item">
          <Activity className="nav-icon" />
          <span>System</span>
          <span className="nav-badge yellow">1</span>
        </Link>
        <Link href="/ai" className="nav-item">
          <Sparkles className="nav-icon" />
          <span>AI Engine</span>
        </Link>
        <Link href="/templates" className="nav-item">
          <FileText className="nav-icon" />
          <span>Templates</span>
        </Link>
        <Link href="/support" className="nav-item">
          <LifeBuoy className="nav-icon" />
          <span>Tools</span>
        </Link>
      </div>

      <div className="nav-group">
        <div className="nav-label">Configuration</div>
        <Link href="/integrations" className="nav-item">
          <Plug className="nav-icon" />
          <span>Integrations</span>
        </Link>
        <Link href="/audit" className="nav-item">
          <ShieldCheck className="nav-icon" />
          <span>Audit log</span>
        </Link>
        <Link href="/settings" className="nav-item">
          <Settings className="nav-icon" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="sidebar-footer" style={{ position: 'relative' }}>
        <div className="sidebar-footer-avatar">AK</div>
        <div className="sidebar-footer-info">
          <div className="sidebar-footer-name">Ahmad Khan</div>
          <div className="sidebar-footer-meta">Founder · admin</div>
        </div>
        <button className="btn btn-icon btn-sm btn-ghost" title="Account menu">
          <ChevronsUpDown style={{ width: '14px' }} />
        </button>
      </div>
    </aside>
  );
}
