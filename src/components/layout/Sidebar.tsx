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
      { href: '/billing', label: 'Billing', badge: '3', badgeColor: 'red' },
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
    <aside className={`v6-sidebar${drawerOpen ? ' drawer-open' : ''}`}>
      <div className="v6-logo">
        <span className="v6-logo-mark">Z</span>
        <span className="v6-logo-text">Zyro</span>
        <span className="v6-ops-badge">OPS</span>
      </div>

      <nav className="v6-nav">
        {NAV.map(group => (
          <React.Fragment key={group.label}>
            <div className="v6-nav-section-label">{group.label}</div>
            {group.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`v6-nav-item${isActive(item.href) ? ' active' : ''}`}
                onClick={onClose}
              >
                {item.label}
                {item.badge && (
                  <span className={`v6-nav-badge${item.badgeColor ? ' ' + item.badgeColor : ''}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </nav>

      <div className="v6-sidebar-foot">
        <div className="v6-avatar-sm">AK</div>
        <div>
          <div className="v6-sf-who">Anes Khan</div>
          <div className="v6-sf-role">Founder · Full access</div>
        </div>
      </div>
    </aside>
  );
}
