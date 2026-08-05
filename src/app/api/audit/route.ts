import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  const search = url.searchParams.get('search');
  const limit = parseInt(url.searchParams.get('limit') ?? '50');

  const sb = getSupabase();
  let query = sb
    .from('audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (type && type !== 'all') query = query.eq('type', type);
  if (search) {
    query = query.or(`action.ilike.%${search}%,tenant.ilike.%${search}%,admin.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const entries = (data ?? []).map(row => ({
    id: row.id,
    admin: row.admin,
    action: row.action,
    tenant: row.tenant,
    type: row.type,
    reason: row.reason ?? '',
    time: new Date(row.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
  }));

  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await getSupabase().from('audit_log').insert([{
    admin: body.admin ?? 'Anes Khan',
    action: body.action,
    tenant: body.tenant ?? '',
    type: body.type ?? 'account',
    reason: body.reason ?? '',
  }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
