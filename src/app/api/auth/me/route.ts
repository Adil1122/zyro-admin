import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, COOKIE_NAMES } from '@/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAMES.SESSION)?.value;
  const email = token ? verifySession(token) : null;
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ email });
}
