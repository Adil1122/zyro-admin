
import React from 'react';

export default function OperationsView() {
  return (
    <>
      <section className="view active" id="view-operations">

    <header className="page-header">
      <div>
        <h1 className="page-title flex items-center gap-3">
          <span>System</span>
          <span className="badge green"><span className="badge-dot" style={{"animation":"pulse 2s ease-in-out infinite"}}></span>Operational</span>
        </h1>
        <p className="page-subtitle">All services · auto-refresh every 30 seconds</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm">
          <i data-lucide="refresh-cw" style={{"width":"13px"}}></i>
          <span>Refresh</span>
        </button>
        <button className="btn btn-sm">
          <i data-lucide="external-link" style={{"width":"13px"}}></i>
          <span>Public status page</span>
        </button>
        <button className="btn btn-sm btn-danger">
          <i data-lucide="alert-octagon" style={{"width":"13px"}}></i>
          <span>Crisis mode</span>
        </button>
      </div>
    </header>

    <div className="metrics">
      <div className="metric">
        <div className="metric-label">Uptime (30 days)</div>
        <div className="metric-value tx-green">99.94%</div>
        <div className="metric-change flat"><i data-lucide="minus" style={{"width":"11px"}}></i><span>vs SLA 99.9%</span></div>
        <div className="metric-help">Above target</div>
      </div>
      <div className="metric">
        <div className="metric-label">Active errors</div>
        <div className="metric-value">11</div>
        <div className="metric-change down"><i data-lucide="arrow-down-right" style={{"width":"11px"}}></i><span>−47% week</span></div>
        <div className="metric-help">0 critical · 3 high · 8 medium</div>
      </div>
      <div className="metric">
        <div className="metric-label">API latency p95</div>
        <div className="metric-value tx-green">142ms</div>
        <div className="metric-change up"><i data-lucide="zap" style={{"width":"11px"}}></i><span>Fast</span></div>
        <div className="metric-help">Target &lt; 500ms</div>
      </div>
      <div className="metric">
        <div className="metric-label">Queue depth</div>
        <div className="metric-value">23</div>
        <div className="metric-change flat"><i data-lucide="minus" style={{"width":"11px"}}></i><span>Normal</span></div>
        <div className="metric-help">Alert at &gt; 1,000</div>
      </div>
    </div>

    
    <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"var(--s-5)","marginBottom":"var(--s-5)"}}>

      
      <div className="card">
        <header className="card-header">
          <h3 className="card-title">Core services</h3>
          <span className="card-meta">Checked 12s ago</span>
        </header>
        <div className="card-body" style={{"paddingTop":"var(--s-2)","paddingBottom":"var(--s-2)"}}>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">API server <span className="t-xs tx-3">api.zyro.pk</span></span>
            <span className="status-meta">99.94% · 142ms</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Web app <span className="t-xs tx-3">app.zyro.pk</span></span>
            <span className="status-meta">99.98% · 380ms</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Database <span className="t-xs tx-3">Neon Postgres</span></span>
            <span className="status-meta">99.99% · 18ms</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Redis <span className="t-xs tx-3">Upstash</span></span>
            <span className="status-meta">100% · 4ms</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Workers <span className="t-xs tx-3">BullMQ × 4</span></span>
            <span className="status-meta">100%</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Pixel Edge <span className="t-xs tx-3">Cloudflare</span></span>
            <span className="status-meta">100% · 32ms</span>
          </div>
        </div>
      </div>

      
      <div className="card">
        <header className="card-header">
          <h3 className="card-title">External APIs</h3>
          <span className="badge yellow"><span className="badge-dot"></span>1 degraded</span>
        </header>
        <div className="card-body" style={{"paddingTop":"var(--s-2)","paddingBottom":"var(--s-2)"}}>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">WhatsApp BSP <span className="t-xs tx-3">360dialog</span></span>
            <span className="status-meta">100% · 890ms</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Meta Marketing API</span>
            <span className="status-meta">99.8% · 1.2s</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Google Ads API</span>
            <span className="status-meta">99.9% · 890ms</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Anthropic API</span>
            <span className="status-meta">99.97% · 2.1s</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Stripe</span>
            <span className="status-meta">100% · 240ms</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">JazzCash · Easypaisa</span>
            <span className="status-meta">99.85% · 720ms</span>
          </div>
          <div className="status-row row-yellow" style={{"margin":"0 -16px","paddingLeft":"16px","paddingRight":"16px"}}>
            <span className="status-dot degraded"></span>
            <span className="status-name">TCS Courier <span className="badge yellow" style={{"marginLeft":"var(--s-2)"}}>Degraded</span></span>
            <span className="status-meta tx-yellow">95.2% · 4.8s</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Leopards Courier</span>
            <span className="status-meta">99.9% · 1.4s</span>
          </div>
          <div className="status-row">
            <span className="status-dot up"></span>
            <span className="status-name">Resend Email</span>
            <span className="status-meta">100% · 180ms</span>
          </div>
        </div>
      </div>
    </div>

    
    <div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"var(--s-5)","marginBottom":"var(--s-5)"}}>

      
      <div className="card">
        <header className="card-header">
          <h3 className="card-title">Latency p95</h3>
          <span className="badge green">All in target</span>
        </header>
        <div className="card-body">
          <div className="data-row">
            <span className="data-row-label">API</span>
            <span className="data-row-value tx-green">142ms</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Dashboard</span>
            <span className="data-row-value tx-green">380ms</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Report generation</span>
            <span className="data-row-value tx-green">6.2s</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">WhatsApp send</span>
            <span className="data-row-value tx-green">890ms</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">AI reply</span>
            <span className="data-row-value tx-yellow">2.1s</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">DB query</span>
            <span className="data-row-value tx-green">18ms</span>
          </div>
        </div>
      </div>

      
      <div className="card">
        <header className="card-header">
          <h3 className="card-title">Background queues</h3>
          <span className="card-meta">23 pending</span>
        </header>
        <div className="card-body">
          <div className="data-row">
            <span className="data-row-label">WhatsApp send</span>
            <span className="data-row-value">0</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Order processor</span>
            <span className="data-row-value">3</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Daily reports</span>
            <span className="data-row-value">2</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">AI replies</span>
            <span className="data-row-value tx-yellow">14</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Sync workers</span>
            <span className="data-row-value">0</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Email transactional</span>
            <span className="data-row-value">4</span>
          </div>
        </div>
      </div>

      
      <div className="card">
        <header className="card-header">
          <h3 className="card-title">Today's volume</h3>
          <span className="card-meta">Since 00:00 PKT</span>
        </header>
        <div className="card-body">
          <div className="data-row">
            <span className="data-row-label">WhatsApp sent</span>
            <span className="data-row-value">24,820</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Orders captured</span>
            <span className="data-row-value">1,247</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">AI replies</span>
            <span className="data-row-value">3,420</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Webhooks</span>
            <span className="data-row-value">142k</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">Reports sent</span>
            <span className="data-row-value">847</span>
          </div>
          <div className="data-row">
            <span className="data-row-label">API requests</span>
            <span className="data-row-value">487k</span>
          </div>
        </div>
      </div>
    </div>

    
    <div className="card">
      <header className="card-header">
        <div>
          <h3 className="card-title">Recent incidents</h3>
          <div className="card-meta">Last 30 days</div>
        </div>
        <button className="btn btn-xs btn-ghost">
          <span>Full log</span>
          <i data-lucide="arrow-right" style={{"width":"11px"}}></i>
        </button>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Service</th>
            <th>Severity</th>
            <th>Description</th>
            <th>Duration</th>
            <th className="text-right">Affected</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tx-3 t-sm">Jun 5 · 14:23</td>
            <td className="fw-medium">TCS Courier API</td>
            <td><span className="badge yellow">High</span></td>
            <td className="tx-2">Delivery delays in tracking updates</td>
            <td className="num tx-3">23m</td>
            <td className="text-right num">47 shipments</td>
            <td><span className="badge blue">Monitoring</span></td>
          </tr>
          <tr>
            <td className="tx-3 t-sm">Jun 2 · 09:12</td>
            <td className="fw-medium">Meta Ads API</td>
            <td><span className="badge yellow">High</span></td>
            <td className="tx-2">Slow response for sync jobs</td>
            <td className="num tx-3">4h 12m</td>
            <td className="text-right num">128</td>
            <td><span className="badge green">Resolved</span></td>
          </tr>
          <tr>
            <td className="tx-3 t-sm">May 28 · 19:45</td>
            <td className="fw-medium">WhatsApp BSP</td>
            <td><span className="badge yellow">Medium</span></td>
            <td className="tx-2">Message delivery delay (BSP issue)</td>
            <td className="num tx-3">45m</td>
            <td className="text-right num">847</td>
            <td><span className="badge green">Resolved</span></td>
          </tr>
          <tr>
            <td className="tx-3 t-sm">May 12 · 11:30</td>
            <td className="fw-medium">Dashboard</td>
            <td><span className="badge blue">Low</span></td>
            <td className="tx-2">Slow load (DB query optimization)</td>
            <td className="num tx-3">2h 8m</td>
            <td className="text-right num">847</td>
            <td><span className="badge green">Resolved</span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </section>
    </>
  );
}
