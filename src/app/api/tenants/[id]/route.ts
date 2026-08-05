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

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await getSupabase()
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(mapRow(data));
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const updates: Record<string, unknown> = {};
  if (body.status !== undefined) updates.status = body.status;
  if (body.plan !== undefined) updates.plan = body.plan;
  if (body.mrr !== undefined) updates.mrr = body.mrr;
  if (body.health !== undefined) updates.health = body.health;
  if (body.band !== undefined) updates.band = body.band;
  updates.updated_at = new Date().toISOString();

  const { data, error } = await getSupabase()
    .from('tenants')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(mapRow(data));
}
