import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await getSupabase()
    .from('platform_stats')
    .select('key, value');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const stats: Record<string, number> = {};
  for (const row of data ?? []) stats[row.key] = row.value;
  return NextResponse.json(stats);
}
