import { NextRequest, NextResponse } from 'next/server';
import { verifySession, COOKIE_NAMES } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAMES.SESSION)?.value;
  const email = token ? verifySession(token) : null;
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ email });
}
