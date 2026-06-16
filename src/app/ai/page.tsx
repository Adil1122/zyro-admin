
import React from 'react';

export default function AiView() {
  return (
    <>
      <section className="view active" id="view-ai">

    <header className="page-header">
      <div>
        <h1 className="page-title">AI Engine</h1>
        <p className="page-subtitle">Anthropic usage · cost ceilings · quality metrics</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm">
          <i data-lucide="calendar" style={{"width":"13px"}}></i>
          <span>This month</span>
          <i data-lucide="chevron-down" style={{"width":"12px"}}></i>
        </button>
        <button className="btn btn-sm">
          <i data-lucide="shield" style={{"width":"13px"}}></i>
          <span>Cost ceilings</span>
        </button>
        <button className="btn btn-sm btn-danger">
          <i data-lucide="ban" style={{"width":"13px"}}></i>
          <span>Emergency stop</span>
        </button>
      </div>
    </header>

    <div className="metrics">
      <div className="metric">
        <div className="metric-label">Today's spend</div>
        <div className="metric-value">Rs 4,820</div>
        <div className="metric-change flat"><i data-lucide="minus" style={{"width":"11px"}}></i><span>vs daily avg</span></div>
        <div className="metric-help">Budget Rs 6,500/day</div>
      </div>
      <div className="metric">
        <div className="metric-label">Month to date</div>
        <div className="metric-value">Rs 142,000</div>
        <div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+12% vs May</span></div>
        <div className="metric-help">Cap Rs 200,000</div>
      </div>
      <div className="metric">
        <div className="metric-label">Cost / merchant</div>
        <div className="metric-value">Rs 167</div>
        <div className="metric-change down"><i data-lucide="arrow-down-right" style={{"width":"11px"}}></i><span>−8%</span></div>
        <div className="metric-help">Target &lt; Rs 200</div>
      </div>
      <div className="metric">
        <div className="metric-label">Quality score</div>
        <div className="metric-value tx-green">96/100</div>
        <div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+2 pts</span></div>
        <div className="metric-help">0.3% hallucination rate</div>
      </div>
    </div>

    
    <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"var(--s-5)","marginBottom":"var(--s-5)"}}>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Cost by use case</h3>
            <div className="card-meta">June 2026 · Rs 142,000</div>
          </div>
        </header>
        <div className="card-body">

          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--brand)"}}></div>
              <span className="data-row-label">WhatsApp auto-replies</span>
              <span className="tx-4 t-xs">63%</span>
            </div>
            <span className="data-row-value">Rs 89,000</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--purple)"}}></div>
              <span className="data-row-label">Daily reports</span>
              <span className="tx-4 t-xs">20%</span>
            </div>
            <span className="data-row-value">Rs 28,000</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--blue)"}}></div>
              <span className="data-row-label">Order extraction</span>
              <span className="tx-4 t-xs">10%</span>
            </div>
            <span className="data-row-value">Rs 14,500</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--yellow)"}}></div>
              <span className="data-row-label">Translation (UR ↔ EN)</span>
              <span className="tx-4 t-xs">4%</span>
            </div>
            <span className="data-row-value">Rs 6,200</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--tx-3)"}}></div>
              <span className="data-row-label">Categorization</span>
              <span className="tx-4 t-xs">3%</span>
            </div>
            <span className="data-row-value">Rs 4,300</span>
          </div>

          <div style={{"marginTop":"var(--s-5)","paddingTop":"var(--s-4)","borderTop":"1px solid var(--b-1)"}}>
            <div className="drawer-section-title">By model</div>
            <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"var(--s-3)"}}>
              <div style={{"padding":"var(--s-3)","background":"var(--bg-2)","border":"1px solid var(--b-1)","borderRadius":"var(--r-md)"}}>
                <div className="t-xs tx-3 fw-medium">Claude Haiku 4.5</div>
                <div className="num fw-semibold mt-1 num-lg">Rs 124,000</div>
                <div className="t-xs tx-green mt-1">87% · primary</div>
              </div>
              <div style={{"padding":"var(--s-3)","background":"var(--bg-2)","border":"1px solid var(--b-1)","borderRadius":"var(--r-md)"}}>
                <div className="t-xs tx-3 fw-medium">Claude Sonnet 4.6</div>
                <div className="num fw-semibold mt-1 num-lg">Rs 18,000</div>
                <div className="t-xs" style={{"color":"var(--purple)"}}>13% · complex only</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Quality metrics</h3>
            <div className="card-meta">5-layer validation system</div>
          </div>
          <span className="badge green">Excellent</span>
        </header>
        <div className="card-body">

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Hallucination rate</span>
              <span className="num fw-semibold tx-green">0.3%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"3%"}}></div></div>
            <div className="t-xs tx-4 mt-1">Target &lt; 1%</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Validation failures</span>
              <span className="num fw-semibold tx-green">0.8%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"8%"}}></div></div>
            <div className="t-xs tx-4 mt-1">Target &lt; 2%</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Fallback usage</span>
              <span className="num fw-semibold tx-yellow">2.1%</span>
            </div>
            <div className="progress"><div className="progress-bar yellow" style={{"width":"21%"}}></div></div>
            <div className="t-xs tx-4 mt-1">When AI fails · monitor</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Merchant overrides</span>
              <span className="num fw-semibold tx-2">12%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"12%","background":"var(--tx-3)"}}></div></div>
            <div className="t-xs tx-4 mt-1">Acceptable</div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Customer complaints</span>
              <span className="num fw-semibold tx-green">0.02%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"0.5%"}}></div></div>
            <div className="t-xs tx-4 mt-1">Only 3 this month</div>
          </div>
        </div>
      </div>
    </div>

    
    <div className="card mb-5">
      <header className="card-header">
        <div className="flex items-center gap-3">
          <h3 className="card-title">Cost ceiling watch</h3>
          <span className="badge yellow"><i data-lucide="alert-triangle" style={{"width":"10px"}}></i>3 tenants</span>
        </div>
        <button className="btn btn-xs btn-ghost">
          <span>View all</span>
          <i data-lucide="arrow-right" style={{"width":"11px"}}></i>
        </button>
      </header>
      <div className="card-body">

        <div style={{"display":"flex","flexDirection":"column","gap":"var(--s-3)"}}>
          <div className="row-red" style={{"padding":"var(--s-4)","border":"1px solid var(--red-border)","borderRadius":"var(--r-md)","display":"flex","alignItems":"center","gap":"var(--s-4)"}}>
            <div className="m-avatar av6">PU</div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="t-sm fw-semibold">Power User #234</div>
              <div className="t-xs tx-3 mt-1">Starter · Rs 999/mo · suspected WhatsApp loop</div>
            </div>
            <div className="text-right" style={{"minWidth":"120px"}}>
              <div className="num fw-semibold tx-red">Rs 1,840</div>
              <div className="t-xs tx-3 mt-1">of Rs 2,000</div>
            </div>
            <div style={{"width":"120px"}}>
              <div className="progress"><div className="progress-bar red" style={{"width":"92%"}}></div></div>
              <div className="num t-xs tx-red mt-1 text-right">92%</div>
            </div>
            <button className="btn btn-sm btn-danger">
              <i data-lucide="ban" style={{"width":"13px"}}></i>
              <span>Cap now</span>
            </button>
          </div>

          <div className="row-yellow" style={{"padding":"var(--s-4)","border":"1px solid var(--yellow-border)","borderRadius":"var(--r-md)","display":"flex","alignItems":"center","gap":"var(--s-4)"}}>
            <div className="m-avatar av8">HR</div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="t-sm fw-semibold">Heavy Reporter #91</div>
              <div className="t-xs tx-3 mt-1">Starter · Rs 999/mo · high regeneration</div>
            </div>
            <div className="text-right" style={{"minWidth":"120px"}}>
              <div className="num fw-semibold tx-yellow">Rs 1,420</div>
              <div className="t-xs tx-3 mt-1">of Rs 2,000</div>
            </div>
            <div style={{"width":"120px"}}>
              <div className="progress"><div className="progress-bar yellow" style={{"width":"71%"}}></div></div>
              <div className="num t-xs tx-yellow mt-1 text-right">71%</div>
            </div>
            <button className="btn btn-sm">
              <i data-lucide="eye" style={{"width":"13px"}}></i>
              <span>Investigate</span>
            </button>
          </div>

          <div style={{"padding":"var(--s-4)","background":"var(--bg-2)","border":"1px solid var(--b-2)","borderRadius":"var(--r-md)","display":"flex","alignItems":"center","gap":"var(--s-4)"}}>
            <div className="m-avatar av4">MA</div>
            <div style={{"flex":"1","minWidth":"0"}}>
              <div className="t-sm fw-semibold">Multi-account #45</div>
              <div className="t-xs tx-3 mt-1">Growth · Rs 2,499/mo · multiple Instagram</div>
            </div>
            <div className="text-right" style={{"minWidth":"120px"}}>
              <div className="num fw-semibold">Rs 2,890</div>
              <div className="t-xs tx-3 mt-1">of Rs 5,000</div>
            </div>
            <div style={{"width":"120px"}}>
              <div className="progress"><div className="progress-bar" style={{"width":"58%"}}></div></div>
              <div className="num t-xs tx-2 mt-1 text-right">58%</div>
            </div>
            <button className="btn btn-sm btn-ghost">
              <i data-lucide="eye" style={{"width":"13px"}}></i>
              <span>Monitor</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    
    <div className="card">
      <header className="card-header">
        <div>
          <h3 className="card-title">Recent hallucinations caught</h3>
          <div className="card-meta">23 prevented this week by 5-layer validation</div>
        </div>
        <button className="btn btn-xs btn-ghost">
          <span>Full log</span>
          <i data-lucide="arrow-right" style={{"width":"11px"}}></i>
        </button>
      </header>
      <div className="card-body">
        <div className="alert info" style={{"marginBottom":"var(--s-2)"}}>
          <div className="alert-icon"><i data-lucide="search" style={{"width":"14px"}}></i></div>
          <div className="alert-body">
            <div className="alert-title">Phantom product mention · Tenant #142</div>
            <div className="alert-desc">AI mentioned "Maybelline Lipstick" not in inventory. Caught by <strong>entity validation</strong>. Fallback used. No merchant impact.</div>
          </div>
          <div className="alert-time">2d ago</div>
        </div>
        <div className="alert info" style={{"marginBottom":"var(--s-2)"}}>
          <div className="alert-icon"><i data-lucide="search" style={{"width":"14px"}}></i></div>
          <div className="alert-body">
            <div className="alert-title">Wrong shipping info · Tenant #67</div>
            <div className="alert-desc">AI said "COD all cities" but merchant doesn't ship KPK. Caught by <strong>merchant feedback</strong>. Edited + compensated.</div>
          </div>
          <div className="alert-time">4d ago</div>
        </div>
        <div className="alert info">
          <div className="alert-icon"><i data-lucide="search" style={{"width":"14px"}}></i></div>
          <div className="alert-body">
            <div className="alert-title">Date hallucination · Daily report #289</div>
            <div className="alert-desc">AI said "Eid March 12" but actual March 18. Caught by <strong>date validation</strong>. Regenerated.</div>
          </div>
          <div className="alert-time">6d ago</div>
        </div>
      </div>
    </div>

  </section>
    </>
  );
}
