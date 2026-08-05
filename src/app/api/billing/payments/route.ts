import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId');
  const limit = parseInt(searchParams.get('limit') ?? '50');

  let query = getSupabase()
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (tenantId) query = query.eq('tenant_id', tenantId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json((data ?? []).map(row => ({
    id: row.id,
    tenantId: row.tenant_id,
    tenantName: row.tenant_name,
    amount: row.amount,
    currency: row.currency,
    gateway: row.gateway,
    method: row.method,
    status: row.status,
    paymentLink: row.payment_link,
    notes: row.notes,
    admin: row.admin,
    time: new Date(row.created_at).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    }),
    paidAt: row.paid_at ? new Date(row.paid_at).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    }) : null,
  })));
}
