import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { TENANTS } from '@/lib/data';

const FLAGS = [
  { name: 'kill-platform-whatsapp-outbound', flag_type: 'kill', description: 'Emergency stop — pauses all outbound WhatsApp sends, every tenant, immediately', owner: 'Anes Khan', enabled: true, rollout: 100 },
  { name: 'kill-platform-courier-autobooking', flag_type: 'kill', description: 'Emergency stop — pauses all automatic courier booking platform-wide', owner: 'Anes Khan', enabled: true, rollout: 100 },
  { name: 'kill-platform-ai-order-from-chat', flag_type: 'kill', description: 'Forces AI order-from-chat into shadow mode for every tenant, no auto-orders placed', owner: 'Anes Khan', enabled: true, rollout: 100 },
  { name: 'release-whatsapp-order-from-chat-v2', flag_type: 'rollout', description: 'Improved intent classification for order-from-chat WhatsApp flow', owner: 'Hamza Ops', enabled: true, rollout: 35 },
  { name: 'release-couriers-scoring-12signal', flag_type: 'rollout', description: 'Full 12-signal AI courier scoring (vs. legacy 4-signal)', owner: 'Anes Khan', enabled: true, rollout: 100 },
  { name: 'release-finance-fbr-autoexport', flag_type: 'rollout', description: 'Automatic monthly FBR export for registered tenants', owner: 'Fatima Support Lead', enabled: true, rollout: 80 },
  { name: 'release-finance-profitcalc-v2', flag_type: 'rollout', description: 'Redesigned profit calculator with COD-fee breakdown', owner: 'Hamza Ops', enabled: true, rollout: 15 },
  { name: 'release-inventory-multiwarehouse-routing', flag_type: 'rollout', description: 'Route orders to nearest warehouse automatically', owner: 'Anes Khan', enabled: true, rollout: 60 },
  { name: 'release-whatsapp-sms-fallback', flag_type: 'rollout', description: 'SMS delivery for the ~20% of customers without WhatsApp', owner: 'Fatima Support Lead', enabled: true, rollout: 100 },
];

export async function POST() {
  const sb = getSupabase();

  const tenantRows = TENANTS.map(t => ({
    id: t.id,
    name: t.name,
    initials: t.initials,
    owner: t.owner,
    phone: t.phone,
    email: t.email,
    city: t.city,
    signed_up: t.signedUp,
    plan: t.plan,
    mrr: t.mrr,
    status: t.status,
    health: t.health,
    band: t.band,
    orders30d: t.orders30d,
    dunning_days: t.dunningDays ?? null,
    integrations: t.integrations,
    breakdown: t.breakdown,
    deep_dive: t.deepDive,
  }));

  const { error: te } = await sb.from('tenants').upsert(tenantRows, { onConflict: 'id' });
  if (te) return NextResponse.json({ error: te.message }, { status: 500 });

  const { error: fe } = await sb.from('feature_flags').upsert(FLAGS, { onConflict: 'name' });
  if (fe) return NextResponse.json({ error: fe.message }, { status: 500 });

  return NextResponse.json({ seeded: { tenants: tenantRows.length, flags: FLAGS.length } });
}
