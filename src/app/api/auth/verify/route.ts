import { NextRequest, NextResponse } from 'next/server';
import { verifyPendingToken, signSession, COOKIE_NAMES, cookieOpts } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const pending = req.cookies.get(COOKIE_NAMES.PENDING)?.value;
  if (!pending) {
    return NextResponse.json(
      { error: 'Sign-in session expired. Please start over.' },
      { status: 401 },
    );
  }

  let otp = '';
  try {
    const body = await req.json();
    otp = String(body.otp ?? '').trim();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!otp || otp.length !== 6) {
    return NextResponse.json({ error: 'Enter the full 6-digit code.' }, { status: 400 });
  }

  const email = verifyPendingToken(pending, otp);
  if (!email) {
    return NextResponse.json(
      { error: 'Incorrect or expired code. Check your email and try again.' },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true, email });
  res.cookies.set(COOKIE_NAMES.SESSION, signSession(email), cookieOpts(8 * 60 * 60));
  res.cookies.delete(COOKIE_NAMES.PENDING);
  return res;
}
