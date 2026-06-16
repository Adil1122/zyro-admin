
import React from 'react';

export default function AuditView() {
  return (
    <>
      <section className="view active" id="view-audit">
    <header className="page-header">
      <div>
        <h1 className="page-title">Audit log</h1>
        <p className="page-subtitle">Every admin action · immutable · FBR + PDPA compliant</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm"><i data-lucide="filter" style={{"width":"13px"}}></i><span>Filters</span></button>
        <button className="btn btn-sm"><i data-lucide="calendar" style={{"width":"13px"}}></i><span>Last 30 days</span></button>
        <button className="btn btn-sm btn-primary"><i data-lucide="download" style={{"width":"13px"}}></i><span>Export PDF</span></button>
      </div>
    </header>

    <div className="metrics">
      <div className="metric"><div className="metric-label">Total events</div><div className="metric-value">2,847</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+12%</span></div><div className="metric-help">Last 30 days</div></div>
      <div className="metric"><div className="metric-label">Impersonations</div><div className="metric-value">47</div><div className="metric-change flat"><i data-lucide="minus" style={{"width":"11px"}}></i><span>Avg 12 min</span></div><div className="metric-help">All notified to merchants</div></div>
      <div className="metric"><div className="metric-label">Refunds processed</div><div className="metric-value">8</div><div className="metric-change down"><i data-lucide="arrow-down-right" style={{"width":"11px"}}></i><span>−30%</span></div><div className="metric-help">Rs 18,997 total</div></div>
      <div className="metric"><div className="metric-label">Failed actions</div><div className="metric-value tx-green">0</div><div className="metric-change flat"><i data-lucide="check" style={{"width":"11px"}}></i><span>All successful</span></div><div className="metric-help">Last 30 days</div></div>
    </div>

    <div className="filter-bar" style={{"marginBottom":"var(--s-4)"}}>
      <span className="filter-chip active">All <span className="filter-chip-count">2,847</span></span>
      <span className="filter-chip"><span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--blue)"}}></span>Impersonations <span className="filter-chip-count">47</span></span>
      <span className="filter-chip"><span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--yellow)"}}></span>Financial <span className="filter-chip-count">12</span></span>
      <span className="filter-chip"><span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--purple)"}}></span>Announcements <span className="filter-chip-count">8</span></span>
      <span className="filter-chip"><span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--red)"}}></span>Suspensions <span className="filter-chip-count">2</span></span>
      <span style={{"flex":"1"}}></span>
      <div className="input-wrap"><i data-lucide="search" className="input-wrap-icon"></i><input className="input" placeholder="Search log..." style={{"width":"240px"}} /></div>
    </div>

    <div className="card card-body-flush">
      <table className="table">
        <thead><tr><th>Time</th><th>Admin</th><th>Action</th><th>Target</th><th>Details</th><th>IP</th></tr></thead>
        <tbody>
          <tr><td className="tx-3 t-sm mono">10:24:18</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge blue"><i data-lucide="user-check" style={{"width":"9px"}}></i>Impersonate</span></td><td className="fw-medium t-sm">Ahmad's Beauty</td><td className="tx-2 t-sm">Session 12m · debugged churn issue</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr><td className="tx-3 t-sm mono">09:15:42</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge yellow"><i data-lucide="dollar-sign" style={{"width":"9px"}}></i>Refund</span></td><td className="fw-medium t-sm">Tenant #234</td><td className="tx-2 t-sm">Refunded Rs 999 · "Service issue"</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr><td className="tx-3 t-sm mono">08:42:11</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge gray"><i data-lucide="edit-3" style={{"width":"9px"}}></i>Note</span></td><td className="fw-medium t-sm">Saima Boutique</td><td className="tx-2 t-sm">"Asked about Eid feature in May"</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr><td className="tx-3 t-sm mono">Jun 5 · 18:30</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge yellow"><i data-lucide="shield" style={{"width":"9px"}}></i>Cost ceiling</span></td><td className="fw-medium t-sm">Power User #234</td><td className="tx-2 t-sm">Set Rs 2,000/mo cap (was unlimited)</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr><td className="tx-3 t-sm mono">Jun 5 · 14:22</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge purple"><i data-lucide="megaphone" style={{"width":"9px"}}></i>Announce</span></td><td className="fw-medium t-sm">200 Pro merchants</td><td className="tx-2 t-sm">"New WhatsApp template" · 187 delivered</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr><td className="tx-3 t-sm mono">Jun 4 · 11:08</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge green"><i data-lucide="gift" style={{"width":"9px"}}></i>Comp</span></td><td className="fw-medium t-sm">Karachi Style</td><td className="tx-2 t-sm">Free month · "VIP appreciation"</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr className="row-red"><td className="tx-3 t-sm mono">Jun 3 · 16:44</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge red"><i data-lucide="ban" style={{"width":"9px"}}></i>Suspend</span></td><td className="fw-medium t-sm">Daraz Topseller</td><td className="tx-2 t-sm">4× failed payment · auto-flagged</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr><td className="tx-3 t-sm mono">Jun 2 · 09:30</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge blue"><i data-lucide="key" style={{"width":"9px"}}></i>Reset password</span></td><td className="fw-medium t-sm">Tenant #156</td><td className="tx-2 t-sm">Forgot password · verified via OTP</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
          <tr><td className="tx-3 t-sm mono">Jun 1 · 14:12</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td><td><span className="badge gray"><i data-lucide="settings" style={{"width":"9px"}}></i>Settings</span></td><td className="fw-medium t-sm">Workspace</td><td className="tx-2 t-sm">Updated billing email + tax info</td><td className="mono t-xs tx-4">203.135.67.x</td></tr>
        </tbody>
      </table>
      <div style={{"padding":"var(--s-4)","borderTop":"1px solid var(--b-1)","background":"var(--bg-2)","display":"flex","alignItems":"center","gap":"var(--s-3)"}}>
        <i data-lucide="shield-check" style={{"width":"16px","color":"var(--blue)","flexShrink":"0"}}></i>
        <div className="t-sm tx-2"><strong>Audit log is immutable.</strong> All admin actions stored forever (FBR + PDPA compliance). Exportable as signed PDF for legal review.</div>
      </div>
    </div>
  </section>
    </>
  );
}
