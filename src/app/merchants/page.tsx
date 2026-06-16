
import React from 'react';

export default function MerchantsView() {
  return (
    <>
      <section className="view active" id="view-merchants">

    <header className="page-header">
      <div>
        <h1 className="page-title">Merchants</h1>
        <p className="page-subtitle">847 active · 234 trial · 67 churned all-time</p>
      </div>
      <div className="page-actions">
        <button className="btn btn-sm btn-ghost">
          <i data-lucide="bookmark" style={{"width":"13px"}}></i>
          <span>Saved views</span>
        </button>
        <button className="btn btn-sm">
          <i data-lucide="download" style={{"width":"13px"}}></i>
          <span>Export</span>
        </button>
        <button className="btn btn-sm btn-primary" >
          <i data-lucide="user-plus" style={{"width":"13px"}}></i>
          <span>Add merchant</span>
        </button>
      </div>
    </header>

    
    <div className="filter-bar">
      <span className="filter-chip active">
        <span>All</span>
        <span className="filter-chip-count">847</span>
      </span>
      <span className="filter-chip">
        <span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--red)"}}></span>
        <span>At risk</span>
        <span className="filter-chip-count">23</span>
      </span>
      <span className="filter-chip">
        <span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--purple)"}}></span>
        <span>VIP</span>
        <span className="filter-chip-count">42</span>
      </span>
      <span className="filter-chip">
        <span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--blue)"}}></span>
        <span>New trials</span>
        <span className="filter-chip-count">47</span>
      </span>
      <span className="filter-chip">
        <span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--green)"}}></span>
        <span>Upgrade-ready</span>
        <span className="filter-chip-count">68</span>
      </span>
      <span className="filter-chip">
        <span style={{"width":"6px","height":"6px","borderRadius":"var(--r-full)","background":"var(--yellow)"}}></span>
        <span>Frustrated</span>
        <span className="filter-chip-count">8</span>
      </span>
      
      <span style={{"flex":"1"}}></span>
      
      <div className="input-wrap">
        <i data-lucide="search" className="input-wrap-icon"></i>
        <input className="input input-search" placeholder="Search by name, email, phone, NTN..." style={{"width":"260px"}} />
      </div>
      <button className="btn btn-sm">
        <i data-lucide="sliders-horizontal" style={{"width":"13px"}}></i>
        <span>Filters</span>
      </button>
      <button className="btn btn-sm btn-ghost btn-icon" title="Customize columns">
        <i data-lucide="columns-3" style={{"width":"13px"}}></i>
      </button>
    </div>

    
    <div className="card card-body-flush">
      <table className="table">
        <thead>
          <tr>
            <th className="table-checkbox"><input type="checkbox" /></th>
            <th className="sortable">Merchant</th>
            <th>Plan</th>
            <th className="text-right sortable">MRR</th>
            <th className="text-right sortable">LTV</th>
            <th className="sortable">Signed up</th>
            <th className="sortable">Last active</th>
            <th>Health</th>
            <th>Tags</th>
            <th style={{"width":"40px"}}></th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td><input type="checkbox"  /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av1">SB</div>
                <div>
                  <div className="m-name">Saima Boutique</div>
                  <div className="m-meta">+92 300 1234567 · Karachi</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-pro">Pro</span></td>
            <td className="text-right num">Rs 4,999</td>
            <td className="text-right num tx-green">Rs 23,800</td>
            <td className="tx-3 t-sm">Jan 12</td>
            <td><span className="badge green"><span className="badge-dot"></span>2m ago</span></td>
            <td><span className="health"><span className="health-dot high"></span>92</span></td>
            <td><span className="badge purple">VIP</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost" ><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av2">KS</div>
                <div>
                  <div className="m-name">Karachi Style</div>
                  <div className="m-meta">+92 321 9876543 · Karachi</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-pro">Pro</span></td>
            <td className="text-right num">Rs 4,999</td>
            <td className="text-right num tx-green">Rs 19,400</td>
            <td className="tx-3 t-sm">Feb 3</td>
            <td className="tx-3 t-sm">1h ago</td>
            <td><span className="health"><span className="health-dot high"></span>88</span></td>
            <td><span className="badge purple">VIP</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av3">EC</div>
                <div>
                  <div className="m-name">Eid Collection</div>
                  <div className="m-meta">+92 333 5552221 · Lahore</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-pro">Pro</span></td>
            <td className="text-right num">Rs 4,999</td>
            <td className="text-right num tx-green">Rs 16,990</td>
            <td className="tx-3 t-sm">Feb 14</td>
            <td className="tx-3 t-sm">3h ago</td>
            <td><span className="health"><span className="health-dot high"></span>85</span></td>
            <td><span className="badge purple">VIP</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
          <tr className="row-red">
            <td><input type="checkbox" /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av6">AB</div>
                <div>
                  <div className="m-name">Ahmad's Beauty</div>
                  <div className="m-meta">+92 314 7778889 · Multan</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-pro">Pro</span></td>
            <td className="text-right num">Rs 4,999</td>
            <td className="text-right num">Rs 14,997</td>
            <td className="tx-3 t-sm">Mar 1</td>
            <td><span className="badge red"><span className="badge-dot"></span>7d ago</span></td>
            <td><span className="health"><span className="health-dot low"></span>34</span></td>
            <td><span className="badge red">At risk</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av4">LP</div>
                <div>
                  <div className="m-name">Lawn Pro</div>
                  <div className="m-meta">+92 345 1112223 · Lahore</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-growth">Growth</span></td>
            <td className="text-right num">Rs 2,499</td>
            <td className="text-right num tx-green">Rs 7,499</td>
            <td className="tx-3 t-sm">Mar 15</td>
            <td className="tx-3 t-sm">Yesterday</td>
            <td><span className="health"><span className="health-dot med"></span>67</span></td>
            <td><span className="badge green">Upgrade-ready</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av5">SS</div>
                <div>
                  <div className="m-name">Skin Studio</div>
                  <div className="m-meta">+92 300 9991110 · Islamabad</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-growth">Growth</span></td>
            <td className="text-right num">Rs 2,499</td>
            <td className="text-right num">Rs 6,999</td>
            <td className="tx-3 t-sm">Apr 2</td>
            <td><span className="badge green"><span className="badge-dot"></span>5m ago</span></td>
            <td><span className="health"><span className="health-dot med"></span>64</span></td>
            <td><span className="badge yellow">Support</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av7">DH</div>
                <div>
                  <div className="m-name">Designer Hub</div>
                  <div className="m-meta">+92 321 4445556 · Karachi</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-starter">Starter</span></td>
            <td className="text-right num">Rs 999</td>
            <td className="text-right num">Rs 2,997</td>
            <td className="tx-3 t-sm">Apr 18</td>
            <td className="tx-3 t-sm">2d ago</td>
            <td><span className="health"><span className="health-dot high"></span>74</span></td>
            <td><span className="badge green">Upgrade-ready</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
          <tr className="row-purple">
            <td><input type="checkbox" /></td>
            <td>
              <div className="m-cell">
                <div className="m-avatar av8">HH</div>
                <div>
                  <div className="m-name">Hijab Heaven</div>
                  <div className="m-meta">+92 332 1234567 · Faisalabad</div>
                </div>
              </div>
            </td>
            <td><span className="tier tier-trial">Trial</span></td>
            <td className="text-right num tx-4">—</td>
            <td className="text-right num tx-4">—</td>
            <td className="tx-3 t-sm">Today</td>
            <td><span className="badge green"><span className="badge-dot"></span>Live</span></td>
            <td><span className="health"><span className="health-dot high"></span>82</span></td>
            <td><span className="badge blue">New</span></td>
            <td><button className="btn btn-icon btn-sm btn-ghost"><i data-lucide="more-horizontal" style={{"width":"14px"}}></i></button></td>
          </tr>
        </tbody>
      </table>

      
      <div style={{"padding":"var(--s-3) var(--s-4)","borderTop":"1px solid var(--b-1)","display":"flex","alignItems":"center","justifyContent":"space-between"}}>
        <span className="t-xs tx-3">Showing 1–8 of 847 merchants</span>
        <div className="flex items-center gap-2">
          <button className="btn btn-xs btn-ghost"><i data-lucide="chevron-left" style={{"width":"12px"}}></i></button>
          <span className="t-xs tx-3">Page 1 of 106</span>
          <button className="btn btn-xs btn-ghost"><i data-lucide="chevron-right" style={{"width":"12px"}}></i></button>
        </div>
      </div>
    </div>

  </section>
    </>
  );
}
