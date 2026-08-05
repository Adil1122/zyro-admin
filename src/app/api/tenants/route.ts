import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: Record<string, any>) {
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    owner: row.owner,
    phone: row.phone,
    email: row.email,
    city: row.city,
    signedUp: row.signed_up,
    plan: row.plan,
    mrr: row.mrr,
    status: row.status,
    health: row.health,
    band: row.band,
    orders30d: row.orders30d,
    dunningDays: row.dunning_days ?? undefined,
    integrations: row.integrations ?? [],
    breakdown: row.breakdown ?? [],
    deepDive: row.deep_dive ?? {},
  };
}

export async function GET() {
  const { data, error } = await getSupabase()
    .from('tenants')
    .select('*')
    .order('mrr', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data ?? []).map(mapRow));
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await getSupabase()
    .from('tenants')
    .insert([{
      name: body.name,
      initials: body.initials ?? body.name.slice(0, 2).toUpperCase(),
      owner: body.owner ?? '',
      phone: body.phone ?? '',
      email: body.email ?? '',
      city: body.city ?? '',
      signed_up: body.signedUp ?? new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      plan: body.plan ?? 'Growth',
      mrr: body.mrr ?? 0,
      status: body.status ?? 'trial',
      health: body.health ?? 75,
      band: body.band ?? 'watch',
      orders30d: body.orders30d ?? 0,
      dunning_days: body.dunningDays ?? null,
      integrations: body.integrations ?? [],
      breakdown: body.breakdown ?? [],
      deep_dive: body.deepDive ?? {},
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(mapRow(data), { status: 201 });
}
