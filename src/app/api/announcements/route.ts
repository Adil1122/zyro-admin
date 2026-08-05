import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await getSupabase()
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json((data ?? []).map(row => ({
    id: row.id,
    title: row.title,
    body: row.body,
    audience: row.audience,
    publishedBy: row.published_by,
    time: new Date(row.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
  })));
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await getSupabase()
    .from('announcements')
    .insert([{
      title: body.title,
      body: body.body ?? '',
      audience: body.audience ?? 'all',
      published_by: body.publishedBy ?? 'Anes Khan',
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id }, { status: 201 });
}
