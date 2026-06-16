
import React from 'react';

export default function SettingsView() {
  return (
    <>
      <section className="view active" id="view-settings">
    <header className="page-header">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Workspace · team · security · billing · notifications</p>
      </div>
    </header>

    <div className="filter-bar tabs-bar" data-tab-group="settings" style={{"marginBottom":"var(--s-4)"}}>
      <span className="filter-chip active" data-tab="general">General</span>
      <span className="filter-chip" data-tab="team">Team</span>
      <span className="filter-chip" data-tab="security">Security</span>
      <span className="filter-chip" data-tab="billing">Billing</span>
      <span className="filter-chip" data-tab="notifications">Notifications</span>
      <span className="filter-chip" data-tab="branding">Branding</span>
      <span className="filter-chip" data-tab="danger">Danger zone</span>
    </div>

    <div className="tab-content active" data-tab-content="general">
      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Workspace</h3></header>
        <div className="card-body" style={{"display":"flex","flexDirection":"column","gap":"var(--s-4)"}}>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">Workspace name</label>
            <input className="input" defaultValue="Zyro Pakistan" style={{"maxWidth":"400px"}} />
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">Workspace URL</label>
            <div className="flex items-center gap-2"><span className="tx-3 t-sm">app.zyro.pk/</span><input className="input" defaultValue="zyro" style={{"maxWidth":"200px"}} /></div>
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <label className="t-sm fw-medium" style={{"marginTop":"var(--s-2)"}}>Workspace logo</label>
            <div className="flex items-center gap-3"><div className="brand-mark" style={{"width":"48px","height":"48px","fontSize":"var(--t-xl)"}}>Z</div><button className="btn btn-sm"><i data-lucide="upload" style={{"width":"13px"}}></i><span>Upload</span></button><button className="btn btn-sm btn-ghost">Remove</button></div>
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">Default timezone</label>
            <select className="select" style={{"maxWidth":"400px"}}><option>Asia/Karachi (PKT, UTC+5)</option><option>Asia/Dubai (UAE, UTC+4)</option><option>UTC</option></select>
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">Default currency</label>
            <select className="select" style={{"maxWidth":"400px"}}><option>PKR (Pakistani Rupee)</option><option>USD (US Dollar)</option><option>AED (UAE Dirham)</option></select>
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">Default language</label>
            <select className="select" style={{"maxWidth":"400px"}}><option>English</option><option>اردو (Urdu)</option><option>Roman Urdu</option></select>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Tax & legal</h3></header>
        <div className="card-body" style={{"display":"flex","flexDirection":"column","gap":"var(--s-4)"}}>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">Legal entity name</label>
            <input className="input" defaultValue="Zyro Technologies (Pvt) Ltd" style={{"maxWidth":"400px"}} />
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">NTN</label>
            <input className="input mono" defaultValue="7283948-2" style={{"maxWidth":"200px"}} />
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}>
            <label className="t-sm fw-medium">Sales tax registration</label>
            <input className="input mono" defaultValue="ST-04-1234567-8" style={{"maxWidth":"200px"}} />
          </div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <label className="t-sm fw-medium" style={{"marginTop":"var(--s-2)"}}>Registered address</label>
            <textarea className="input" rows={3} style={{"maxWidth":"400px","padding":"var(--s-3)","resize":"vertical"}} defaultValue={`Office 405, Plaza 12
Block 7, Clifton, Karachi
Sindh 75600, Pakistan`} />
          </div>
        </div>
      </div>

      <div style={{"display":"flex","justifyContent":"flex-end","gap":"var(--s-2)"}}>
        <button className="btn">Cancel</button>
        <button className="btn btn-primary"><i data-lucide="check" style={{"width":"13px"}}></i><span>Save changes</span></button>
      </div>
    </div>

    <div className="tab-content" data-tab-content="team">
      <div className="card">
        <header className="card-header">
          <div><h3 className="card-title">Team members</h3><div className="card-meta">1 admin · invite up to 5 on current plan</div></div>
          <button className="btn btn-sm btn-primary"><i data-lucide="user-plus" style={{"width":"13px"}}></i><span>Invite member</span></button>
        </header>
        <table className="table">
          <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>2FA</th><th>Last active</th><th></th></tr></thead>
          <tbody>
            <tr><td><div className="m-cell"><div className="m-avatar av1">AK</div><div><div className="m-name">Ahmad Khan</div><div className="m-meta">Founder</div></div></div></td><td><span className="tier tier-pro">Owner</span></td><td className="t-sm tx-2">ahmad@zyro.pk</td><td><span className="badge green"><i data-lucide="shield-check" style={{"width":"9px"}}></i>Enabled</span></td><td><span className="badge green"><span className="badge-dot"></span>Now</span></td><td>—</td></tr>
          </tbody>
        </table>
        <div style={{"padding":"var(--s-4)","borderTop":"1px solid var(--b-1)","background":"var(--bg-2)"}}>
          <div className="t-sm tx-2"><strong>Solo founder mode.</strong> When you're ready to hire, invite team members with role-based permissions (Admin, Manager, Support, Read-only). All team activity is audited.</div>
        </div>
      </div>

      <div className="card mt-4">
        <header className="card-header"><h3 className="card-title">Pending invitations</h3></header>
        <div className="card-body" style={{"padding":"var(--s-8)","textAlign":"center"}}>
          <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-full)","background":"var(--bg-3)","display":"grid","placeItems":"center","margin":"0 auto var(--s-3)"}}><i data-lucide="mail" style={{"width":"20px","color":"var(--tx-4)"}}></i></div>
          <div className="t-md fw-medium mb-2">No pending invitations</div>
          <div className="t-sm tx-3">Invitations expire after 7 days. Send a new one anytime.</div>
        </div>
      </div>
    </div>

    <div className="tab-content" data-tab-content="security">
      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Authentication</h3></header>
        <div className="card-body" style={{"display":"flex","flexDirection":"column","gap":"var(--s-4)"}}>
          <div className="flex items-center justify-between">
            <div><div className="t-md fw-medium">Two-factor authentication</div><div className="t-sm tx-3 mt-1">Required for dangerous actions (refunds, suspends, deletes)</div></div>
            <span className="badge green"><i data-lucide="shield-check" style={{"width":"10px"}}></i>Enabled · TOTP</span>
          </div>
          <div className="flex items-center justify-between">
            <div><div className="t-md fw-medium">Session timeout</div><div className="t-sm tx-3 mt-1">Auto-logout after inactivity</div></div>
            <select className="select"><option>4 hours</option><option>1 hour</option><option>24 hours</option><option>Never</option></select>
          </div>
          <div className="flex items-center justify-between">
            <div><div className="t-md fw-medium">IP allowlist</div><div className="t-sm tx-3 mt-1">Restrict admin login to specific IPs</div></div>
            <button className="btn btn-sm">Configure</button>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Active sessions</h3><button className="btn btn-sm btn-ghost" style={{"color":"var(--red)"}}><i data-lucide="log-out" style={{"width":"13px"}}></i><span>Sign out all</span></button></header>
        <table className="table">
          <thead><tr><th>Device</th><th>Location</th><th>IP</th><th>Started</th><th></th></tr></thead>
          <tbody>
            <tr><td><div className="flex items-center gap-3"><i data-lucide="monitor" style={{"width":"16px","color":"var(--brand)"}}></i><span className="fw-medium">MacBook Pro · Chrome</span><span className="badge green"><span className="badge-dot"></span>Current</span></div></td><td className="t-sm">Karachi, PK</td><td className="mono t-xs tx-3">203.135.67.x</td><td className="tx-3 t-sm">2h ago</td><td>—</td></tr>
            <tr><td><div className="flex items-center gap-3"><i data-lucide="smartphone" style={{"width":"16px","color":"var(--tx-3)"}}></i><span className="fw-medium">iPhone 15 · Safari</span></div></td><td className="t-sm">Karachi, PK</td><td className="mono t-xs tx-3">203.135.67.x</td><td className="tx-3 t-sm">Yesterday</td><td><button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Revoke</button></td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <header className="card-header"><h3 className="card-title">Recovery codes</h3></header>
        <div className="card-body">
          <div className="t-sm tx-2 mb-3">Use these one-time codes if you lose access to your 2FA device. <strong>Store securely</strong> — they replace your password.</div>
          <div className="flex gap-2"><button className="btn btn-sm"><i data-lucide="download" style={{"width":"13px"}}></i><span>Download codes</span></button><button className="btn btn-sm"><i data-lucide="refresh-cw" style={{"width":"13px"}}></i><span>Regenerate</span></button></div>
          <div className="t-xs tx-4 mt-3">10 codes available · last regenerated Jan 12, 2026</div>
        </div>
      </div>
    </div>

    <div className="tab-content" data-tab-content="billing">
      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Your Zyro subscription</h3><span className="badge purple">Self-funded · Founder</span></header>
        <div className="card-body">
          <div className="t-sm tx-2 mb-3">As the founder, you don't pay for your own admin access. This panel manages billing for your <strong>company's external SaaS subscriptions</strong> (Anthropic, Stripe, etc.).</div>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Company payment methods</h3><button className="btn btn-sm"><i data-lucide="plus" style={{"width":"13px"}}></i><span>Add method</span></button></header>
        <div className="card-body">
          <div className="data-row"><div className="flex items-center gap-3"><i data-lucide="credit-card" style={{"width":"18px","color":"var(--brand)"}}></i><div><div className="fw-medium">Visa •••• 4827</div><div className="t-xs tx-3">Expires 11/27 · Primary</div></div></div><span className="badge green">Default</span></div>
          <div className="data-row"><div className="flex items-center gap-3"><i data-lucide="building" style={{"width":"18px","color":"var(--blue)"}}></i><div><div className="fw-medium">HBL Business Account</div><div className="t-xs tx-3">PK36 HABB 0023 4567 8900 · Backup</div></div></div><button className="btn btn-xs btn-ghost">Make default</button></div>
        </div>
      </div>

      <div className="card">
        <header className="card-header"><h3 className="card-title">Billing contacts</h3></header>
        <div className="card-body" style={{"display":"flex","flexDirection":"column","gap":"var(--s-3)"}}>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}><label className="t-sm fw-medium">Billing email</label><input className="input" defaultValue="billing@zyro.pk" style={{"maxWidth":"400px"}} /></div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}><label className="t-sm fw-medium">Tax invoices to</label><input className="input" defaultValue="accounts@zyro.pk" style={{"maxWidth":"400px"}} /></div>
        </div>
      </div>
    </div>

    <div className="tab-content" data-tab-content="notifications">
      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Email notifications</h3><span className="card-meta">ahmad@zyro.pk</span></header>
        <div className="card-body">
          <div className="data-row"><div><div className="t-sm fw-medium">Daily digest (07:00 PKT)</div><div className="t-xs tx-3 mt-1">Overnight signups, churn, alerts</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
          <div className="data-row"><div><div className="t-sm fw-medium">Critical alerts</div><div className="t-xs tx-3 mt-1">System down, payment fraud, security</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
          <div className="data-row"><div><div className="t-sm fw-medium">New paid signup</div><div className="t-xs tx-3 mt-1">Trial → paid conversion</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
          <div className="data-row"><div><div className="t-sm fw-medium">Churn alert</div><div className="t-xs tx-3 mt-1">Pro tier merchant cancellation</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
          <div className="data-row"><div><div className="t-sm fw-medium">Failed payment</div><div className="t-xs tx-3 mt-1">After 3 retries fail</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
          <div className="data-row"><div><div className="t-sm fw-medium">AI cost spike</div><div className="t-xs tx-3 mt-1">Tenant hitting 80% of ceiling</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">WhatsApp notifications</h3><span className="card-meta">+92 300 1234567</span></header>
        <div className="card-body">
          <div className="data-row"><div><div className="t-sm fw-medium">Critical only</div><div className="t-xs tx-3 mt-1">System down, fraud, urgent merchant issues</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
          <div className="data-row"><div><div className="t-sm fw-medium">Weekly summary (Sundays)</div><div className="t-xs tx-3 mt-1">Week recap with key metrics</div></div><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label></div>
        </div>
      </div>

      <div className="card">
        <header className="card-header"><h3 className="card-title">Slack integration</h3><span className="badge gray">Not connected</span></header>
        <div className="card-body">
          <div className="t-sm tx-2 mb-3">Send admin notifications to a Slack channel.</div>
          <button className="btn btn-sm"><i data-lucide="plug" style={{"width":"13px"}}></i><span>Connect Slack</span></button>
        </div>
      </div>
    </div>

    <div className="tab-content" data-tab-content="branding">
      <div className="card mb-4">
        <header className="card-header"><h3 className="card-title">Brand identity</h3></header>
        <div className="card-body" style={{"display":"flex","flexDirection":"column","gap":"var(--s-4)"}}>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}><label className="t-sm fw-medium">Primary color</label><div className="flex items-center gap-2"><div style={{"width":"32px","height":"32px","borderRadius":"var(--r-md)","background":"var(--brand)","border":"1px solid var(--b-3)"}}></div><input className="input mono" defaultValue="#4ADE80" style={{"maxWidth":"140px"}} /><button className="btn btn-sm">Change</button></div></div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"center"}}><label className="t-sm fw-medium">Dark mode</label><div className="flex items-center gap-2"><label className="switch"><input type="checkbox" defaultChecked /><span className="switch-slider"></span></label><span className="t-sm tx-3">Always dark · light mode coming soon</span></div></div>
          <div style={{"display":"grid","gridTemplateColumns":"200px 1fr","gap":"var(--s-4)","alignItems":"flex-start"}}><label className="t-sm fw-medium" style={{"marginTop":"var(--s-2)"}}>Email branding</label><div><div className="t-sm tx-2 mb-2">Customize merchant-facing email templates</div><button className="btn btn-sm"><i data-lucide="palette" style={{"width":"13px"}}></i><span>Customize</span></button></div></div>
        </div>
      </div>
      <div className="card">
        <header className="card-header"><h3 className="card-title">Public pages</h3></header>
        <div className="card-body" style={{"display":"flex","flexDirection":"column","gap":"var(--s-3)"}}>
          <div className="data-row"><span className="data-row-label">Status page (status.zyro.pk)</span><span className="badge green"><span className="badge-dot"></span>Live</span></div>
          <div className="data-row"><span className="data-row-label">Privacy policy (zyro.pk/privacy)</span><span className="badge green"><span className="badge-dot"></span>Published</span></div>
          <div className="data-row"><span className="data-row-label">Terms of service (zyro.pk/terms)</span><span className="badge green"><span className="badge-dot"></span>Published</span></div>
          <div className="data-row"><span className="data-row-label">Cookie policy (zyro.pk/cookies)</span><span className="badge green"><span className="badge-dot"></span>Published</span></div>
        </div>
      </div>
    </div>

    <div className="tab-content" data-tab-content="danger">
      <div className="card row-red" style={{"borderColor":"var(--red-border)"}}>
        <header className="card-header" style={{"borderColor":"var(--red-border)"}}>
          <h3 className="card-title tx-red">Danger zone</h3>
          <span className="badge red"><i data-lucide="alert-triangle" style={{"width":"10px"}}></i>Irreversible</span>
        </header>
        <div className="card-body" style={{"display":"flex","flexDirection":"column","gap":"var(--s-4)"}}>
          <div className="flex items-start justify-between gap-4">
            <div style={{"flex":"1"}}><div className="t-md fw-semibold">Export all data</div><div className="t-sm tx-3 mt-1">Download complete workspace data as ZIP (JSON + CSVs). Includes merchants, audit log, financial records.</div></div>
            <button className="btn btn-sm"><i data-lucide="download" style={{"width":"13px"}}></i><span>Export</span></button>
          </div>
          <div className="flex items-start justify-between gap-4" style={{"paddingTop":"var(--s-4)","borderTop":"1px solid var(--red-border)"}}>
            <div style={{"flex":"1"}}><div className="t-md fw-semibold tx-yellow">Pause workspace</div><div className="t-sm tx-3 mt-1">Temporarily disable all merchant access. Billing continues. Reversible.</div></div>
            <button className="btn btn-sm" style={{"color":"var(--yellow)","borderColor":"var(--yellow-border)"}}><i data-lucide="pause" style={{"width":"13px"}}></i><span>Pause</span></button>
          </div>
          <div className="flex items-start justify-between gap-4" style={{"paddingTop":"var(--s-4)","borderTop":"1px solid var(--red-border)"}}>
            <div style={{"flex":"1"}}><div className="t-md fw-semibold tx-red">Delete workspace</div><div className="t-sm tx-3 mt-1">Permanently delete Zyro workspace, all merchants, data, billing. <strong>Cannot be undone.</strong> Will trigger 30-day grace period for legal compliance.</div></div>
            <button className="btn btn-sm btn-danger"><i data-lucide="trash-2" style={{"width":"13px"}}></i><span>Delete workspace</span></button>
          </div>
        </div>
      </div>
    </div>

  </section>
    </>
  );
}
