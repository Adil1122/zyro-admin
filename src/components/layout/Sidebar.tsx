'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  {
    label: 'Platform',
    items: [
      { href: '/', label: 'Overview' },
      { href: '/tenants', label: 'Tenants' },
      { href: '/billing', label: 'Billing', badge: '3' },
      { href: '/discover', label: 'Discover' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/health', label: 'Platform Health' },
      { href: '/risk', label: 'Risk & Compliance' },
      { href: '/flags', label: 'Feature Flags' },
    ],
  },
  {
    label: 'Governance',
    items: [
      { href: '/audit', label: 'Audit Log' },
      { href: '/announcements', label: 'Announcements' },
    ],
  },
];

interface Props { drawerOpen: boolean; onClose: () => void; }

export default function Sidebar({ drawerOpen, onClose }: Props) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <aside className={`sidebar${drawerOpen ? ' drawer-open' : ''}`}>
      <div className="logo">
        <span className="logo-mark">Z</span>
        <span className="logo-text">Zyro</span>
        <span className="ops-badge">OPS</span>
      </div>

      <nav className="nav">
        {NAV.map(group => (
          <React.Fragment key={group.label}>
            <div className="nav-section-label">{group.label}</div>
            {group.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item${isActive(item.href) ? ' active' : ''}`}
                onClick={onClose}
              >
                {item.label}
                {item.badge && <span className="badge">{item.badge}</span>}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </nav>

      <div className="sidebar-foot">
        <div className="avatar-sm">AK</div>
        <div>
          <div className="who">Anes Khan</div>
          <div className="role">Founder · Full access</div>
        </div>
      </div>
    </aside>
  );
}
