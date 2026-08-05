export type HealthBand = 'healthy' | 'watch' | 'atrisk' | 'critical';
export type TenantStatus = 'active' | 'trial' | 'past_due';
export type TenantPlan = 'Starter' | 'Growth' | 'Pro' | 'Trial';

export interface TenantProduct {
  name: string;
  unitsSold: number;
  revenue: number;
}

export interface TenantCampaign {
  name: string;
  spend: number;
  roas: number;
  status: 'scale' | 'monitor' | 'review';
}

export interface TenantWaTemplate {
  name: string;
  count: number;
}

export interface TenantLowStock {
  name: string;
  current: number;
  reorderPoint: number;
}

export interface TenantCourierPerf {
  courier: string;
  shipments: number;
  successRate: number;
  rtoRate: number;
  avgCost: number;
  avgDays: string;
}

export interface TenantDeepDive {
  products: TenantProduct[];
  salesTotal: number;
  orders30d: number;
  adSpend: number;
  campaigns: TenantCampaign[];
  blendedRoas: string;
  messagesSent: number;
  aiCost: number;
  optInRate: number;
  waTemplates: TenantWaTemplate[];
  totalSkus: number;
  stockValue: number;
  lowStock: TenantLowStock[];
  deadStockCount: number;
  courierPerf: TenantCourierPerf[];
  dunningDays: number;
}

export interface Tenant {
  id: string;
  name: string;
  initials: string;
  owner: string;
  phone: string;
  email: string;
  city: string;
  signedUp: string;
  plan: string;
  mrr: number;
  status: TenantStatus;
  health: number;
  orders30d: number;
  breakdown: [string, number, number][]; // [label, weight, score]
  integrations: string[];
  dunningDays?: number;
  band: HealthBand;
  deepDive: TenantDeepDive;
}

export interface KillSwitch {
  id: string;
  name: string;
  effect: string;
  owner: string;
  active: boolean;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  owner: string;
  rolloutPct: number;
}

export interface CourierHealth {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  successRate: number;
  latencyMs: number;
  affectedTenants: number;
}

export interface JobQueue {
  name: string;
  processing: number;
  pending: number;
  failed: number;
  status: 'healthy' | 'backlogged' | 'stalled';
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: string;
  publishedAt: string;
  sentTo: number;
}

export interface AuditEntry {
  type: string;
  action: string;
  tenant: string;
  admin: string;
  time: string;
  hoursAgo: number;
  reason: string;
}

export interface ReasonModalState {
  open: boolean;
  title: string;
  sub: string;
  onConfirm: ((reason: string) => void) | null;
}

export interface MfaStepUpState {
  open: boolean;
  reason: string;
  onConfirm: (() => void) | null;
}

export interface ImpersonationState {
  active: boolean;
  tenantName: string;
  intervalId: ReturnType<typeof setInterval> | null;
  seconds: number;
}
