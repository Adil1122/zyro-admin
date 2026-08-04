import type { Tenant, KillSwitch, FeatureFlag, CourierHealth, JobQueue, AuditEntry, HealthBand, Announcement } from './types';

// ─── Seeded RNG (same algorithm as v6-3 HTML) ────────────────────────────────
export function seededRand(seedStr: string): () => number {
  let s = 0;
  for (let i = 0; i < seedStr.length; i++) s = (s * 31 + seedStr.charCodeAt(i)) % 2147483647;
  return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export function healthBand(score: number): HealthBand {
  if (score >= 80) return 'healthy';
  if (score >= 60) return 'watch';
  if (score >= 40) return 'atrisk';
  return 'critical';
}

export function maskPhone(phone: string): string {
  return phone.slice(0, 4) + 'xxxx' + phone.slice(-4);
}

// ─── Reference pools for deep-dive data generation ───────────────────────────
const PRODUCT_NAMES = [
  'Lawn Suit — 3pc', 'Embroidered Kurti', 'Chiffon Abaya', 'Shalwar Kameez',
  'Casual Sneakers', 'Leather Sandals', 'Quilted Handbag', 'Analog Watch',
  'Aviator Sunglasses', 'Oud Perfume 50ml', 'Skincare Gift Set',
  'Matte Lipstick Set', 'Silicone Phone Case', 'Wireless Earbuds',
];
const AD_OBJECTIVES = ['Retargeting', 'Lookalike — Purchasers', 'Broad Interest', 'Catalog Sales'];
const WA_TEMPLATES = [
  'Order Confirmation', 'Shipment Update', 'Delivery Confirmation',
  'Cart Abandonment', 'Promotional Broadcast', 'Review Request', 'Pre-Dispatch Confirmation',
];
const COURIER_NAMES = ['TCS', 'Leopards', 'PostEx', 'Trax'];

// ─── Deep-dive data generator (same logic as v6-3 HTML) ──────────────────────
function buildDeepDive(t: Omit<Tenant, 'band' | 'deepDive'>) {
  const rand = seededRand(t.id + t.health);
  const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
  const healthFactor = t.health / 100;

  const productCount = 4 + Math.floor(rand() * 3);
  const usedNames = new Set<string>();
  const products: { name: string; unitsSold: number; revenue: number }[] = [];
  for (let i = 0; i < productCount; i++) {
    let name = pick(PRODUCT_NAMES);
    while (usedNames.has(name)) name = pick(PRODUCT_NAMES);
    usedNames.add(name);
    const unitsSold = Math.floor(rand() * 40 * healthFactor) + 3;
    const price = Math.floor(rand() * 3500) + 900;
    products.push({ name, unitsSold, revenue: unitsSold * price });
  }
  products.sort((a, b) => b.revenue - a.revenue);
  const salesTotal = products.reduce((s, p) => s + p.revenue, 0);

  const adSpend = Math.round((salesTotal * (0.08 + rand() * 0.1)) / 100) * 100;
  const campaignCount = 2 + Math.floor(rand() * 2);
  const campaigns: { name: string; spend: number; roas: number; status: 'scale' | 'monitor' | 'review' }[] = [];
  for (let i = 0; i < campaignCount; i++) {
    const spend = Math.round(adSpend / campaignCount * (0.6 + rand() * 0.8) / 50) * 50;
    const roas = parseFloat((1.2 + rand() * (healthFactor * 3.5)).toFixed(2));
    campaigns.push({
      name: pick(AD_OBJECTIVES) + ' — ' + pick(products).name.split(' ')[0],
      spend, roas,
      status: roas >= 3 ? 'scale' : roas >= 1.5 ? 'monitor' : 'review',
    });
  }
  campaigns.sort((a, b) => b.roas - a.roas);
  const totalAdRevenue = campaigns.reduce((s, c) => s + c.spend * c.roas, 0);
  const blendedRoas = adSpend > 0 ? (totalAdRevenue / adSpend).toFixed(2) : '0.00';

  const messagesSent = Math.floor(t.orders30d * (2.5 + rand() * 2));
  const aiCost = Math.round(messagesSent * (0.8 + rand() * 0.6));
  const optInRate = Math.round(55 + healthFactor * 40);
  const waTemplates = [...WA_TEMPLATES]
    .sort(() => rand() - 0.5)
    .slice(0, 4)
    .map(name => ({ name, count: Math.floor(rand() * messagesSent * 0.3) + 5 }))
    .sort((a, b) => b.count - a.count);

  const totalSkus = 12 + Math.floor(rand() * 60);
  const stockValue = totalSkus * (Math.floor(rand() * 4000) + 1500);
  const lowStockCount = Math.floor(rand() * 6 * (1 - healthFactor * 0.5));
  const lowStock = Array.from({ length: Math.min(lowStockCount, 4) }).map(() => {
    const current = Math.floor(rand() * 4);
    return { name: pick(PRODUCT_NAMES), current, reorderPoint: current + Math.floor(rand() * 8) + 5 };
  });
  const deadStockCount = Math.floor(rand() * 5);

  const courierPerf = COURIER_NAMES.map(name => {
    const shipments = Math.floor(rand() * t.orders30d * 0.5) + 3;
    const successRate = Math.min(99, Math.round(70 + healthFactor * 25 + rand() * 5));
    return {
      courier: name, shipments,
      successRate,
      rtoRate: Math.max(1, Math.round(100 - successRate - rand() * 5)),
      avgCost: Math.floor(rand() * 80) + 160,
      avgDays: (1.5 + rand() * 2).toFixed(1),
    };
  }).filter(c => c.shipments > 3).sort((a, b) => b.shipments - a.shipments);

  return { products, salesTotal, orders30d: t.orders30d, adSpend, campaigns, blendedRoas, messagesSent, aiCost, optInRate, waTemplates, totalSkus, stockValue, lowStock, deadStockCount, courierPerf, dunningDays: t.dunningDays ?? 0 };
}

// ─── 7 hand-crafted tenants ───────────────────────────────────────────────────
const BASE_TENANTS: Omit<Tenant, 'band' | 'deepDive'>[] = [
  {
    id: 't1', name: "Sana's Boutique", initials: 'SB', owner: 'Sana Malik',
    phone: '+923001112223', email: 'sana@example.com', city: 'Karachi',
    signedUp: '14 Mar 2026', plan: 'Growth', mrr: 8999, status: 'active', health: 88, orders30d: 412,
    breakdown: [['Order volume trend',20,92],['Login frequency',15,85],['Feature adoption',15,78],['NDR rate',10,90],['COD reconciliation',10,95],['WhatsApp opt-in',8,80],['Support tickets',8,88],['Late payments',8,100],['Plan upgrade history',6,60]],
    integrations: ['Shopify', 'TCS', 'Leopards', 'WhatsApp'],
  },
  {
    id: 't2', name: 'Lahore Kicks', initials: 'LK', owner: 'Bilal Ahmed',
    phone: '+923214445556', email: 'bilal@example.com', city: 'Lahore',
    signedUp: '02 Jan 2026', plan: 'Pro', mrr: 12999, status: 'active', health: 92, orders30d: 890,
    breakdown: [['Order volume trend',20,95],['Login frequency',15,90],['Feature adoption',15,88],['NDR rate',10,85],['COD reconciliation',10,92],['WhatsApp opt-in',8,90],['Support tickets',8,95],['Late payments',8,100],['Plan upgrade history',6,80]],
    integrations: ['WooCommerce', 'Daraz', 'TCS', 'PostEx', 'WhatsApp'],
  },
  {
    id: 't3', name: 'Desi Threads', initials: 'DT', owner: 'Ayesha Raza',
    phone: '+923337778889', email: 'ayesha@example.com', city: 'Faisalabad',
    signedUp: '28 May 2026', plan: 'Starter', mrr: 4999, status: 'active', health: 52, orders30d: 38,
    breakdown: [['Order volume trend',20,30],['Login frequency',15,40],['Feature adoption',15,35],['NDR rate',10,55],['COD reconciliation',10,50],['WhatsApp opt-in',8,60],['Support tickets',8,45],['Late payments',8,80],['Plan upgrade history',6,50]],
    integrations: ['Instagram'],
  },
  {
    id: 't4', name: 'Home & Hearth PK', initials: 'HH', owner: 'Kamran Sheikh',
    phone: '+923451239876', email: 'kamran@example.com', city: 'Multan',
    signedUp: '11 Feb 2026', plan: 'Growth', mrr: 8999, status: 'past_due', dunningDays: 5, health: 35, orders30d: 12,
    breakdown: [['Order volume trend',20,15],['Login frequency',15,20],['Feature adoption',15,25],['NDR rate',10,30],['COD reconciliation',10,20],['WhatsApp opt-in',8,40],['Support tickets',8,20],['Late payments',8,10],['Plan upgrade history',6,50]],
    integrations: ['Shopify', 'Trax'],
  },
  {
    id: 't5', name: 'Glow Cosmetics', initials: 'GC', owner: 'Mahnoor Iqbal',
    phone: '+923011234567', email: 'mahnoor@example.com', city: 'Islamabad',
    signedUp: '19 Apr 2026', plan: 'Pro', mrr: 12999, status: 'active', health: 76, orders30d: 267,
    breakdown: [['Order volume trend',20,70],['Login frequency',15,75],['Feature adoption',15,65],['NDR rate',10,80],['COD reconciliation',10,78],['WhatsApp opt-in',8,72],['Support tickets',8,70],['Late payments',8,90],['Plan upgrade history',6,60]],
    integrations: ['Shopify', 'TCS', 'Leopards', 'TikTok', 'WhatsApp'],
  },
  {
    id: 't6', name: 'Cart & Crate', initials: 'CC', owner: 'Usman Tariq',
    phone: '+923339990001', email: 'usman@example.com', city: 'Karachi',
    signedUp: '03 Jun 2026', plan: 'Starter', mrr: 4999, status: 'active', health: 95, orders30d: 156,
    breakdown: [['Order volume trend',20,98],['Login frequency',15,95],['Feature adoption',15,90],['NDR rate',10,98],['COD reconciliation',10,100],['WhatsApp opt-in',8,95],['Support tickets',8,100],['Late payments',8,100],['Plan upgrade history',6,70]],
    integrations: ['WooCommerce', 'TCS'],
  },
  {
    id: 't7', name: 'Zeb Fashion', initials: 'ZF', owner: 'Zainab Baig',
    phone: '+923215556667', email: 'zainab@example.com', city: 'Sialkot',
    signedUp: '22 Jun 2026', plan: 'Growth', mrr: 8999, status: 'past_due', dunningDays: 2, health: 44, orders30d: 71,
    breakdown: [['Order volume trend',20,45],['Login frequency',15,50],['Feature adoption',15,40],['NDR rate',10,35],['COD reconciliation',10,30],['WhatsApp opt-in',8,55],['Support tickets',8,40],['Late payments',8,15],['Plan upgrade history',6,50]],
    integrations: ['Daraz', 'Leopards'],
  },
];

// ─── 53 procedurally generated tenants ───────────────────────────────────────
function generateMoreTenants(): Omit<Tenant, 'band' | 'deepDive'>[] {
  const cities = ['Karachi','Lahore','Islamabad','Faisalabad','Rawalpindi','Multan','Peshawar','Sialkot','Gujranwala','Hyderabad','Quetta','Bahawalpur'];
  const prefixes = ['Noor','Zara','Bloom','Urban','Prime','Blush','Ember','Nest','Crest','Vibe','Lush','Aura','Loom','Sable','Terra','Kiran','Aiza','Suno'];
  const suffixes = ['Bazaar','Studio','Collective','Traders','House','Threads','Co','Depot','Corner','Market','Store','Works','Hub','Labs'];
  const owners = ['Fatima','Hamza','Noor Fatima','Ali Raza','Sadia','Faisal','Mehak','Junaid','Rabia','Talha','Iqra','Danish','Hina','Waqas','Sara','Umer','Nida','Adeel'];
  const lastNames = ['Khan','Ahmed','Malik','Sheikh','Baig','Iqbal','Raza','Chaudhry'];
  const plans: [string, number][] = [['Starter', 4999], ['Growth', 8999], ['Growth', 8999], ['Pro', 12999]];
  const integrationPool = ['Shopify','WooCommerce','Daraz','Instagram','TikTok','TCS','Leopards','PostEx','Trax','WhatsApp'];

  let seed = 42;
  function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function pick<T>(arr: T[]): T { return arr[Math.floor(rand() * arr.length)]; }

  return Array.from({ length: 53 }, (_, i) => {
    const [plan, mrr] = pick(plans);
    const health = Math.floor(rand() * 95) + 5;
    const status: 'active' | 'past_due' = health < 40 && rand() < 0.5 ? 'past_due' : 'active';
    const name = `${pick(prefixes)} ${pick(suffixes)}`;
    const ownerFirst = pick(owners);
    const owner = `${ownerFirst} ${pick(lastNames)}`;
    const integrations = [...integrationPool].sort(() => rand() - 0.5).slice(0, Math.floor(rand() * 3) + 1);
    const dunningDays = status === 'past_due' ? Math.floor(rand() * 6) + 1 : undefined;
    const orders30d = Math.floor(rand() * (health / 2 + 5) * 10);
    const breakdown: [string, number, number][] = [
      ['Order volume trend', 20, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['Login frequency', 15, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['Feature adoption', 15, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['NDR rate', 10, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['COD reconciliation', 10, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['WhatsApp opt-in', 8, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['Support tickets', 8, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['Late payments', 8, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
      ['Plan upgrade history', 6, Math.max(0, Math.min(100, health + Math.floor(rand() * 20 - 10)))],
    ];
    return {
      id: 'g' + i,
      name,
      initials: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      owner,
      phone: '+923' + Math.floor(rand() * 90 + 10) + Math.floor(rand() * 9000000 + 1000000),
      email: ownerFirst.toLowerCase().replace(' ', '.') + '@example.com',
      city: pick(cities),
      signedUp: `${Math.floor(rand() * 27) + 1} ${pick(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'])} 2026`,
      plan, mrr, status, health, dunningDays, orders30d, breakdown, integrations,
    };
  });
}

// ─── Assemble all tenants ─────────────────────────────────────────────────────
function buildAllTenants(): Tenant[] {
  const raw = [...BASE_TENANTS, ...generateMoreTenants()];
  return raw.map(t => ({
    ...t,
    band: healthBand(t.health),
    deepDive: buildDeepDive(t),
  }));
}

export const TENANTS: Tenant[] = buildAllTenants();

// ─── Feature flags ────────────────────────────────────────────────────────────
export const KILL_SWITCHES: KillSwitch[] = [
  { id: 'ks1', name: 'kill-platform-whatsapp-outbound', effect: 'pauses all outbound WhatsApp sends across every tenant immediately', owner: 'Anes Khan', active: true },
  { id: 'ks2', name: 'kill-platform-courier-autobooking', effect: 'pauses all automatic courier booking platform-wide', owner: 'Anes Khan', active: true },
  { id: 'ks3', name: 'kill-platform-ai-order-from-chat', effect: 'forces AI order-from-chat into shadow mode for every tenant — no auto-orders placed', owner: 'Anes Khan', active: true },
];

export const FEATURE_FLAGS: FeatureFlag[] = [
  { id: 'ff1', name: 'release-whatsapp-order-from-chat-v2', description: 'Improved intent classification for order-from-chat WhatsApp flow', owner: 'Hamza Ops', rolloutPct: 35 },
  { id: 'ff2', name: 'release-couriers-scoring-12signal', description: 'Full 12-signal AI courier scoring (vs. legacy 4-signal)', owner: 'Anes Khan', rolloutPct: 100 },
  { id: 'ff3', name: 'release-finance-fbr-autoexport', description: 'Automatic monthly FBR export for registered tenants', owner: 'Fatima Support Lead', rolloutPct: 80 },
  { id: 'ff4', name: 'release-finance-profitcalc-v2', description: 'Redesigned profit calculator with COD-fee breakdown', owner: 'Hamza Ops', rolloutPct: 15 },
  { id: 'ff5', name: 'release-inventory-multiwarehouse-routing', description: 'Route orders to nearest warehouse automatically', owner: 'Anes Khan', rolloutPct: 60 },
  { id: 'ff6', name: 'release-whatsapp-sms-fallback', description: 'SMS delivery for the ~20% of customers without WhatsApp', owner: 'Fatima Support Lead', rolloutPct: 100 },
];

// ─── Platform health ──────────────────────────────────────────────────────────
const ALL_COURIER_NAMES = ['TCS','Leopards','PostEx','Trax','M&P','BlueEX','FedEx','Daewoo','Rider','SLG Trax','tranzo','BarqRaftar','Call Courier','DoDeliver'];

function buildCourierHealth(): CourierHealth[] {
  const rng = seededRand('courier-health-v1');
  return ALL_COURIER_NAMES.map(name => {
    const r = rng();
    const status: 'operational' | 'degraded' | 'down' = r > 0.93 ? 'down' : r > 0.8 ? 'degraded' : 'operational';
    const successRate = status === 'down' ? Math.floor(r * 20) : status === 'degraded' ? 70 + Math.floor(r * 15) : 95 + Math.floor(r * 5);
    return {
      name, status, successRate,
      latencyMs: Math.floor(rng() * 400) + 120,
      affectedTenants: status === 'operational' ? 0 : Math.floor(rng() * 30) + 3,
    };
  });
}

export const COURIER_HEALTH: CourierHealth[] = buildCourierHealth();

export const JOB_QUEUES: JobQueue[] = [
  { name: 'order-processing', processing: 12, pending: 4, failed: 0, status: 'healthy' },
  { name: 'whatsapp-outbound', processing: 340, pending: 1200, failed: 2, status: 'backlogged' },
  { name: 'courier-booking', processing: 8, pending: 3, failed: 0, status: 'healthy' },
  { name: 'ai-scoring', processing: 4, pending: 2, failed: 0, status: 'healthy' },
  { name: 'notification-dispatch', processing: 56, pending: 18, failed: 1, status: 'healthy' },
  { name: 'fbr-invoice-export', processing: 2, pending: 0, failed: 0, status: 'healthy' },
  { name: 'health-score-batch', processing: 0, pending: 0, failed: 0, status: 'stalled' },
  { name: 'webhook-delivery', processing: 91, pending: 44, failed: 5, status: 'backlogged' },
];

// ─── Audit log ────────────────────────────────────────────────────────────────
const AUDIT_ACTIONS: [string, string][] = [
  ['impersonation', 'Viewed tenant via impersonation'],
  ['pii', 'Unmasked phone number'],
  ['pii', 'Unmasked email address'],
  ['billing', 'Issued credit'],
  ['billing', 'Extended trial'],
  ['account', 'Suspended account'],
  ['account', 'Started deletion flow'],
  ['account', 'Changed plan manually'],
];
const ADMIN_NAMES = ['Anes Khan', 'Fatima Support Lead', 'Hamza Ops'];

function buildAuditLog(): AuditEntry[] {
  const rng = seededRand('audit-log-v1');
  const entries = Array.from({ length: 42 }, () => {
    const [type, action] = AUDIT_ACTIONS[Math.floor(rng() * AUDIT_ACTIONS.length)];
    const tenant = TENANTS[Math.floor(rng() * TENANTS.length)];
    const hoursAgo = Math.floor(rng() * 720) + 1;
    return {
      type, action,
      tenant: tenant.name,
      admin: ADMIN_NAMES[Math.floor(rng() * ADMIN_NAMES.length)],
      time: hoursAgo < 24 ? `${hoursAgo}h ago` : `${Math.floor(hoursAgo / 24)}d ago`,
      hoursAgo,
      reason: type === 'billing' || type === 'account' ? 'Merchant requested via support ticket' : '—',
    };
  });
  return entries.sort((a, b) => a.hoursAgo - b.hoursAgo);
}

export const FULL_AUDIT_LOG: AuditEntry[] = buildAuditLog();

// ─── Announcements seed data ──────────────────────────────────────────────────
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: 'ann-seed-1', title: 'Scheduled maintenance complete', message: 'All systems restored and normal. No further action needed — thank you for your patience.', audience: 'All tenants', publishedAt: '3 days ago', sentTo: 742 },
  { id: 'ann-seed-2', title: 'New: Multi-warehouse routing on Pro', message: 'Pro plan stores can now route orders to the nearest warehouse automatically. Enable it in your delivery settings.', audience: 'Pro plan only', publishedAt: '1 week ago', sentTo: 183 },
  { id: 'ann-seed-3', title: 'WhatsApp opt-in best practices', message: 'Stores with opt-in rates below 30% risk Meta account review. Check our help centre for the latest opt-in messaging guidelines.', audience: 'At-risk tenants', publishedAt: '2 weeks ago', sentTo: 47 },
];
