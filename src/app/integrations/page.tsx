
import React from 'react';

export default function IntegrationsView() {
  return (
    <>
      <section className="view active" id="view-integrations">
    <header className="page-header">
      <div>
        <h1 className="page-title">Integrations</h1>
        <p className="page-subtitle">Connected services · 15 active · 3 available</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm"><i data-lucide="search" style={{"width":"13px"}}></i><span>Browse all</span></button>
        <button className="btn btn-sm btn-primary"><i data-lucide="plus" style={{"width":"13px"}}></i><span>Request integration</span></button>
      </div>
    </header>

    <div className="filter-bar tabs-bar" data-tab-group="integrations" style={{"marginBottom":"var(--s-4)"}}>
      <span className="filter-chip active" data-tab="connected">Connected <span className="filter-chip-count">15</span></span>
      <span className="filter-chip" data-tab="available">Available <span className="filter-chip-count">8</span></span>
      <span className="filter-chip" data-tab="api">API Keys</span>
      <span className="filter-chip" data-tab="webhooks">Webhooks <span className="filter-chip-count">12</span></span>
    </div>

    <div className="tab-content active" data-tab-content="connected">
      <div style={{"display":"grid","gridTemplateColumns":"repeat(2,1fr)","gap":"var(--s-4)"}}>

        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(34,197,94,0.1)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="message-circle" style={{"width":"22px","color":"var(--green)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">WhatsApp Cloud API</h3><span className="badge green"><span className="badge-dot"></span>Connected</span></div>
              <p className="t-sm tx-3 mb-3">Via 360dialog BSP · +92 300 1234567 · WABA verified</p>
              <div className="t-xs tx-3 mono">24,820 messages sent today · 99.8% delivery</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Settings</button>
                <button className="btn btn-xs btn-ghost">Logs</button>
                <button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Disconnect</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(168,85,247,0.1)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="sparkles" style={{"width":"22px","color":"var(--purple)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">Anthropic Claude</h3><span className="badge green"><span className="badge-dot"></span>Connected</span></div>
              <p className="t-sm tx-3 mb-3">Haiku 4.5 + Sonnet 4.6 · Rs 142k MTD</p>
              <div className="t-xs tx-3 mono">3,420 AI replies today · 96% quality score</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Settings</button>
                <button className="btn btn-xs btn-ghost">Usage</button>
                <button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Disconnect</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(59,130,246,0.1)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="credit-card" style={{"width":"22px","color":"var(--blue)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">Stripe</h3><span className="badge green"><span className="badge-dot"></span>Connected</span></div>
              <p className="t-sm tx-3 mb-3">Subscription billing · Pakistan + international</p>
              <div className="t-xs tx-3 mono">Rs 18.4L MRR processed · 99.5% success</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Dashboard</button>
                <button className="btn btn-xs btn-ghost">Webhooks</button>
                <button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Disconnect</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(34,197,94,0.1)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="smartphone" style={{"width":"22px","color":"var(--green)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">JazzCash + Easypaisa</h3><span className="badge green"><span className="badge-dot"></span>Connected</span></div>
              <p className="t-sm tx-3 mb-3">Local PK payments · for merchants who can't use cards</p>
              <div className="t-xs tx-3 mono">12 merchants on local · Rs 24k MRR</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Settings</button>
                <button className="btn btn-xs btn-ghost">Logs</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(168,85,247,0.1)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="instagram" style={{"width":"22px","color":"var(--purple)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">Meta Business</h3><span className="badge green"><span className="badge-dot"></span>Connected</span></div>
              <p className="t-sm tx-3 mb-3">Instagram + Facebook Ads + Marketing API</p>
              <div className="t-xs tx-3 mono">847 merchant accounts linked · 99.8% uptime</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Settings</button>
                <button className="btn btn-xs btn-ghost">Logs</button>
                <button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Disconnect</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(234,179,8,0.1)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="search" style={{"width":"22px","color":"var(--yellow)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">Google Ads</h3><span className="badge green"><span className="badge-dot"></span>Connected</span></div>
              <p className="t-sm tx-3 mb-3">Search ads + GMC for product feed</p>
              <div className="t-xs tx-3 mono">312 merchant accounts · 99.9% uptime</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Settings</button>
                <button className="btn btn-xs btn-ghost">Logs</button>
                <button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Disconnect</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card row-yellow" style={{"borderColor":"var(--yellow-border)"}}>
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(234,179,8,0.15)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="truck" style={{"width":"22px","color":"var(--yellow)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">TCS Courier</h3><span className="badge yellow"><span className="badge-dot"></span>Degraded</span></div>
              <p className="t-sm tx-3 mb-3">Booking + tracking API · auto-fallback to Leopards</p>
              <div className="t-xs tx-3 mono">95.2% uptime · 4.8s avg response · 23m incident</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Settings</button>
                <button className="btn btn-xs btn-ghost">Status</button>
                <button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Disconnect</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"rgba(34,197,94,0.1)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="truck" style={{"width":"22px","color":"var(--green)"}}></i></div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="flex items-center gap-2 mb-1"><h3 className="card-title">Leopards Courier</h3><span className="badge green"><span className="badge-dot"></span>Connected</span></div>
              <p className="t-sm tx-3 mb-3">Booking + tracking · primary fallback for TCS</p>
              <div className="t-xs tx-3 mono">99.9% uptime · 1.4s avg response</div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-xs">Settings</button>
                <button className="btn btn-xs btn-ghost">Logs</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div className="tab-content" data-tab-content="available">
      <div style={{"display":"grid","gridTemplateColumns":"repeat(2,1fr)","gap":"var(--s-4)"}}>
        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"var(--bg-3)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="truck" style={{"width":"22px","color":"var(--tx-2)"}}></i></div>
            <div style={{"flex":"1"}}>
              <h3 className="card-title">PostEx</h3>
              <p className="t-sm tx-3 mb-3">Pakistani courier · COD focus · 18 cities</p>
              <button className="btn btn-xs btn-primary"><i data-lucide="plus" style={{"width":"11px"}}></i><span>Connect</span></button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"var(--bg-3)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="shopping-bag" style={{"width":"22px","color":"var(--tx-2)"}}></i></div>
            <div style={{"flex":"1"}}>
              <h3 className="card-title">Daraz Open Platform</h3>
              <p className="t-sm tx-3 mb-3">Sync orders from Daraz marketplace</p>
              <button className="btn btn-xs btn-primary"><i data-lucide="plus" style={{"width":"11px"}}></i><span>Connect</span></button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"var(--bg-3)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="store" style={{"width":"22px","color":"var(--tx-2)"}}></i></div>
            <div style={{"flex":"1"}}>
              <h3 className="card-title">Shopify</h3>
              <p className="t-sm tx-3 mb-3">Sync orders + inventory from Shopify stores</p>
              <button className="btn btn-xs btn-primary"><i data-lucide="plus" style={{"width":"11px"}}></i><span>Connect</span></button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"var(--bg-3)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="globe" style={{"width":"22px","color":"var(--tx-2)"}}></i></div>
            <div style={{"flex":"1"}}>
              <h3 className="card-title">WooCommerce</h3>
              <p className="t-sm tx-3 mb-3">Self-hosted WordPress store sync</p>
              <button className="btn btn-xs btn-primary"><i data-lucide="plus" style={{"width":"11px"}}></i><span>Connect</span></button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"var(--bg-3)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="zap" style={{"width":"22px","color":"var(--tx-2)"}}></i></div>
            <div style={{"flex":"1"}}>
              <h3 className="card-title">Zapier</h3>
              <p className="t-sm tx-3 mb-3">Connect to 5,000+ apps via Zapier</p>
              <button className="btn btn-xs btn-primary"><i data-lucide="plus" style={{"width":"11px"}}></i><span>Connect</span></button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{"display":"flex","gap":"var(--s-4)","alignItems":"flex-start"}}>
            <div style={{"width":"48px","height":"48px","borderRadius":"var(--r-md)","background":"var(--bg-3)","display":"grid","placeItems":"center","flexShrink":"0"}}><i data-lucide="message-square" style={{"width":"22px","color":"var(--tx-2)"}}></i></div>
            <div style={{"flex":"1"}}>
              <h3 className="card-title">Slack</h3>
              <p className="t-sm tx-3 mb-3">Internal alerts + reports to Slack channels</p>
              <button className="btn btn-xs btn-primary"><i data-lucide="plus" style={{"width":"11px"}}></i><span>Connect</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="tab-content" data-tab-content="api">
      <div className="card">
        <header className="card-header">
          <div><h3 className="card-title">API Keys</h3><div className="card-meta">For programmatic admin access · keep secret</div></div>
          <button className="btn btn-sm btn-primary"><i data-lucide="plus" style={{"width":"13px"}}></i><span>Generate key</span></button>
        </header>
        <table className="table">
          <thead><tr><th>Name</th><th>Key prefix</th><th>Scope</th><th>Last used</th><th>Created</th><th></th></tr></thead>
          <tbody>
            <tr><td className="fw-medium">Production webhook</td><td className="mono t-sm">zyro_live_4k2x...</td><td><span className="badge purple">Read + write</span></td><td className="tx-3 t-sm">2m ago</td><td className="tx-3 t-sm">Jan 12, 2026</td><td><button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Revoke</button></td></tr>
            <tr><td className="fw-medium">Read-only analytics</td><td className="mono t-sm">zyro_live_8m9p...</td><td><span className="badge blue">Read only</span></td><td className="tx-3 t-sm">1h ago</td><td className="tx-3 t-sm">Mar 4, 2026</td><td><button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Revoke</button></td></tr>
            <tr><td className="fw-medium">Dev environment</td><td className="mono t-sm">zyro_test_2x4n...</td><td><span className="badge yellow">Test mode</span></td><td className="tx-3 t-sm">Yesterday</td><td className="tx-3 t-sm">Feb 18, 2026</td><td><button className="btn btn-xs btn-ghost" style={{"color":"var(--red)"}}>Revoke</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="tab-content" data-tab-content="webhooks">
      <div className="card">
        <header className="card-header">
          <div><h3 className="card-title">Webhook endpoints</h3><div className="card-meta">Subscribe to events · auto-retry on failure</div></div>
          <button className="btn btn-sm btn-primary"><i data-lucide="plus" style={{"width":"13px"}}></i><span>Add endpoint</span></button>
        </header>
        <table className="table">
          <thead><tr><th>Endpoint</th><th>Events</th><th className="text-right">Success (24h)</th><th>Last delivery</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td className="mono t-sm">https://api.zyro.pk/webhooks/stripe</td><td className="t-sm">subscription.* · invoice.*</td><td className="text-right num">847/847</td><td className="tx-3 t-sm">2m ago</td><td><span className="badge green">Healthy</span></td></tr>
            <tr><td className="mono t-sm">https://api.zyro.pk/webhooks/whatsapp</td><td className="t-sm">message.received · message.delivered</td><td className="text-right num">24,820/24,820</td><td className="tx-3 t-sm">8s ago</td><td><span className="badge green">Healthy</span></td></tr>
            <tr><td className="mono t-sm">https://api.zyro.pk/webhooks/tcs</td><td className="t-sm">shipment.update</td><td className="text-right num tx-yellow">412/452</td><td className="tx-3 t-sm">23m ago</td><td><span className="badge yellow">Retrying</span></td></tr>
            <tr><td className="mono t-sm">https://api.zyro.pk/webhooks/meta-ads</td><td className="t-sm">campaign.* · adset.*</td><td className="text-right num">1,247/1,247</td><td className="tx-3 t-sm">12m ago</td><td><span className="badge green">Healthy</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
    </>
  );
}
