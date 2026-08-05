import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: Record<string, any>) {
  return {
    name: row.name,
    status: row.status as 'healthy' | 'degraded' | 'down',
    successRate: row.success_rate,
    latencyMs: row.latency_ms,
    affectedTenants: row.affected_tenants,
    updatedAt: row.updated_at,
  };
}

export async function GET() {
  const { data, error } = await getSupabase()
    .from('courier_health')
    .select('*')
    .order('name');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data ?? []).map(mapRow));
}
