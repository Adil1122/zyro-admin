import { NextRequest, NextResponse } from 'next/server';
import { verifySession, COOKIE_NAMES } from '@/lib/auth';

const PUBLIC = ['/login', '/api/auth/'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAMES.SESSION)?.value;
  const email = token ? verifySession(token) : null;

  if (!email) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
