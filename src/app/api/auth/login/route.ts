import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { generateOtp, signPendingToken, COOKIE_NAMES, cookieOpts } from '@/lib/auth';
import { sendOtpEmail } from '@/lib/mailer';

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS     = 15 * 60 * 1000;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_ATTEMPTS) return false;
  rec.count++;
  return true;
}

function clearRate(ip: string) {
  attempts.delete(ip);
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: 'Too many sign-in attempts. Please wait 15 minutes before trying again.' },
      { status: 429 },
    );
  }

  let email = '', password = '';
  try {
    const body = await req.json();
    email    = String(body.email ?? '').trim().toLowerCase();
    password = String(body.password ?? '');
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const adminEmail    = (process.env.ADMIN_EMAIL ?? '').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? '';

  let valid = false;
  try {
    const emailBuf  = Buffer.alloc(Math.max(email.length,    adminEmail.length),    0);
    const adminEB   = Buffer.alloc(Math.max(email.length,    adminEmail.length),    0);
    const passBuf   = Buffer.alloc(Math.max(password.length, adminPassword.length), 0);
    const adminPB   = Buffer.alloc(Math.max(password.length, adminPassword.length), 0);
    Buffer.from(email).copy(emailBuf);
    Buffer.from(adminEmail).copy(adminEB);
    Buffer.from(password).copy(passBuf);
    Buffer.from(adminPassword).copy(adminPB);
    valid = timingSafeEqual(emailBuf, adminEB) && timingSafeEqual(passBuf, adminPB);
  } catch {
    valid = false;
  }

  if (!valid) {
    return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
  }

  clearRate(ip);

  const otp   = generateOtp();
  const token = signPendingToken(email, otp);

  try {
    await sendOtpEmail(email, otp);
  } catch (err) {
    console.error('[auth/login] Failed to send OTP email:', err);
    return NextResponse.json(
      { error: 'Could not send sign-in code. Check your email configuration.' },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.PENDING, token, cookieOpts(5 * 60));

  return NextResponse.json({ ok: true });
}
