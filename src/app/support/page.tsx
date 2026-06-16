
import React from 'react';

export default function SupportView() {
  return (
    <>
      <section className="view active" id="view-support">

    <header className="page-header">
      <div>
        <h1 className="page-title">Tools</h1>
        <p className="page-subtitle">Founder superpowers · every action is audited</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm">
          <i data-lucide="shield-check" style={{"width":"13px"}}></i>
          <span>Audit log</span>
        </button>
      </div>
    </header>

    
    <div style={{"display":"grid","gridTemplateColumns":"repeat(3,1fr)","gap":"var(--s-4)","marginBottom":"var(--s-5)"}}>

      <div className="card">
        <div className="card-body">
          <div style={{"width":"40px","height":"40px","borderRadius":"var(--r-md)","background":"var(--brand-bg)","display":"grid","placeItems":"center","border":"1px solid var(--brand-border)"}}>
            <i data-lucide="user-check" style={{"width":"18px","color":"var(--brand)"}}></i>
          </div>
          <h3 className="card-title mt-3">Impersonate</h3>
          <p className="t-sm tx-3 mt-1">Login as any merchant · session audited · merchant notified</p>
          
          <div className="input-wrap mt-4" style={{"display":"block"}}>
            <i data-lucide="search" className="input-wrap-icon"></i>
            <input className="input" placeholder="Search merchant..." style={{"width":"100%"}} />
          </div>
          
          <button className="btn btn-primary mt-3" style={{"width":"100%"}} >
            <i data-lucide="log-in" style={{"width":"13px"}}></i>
            <span>Start impersonation</span>
          </button>
          
          <p className="t-xs tx-4 mt-2 text-center">Session expires in 60 min</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div style={{"width":"40px","height":"40px","borderRadius":"var(--r-md)","background":"var(--purple-bg)","display":"grid","placeItems":"center","border":"1px solid var(--purple-border)"}}>
            <i data-lucide="megaphone" style={{"width":"18px","color":"var(--purple)"}}></i>
          </div>
          <h3 className="card-title mt-3">Announcement</h3>
          <p className="t-sm tx-3 mt-1">Notify merchants via email + WhatsApp · segment-based</p>
          
          <select className="select mt-4" style={{"width":"100%"}}>
            <option>All merchants (847)</option>
            <option>Pro tier (200)</option>
            <option>Growth tier (300)</option>
            <option>Starter tier (347)</option>
            <option>At-risk (23)</option>
            <option>VIP (42)</option>
          </select>
          
          <button className="btn mt-3" style={{"width":"100%"}} >
            <i data-lucide="edit-3" style={{"width":"13px"}}></i>
            <span>Compose announcement</span>
          </button>
          
          <p className="t-xs tx-4 mt-2 text-center">Saves to audit log</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div style={{"width":"40px","height":"40px","borderRadius":"var(--r-md)","background":"var(--red-bg)","display":"grid","placeItems":"center","border":"1px solid var(--red-border)"}}>
            <i data-lucide="alert-octagon" style={{"width":"18px","color":"var(--red)"}}></i>
          </div>
          <h3 className="card-title mt-3">Emergency stop</h3>
          <p className="t-sm tx-3 mt-1">Kill switches for crisis mode · use only when needed</p>
          
          <div style={{"display":"flex","flexDirection":"column","gap":"var(--s-2)","marginTop":"var(--s-4)"}}>
            <button className="btn" style={{"width":"100%","color":"var(--yellow)","borderColor":"var(--yellow-border)","background":"var(--yellow-bg)"}}>
              <i data-lucide="pause" style={{"width":"13px"}}></i>
              <span>Pause all autopilot</span>
            </button>
            <button className="btn" style={{"width":"100%","color":"var(--yellow)","borderColor":"var(--yellow-border)","background":"var(--yellow-bg)"}}>
              <i data-lucide="ban" style={{"width":"13px"}}></i>
              <span>Disable AI replies</span>
            </button>
            <button className="btn btn-danger" style={{"width":"100%"}}>
              <i data-lucide="power" style={{"width":"13px"}}></i>
              <span>Maintenance mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    
    <div className="card mb-5">
      <header className="card-header">
        <div>
          <h3 className="card-title">Quick actions</h3>
          <div className="card-meta">Common founder tasks · all logged</div>
        </div>
      </header>
      <div className="card-body">
        <div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"var(--s-3)"}}>
          <button className="btn"><i data-lucide="refresh-cw" style={{"width":"13px"}}></i><span>Force re-sync</span></button>
          <button className="btn"><i data-lucide="file-text" style={{"width":"13px"}}></i><span>Regenerate report</span></button>
          <button className="btn"><i data-lucide="dollar-sign" style={{"width":"13px"}}></i><span>Process refund</span></button>
          <button className="btn"><i data-lucide="gift" style={{"width":"13px"}}></i><span>Comp / discount</span></button>
          <button className="btn"><i data-lucide="key" style={{"width":"13px"}}></i><span>Reset password</span></button>
          <button className="btn" style={{"color":"var(--yellow)","borderColor":"var(--yellow-border)"}}><i data-lucide="pause" style={{"width":"13px"}}></i><span>Suspend</span></button>
          <button className="btn"><i data-lucide="download" style={{"width":"13px"}}></i><span>Export data</span></button>
          <button className="btn" style={{"color":"var(--red)","borderColor":"var(--red-border)"}} ><i data-lucide="trash-2" style={{"width":"13px"}}></i><span>Delete (GDPR)</span></button>
        </div>
      </div>
    </div>

    
    <div className="card">
      <header className="card-header">
        <div>
          <h3 className="card-title">Audit log</h3>
          <div className="card-meta">Every admin action · immutable · FBR + PDPA compliant</div>
        </div>
        <div className="flex gap-2">
          <div className="input-wrap">
            <i data-lucide="search" className="input-wrap-icon"></i>
            <input className="input" placeholder="Search log..." style={{"width":"200px"}} />
          </div>
          <button className="btn btn-sm">
            <i data-lucide="download" style={{"width":"13px"}}></i>
            <span>Export</span>
          </button>
        </div>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Target</th>
            <th>Details</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tx-3 t-sm mono">10:24:18</td>
            <td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td>
            <td><span className="badge blue"><i data-lucide="user-check" style={{"width":"9px"}}></i>Impersonate</span></td>
            <td className="fw-medium t-sm">Ahmad's Beauty</td>
            <td className="tx-2 t-sm">Session 12m · debugged churn</td>
            <td className="mono t-xs tx-4">203.135.67.x</td>
          </tr>
          <tr>
            <td className="tx-3 t-sm mono">09:15:42</td>
            <td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td>
            <td><span className="badge yellow"><i data-lucide="dollar-sign" style={{"width":"9px"}}></i>Refund</span></td>
            <td className="fw-medium t-sm">Tenant #234</td>
            <td className="tx-2 t-sm">Refunded Rs 999 · "Service issue"</td>
            <td className="mono t-xs tx-4">203.135.67.x</td>
          </tr>
          <tr>
            <td className="tx-3 t-sm mono">08:42:11</td>
            <td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td>
            <td><span className="badge gray"><i data-lucide="edit-3" style={{"width":"9px"}}></i>Note</span></td>
            <td className="fw-medium t-sm">Saima Boutique</td>
            <td className="tx-2 t-sm">"Asked about Eid feature in May"</td>
            <td className="mono t-xs tx-4">203.135.67.x</td>
          </tr>
          <tr>
            <td className="tx-3 t-sm mono">Jun 4 · 18:30</td>
            <td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td>
            <td><span className="badge yellow"><i data-lucide="shield" style={{"width":"9px"}}></i>Cost ceiling</span></td>
            <td className="fw-medium t-sm">Power User #234</td>
            <td className="tx-2 t-sm">Set Rs 2,000/mo cap (was unlimited)</td>
            <td className="mono t-xs tx-4">203.135.67.x</td>
          </tr>
          <tr>
            <td className="tx-3 t-sm mono">Jun 4 · 14:22</td>
            <td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td>
            <td><span className="badge purple"><i data-lucide="megaphone" style={{"width":"9px"}}></i>Announce</span></td>
            <td className="fw-medium t-sm">200 Pro merchants</td>
            <td className="tx-2 t-sm">"New WhatsApp template" · 187 delivered</td>
            <td className="mono t-xs tx-4">203.135.67.x</td>
          </tr>
          <tr>
            <td className="tx-3 t-sm mono">Jun 3 · 11:08</td>
            <td><div className="m-cell"><div className="m-avatar av1" style={{"width":"22px","height":"22px","fontSize":"10px"}}>AK</div><span className="t-sm">Ahmad Khan</span></div></td>
            <td><span className="badge green"><i data-lucide="gift" style={{"width":"9px"}}></i>Comp</span></td>
            <td className="fw-medium t-sm">Karachi Style</td>
            <td className="tx-2 t-sm">Free month · "VIP appreciation"</td>
            <td className="mono t-xs tx-4">203.135.67.x</td>
          </tr>
        </tbody>
      </table>

      <div style={{"padding":"var(--s-4)","borderTop":"1px solid var(--b-1)","background":"var(--bg-2)","display":"flex","alignItems":"center","gap":"var(--s-3)"}}>
        <i data-lucide="shield-check" style={{"width":"16px","color":"var(--blue)","flexShrink":"0"}}></i>
        <div className="t-sm tx-2">
          <strong>Audit log is immutable.</strong> All admin actions stored forever (FBR + PDPA compliance). Exportable as PDF for legal review.
        </div>
      </div>
    </div>

  </section>
    </>
  );
}
