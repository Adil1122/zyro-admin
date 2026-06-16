
import React from 'react';

export default function IntelView() {
  return (
    <>
      <section className="view active" id="view-intel">

    <header className="page-header">
      <div>
        <h1 className="page-title">Intelligence</h1>
        <p className="page-subtitle">Growth · cohorts · churn analysis · feature adoption</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm">
          <i data-lucide="calendar" style={{"width":"13px"}}></i>
          <span>Last 6 months</span>
          <i data-lucide="chevron-down" style={{"width":"12px"}}></i>
        </button>
        <button className="btn btn-sm">
          <i data-lucide="download" style={{"width":"13px"}}></i>
          <span>Export</span>
        </button>
      </div>
    </header>

    <div className="metrics">
      <div className="metric">
        <div className="metric-label">Trial → paid</div>
        <div className="metric-value">34%</div>
        <div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+6 pts</span></div>
        <div className="metric-help">Industry avg 25%</div>
      </div>
      <div className="metric">
        <div className="metric-label">Activation rate</div>
        <div className="metric-value">78%</div>
        <div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+3 pts</span></div>
        <div className="metric-help">First WA reply &lt; 24h</div>
      </div>
      <div className="metric">
        <div className="metric-label">6-mo retention</div>
        <div className="metric-value tx-green">82%</div>
        <div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+4 pts</span></div>
        <div className="metric-help">Excellent for SMB</div>
      </div>
      <div className="metric">
        <div className="metric-label">Referral rate</div>
        <div className="metric-value">18%</div>
        <div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"11px"}}></i><span>+5 pts</span></div>
        <div className="metric-help">Best growth channel</div>
      </div>
    </div>

    
    <div className="card mb-5">
      <header className="card-header">
        <div>
          <h3 className="card-title">Cohort retention</h3>
          <div className="card-meta">% of merchants still paying after N months</div>
        </div>
        <span className="badge green">82% at M6</span>
      </header>
      <div className="card-body">
        <table className="cohort">
          <thead>
            <tr>
              <th>Cohort</th>
              <th>Size</th>
              <th>M1</th>
              <th>M2</th>
              <th>M3</th>
              <th>M4</th>
              <th>M5</th>
              <th>M6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan 2026</td>
              <td>82</td>
              <td className="c100">100</td>
              <td className="c95">94</td>
              <td className="c90">92</td>
              <td className="c85">88</td>
              <td className="c80">85</td>
              <td className="c80">82</td>
            </tr>
            <tr>
              <td>Feb 2026</td>
              <td>124</td>
              <td className="c100">100</td>
              <td className="c95">93</td>
              <td className="c90">90</td>
              <td className="c85">87</td>
              <td className="c80">84</td>
              <td className="cEmpty">—</td>
            </tr>
            <tr>
              <td>Mar 2026</td>
              <td>156</td>
              <td className="c100">100</td>
              <td className="c90">92</td>
              <td className="c85">89</td>
              <td className="c80">85</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
            </tr>
            <tr>
              <td>Apr 2026</td>
              <td>189</td>
              <td className="c100">100</td>
              <td className="c90">91</td>
              <td className="c85">88</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
            </tr>
            <tr>
              <td>May 2026</td>
              <td>218</td>
              <td className="c100">100</td>
              <td className="c90">90</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
            </tr>
            <tr>
              <td>Jun 2026</td>
              <td>78</td>
              <td className="c100">100</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
              <td className="cEmpty">—</td>
            </tr>
          </tbody>
        </table>

        <div style={{"marginTop":"var(--s-4)","padding":"var(--s-3) var(--s-4)","background":"var(--brand-bg)","border":"1px solid var(--brand-border)","borderRadius":"var(--r-md)","display":"flex","alignItems":"flex-start","gap":"var(--s-3)"}}>
          <i data-lucide="trending-up" style={{"width":"16px","color":"var(--brand)","flexShrink":"0","marginTop":"2px"}}></i>
          <div className="t-sm">
            <strong className="tx-green">Strong retention curves.</strong>
            <span className="tx-2">Each cohort performs slightly better than the previous, indicating increasing product-market fit.</span>
          </div>
        </div>
      </div>
    </div>

    
    <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"var(--s-5)","marginBottom":"var(--s-5)"}}>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Why merchants churn</h3>
            <div className="card-meta">From exit surveys · 15 in last 30 days</div>
          </div>
        </header>
        <div className="card-body">

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Didn't see ROI</span>
              <span className="num fw-semibold tx-yellow">4 (27%)</span>
            </div>
            <div className="progress"><div className="progress-bar yellow" style={{"width":"27%"}}></div></div>
            <div className="t-xs tx-3 mt-2">→ Action: Improve onboarding ROI demonstration</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Too expensive</span>
              <span className="num fw-semibold tx-yellow">3 (20%)</span>
            </div>
            <div className="progress"><div className="progress-bar yellow" style={{"width":"20%"}}></div></div>
            <div className="t-xs tx-3 mt-2">→ Test Rs 999 entry tier (in pipeline)</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Other reasons</span>
              <span className="num fw-semibold tx-2">3 (20%)</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"20%","background":"var(--tx-3)"}}></div></div>
            <div className="t-xs tx-3 mt-2">Investigate individually</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Business closed</span>
              <span className="num fw-semibold tx-2">2 (13%)</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"13%","background":"var(--tx-3)"}}></div></div>
            <div className="t-xs tx-3 mt-2">Out of our control</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Technical issues</span>
              <span className="num fw-semibold tx-red">2 (13%)</span>
            </div>
            <div className="progress"><div className="progress-bar red" style={{"width":"13%"}}></div></div>
            <div className="t-xs tx-3 mt-2">→ Critical: Fix bugs from exit surveys</div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Switched to Ginkgo</span>
              <span className="num fw-semibold" style={{"color":"var(--purple)"}}>1 (7%)</span>
            </div>
            <div className="progress"><div className="progress-bar purple" style={{"width":"7%"}}></div></div>
            <div className="t-xs tx-3 mt-2">Enterprise features · expected</div>
          </div>

          <div style={{"marginTop":"var(--s-5)","padding":"var(--s-3) var(--s-4)","background":"var(--yellow-bg)","border":"1px solid var(--yellow-border)","borderRadius":"var(--r-md)","display":"flex","alignItems":"flex-start","gap":"var(--s-3)"}}>
            <i data-lucide="target" style={{"width":"16px","color":"var(--yellow)","flexShrink":"0","marginTop":"2px"}}></i>
            <div className="t-sm">
              <strong className="tx-yellow">Biggest opportunity:</strong>
              <span className="tx-2">27% churn due to unclear ROI. Better onboarding could save ~Rs 20k MRR/month.</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Feature adoption</h3>
            <div className="card-meta">% of active merchants using weekly</div>
          </div>
        </header>
        <div className="card-body">

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">WhatsApp Inbox AI</span>
              <span className="num fw-semibold tx-green">98%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"98%"}}></div></div>
            <div className="t-xs tx-3 mt-2">Core · sticky</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Daily Report</span>
              <span className="num fw-semibold tx-green">87%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"87%"}}></div></div>
            <div className="t-xs tx-3 mt-2">Strong habit formed</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Order Capture</span>
              <span className="num fw-semibold tx-green">82%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"82%"}}></div></div>
            <div className="t-xs tx-3 mt-2">High value · improves with use</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Multi-courier</span>
              <span className="num fw-semibold tx-green">67%</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{"width":"67%"}}></div></div>
            <div className="t-xs tx-3 mt-2">Good for established</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">RTO Killer</span>
              <span className="num fw-semibold tx-yellow">45%</span>
            </div>
            <div className="progress"><div className="progress-bar yellow" style={{"width":"45%"}}></div></div>
            <div className="t-xs tx-3 mt-2">Under-used · improve discoverability</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Customer Reliability</span>
              <span className="num fw-semibold tx-yellow">34%</span>
            </div>
            <div className="progress"><div className="progress-bar yellow" style={{"width":"34%"}}></div></div>
            <div className="t-xs tx-3 mt-2">Educate merchants on value</div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Eid Optimizer</span>
              <span className="num fw-semibold tx-yellow">23%</span>
            </div>
            <div className="progress"><div className="progress-bar yellow" style={{"width":"23%"}}></div></div>
            <div className="t-xs tx-3 mt-2">Seasonal · fine</div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="t-sm fw-medium">Pattern Detection</span>
              <span className="num fw-semibold tx-red">12%</span>
            </div>
            <div className="progress"><div className="progress-bar red" style={{"width":"12%"}}></div></div>
            <div className="t-xs tx-3 mt-2">→ Decision: kill or improve</div>
          </div>
        </div>
      </div>
    </div>

    
    <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"var(--s-5)"}}>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Growth engines</h3>
            <div className="card-meta">47 signups this week</div>
          </div>
        </header>
        <div className="card-body">

          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--brand)"}}></div>
              <span className="data-row-label">Organic (Google)</span>
              <span className="tx-4 t-xs">38%</span>
            </div>
            <span className="data-row-value">18</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--purple)"}}></div>
              <span className="data-row-label">Instagram (your content)</span>
              <span className="tx-4 t-xs">32%</span>
            </div>
            <span className="data-row-value">15</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--yellow)"}}></div>
              <span className="data-row-label">Referrals</span>
              <span className="tx-4 t-xs">18%</span>
            </div>
            <span className="data-row-value">8</span>
          </div>
          <div className="data-row">
            <div className="flex items-center gap-3" style={{"flex":"1"}}>
              <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--blue)"}}></div>
              <span className="data-row-label">Direct / paid ads</span>
              <span className="tx-4 t-xs">12%</span>
            </div>
            <span className="data-row-value">6</span>
          </div>

          <div style={{"marginTop":"var(--s-4)","padding":"var(--s-3) var(--s-4)","background":"var(--purple-bg)","border":"1px solid var(--purple-border)","borderRadius":"var(--r-md)","display":"flex","alignItems":"flex-start","gap":"var(--s-3)"}}>
            <i data-lucide="instagram" style={{"width":"16px","color":"var(--purple)","flexShrink":"0","marginTop":"2px"}}></i>
            <div className="t-sm tx-2">
              Founder content is 32% of growth. <strong className="tx-green">Keep posting Pakistani SMB content</strong> — highest ROI channel.
            </div>
          </div>
        </div>
      </div>

      
      <div className="card">
        <header className="card-header">
          <div>
            <h3 className="card-title">Activation funnel</h3>
            <div className="card-meta">Trial → paid pipeline · last 30 days</div>
          </div>
        </header>
        <div className="card-body">

          <div style={{"display":"flex","flexDirection":"column","gap":"var(--s-2)"}}>
            <div style={{"padding":"var(--s-3) var(--s-4)","background":"var(--bg-2)","border":"1px solid var(--b-1)","borderRadius":"var(--r-md)"}}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="t-sm fw-medium">Visited landing</div>
                  <div className="t-xs tx-3 mt-1">All sources</div>
                </div>
                <div className="text-right">
                  <div className="num fw-semibold num-lg">12,440</div>
                  <div className="t-xs tx-3">100%</div>
                </div>
              </div>
            </div>

            <div style={{"padding":"var(--s-3) var(--s-4)","background":"var(--bg-2)","border":"1px solid var(--b-1)","borderRadius":"var(--r-md)"}}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="t-sm fw-medium">Started signup</div>
                  <div className="t-xs tx-3 mt-1">Email entered</div>
                </div>
                <div className="text-right">
                  <div className="num fw-semibold num-lg">1,847</div>
                  <div className="t-xs tx-3">14.9%</div>
                </div>
              </div>
            </div>

            <div style={{"padding":"var(--s-3) var(--s-4)","background":"var(--bg-2)","border":"1px solid var(--b-1)","borderRadius":"var(--r-md)"}}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="t-sm fw-medium">Completed signup</div>
                  <div className="t-xs tx-3 mt-1">Verified email + phone</div>
                </div>
                <div className="text-right">
                  <div className="num fw-semibold num-lg">1,547</div>
                  <div className="t-xs tx-3">84%</div>
                </div>
              </div>
            </div>

            <div style={{"padding":"var(--s-3) var(--s-4)","background":"var(--brand-bg)","border":"1px solid var(--brand-border)","borderRadius":"var(--r-md)"}}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="t-sm fw-medium">Activated</div>
                  <div className="t-xs tx-3 mt-1">First AI reply sent</div>
                </div>
                <div className="text-right">
                  <div className="num fw-semibold tx-green num-lg">1,207</div>
                  <div className="t-xs tx-green">78%</div>
                </div>
              </div>
            </div>

            <div style={{"padding":"var(--s-3) var(--s-4)","background":"var(--green-bg)","border":"1px solid var(--green-border)","borderRadius":"var(--r-md)"}}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="t-sm fw-semibold">Converted to paid</div>
                  <div className="t-xs tx-3 mt-1">First subscription charge</div>
                </div>
                <div className="text-right">
                  <div className="num fw-semibold tx-green num-xl">410</div>
                  <div className="t-xs tx-green fw-semibold">34%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
    </>
  );
}
