
import React from 'react';

export default function CommandView() {
  return (
    <>
      <section className="view active" id="view-command">
    
    
    <header className="page-header">
      <div>
        <h1 className="page-title">Good morning, Ahmad</h1>
        <p className="page-subtitle">18 signups · 6 trials converted · +Rs 14,400 new MRR overnight</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm">
          <i data-lucide="calendar" style={{"width":"13px"}}></i>
          <span>Last 7 days</span>
          <i data-lucide="chevron-down" style={{"width":"12px"}}></i>
        </button>
        <button className="btn btn-sm btn-primary">
          <i data-lucide="send" style={{"width":"13px"}}></i>
          <span>Announce</span>
        </button>
      </div>
    </header>

    
    <div className="metrics">
      <div className="metric">
        <div className="metric-label">
          <span>Monthly recurring revenue</span>
          <span className="tooltip">
            <i data-lucide="info" style={{"width":"12px","color":"var(--tx-4)","cursor":"help"}}></i>
            <span className="tooltip-content">Sum of all active subscriptions, normalized to monthly</span>
          </span>
        </div>
        <div className="metric-value">Rs 18.4L</div>
        <div className="metric-change up">
          <i data-lucide="arrow-up-right" style={{"width":"11px"}}></i>
          <span>+8.2% vs last month</span>
        </div>
        <div className="metric-help">Rs 1,847,300 · target Rs 2M EOM</div>
      </div>

      <div className="metric">
        <div className="metric-label">
          <span>Paid merchants</span>
        </div>
        <div className="metric-value">847</div>
        <div className="metric-change up">
          <i data-lucide="arrow-up-right" style={{"width":"11px"}}></i>
          <span>+12 this week</span>
        </div>
        <div className="metric-help">234 trials · 67 churned all-time</div>
      </div>

      <div className="metric">
        <div className="metric-label">
          <span>Churn rate</span>
        </div>
        <div className="metric-value">2.1%</div>
        <div className="metric-change down">
          <i data-lucide="arrow-down-right" style={{"width":"11px"}}></i>
          <span>-0.4 pts</span>
        </div>
        <div className="metric-help">Below 3% target · industry 5-7%</div>
      </div>

      <div className="metric">
        <div className="metric-label">
          <span>NPS score</span>
        </div>
        <div className="metric-value">68</div>
        <div className="metric-change up">
          <i data-lucide="arrow-up-right" style={{"width":"11px"}}></i>
          <span>+4 pts</span>
        </div>
        <div className="metric-help">142 responses · 78% promoters</div>
      </div>
    </div>

    
    <div className="cc-grid">

      
      <div className="cc-stack">

        
        <div className="card">
          <header className="card-header">
            <div className="flex items-center gap-2">
              <h3 className="card-title">Today's priorities</h3>
              <span className="badge red"><span className="badge-dot"></span>3 urgent</span>
            </div>
            <button className="btn btn-xs btn-ghost">
              <span>All alerts</span>
              <i data-lucide="arrow-right" style={{"width":"11px"}}></i>
            </button>
          </header>
          <div className="card-body">

            <div className="alert critical">
              <div className="alert-icon"><i data-lucide="user-x" style={{"width":"14px"}}></i></div>
              <div className="alert-body">
                <div className="alert-title">Ahmad's Beauty likely churning</div>
                <div className="alert-desc">7 days inactive · Pro tier (Rs 4,999 MRR at risk) · last opened report 8 days ago</div>
                <div className="alert-actions">
                  <button className="btn btn-xs">
                    <i data-lucide="phone" style={{"width":"11px"}}></i>
                    <span>Call</span>
                  </button>
                  <button className="btn btn-xs">
                    <i data-lucide="message-square" style={{"width":"11px"}}></i>
                    <span>WhatsApp</span>
                  </button>
                  <button className="btn btn-xs btn-ghost">
                    <i data-lucide="gift" style={{"width":"11px"}}></i>
                    <span>Send credit</span>
                  </button>
                </div>
              </div>
              <div className="alert-time">2h ago</div>
            </div>

            <div className="alert warning">
              <div className="alert-icon"><i data-lucide="zap" style={{"width":"14px"}}></i></div>
              <div className="alert-body">
                <div className="alert-title">AI cost anomaly · Tenant #234</div>
                <div className="alert-desc">Rs 8,400 yesterday (4× baseline) · approaching tier ceiling · likely automation loop</div>
                <div className="alert-actions">
                  <button className="btn btn-xs">
                    <i data-lucide="search" style={{"width":"11px"}}></i>
                    <span>Investigate</span>
                  </button>
                  <button className="btn btn-xs">
                    <i data-lucide="shield" style={{"width":"11px"}}></i>
                    <span>Cap usage</span>
                  </button>
                </div>
              </div>
              <div className="alert-time">5h ago</div>
            </div>

            <div className="alert info">
              <div className="alert-icon"><i data-lucide="wifi-off" style={{"width":"14px"}}></i></div>
              <div className="alert-body">
                <div className="alert-title">TCS Courier API degraded</div>
                <div className="alert-desc">23 min downtime affecting 47 pending shipments · auto-retrying · ETA 30 min</div>
                <div className="alert-actions">
                  <button className="btn btn-xs">
                    <i data-lucide="external-link" style={{"width":"11px"}}></i>
                    <span>Status page</span>
                  </button>
                </div>
              </div>
              <div className="alert-time">23m ago</div>
            </div>

          </div>
        </div>

        
        <div className="card">
          <header className="card-header">
            <div>
              <h3 className="card-title">Yesterday's performance</h3>
              <div className="card-meta">Thursday, June 5 · vs avg of last 7 days</div>
            </div>
            <button className="btn btn-xs btn-ghost">
              <span>Full report</span>
              <i data-lucide="arrow-right" style={{"width":"11px"}}></i>
            </button>
          </header>
          <div className="card-body">
            <div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"var(--s-3)","marginBottom":"var(--s-5)"}}>
              <div>
                <div className="metric-label">Revenue</div>
                <div className="metric-value md" style={{"marginTop":"var(--s-2)"}}>Rs 61,580</div>
                <div className="metric-change up"><i data-lucide="arrow-up-right" style={{"width":"10px"}}></i>+18% vs avg</div>
              </div>
              <div>
                <div className="metric-label">Costs</div>
                <div className="metric-value md" style={{"marginTop":"var(--s-2)"}}>Rs 4,820</div>
                <div className="metric-help" style={{"marginTop":"var(--s-1)"}}>7.8% of revenue</div>
              </div>
              <div>
                <div className="metric-label">Gross margin</div>
                <div className="metric-value md tx-green" style={{"marginTop":"var(--s-2)"}}>92.2%</div>
                <div className="metric-help" style={{"marginTop":"var(--s-1)"}}>Healthy</div>
              </div>
            </div>

            <div style={{"fontSize":"var(--t-xs)","color":"var(--tx-3)","fontWeight":"var(--fw-semibold)","letterSpacing":"0.05em","textTransform":"uppercase","marginBottom":"var(--s-3)"}}>Cost breakdown</div>

            <div className="data-row">
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--brand)"}}></div>
                <span className="data-row-label">Anthropic API (AI)</span>
                <div className="progress" style={{"flex":"1","maxWidth":"120px"}}>
                  <div className="progress-bar" style={{"width":"54%"}}></div>
                </div>
              </div>
              <span className="data-row-value">Rs 2,600</span>
            </div>
            <div className="data-row">
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--blue)"}}></div>
                <span className="data-row-label">WhatsApp BSP</span>
                <div className="progress" style={{"flex":"1","maxWidth":"120px"}}>
                  <div className="progress-bar blue" style={{"width":"23%"}}></div>
                </div>
              </div>
              <span className="data-row-value">Rs 1,100</span>
            </div>
            <div className="data-row">
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--purple)"}}></div>
                <span className="data-row-label">Infrastructure</span>
                <div className="progress" style={{"flex":"1","maxWidth":"120px"}}>
                  <div className="progress-bar purple" style={{"width":"19%"}}></div>
                </div>
              </div>
              <span className="data-row-value">Rs 920</span>
            </div>
            <div className="data-row">
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <div style={{"width":"8px","height":"8px","borderRadius":"var(--r-sm)","background":"var(--yellow)"}}></div>
                <span className="data-row-label">Database & cache</span>
                <div className="progress" style={{"flex":"1","maxWidth":"120px"}}>
                  <div className="progress-bar yellow" style={{"width":"4%"}}></div>
                </div>
              </div>
              <span className="data-row-value">Rs 200</span>
            </div>
          </div>
        </div>

        
        <div className="card">
          <header className="card-header">
            <div>
              <h3 className="card-title">Top merchants by value</h3>
              <div className="card-meta">Sorted by LTV · last 30 days</div>
            </div>
            <button className="btn btn-xs btn-ghost">
              <span>View all</span>
              <i data-lucide="arrow-right" style={{"width":"11px"}}></i>
            </button>
          </header>
          <table className="table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Tier</th>
                <th className="text-right">MRR</th>
                <th className="text-right">LTV</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>
                  <div className="m-cell">
                    <div className="m-avatar av1">SB</div>
                    <div>
                      <div className="m-name">Saima Boutique</div>
                      <div className="m-meta">Karachi · 143 days</div>
                    </div>
                  </div>
                </td>
                <td><span className="tier tier-pro">Pro</span></td>
                <td className="text-right num">Rs 4,999</td>
                <td className="text-right num tx-green">Rs 23,800</td>
                <td><span className="health"><span className="health-dot high"></span>92</span></td>
              </tr>
              <tr>
                <td>
                  <div className="m-cell">
                    <div className="m-avatar av2">KS</div>
                    <div>
                      <div className="m-name">Karachi Style</div>
                      <div className="m-meta">Karachi · 124 days</div>
                    </div>
                  </div>
                </td>
                <td><span className="tier tier-pro">Pro</span></td>
                <td className="text-right num">Rs 4,999</td>
                <td className="text-right num tx-green">Rs 19,400</td>
                <td><span className="health"><span className="health-dot high"></span>88</span></td>
              </tr>
              <tr>
                <td>
                  <div className="m-cell">
                    <div className="m-avatar av3">EC</div>
                    <div>
                      <div className="m-name">Eid Collection</div>
                      <div className="m-meta">Lahore · 113 days</div>
                    </div>
                  </div>
                </td>
                <td><span className="tier tier-pro">Pro</span></td>
                <td className="text-right num">Rs 4,999</td>
                <td className="text-right num tx-green">Rs 16,990</td>
                <td><span className="health"><span className="health-dot high"></span>85</span></td>
              </tr>
              <tr>
                <td>
                  <div className="m-cell">
                    <div className="m-avatar av4">LP</div>
                    <div>
                      <div className="m-name">Lawn Pro</div>
                      <div className="m-meta">Lahore · 82 days</div>
                    </div>
                  </div>
                </td>
                <td><span className="tier tier-growth">Growth</span></td>
                <td className="text-right num">Rs 2,499</td>
                <td className="text-right num tx-green">Rs 7,499</td>
                <td><span className="health"><span className="health-dot high"></span>78</span></td>
              </tr>
              <tr>
                <td>
                  <div className="m-cell">
                    <div className="m-avatar av5">SS</div>
                    <div>
                      <div className="m-name">Skin Studio</div>
                      <div className="m-meta">Islamabad · 65 days</div>
                    </div>
                  </div>
                </td>
                <td><span className="tier tier-growth">Growth</span></td>
                <td className="text-right num">Rs 2,499</td>
                <td className="text-right num tx-green">Rs 6,999</td>
                <td><span className="health"><span className="health-dot med"></span>64</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      
      <div className="cc-stack">

        
        <div className="card">
          <header className="card-header">
            <div>
              <h3 className="card-title">System status</h3>
              <div className="card-meta">Last 24 hours · auto-refresh 30s</div>
            </div>
            <span className="badge green"><span className="badge-dot"></span>99.94%</span>
          </header>
          <div className="card-body" style={{"paddingTop":"var(--s-3)","paddingBottom":"var(--s-3)"}}>
            <div className="status-row">
              <span className="status-dot up"></span>
              <span className="status-name">API server</span>
              <span className="status-meta">99.94%</span>
            </div>
            <div className="status-row">
              <span className="status-dot up"></span>
              <span className="status-name">Database</span>
              <span className="status-meta">99.99%</span>
            </div>
            <div className="status-row">
              <span className="status-dot up"></span>
              <span className="status-name">WhatsApp BSP</span>
              <span className="status-meta">100%</span>
            </div>
            <div className="status-row">
              <span className="status-dot up"></span>
              <span className="status-name">Meta API</span>
              <span className="status-meta">99.8%</span>
            </div>
            <div className="status-row">
              <span className="status-dot degraded"></span>
              <span className="status-name">TCS Courier</span>
              <span className="status-meta tx-yellow">95.2%</span>
            </div>
            <div className="status-row">
              <span className="status-dot up"></span>
              <span className="status-name">Anthropic API</span>
              <span className="status-meta">99.97%</span>
            </div>
            <div className="status-row">
              <span className="status-dot up"></span>
              <span className="status-name">Stripe</span>
              <span className="status-meta">100%</span>
            </div>
          </div>
        </div>

        
        <div className="card">
          <header className="card-header">
            <div>
              <h3 className="card-title">Signups this week</h3>
              <div className="card-meta">Forecast Rs 2M MRR by month-end</div>
            </div>
            <span className="badge green"><i data-lucide="trending-up" style={{"width":"10px"}}></i>+28%</span>
          </header>
          <div className="card-body">
            <div className="metric-value lg mb-3">47</div>
            
            <div className="bar-chart mb-4">
              <div className="bar-chart-bar" style={{"height":"38%"}} title="Mon · 8"></div>
              <div className="bar-chart-bar" style={{"height":"60%"}} title="Tue · 12"></div>
              <div className="bar-chart-bar" style={{"height":"32%"}} title="Wed · 6"></div>
              <div className="bar-chart-bar" style={{"height":"55%"}} title="Thu · 11"></div>
              <div className="bar-chart-bar active" style={{"height":"92%"}} title="Fri · 18"></div>
              <div className="bar-chart-bar" style={{"height":"8%","opacity":"0.2"}} title="Sat"></div>
              <div className="bar-chart-bar" style={{"height":"8%","opacity":"0.2"}} title="Sun"></div>
            </div>
            
            <div className="flex justify-between t-xs tx-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span className="tx-green fw-semibold">Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        
        <div className="card">
          <header className="card-header">
            <h3 className="card-title">Top cities</h3>
            <span className="card-meta">847 total</span>
          </header>
          <div className="card-body">
            <div className="data-row" style={{"padding":"var(--s-2) 0"}}>
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <span style={{"fontSize":"var(--t-sm)","width":"80px"}}>Karachi</span>
                <div className="progress" style={{"flex":"1"}}><div className="progress-bar" style={{"width":"100%"}}></div></div>
              </div>
              <span className="num t-sm fw-semibold">312</span>
            </div>
            <div className="data-row" style={{"padding":"var(--s-2) 0"}}>
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <span style={{"fontSize":"var(--t-sm)","width":"80px"}}>Lahore</span>
                <div className="progress" style={{"flex":"1"}}><div className="progress-bar" style={{"width":"82%"}}></div></div>
              </div>
              <span className="num t-sm fw-semibold">256</span>
            </div>
            <div className="data-row" style={{"padding":"var(--s-2) 0"}}>
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <span style={{"fontSize":"var(--t-sm)","width":"80px"}}>Islamabad</span>
                <div className="progress" style={{"flex":"1"}}><div className="progress-bar" style={{"width":"42%"}}></div></div>
              </div>
              <span className="num t-sm fw-semibold">131</span>
            </div>
            <div className="data-row" style={{"padding":"var(--s-2) 0"}}>
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <span style={{"fontSize":"var(--t-sm)","width":"80px"}}>Faisalabad</span>
                <div className="progress" style={{"flex":"1"}}><div className="progress-bar" style={{"width":"18%"}}></div></div>
              </div>
              <span className="num t-sm fw-semibold">56</span>
            </div>
            <div className="data-row" style={{"padding":"var(--s-2) 0"}}>
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <span style={{"fontSize":"var(--t-sm)","width":"80px"}}>Rawalpindi</span>
                <div className="progress" style={{"flex":"1"}}><div className="progress-bar" style={{"width":"13%"}}></div></div>
              </div>
              <span className="num t-sm fw-semibold">42</span>
            </div>
            <div className="data-row" style={{"padding":"var(--s-2) 0"}}>
              <div className="flex items-center gap-3" style={{"flex":"1"}}>
                <span style={{"fontSize":"var(--t-sm)","width":"80px","color":"var(--tx-3)"}}>Other 17</span>
                <div className="progress" style={{"flex":"1"}}><div className="progress-bar" style={{"width":"16%","opacity":"0.5"}}></div></div>
              </div>
              <span className="num t-sm tx-3">50</span>
            </div>
          </div>
        </div>

        
        <div className="card">
          <header className="card-header">
            <div className="flex items-center gap-2">
              <h3 className="card-title">Live activity</h3>
              <span className="badge green"><span className="badge-dot" style={{"animation":"pulse 2s ease-in-out infinite"}}></span>Live</span>
            </div>
          </header>
          <div className="card-body" style={{"paddingTop":"var(--s-2)"}}>
            <div className="activity">
              <div className="activity-dot"></div>
              <div className="flex-1">
                <div className="activity-text"><strong>Saima Boutique</strong> auto-replied to 12 DMs</div>
                <div className="activity-meta">2 min ago</div>
              </div>
            </div>
            <div className="activity">
              <div className="activity-dot" style={{"background":"var(--purple)"}}></div>
              <div className="flex-1">
                <div className="activity-text"><strong>Hijab Heaven</strong> started 7-day trial</div>
                <div className="activity-meta">4 min ago · Faisalabad</div>
              </div>
            </div>
            <div className="activity">
              <div className="activity-dot" style={{"background":"var(--yellow)"}}></div>
              <div className="flex-1">
                <div className="activity-text"><strong>Karachi Style</strong> upgraded Growth → Pro</div>
                <div className="activity-meta">8 min ago · +Rs 2,500 MRR</div>
              </div>
            </div>
            <div className="activity">
              <div className="activity-dot" style={{"background":"var(--blue)"}}></div>
              <div className="flex-1">
                <div className="activity-text"><strong>Eid Collection</strong> paid Rs 4,999 invoice</div>
                <div className="activity-meta">15 min ago · auto-debit</div>
              </div>
            </div>
            <div className="activity">
              <div className="activity-dot" style={{"background":"var(--red)"}}></div>
              <div className="flex-1">
                <div className="activity-text"><strong>Tenant #412</strong> payment failed</div>
                <div className="activity-meta">22 min ago · retry scheduled</div>
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
