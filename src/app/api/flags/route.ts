import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await getSupabase()
    .from('feature_flags')
    .select('*')
    .order('flag_type', { ascending: true })
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.enabled !== undefined) updates.enabled = body.enabled;
  if (body.rollout !== undefined) updates.rollout = body.rollout;

  const { error } = await getSupabase()
    .from('feature_flags')
    .update(updates)
    .eq('name', body.name);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
