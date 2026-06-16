
import React from 'react';

export default function FinancialsView() {
  return (
    <>
      <section className="view active" id="view-financials">

    <header className="page-header">
      <div>
        <h1 className="page-title">Financials</h1>
        <p className="page-subtitle">MRR Rs 18.4L · 86% gross margin · cash-flow positive</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm">
          <i data-lucide="calendar" style={{"width":"13px"}}></i>
          <span>June 2026</span>
          <i data-lucide="chevron-down" style={{"width":"12px"}}></i>
        </button>
        <button className="btn btn-sm">
          <i data-lucide="download" style={{"width":"13px"}}></i>
          <span>Export</span>
        </button>
        <button className="btn btn-sm btn-primary">
          <i data-lucide="file-text" style={{"width":"13px"}}></i>
          <span>FBR report</span>
        </button>
      </div>
    </header>

    
    <div className="filter-bar tabs-bar" data-tab-group="financials" style={{"marginBottom":"var(--s-4)"}}>
      <span className="filter-chip active" data-tab="overview">Overview</span>
      <span className="filter-chip" data-tab="mrr">MRR details</span>
      <span className="filter-chip" data-tab="costs">Costs</span>
      <span className="filter-chip" data-tab="profitability">Profitability</span>
      <span className="filter-chip" data-tab="failed">Failed payments <span className="filter-chip-count">7</span></span>
      <span className="filter-chip" data-tab="refunds">Refunds <span className="filter-chip-count">2</span></span>
      <span className="filter-chip" data-tab="tax">Tax (FBR)</span>
    </div>

    
    <div className="tab-content active" data-tab-content="overview">

    
    <div className="metrics">
      <div className="metric">
        <div className="metric-label">Current MRR</div>
        <div className="metric-value">Rs 18.4L</div>
        <div className="metric-change up">
          <i data-lucide="arrow-up-right" style={{"width":"11px"}}></i>
          <span>+Rs 123,900</span>
        </div>
        <div className="metric-help">+7.2% vs last month</div>
      </div>
      <div className="metric">
        <div className="metric-label">Annual run-rate</div>
        <div className="metric-value">Rs 2.2 Cr</div>
        <div className="metric-change up">
          <i data-lucide="arrow-up-right" style={{"width":"11px"}}></i>
          <span>Forecast</span>
        </div>
        <div className="metric-help">If trajectory holds</div>
      </div>
      <div className="metric">
        <div className="metric-label">Gross margin</div>
        <div className="metric-value tx-green">86%</div>
        <div className="metric-change flat">
          <i data-lucide="minus" style={{"width":"11px"}}></i>
          <span>Stable</span>
        </div>
        <div className="metric-help">Rs 1.59L profit/month</div>
      </div>
      <div className="metric">
        <div className="metric-label">LTV / CAC</div>
        <div className="metric-value">4.2×</div>
        <div className="metric-change up">
          <i data-lucide="arrow-up-right" style={{"width":"11px"}}></i>
          <span>Healthy</span>
        </div>
        <div className="metric-help">Target 3×+</div>
      </div>
    </div>

    
    <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"var(--s-5)","marginBottom":"var(--s-5)"}}>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">MRR breakdown</h3>
            <div className="card-meta">Starting Rs 17.23L → Rs 18.47L</div>
          </div>
          <span className="badge green">+Rs 123,900 net</span>
        </header>
        <div className="card-body">
          
          <div style={{"display":"flex","flexDirection":"column","gap":"var(--s-3)"}}>

            <div style={{"display":"flex","alignItems":"center","gap":"var(--s-3)"}}>
              <div style={{"width":"32px","height":"32px","borderRadius":"var(--r-md)","background":"var(--green-bg)","display":"grid","placeItems":"center","flexShrink":"0"}}>
                <i data-lucide="user-plus" style={{"width":"14px","color":"var(--green)"}}></i>
              </div>
              <div style={{"flex":"1","minWidth":"0"}}>
                <div style={{"display":"flex","justifyContent":"space-between","alignItems":"baseline","marginBottom":"var(--s-1)"}}>
                  <span className="t-sm fw-medium">New MRR · 38 merchants</span>
                  <span className="num fw-semibold tx-green">+Rs 187,300</span>
                </div>
                <div className="progress"><div className="progress-bar" style={{"width":"75%"}}></div></div>
              </div>
            </div>

            <div style={{"display":"flex","alignItems":"center","gap":"var(--s-3)"}}>
              <div style={{"width":"32px","height":"32px","borderRadius":"var(--r-md)","background":"var(--green-bg)","display":"grid","placeItems":"center","flexShrink":"0"}}>
                <i data-lucide="arrow-up" style={{"width":"14px","color":"var(--green)"}}></i>
              </div>
              <div style={{"flex":"1","minWidth":"0"}}>
                <div style={{"display":"flex","justifyContent":"space-between","alignItems":"baseline","marginBottom":"var(--s-1)"}}>
                  <span className="t-sm fw-medium">Expansion · 12 upgrades</span>
                  <span className="num fw-semibold tx-green">+Rs 24,500</span>
                </div>
                <div className="progress"><div className="progress-bar" style={{"width":"10%"}}></div></div>
              </div>
            </div>

            <div style={{"display":"flex","alignItems":"center","gap":"var(--s-3)"}}>
              <div style={{"width":"32px","height":"32px","borderRadius":"var(--r-md)","background":"var(--yellow-bg)","display":"grid","placeItems":"center","flexShrink":"0"}}>
                <i data-lucide="arrow-down" style={{"width":"14px","color":"var(--yellow)"}}></i>
              </div>
              <div style={{"flex":"1","minWidth":"0"}}>
                <div style={{"display":"flex","justifyContent":"space-between","alignItems":"baseline","marginBottom":"var(--s-1)"}}>
                  <span className="t-sm fw-medium">Contraction · 8 downgrades</span>
                  <span className="num fw-semibold tx-yellow">−Rs 12,400</span>
                </div>
                <div className="progress"><div className="progress-bar yellow" style={{"width":"5%"}}></div></div>
              </div>
            </div>

            <div style={{"display":"flex","alignItems":"center","gap":"var(--s-3)"}}>
              <div style={{"width":"32px","height":"32px","borderRadius":"var(--r-md)","background":"var(--red-bg)","display":"grid","placeItems":"center","flexShrink":"0"}}>
                <i data-lucide="user-x" style={{"width":"14px","color":"var(--red)"}}></i>
              </div>
              <div style={{"flex":"1","minWidth":"0"}}>
                <div style={{"display":"flex","justifyContent":"space-between","alignItems":"baseline","marginBottom":"var(--s-1)"}}>
                  <span className="t-sm fw-medium">Churned · 15 merchants</span>
                  <span className="num fw-semibold tx-red">−Rs 75,500</span>
                </div>
                <div className="progress"><div className="progress-bar red" style={{"width":"30%"}}></div></div>
              </div>
            </div>
          </div>

          <div style={{"marginTop":"var(--s-5)","paddingTop":"var(--s-4)","borderTop":"1px solid var(--b-1)","display":"flex","justifyContent":"space-between"}}>
            <div>
              <div className="t-xs tx-3">Net new MRR</div>
              <div className="metric-value md tx-green" style={{"marginTop":"var(--s-1)"}}>+Rs 123,900</div>
            </div>
            <div className="text-right">
              <div className="t-xs tx-3">New total MRR</div>
              <div className="metric-value md" style={{"marginTop":"var(--s-1)"}}>Rs 18.47L</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Costs · June 2026</h3>
            <div className="card-meta">Rs 259,000 · 14% of MRR</div>
          </div>
          <span className="badge green">86% margin</span>
        </header>
        <div className="card-body">

          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--brand)"}}></div>
              <span className="data-row-label">Anthropic API</span>
              <span className="tx-4 t-xs">55%</span>
            </div>
            <span className="data-row-value">Rs 142,000</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--blue)"}}></div>
              <span className="data-row-label">WhatsApp BSP</span>
              <span className="tx-4 t-xs">30%</span>
            </div>
            <span className="data-row-value">Rs 78,000</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--purple)"}}></div>
              <span className="data-row-label">Cloudflare</span>
              <span className="tx-4 t-xs">5%</span>
            </div>
            <span className="data-row-value">Rs 12,000</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--yellow)"}}></div>
              <span className="data-row-label">Database (Neon)</span>
              <span className="tx-4 t-xs">3%</span>
            </div>
            <span className="data-row-value">Rs 8,500</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--red)"}}></div>
              <span className="data-row-label">Redis · Email · Support</span>
              <span className="tx-4 t-xs">4%</span>
            </div>
            <span className="data-row-value">Rs 10,800</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--tx-3)"}}></div>
              <span className="data-row-label">Other SaaS</span>
              <span className="tx-4 t-xs">3%</span>
            </div>
            <span className="data-row-value">Rs 7,700</span>
          </div>

          <div style={{"marginTop":"var(--s-5)","paddingTop":"var(--s-4)","borderTop":"1px solid var(--b-1)","display":"flex","justifyContent":"space-between"}}>
            <div>
              <div className="t-xs tx-3">Gross profit</div>
              <div className="metric-value md tx-green" style={{"marginTop":"var(--s-1)"}}>Rs 1,588,300</div>
            </div>
            <div className="text-right">
              <div className="t-xs tx-3">Runway</div>
              <div className="metric-value sm" style={{"marginTop":"var(--s-1)"}}>∞ <span className="t-xs tx-3 mono">self-funded</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div className="card">
      <header className="card-header">
        <div className="flex items-center gap-3">
          <h3 className="card-title">Per-merchant profitability</h3>
          <span className="badge yellow"><i data-lucide="alert-triangle" style={{"width":"10px"}}></i>3 losing money</span>
        </div>
        <button className="btn btn-xs btn-ghost">
          <span>View all 847</span>
          <i data-lucide="arrow-right" style={{"width":"11px"}}></i>
        </button>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Plan</th>
            <th className="text-right">AI cost</th>
            <th className="text-right">Net</th>
            <th className="text-right">Margin</th>
            <th className="text-right">LTV</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="m-cell">
                <div className="m-avatar av1">SB</div>
                <span className="m-name">Saima Boutique</span>
              </div>
            </td>
            <td><span className="tier tier-pro">Pro</span></td>
            <td className="text-right num">Rs 487</td>
            <td className="text-right num tx-green">Rs 4,487</td>
            <td className="text-right"><span className="badge green">89.8%</span></td>
            <td className="text-right num tx-green">Rs 23,800</td>
            <td><span className="badge green">Profitable</span></td>
          </tr>
          <tr>
            <td>
              <div className="m-cell">
                <div className="m-avatar av2">KS</div>
                <span className="m-name">Karachi Style</span>
              </div>
            </td>
            <td><span className="tier tier-pro">Pro</span></td>
            <td className="text-right num">Rs 523</td>
            <td className="text-right num tx-green">Rs 4,451</td>
            <td className="text-right"><span className="badge green">89.0%</span></td>
            <td className="text-right num tx-green">Rs 19,400</td>
            <td><span className="badge green">Profitable</span></td>
          </tr>
          <tr className="row-red">
            <td>
              <div className="m-cell">
                <div className="m-avatar av6">PU</div>
                <div>
                  <div className="m-name">Power User #234</div>
                  <div className="m-meta">Approaching ceiling</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-starter">Starter</span></td>
            <td className="text-right num tx-red">Rs 1,840</td>
            <td className="text-right num tx-red">−Rs 911</td>
            <td className="text-right"><span className="badge red">−91.2%</span></td>
            <td className="text-right num">Rs 999</td>
            <td><span className="badge red">Losing money</span></td>
          </tr>
          <tr className="row-red">
            <td>
              <div className="m-cell">
                <div className="m-avatar av8">HR</div>
                <div>
                  <div className="m-name">Heavy Reporter #91</div>
                  <div className="m-meta">High AI usage</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-starter">Starter</span></td>
            <td className="text-right num tx-red">Rs 1,420</td>
            <td className="text-right num tx-red">−Rs 481</td>
            <td className="text-right"><span className="badge red">−48.1%</span></td>
            <td className="text-right num">Rs 2,997</td>
            <td><span className="badge red">Losing money</span></td>
          </tr>
          <tr className="row-yellow">
            <td>
              <div className="m-cell">
                <div className="m-avatar av4">MA</div>
                <span className="m-name">Multi-account #45</span>
              </div>
            </td>
            <td><span className="tier tier-growth">Growth</span></td>
            <td className="text-right num tx-yellow">Rs 2,890</td>
            <td className="text-right num tx-yellow">−Rs 451</td>
            <td className="text-right"><span className="badge yellow">−18.1%</span></td>
            <td className="text-right num">Rs 12,495</td>
            <td><span className="badge yellow">Review</span></td>
          </tr>
        </tbody>
      </table>
      
      <div style={{"padding":"var(--s-4)","borderTop":"1px solid var(--b-1)","background":"var(--bg-2)"}}>
        <div className="flex items-center gap-3">
          <div style={{"width":"32px","height":"32px","borderRadius":"var(--r-md)","background":"var(--red-bg)","display":"grid","placeItems":"center"}}>
            <i data-lucide="alert-circle" style={{"width":"14px","color":"var(--red)"}}></i>
          </div>
          <div style={{"flex":"1"}}>
            <div className="t-sm fw-semibold">Action needed: 3 merchants losing money</div>
            <div className="t-xs tx-3 mt-1">Apply per-tenant cost ceilings (Settings → AI Limits). Estimated savings: <span className="tx-green fw-semibold">Rs 4,800/month</span></div>
          </div>
          <button className="btn btn-sm btn-primary">
            <i data-lucide="shield" style={{"width":"13px"}}></i>
            <span>Apply ceilings</span>
          </button>
        </div>
      </div>
    </div>
    </div>

    
    <div className="tab-content" data-tab-content="mrr">
      <div className="metrics">
        <div className="metric"><div className="metric-label">Net new MRR</div><div className="metric-value tx-green">+Rs 123,900</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+7.2%</span></div><div className="metric-help">This month</div></div>
        <div className="metric"><div className="metric-label">Expansion MRR</div><div className="metric-value">Rs 24,500</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>12 upgrades</span></div><div className="metric-help">Growth → Pro mainly</div></div>
        <div className="metric"><div className="metric-label">Churn MRR</div><div className="metric-value tx-red">−Rs 75,500</div><div className="metric-change down"><i data-lucide="arrow-down-right" style={{"width":"11px"}}></i><span>15 merchants</span></div><div className="metric-help">2.1% churn rate</div></div>
        <div className="metric"><div className="metric-label">Net MRR retention</div><div className="metric-value tx-green">96%</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+2 pts</span></div><div className="metric-help">Target 100%+</div></div>
      </div>

      <div className="card mb-5">
        <header className="card-header"><h3 className="card-title">MRR by plan tier</h3><span className="card-meta">June 2026 distribution</span></header>
        <div className="card-body">
          <div className="data-row"><div className="flex items-center gap-3" style={{"flex":"1"}}><span className="tier tier-pro">Pro</span><span className="data-row-label">200 merchants × Rs 4,999</span></div><span className="data-row-value">Rs 999,800</span></div>
          <div className="data-row"><div className="flex items-center gap-3" style={{"flex":"1"}}><span className="tier tier-growth">Growth</span><span className="data-row-label">300 merchants × Rs 2,499</span></div><span className="data-row-value">Rs 749,700</span></div>
          <div className="data-row"><div className="flex items-center gap-3" style={{"flex":"1"}}><span className="tier tier-starter">Starter</span><span className="data-row-label">347 merchants × Rs 999</span></div><span className="data-row-value">Rs 346,653</span></div>
          <div className="data-row" style={{"borderTop":"1px solid var(--b-2)","marginTop":"var(--s-2)","paddingTop":"var(--s-3)"}}><span className="data-row-label fw-semibold">Total MRR</span><span className="data-row-value num-lg tx-green">Rs 2,096,153</span></div>
        </div>
      </div>

      <div className="card">
        <header className="card-header"><h3 className="card-title">MRR movement (last 12 months)</h3><span className="card-meta">Cumulative growth</span></header>
        <div className="card-body">
          <div className="bar-chart" style={{"height":"160px"}}>
            <div className="bar-chart-bar" style={{"height":"18%"}} title="Jul · Rs 245k"></div>
            <div className="bar-chart-bar" style={{"height":"24%"}} title="Aug · Rs 312k"></div>
            <div className="bar-chart-bar" style={{"height":"32%"}} title="Sep · Rs 420k"></div>
            <div className="bar-chart-bar" style={{"height":"38%"}} title="Oct · Rs 510k"></div>
            <div className="bar-chart-bar" style={{"height":"46%"}} title="Nov · Rs 612k"></div>
            <div className="bar-chart-bar" style={{"height":"54%"}} title="Dec · Rs 745k"></div>
            <div className="bar-chart-bar" style={{"height":"60%"}} title="Jan · Rs 892k"></div>
            <div className="bar-chart-bar" style={{"height":"68%"}} title="Feb · Rs 1.04L"></div>
            <div className="bar-chart-bar" style={{"height":"74%"}} title="Mar · Rs 1.32L"></div>
            <div className="bar-chart-bar" style={{"height":"82%"}} title="Apr · Rs 1.58L"></div>
            <div className="bar-chart-bar" style={{"height":"91%"}} title="May · Rs 1.72L"></div>
            <div className="bar-chart-bar active" style={{"height":"100%"}} title="Jun · Rs 1.84L"></div>
          </div>
          <div className="flex justify-between t-xs tx-4 mt-3">
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span className="tx-green fw-semibold">Jun</span>
          </div>
        </div>
      </div>
    </div>

    
    <div className="tab-content" data-tab-content="costs">
      <div className="metrics">
        <div className="metric"><div className="metric-label">Total spend MTD</div><div className="metric-value">Rs 259,000</div><div className="metric-change flat"><i data-lucide="minus" style={{"width":"11px"}}></i><span>14% of MRR</span></div><div className="metric-help">On track for budget</div></div>
        <div className="metric"><div className="metric-label">Largest cost</div><div className="metric-value">Rs 142k</div><div className="metric-change flat"><i data-lucide="zap" style={{"width":"11px"}}></i><span>Anthropic 55%</span></div><div className="metric-help">AI inference</div></div>
        <div className="metric"><div className="metric-label">Forecast EOM</div><div className="metric-value">Rs 280k</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+8%</span></div><div className="metric-help">Within budget</div></div>
        <div className="metric"><div className="metric-label">Cost / merchant</div><div className="metric-value">Rs 306</div><div className="metric-change down"><i data-lucide="arrow-down-right" style={{"width":"11px"}}></i><span>−Rs 24</span></div><div className="metric-help">Improving with scale</div></div>
      </div>
      <div className="card">
        <header className="card-header"><h3 className="card-title">Detailed cost breakdown</h3><button className="btn btn-xs btn-ghost"><i data-lucide="download" style={{"width":"11px"}}></i><span>Export</span></button></header>
        <table className="table">
          <thead><tr><th>Vendor</th><th>Category</th><th className="text-right">This month</th><th className="text-right">vs last</th><th className="text-right">% of total</th><th>Trend</th></tr></thead>
          <tbody>
            <tr><td className="fw-medium">Anthropic API</td><td className="tx-3 t-sm">AI inference</td><td className="text-right num">Rs 142,000</td><td className="text-right num tx-yellow">+12%</td><td className="text-right num">55%</td><td><span className="badge yellow">Rising</span></td></tr>
            <tr><td className="fw-medium">360dialog (WhatsApp BSP)</td><td className="tx-3 t-sm">Messaging</td><td className="text-right num">Rs 78,000</td><td className="text-right num tx-2">+4%</td><td className="text-right num">30%</td><td><span className="badge gray">Stable</span></td></tr>
            <tr><td className="fw-medium">Cloudflare</td><td className="tx-3 t-sm">CDN + Workers</td><td className="text-right num">Rs 12,000</td><td className="text-right num tx-2">0%</td><td className="text-right num">5%</td><td><span className="badge gray">Flat</span></td></tr>
            <tr><td className="fw-medium">Neon (Postgres)</td><td className="tx-3 t-sm">Database</td><td className="text-right num">Rs 8,500</td><td className="text-right num tx-yellow">+8%</td><td className="text-right num">3%</td><td><span className="badge yellow">Rising</span></td></tr>
            <tr><td className="fw-medium">Upstash (Redis)</td><td className="tx-3 t-sm">Cache + Queue</td><td className="text-right num">Rs 4,200</td><td className="text-right num tx-2">+2%</td><td className="text-right num">2%</td><td><span className="badge gray">Stable</span></td></tr>
            <tr><td className="fw-medium">Resend</td><td className="tx-3 t-sm">Email</td><td className="text-right num">Rs 3,800</td><td className="text-right num tx-green">−5%</td><td className="text-right num">1.5%</td><td><span className="badge green">Optimized</span></td></tr>
            <tr><td className="fw-medium">Sentry + Logtail</td><td className="tx-3 t-sm">Monitoring</td><td className="text-right num">Rs 2,800</td><td className="text-right num tx-2">0%</td><td className="text-right num">1%</td><td><span className="badge gray">Flat</span></td></tr>
            <tr><td className="fw-medium">Crisp</td><td className="tx-3 t-sm">Support chat</td><td className="text-right num">Rs 2,500</td><td className="text-right num tx-2">0%</td><td className="text-right num">1%</td><td><span className="badge gray">Flat</span></td></tr>
            <tr><td className="fw-medium">Stripe fees</td><td className="tx-3 t-sm">Payment processing</td><td className="text-right num">Rs 2,200</td><td className="text-right num tx-yellow">+18%</td><td className="text-right num">0.9%</td><td><span className="badge yellow">Volume</span></td></tr>
            <tr><td className="fw-medium">Misc SaaS</td><td className="tx-3 t-sm">Notion, Figma, Linear</td><td className="text-right num">Rs 3,000</td><td className="text-right num tx-2">0%</td><td className="text-right num">1.6%</td><td><span className="badge gray">Flat</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    
    <div className="tab-content" data-tab-content="profitability">
      <div className="metrics">
        <div className="metric"><div className="metric-label">Gross margin</div><div className="metric-value tx-green">86%</div><div className="metric-change flat"><i data-lucide="minus" style={{"width":"11px"}}></i><span>Industry 70-80%</span></div><div className="metric-help">Above benchmark</div></div>
        <div className="metric"><div className="metric-label">Contribution margin</div><div className="metric-value tx-green">82%</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+3pts</span></div><div className="metric-help">After CAC payback</div></div>
        <div className="metric"><div className="metric-label">Profitable tenants</div><div className="metric-value">844 / 847</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>99.6%</span></div><div className="metric-help">3 losing money</div></div>
        <div className="metric"><div className="metric-label">Avg LTV</div><div className="metric-value">Rs 14,200</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+8%</span></div><div className="metric-help">Per merchant</div></div>
      </div>
      <div className="card">
        <header className="card-header"><div><h3 className="card-title">All merchant profitability</h3><div className="card-meta">Sorted by net margin · 847 merchants</div></div><div className="flex gap-2"><div className="input-wrap"><i data-lucide="search" className="input-wrap-icon"></i><input className="input" placeholder="Search..." style={{"width":"200px"}} /></div><button className="btn btn-sm"><i data-lucide="filter" style={{"width":"13px"}}></i><span>Filter</span></button></div></header>
        <table className="table">
          <thead><tr><th>Merchant</th><th>Plan</th><th className="text-right">MRR</th><th className="text-right">Cost</th><th className="text-right">Net</th><th className="text-right">Margin</th><th className="text-right">LTV</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td><div className="m-cell"><div className="m-avatar av1">SB</div><span className="m-name">Saima Boutique</span></div></td><td><span className="tier tier-pro">Pro</span></td><td className="text-right num">Rs 4,999</td><td className="text-right num">Rs 487</td><td className="text-right num tx-green">Rs 4,487</td><td className="text-right"><span className="badge green">89.8%</span></td><td className="text-right num">Rs 23,800</td><td><span className="badge green">Profitable</span></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av2">KS</div><span className="m-name">Karachi Style</span></div></td><td><span className="tier tier-pro">Pro</span></td><td className="text-right num">Rs 4,999</td><td className="text-right num">Rs 523</td><td className="text-right num tx-green">Rs 4,451</td><td className="text-right"><span className="badge green">89.0%</span></td><td className="text-right num">Rs 19,400</td><td><span className="badge green">Profitable</span></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av3">EC</div><span className="m-name">Eid Collection</span></div></td><td><span className="tier tier-pro">Pro</span></td><td className="text-right num">Rs 4,999</td><td className="text-right num">Rs 614</td><td className="text-right num tx-green">Rs 4,367</td><td className="text-right"><span className="badge green">87.4%</span></td><td className="text-right num">Rs 16,990</td><td><span className="badge green">Profitable</span></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av4">LP</div><span className="m-name">Lawn Pro</span></div></td><td><span className="tier tier-growth">Growth</span></td><td className="text-right num">Rs 2,499</td><td className="text-right num">Rs 342</td><td className="text-right num tx-green">Rs 2,157</td><td className="text-right"><span className="badge green">86.3%</span></td><td className="text-right num">Rs 7,499</td><td><span className="badge green">Profitable</span></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av5">SS</div><span className="m-name">Skin Studio</span></div></td><td><span className="tier tier-growth">Growth</span></td><td className="text-right num">Rs 2,499</td><td className="text-right num">Rs 384</td><td className="text-right num tx-green">Rs 2,115</td><td className="text-right"><span className="badge green">84.6%</span></td><td className="text-right num">Rs 6,999</td><td><span className="badge green">Profitable</span></td></tr>
            <tr className="row-yellow"><td><div className="m-cell"><div className="m-avatar av4">MA</div><span className="m-name">Multi-account #45</span></div></td><td><span className="tier tier-growth">Growth</span></td><td className="text-right num">Rs 2,499</td><td className="text-right num tx-yellow">Rs 2,890</td><td className="text-right num tx-yellow">−Rs 391</td><td className="text-right"><span className="badge yellow">−15.6%</span></td><td className="text-right num">Rs 12,495</td><td><span className="badge yellow">Review</span></td></tr>
            <tr className="row-red"><td><div className="m-cell"><div className="m-avatar av8">HR</div><span className="m-name">Heavy Reporter #91</span></div></td><td><span className="tier tier-starter">Starter</span></td><td className="text-right num">Rs 999</td><td className="text-right num tx-red">Rs 1,420</td><td className="text-right num tx-red">−Rs 421</td><td className="text-right"><span className="badge red">−42.1%</span></td><td className="text-right num">Rs 2,997</td><td><span className="badge red">Losing money</span></td></tr>
            <tr className="row-red"><td><div className="m-cell"><div className="m-avatar av6">PU</div><span className="m-name">Power User #234</span></div></td><td><span className="tier tier-starter">Starter</span></td><td className="text-right num">Rs 999</td><td className="text-right num tx-red">Rs 1,840</td><td className="text-right num tx-red">−Rs 841</td><td className="text-right"><span className="badge red">−84.2%</span></td><td className="text-right num">Rs 999</td><td><span className="badge red">Losing money</span></td></tr>
          </tbody>
        </table>
        <div style={{"padding":"var(--s-3) var(--s-4)","borderTop":"1px solid var(--b-1)","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
          <span className="t-xs tx-3">Showing 8 of 847 merchants</span>
          <div className="flex items-center gap-2"><button className="btn btn-xs btn-ghost"><i data-lucide="chevron-left" style={{"width":"12px"}}></i></button><span className="t-xs tx-3">Page 1 of 106</span><button className="btn btn-xs btn-ghost"><i data-lucide="chevron-right" style={{"width":"12px"}}></i></button></div>
        </div>
      </div>
    </div>

    
    <div className="tab-content" data-tab-content="failed">
      <div className="metrics">
        <div className="metric"><div className="metric-label">Active failures</div><div className="metric-value tx-red">7</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+2</span></div><div className="metric-help">Rs 18,990 at risk</div></div>
        <div className="metric"><div className="metric-label">Auto-recovery rate</div><div className="metric-value tx-green">82%</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+4pts</span></div><div className="metric-help">Via Stripe Smart Retries</div></div>
        <div className="metric"><div className="metric-label">Recovered this month</div><div className="metric-value">Rs 34,500</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>14 merchants</span></div><div className="metric-help">From dunning emails</div></div>
        <div className="metric"><div className="metric-label">Avg time to recover</div><div className="metric-value">3.2 days</div><div className="metric-change down"><i data-lucide="arrow-down-right" style={{"width":"11px"}}></i><span>−0.8 days</span></div><div className="metric-help">Improving</div></div>
      </div>
      <div className="card">
        <header className="card-header"><div><h3 className="card-title">Failed payments queue</h3><div className="card-meta">Auto-retry scheduled · manual action available</div></div><button className="btn btn-sm btn-primary"><i data-lucide="refresh-cw" style={{"width":"13px"}}></i><span>Retry all</span></button></header>
        <table className="table">
          <thead><tr><th>Merchant</th><th>Amount</th><th>Failed on</th><th>Reason</th><th>Retries</th><th>Next retry</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr className="row-red"><td><div className="m-cell"><div className="m-avatar av6">AB</div><span className="m-name">Ahmad's Beauty</span></div></td><td className="num">Rs 4,999</td><td className="tx-3 t-sm">Jun 5</td><td className="t-sm">Insufficient funds</td><td className="num">2/4</td><td className="tx-3 t-sm">Jun 8 · 09:00</td><td><span className="badge red">Failed</span></td><td><button className="btn btn-xs">Contact</button></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av4">FH</div><span className="m-name">Fashion Hub Lhr</span></div></td><td className="num">Rs 2,499</td><td className="tx-3 t-sm">Jun 4</td><td className="t-sm">Card declined</td><td className="num">3/4</td><td className="tx-3 t-sm">Jun 7 · 14:00</td><td><span className="badge yellow">Retrying</span></td><td><button className="btn btn-xs">Update card</button></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av5">ST</div><span className="m-name">Style Trends</span></div></td><td className="num">Rs 2,499</td><td className="tx-3 t-sm">Jun 4</td><td className="t-sm">Expired card</td><td className="num">1/4</td><td className="tx-3 t-sm">Jun 7 · 10:00</td><td><span className="badge yellow">Retrying</span></td><td><button className="btn btn-xs">Email</button></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av7">NS</div><span className="m-name">Noor Studio</span></div></td><td className="num">Rs 999</td><td className="tx-3 t-sm">Jun 3</td><td className="t-sm">Authentication failed</td><td className="num">2/4</td><td className="tx-3 t-sm">Jun 8 · 11:00</td><td><span className="badge yellow">Retrying</span></td><td><button className="btn btn-xs">Contact</button></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av2">FP</div><span className="m-name">Fancy Pakistan</span></div></td><td className="num">Rs 999</td><td className="tx-3 t-sm">Jun 3</td><td className="t-sm">Card declined</td><td className="num">1/4</td><td className="tx-3 t-sm">Jun 7 · 10:00</td><td><span className="badge yellow">Retrying</span></td><td><button className="btn btn-xs">Email</button></td></tr>
            <tr><td><div className="m-cell"><div className="m-avatar av3">MK</div><span className="m-name">Malik Brothers</span></div></td><td className="num">Rs 2,499</td><td className="tx-3 t-sm">Jun 2</td><td className="t-sm">Insufficient funds</td><td className="num">3/4</td><td className="tx-3 t-sm">Jun 9 · 09:00</td><td><span className="badge yellow">Retrying</span></td><td><button className="btn btn-xs">Contact</button></td></tr>
            <tr className="row-red"><td><div className="m-cell"><div className="m-avatar av8">DT</div><span className="m-name">Daraz Topseller</span></div></td><td className="num">Rs 4,499</td><td className="tx-3 t-sm">May 28</td><td className="t-sm">Customer disputed</td><td className="num">4/4</td><td className="tx-3 t-sm">—</td><td><span className="badge red">Exhausted</span></td><td><button className="btn btn-xs btn-danger">Suspend</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    
    <div className="tab-content" data-tab-content="refunds">
      <div className="metrics">
        <div className="metric"><div className="metric-label">Pending refunds</div><div className="metric-value tx-yellow">2</div><div className="metric-change flat"><i data-lucide="clock" style={{"width":"11px"}}></i><span>Awaiting review</span></div><div className="metric-help">Rs 7,498 total</div></div>
        <div className="metric"><div className="metric-label">Refunded MTD</div><div className="metric-value">Rs 12,498</div><div className="metric-change flat"><i data-lucide="minus" style={{"width":"11px"}}></i><span>4 refunds</span></div><div className="metric-help">0.7% of MRR</div></div>
        <div className="metric"><div className="metric-label">Refund rate</div><div className="metric-value tx-green">0.5%</div><div className="metric-change down"><i data-lucide="arrow-down-right" style={{"width":"11px"}}></i><span>−0.2pts</span></div><div className="metric-help">Industry 1-3%</div></div>
        <div className="metric"><div className="metric-label">Top reason</div><div className="metric-value sm">Service issue</div><div className="metric-change flat"><i data-lucide="info" style={{"width":"11px"}}></i><span>40%</span></div><div className="metric-help">Down from 55%</div></div>
      </div>
      <div className="card">
        <header className="card-header"><div><h3 className="card-title">Refund history</h3><div className="card-meta">All refunds · audited · FBR reportable</div></div><button className="btn btn-sm btn-primary" ><i data-lucide="plus" style={{"width":"13px"}}></i><span>Process refund</span></button></header>
        <table className="table">
          <thead><tr><th>Date</th><th>Merchant</th><th className="text-right">Amount</th><th>Reason</th><th>Processed by</th><th>Status</th></tr></thead>
          <tbody>
            <tr className="row-yellow"><td className="tx-3 t-sm">Jun 6 · 10:24</td><td><div className="m-cell"><div className="m-avatar av4">MA</div><span className="m-name">Multi-account #45</span></div></td><td className="text-right num">Rs 4,999</td><td className="t-sm">Downgrade refund</td><td className="t-sm tx-3">Pending</td><td><span className="badge yellow">Pending review</span></td></tr>
            <tr className="row-yellow"><td className="tx-3 t-sm">Jun 5 · 16:08</td><td><div className="m-cell"><div className="m-avatar av7">NS</div><span className="m-name">Noor Studio</span></div></td><td className="text-right num">Rs 2,499</td><td className="t-sm">Customer request</td><td className="t-sm tx-3">Pending</td><td><span className="badge yellow">Pending review</span></td></tr>
            <tr><td className="tx-3 t-sm">Jun 4 · 09:15</td><td><div className="m-cell"><div className="m-avatar av6">PU</div><span className="m-name">Power User #234</span></div></td><td className="text-right num">Rs 999</td><td className="t-sm">Service issue</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"18px","height":"18px","fontSize":"9px"}}>AK</div><span className="t-sm">Ahmad</span></div></td><td><span className="badge green">Completed</span></td></tr>
            <tr><td className="tx-3 t-sm">May 28 · 14:22</td><td><div className="m-cell"><div className="m-avatar av3">EC</div><span className="m-name">Eid Collection</span></div></td><td className="text-right num">Rs 4,999</td><td className="t-sm">Double-charged</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"18px","height":"18px","fontSize":"9px"}}>AK</div><span className="t-sm">Ahmad</span></div></td><td><span className="badge green">Completed</span></td></tr>
            <tr><td className="tx-3 t-sm">May 22 · 11:30</td><td><div className="m-cell"><div className="m-avatar av5">SS</div><span className="m-name">Skin Studio</span></div></td><td className="text-right num">Rs 2,499</td><td className="t-sm">Downgrade pro-rata</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"18px","height":"18px","fontSize":"9px"}}>AK</div><span className="t-sm">Ahmad</span></div></td><td><span className="badge green">Completed</span></td></tr>
            <tr><td className="tx-3 t-sm">May 15 · 08:42</td><td><div className="m-cell"><div className="m-avatar av2">KS</div><span className="m-name">Karachi Style</span></div></td><td className="text-right num">Rs 1,500</td><td className="t-sm">Loyalty credit</td><td><div className="m-cell"><div className="m-avatar av1" style={{"width":"18px","height":"18px","fontSize":"9px"}}>AK</div><span className="t-sm">Ahmad</span></div></td><td><span className="badge green">Completed</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    
    <div className="tab-content" data-tab-content="tax">
      <div className="metrics">
        <div className="metric"><div className="metric-label">Sales tax collected MTD</div><div className="metric-value">Rs 313,431</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>17% of MRR</span></div><div className="metric-help">Payable by July 15</div></div>
        <div className="metric"><div className="metric-label">Income (FY26)</div><div className="metric-value">Rs 1.84 Cr</div><div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+184%</span></div><div className="metric-help">Year-on-year</div></div>
        <div className="metric"><div className="metric-label">Tax liability est.</div><div className="metric-value">Rs 4.2L</div><div className="metric-change flat"><i data-lucide="info" style={{"width":"11px"}}></i><span>29% slab</span></div><div className="metric-help">Provisional FY26</div></div>
        <div className="metric"><div className="metric-label">NTN status</div><div className="metric-value tx-green sm">Active</div><div className="metric-change flat"><i data-lucide="shield-check" style={{"width":"11px"}}></i><span>Filer</span></div><div className="metric-help">Last filed Mar 2026</div></div>
      </div>

      <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"var(--s-5)","marginBottom":"var(--s-5)"}}>
        <div className="card">
          <header className="card-header"><h3 className="card-title">Tax reports</h3><span className="card-meta">Generate FBR-ready exports</span></header>
          <div className="card-body">
            <div className="data-row"><span className="data-row-label">Monthly sales tax (June)</span><button className="btn btn-xs"><i data-lucide="download" style={{"width":"11px"}}></i><span>Generate</span></button></div>
            <div className="data-row"><span className="data-row-label">Quarterly income statement</span><button className="btn btn-xs"><i data-lucide="download" style={{"width":"11px"}}></i><span>Generate</span></button></div>
            <div className="data-row"><span className="data-row-label">Annual return FY26</span><button className="btn btn-xs"><i data-lucide="download" style={{"width":"11px"}}></i><span>Generate</span></button></div>
            <div className="data-row"><span className="data-row-label">Withholding tax statement</span><button className="btn btn-xs"><i data-lucide="download" style={{"width":"11px"}}></i><span>Generate</span></button></div>
            <div className="data-row"><span className="data-row-label">Customer invoice register</span><button className="btn btn-xs"><i data-lucide="download" style={{"width":"11px"}}></i><span>Generate</span></button></div>
          </div>
        </div>
        <div className="card">
          <header className="card-header"><h3 className="card-title">Compliance status</h3><span className="badge green">All current</span></header>
          <div className="card-body">
            <div className="status-row"><span className="status-dot up"></span><span className="status-name">NTN registration</span><span className="status-meta tx-green">Active</span></div>
            <div className="status-row"><span className="status-dot up"></span><span className="status-name">Sales tax registration</span><span className="status-meta tx-green">Active</span></div>
            <div className="status-row"><span className="status-dot up"></span><span className="status-name">PRA (Punjab)</span><span className="status-meta tx-green">Registered</span></div>
            <div className="status-row"><span className="status-dot up"></span><span className="status-name">Last monthly return</span><span className="status-meta">May · paid</span></div>
            <div className="status-row"><span className="status-dot up"></span><span className="status-name">Annual return FY25</span><span className="status-meta">Filed Sep 2025</span></div>
            <div className="status-row"><span className="status-dot up"></span><span className="status-name">Filer status (ATL)</span><span className="status-meta tx-green">Active</span></div>
          </div>
        </div>
      </div>

      <div className="card">
        <header className="card-header"><h3 className="card-title">Upcoming deadlines</h3><span className="card-meta">FBR filing calendar</span></header>
        <div className="card-body">
          <div className="alert warning"><div className="alert-icon"><i data-lucide="calendar-clock" style={{"width":"14px"}}></i></div><div className="alert-body"><div className="alert-title">June sales tax return due</div><div className="alert-desc">Filing deadline July 15, 2026 · est. Rs 313,431 · auto-generated</div></div><div className="alert-time">39 days</div></div>
          <div className="alert info"><div className="alert-icon"><i data-lucide="calendar" style={{"width":"14px"}}></i></div><div className="alert-body"><div className="alert-title">Quarterly advance tax</div><div className="alert-desc">Due September 15, 2026 · estimated Rs 1.1L</div></div><div className="alert-time">100 days</div></div>
          <div className="alert info"><div className="alert-icon"><i data-lucide="calendar" style={{"width":"14px"}}></i></div><div className="alert-body"><div className="alert-title">Annual return FY26</div><div className="alert-desc">Due September 30, 2026 · est. Rs 4.2L total tax</div></div><div className="alert-time">115 days</div></div>
        </div>
      </div>
    </div>

  </section>
    </>
  );
}
