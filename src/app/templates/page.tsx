
import React from 'react';

export default function TemplatesView() {
  return (
    <>
      <section className="view active" id="view-templates">
    <header className="page-header">
      <div>
        <h1 className="page-title">Templates</h1>
        <p className="page-subtitle">WhatsApp + Email templates · Meta-approved · multi-language</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm"><i data-lucide="upload" style={{"width":"13px"}}></i><span>Import</span></button>
        <button className="btn btn-sm btn-primary" ><i data-lucide="plus" style={{"width":"13px"}}></i><span>New template</span></button>
      </div>
    </header>

    <div className="filter-bar tabs-bar" data-tab-group="templates" style={{"marginBottom":"var(--s-4)"}}>
      <span className="filter-chip active" data-tab="whatsapp">WhatsApp <span className="filter-chip-count">24</span></span>
      <span className="filter-chip" data-tab="email">Email <span className="filter-chip-count">12</span></span>
      <span className="filter-chip" data-tab="approval">Pending approval <span className="filter-chip-count">3</span></span>
    </div>

    <div className="tab-content active" data-tab-content="whatsapp">
      <div className="metrics">
        <div className="metric"><div className="metric-label">Approved templates</div><div className="metric-value tx-green">24</div><div className="metric-change up"><i data-lucide="check" style={{"width":"11px"}}></i><span>3 added this month</span></div><div className="metric-help">Across 4 categories</div></div>
        <div className="metric"><div className="metric-label">Pending approval</div><div className="metric-value tx-yellow">3</div><div className="metric-change flat"><i data-lucide="clock" style={{"width":"11px"}}></i><span>Meta review</span></div><div className="metric-help">Avg 24-48h</div></div>
        <div className="metric"><div className="metric-label">Sends today</div><div className="metric-value">24,820</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+12%</span></div><div className="metric-help">94% delivery rate</div></div>
        <div className="metric"><div className="metric-label">Engagement rate</div><div className="metric-value tx-green">38%</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+4pts</span></div><div className="metric-help">Reply rate</div></div>
      </div>

      <div className="card">
        <header className="card-header">
          <div><h3 className="card-title">WhatsApp templates</h3><div className="card-meta">Meta-approved utility + marketing templates</div></div>
          <div className="flex gap-2"><div className="input-wrap"><i data-lucide="search" className="input-wrap-icon"></i><input className="input" placeholder="Search templates..." style={{"width":"240px"}} /></div><button className="btn btn-sm"><i data-lucide="filter" style={{"width":"13px"}}></i><span>Category</span></button></div>
        </header>
        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th>Language</th><th>Status</th><th className="text-right">Sends (30d)</th><th className="text-right">Delivery</th><th className="text-right">Reply rate</th><th></th></tr></thead>
          <tbody>
            <tr><td><div className="fw-medium">order_confirmation</div><div className="t-xs tx-3 mt-1">Order placed → confirmation msg</div></td><td><span className="badge blue">Utility</span></td><td className="t-sm">EN · UR · Roman UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">8,420</td><td className="text-right num">96%</td><td className="text-right num">42%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td><div className="fw-medium">order_shipped</div><div className="t-xs tx-3 mt-1">Courier picked up → tracking link</div></td><td><span className="badge blue">Utility</span></td><td className="t-sm">EN · UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">6,840</td><td className="text-right num">94%</td><td className="text-right num">28%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td><div className="fw-medium">delivery_pending</div><div className="t-xs tx-3 mt-1">3 attempts → ask customer</div></td><td><span className="badge blue">Utility</span></td><td className="t-sm">EN · UR · Roman UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">1,240</td><td className="text-right num">98%</td><td className="text-right num">68%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td><div className="fw-medium">eid_collection_2026</div><div className="t-xs tx-3 mt-1">Eid promo · seasonal · auto-disable</div></td><td><span className="badge purple">Marketing</span></td><td className="t-sm">EN · UR · Roman UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">3,420</td><td className="text-right num">92%</td><td className="text-right num">18%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td><div className="fw-medium">abandoned_cart_24h</div><div className="t-xs tx-3 mt-1">Recovery · 24h after abandon</div></td><td><span className="badge purple">Marketing</span></td><td className="t-sm">EN · UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">2,180</td><td className="text-right num">95%</td><td className="text-right num">12%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td><div className="fw-medium">review_request</div><div className="t-xs tx-3 mt-1">3 days after delivery → ask review</div></td><td><span className="badge blue">Utility</span></td><td className="t-sm">EN · UR · Roman UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">1,840</td><td className="text-right num">96%</td><td className="text-right num">22%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td><div className="fw-medium">rto_prevention_call</div><div className="t-xs tx-3 mt-1">Before dispatch · confirm address</div></td><td><span className="badge blue">Utility</span></td><td className="t-sm">EN · UR · Roman UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">980</td><td className="text-right num">97%</td><td className="text-right num">82%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td><div className="fw-medium">welcome_new_customer</div><div className="t-xs tx-3 mt-1">First-time buyer · brand intro</div></td><td><span className="badge purple">Marketing</span></td><td className="t-sm">EN · UR</td><td><span className="badge green"><span className="badge-dot"></span>Approved</span></td><td className="text-right num">412</td><td className="text-right num">98%</td><td className="text-right num">34%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
          </tbody>
        </table>
        <div style={{"padding":"var(--s-3) var(--s-4)","borderTop":"1px solid var(--b-1)","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
          <span className="t-xs tx-3">Showing 8 of 24 approved templates</span>
          <div className="flex items-center gap-2"><button className="btn btn-xs btn-ghost"><i data-lucide="chevron-left" style={{"width":"12px"}}></i></button><span className="t-xs tx-3">Page 1 of 3</span><button className="btn btn-xs btn-ghost"><i data-lucide="chevron-right" style={{"width":"12px"}}></i></button></div>
        </div>
      </div>
    </div>

    <div className="tab-content" data-tab-content="email">
      <div className="card">
        <header className="card-header"><h3 className="card-title">Email templates</h3><span className="card-meta">12 templates · sent via Resend</span></header>
        <table className="table">
          <thead><tr><th>Name</th><th>Type</th><th>Subject preview</th><th className="text-right">Sends (30d)</th><th className="text-right">Open rate</th><th className="text-right">Click rate</th><th></th></tr></thead>
          <tbody>
            <tr><td className="fw-medium">order_receipt</td><td><span className="badge blue">Transactional</span></td><td className="t-sm">Your Zyro order #{"{{order_id}}"} is confirmed</td><td className="text-right num">4,820</td><td className="text-right num tx-green">64%</td><td className="text-right num">22%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td className="fw-medium">welcome_signup</td><td><span className="badge blue">Transactional</span></td><td className="t-sm">Welcome to Zyro, {"{{first_name}}"}</td><td className="text-right num">847</td><td className="text-right num tx-green">78%</td><td className="text-right num">48%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td className="fw-medium">invoice_paid</td><td><span className="badge blue">Transactional</span></td><td className="t-sm">Payment received · Rs {"{{amount}}"}</td><td className="text-right num">847</td><td className="text-right num tx-green">82%</td><td className="text-right num">14%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td className="fw-medium">payment_failed</td><td><span className="badge yellow">Dunning</span></td><td className="t-sm">Action needed: payment failed</td><td className="text-right num">14</td><td className="text-right num tx-green">94%</td><td className="text-right num">72%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td className="fw-medium">trial_ending_3d</td><td><span className="badge purple">Lifecycle</span></td><td className="t-sm">Your trial ends in 3 days</td><td className="text-right num">189</td><td className="text-right num tx-green">68%</td><td className="text-right num">42%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
            <tr><td className="fw-medium">monthly_report</td><td><span className="badge purple">Lifecycle</span></td><td className="t-sm">{"{{month}}"} report · {"{{revenue}}"} revenue</td><td className="text-right num">847</td><td className="text-right num tx-green">72%</td><td className="text-right num">38%</td><td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="tab-content" data-tab-content="approval">
      <div className="card">
        <header className="card-header"><h3 className="card-title">Pending Meta approval</h3><span className="card-meta">Submitted templates awaiting review</span></header>
        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th>Submitted</th><th>Est. approval</th><th>Status</th></tr></thead>
          <tbody>
            <tr className="row-yellow"><td><div className="fw-medium">eid_2027_early_access</div><div className="t-xs tx-3 mt-1">Early bird promo for Pro tier</div></td><td><span className="badge purple">Marketing</span></td><td className="tx-3 t-sm">Jun 5 · 14:22</td><td className="tx-3 t-sm">Jun 7 · 14:00</td><td><span className="badge yellow"><span className="badge-dot"></span>Under review</span></td></tr>
            <tr className="row-yellow"><td><div className="fw-medium">cod_verification</div><div className="t-xs tx-3 mt-1">High-value COD orders → verify call</div></td><td><span className="badge blue">Utility</span></td><td className="tx-3 t-sm">Jun 4 · 09:15</td><td className="tx-3 t-sm">Jun 6 · 09:00</td><td><span className="badge yellow"><span className="badge-dot"></span>Under review</span></td></tr>
            <tr className="row-yellow"><td><div className="fw-medium">restock_notification</div><div className="t-xs tx-3 mt-1">Out-of-stock items back in stock</div></td><td><span className="badge purple">Marketing</span></td><td className="tx-3 t-sm">Jun 3 · 16:30</td><td className="tx-3 t-sm">Jun 5 · 16:00</td><td><span className="badge red"><span className="badge-dot"></span>Rejected</span></td></tr>
          </tbody>
        </table>
        <div style={{"padding":"var(--s-4)","borderTop":"1px solid var(--b-1)","background":"var(--bg-2)","display":"flex","gap":"var(--s-3)","alignItems":"flex-start"}}>
          <i data-lucide="info" style={{"width":"16px","color":"var(--blue)","flexShrink":"0","marginTop":"2px"}}></i>
          <div className="t-sm tx-2">Meta typically reviews WhatsApp templates within 24-48 hours. Rejected templates can be edited and resubmitted. Approval rate this month: 91%.</div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
