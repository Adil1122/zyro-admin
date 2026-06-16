import React from 'react';
import { Menu, ChevronRight, Search, Bell, CheckCheck, AlertCircle, Truck, CreditCard, UserPlus, CheckCircle } from 'lucide-react';

export default function Topbar({ pageTitle = "Command Center" }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger" aria-label="Open menu">
          <Menu style={{ width: '16px' }} />
        </button>
        <nav className="breadcrumb">
          <span>Zyro</span>
          <ChevronRight style={{ width: '12px', color: 'var(--tx-4)' }} />
          <span className="breadcrumb-current" id="breadcrumbCurrent">{pageTitle}</span>
        </nav>
      </div>

      <div className="topbar-spacer"></div>

      <div className="topbar-right">
        <span className="topbar-meta">FRI 06 JUN · 07:24 PKT</span>
        
        <button className="search-trigger">
          <Search style={{ width: '14px' }} />
          <span>Search merchants, actions, anything...</span>
          <span className="kbd">⌘K</span>
        </button>
        
        <div className="dropdown-wrap" id="notifDropdownWrap">
          <button className="btn btn-icon btn-sm btn-ghost" style={{ position: 'relative' }} title="Notifications">
            <Bell style={{ width: '14px' }} />
            <span className="bell-dot"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
