'use client';
import React, { useState } from 'react';
import { TENANTS } from '@/lib/data';
import { useApp } from '@/lib/context';

const APPEALS = [
  { phone: '+9230xxxx1122', tenant: "Sana's Boutique", reason: 'Customer says courier marked RTO but they never received a delivery attempt' },
  { phone: '+9230xxxx7788', tenant: 'Lahore Kicks', reason: 'Flagged after 2 refused deliveries — customer says wrong address on file, now corrected' },
  { phone: '+9230xxxx4411', tenant: 'Glow Cosmetics', reason: 'Blocked for suspected fake return, customer disputes and has photo proof of unopened package' },
];

export default function RiskPage() {
  const { showToast } = useApp();

  const nearThreshold = TENANTS.filter(t => {
    const annual = t.deepDive.salesTotal * 12;
    return annual > 5500000 && annual < 8500000;
  }).slice(0, 6);

  return (
    <div className="page-anim">
      <div className="page-head">
        <h1>Risk &amp; Compliance</h1>
        <div className="page-sub">COD fraud appeals and FBR registration thresholds</div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">COD fraud appeals</span>
          <span className="zone-sub">Merchants contesting an automated fraud flag</span>
        </div>
        <div className="risk-list">
          {APPEALS.map((a, i) => (
            <div key={i} className="risk-row" style={{ cursor: 'default' }}>
              <div className="risk-score-badge atrisk" style={{ fontSize: 10 }}>?</div>
              <div className="risk-row-info">
                <div className="rn-name">{a.phone} · {a.tenant}</div>
                <div className="rn-sub">{a.reason}</div>
              </div>
              <button className="btn-sm" style={{ height: 30, padding: '0 10px', fontSize: 11 }} onClick={() => showToast('Appeal approved — risk score cleared')}>Approve</button>
              <button className="btn-sm btn-danger-outline" style={{ height: 30, padding: '0 10px', fontSize: 11 }} onClick={() => showToast('Appeal denied — flag stands')}>Deny</button>
            </div>
          ))}
        </div>
      </div>

      <div className="zone">
        <div className="zone-head">
          <span className="zone-title">FBR registration threshold</span>
          <span className="zone-sub">Unregistered tenants approaching Rs 7.5M annual revenue — alert required by law</span>
        </div>
        <div className="card track-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Annualized revenue</th>
                <th>Threshold</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {nearThreshold.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 20, color: 'var(--text-3)' }}>No unregistered tenants currently near the threshold.</td></tr>
              ) : nearThreshold.map(t => {
                const annualRev = t.deepDive.salesTotal * 12;
                return (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700 }}>{t.name}</td>
                    <td className="num">Rs {annualRev.toLocaleString('en-US')}</td>
                    <td className="num">Rs 7,500,000</td>
                    <td>
                      <span className={`mini-pill ${annualRev > 7000000 ? 'review' : 'monitor'}`}>
                        {annualRev > 7000000 ? 'Alert sent' : 'Approaching'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
