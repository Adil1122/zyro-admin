import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/lib/auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAMES.SESSION);
  cookieStore.delete(COOKIE_NAMES.PENDING);
  return NextResponse.json({ ok: true });
}
