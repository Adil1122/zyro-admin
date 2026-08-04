import { createHmac, randomInt, timingSafeEqual } from 'crypto';

const OTP_TTL  = 5  * 60 * 1000;  // 5 min
const SESSION_TTL = 8 * 60 * 60 * 1000;  // 8 h

export const COOKIE_NAMES = {
  SESSION: 'zyro-session',
  PENDING: 'zyro-pending-auth',
} as const;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET env var is not set');
  return s;
}

function sign(payload: object): string {
  const body = JSON.stringify(payload);
  const b64  = Buffer.from(body).toString('base64url');
  const sig  = createHmac('sha256', secret()).update(b64).digest('base64url');
  return `${b64}.${sig}`;
}

function unsign<T>(token: string): (T & { exp?: number }) | null {
  try {
    const dot  = token.lastIndexOf('.');
    if (dot < 0) return null;
    const b64  = token.slice(0, dot);
    const sig  = token.slice(dot + 1);
    const expected = Buffer.from(createHmac('sha256', secret()).update(b64).digest('base64url'));
    const actual   = Buffer.from(sig);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const data = JSON.parse(Buffer.from(b64, 'base64url').toString()) as T & { exp?: number };
    if (data.exp && data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function generateOtp(): string {
  return String(randomInt(100000, 999999));
}

export function signPendingToken(email: string, otp: string): string {
  const otpHash = createHmac('sha256', secret()).update(otp).digest('hex');
  return sign({ email, otpHash, exp: Date.now() + OTP_TTL });
}

export function verifyPendingToken(token: string, otp: string): string | null {
  const payload = unsign<{ email: string; otpHash: string }>(token);
  if (!payload) return null;
  const expected = createHmac('sha256', secret()).update(otp.trim()).digest('hex');
  try {
    const ok = timingSafeEqual(Buffer.from(payload.otpHash), Buffer.from(expected));
    return ok ? payload.email : null;
  } catch {
    return null;
  }
}

export function signSession(email: string): string {
  return sign({ email, iat: Date.now(), exp: Date.now() + SESSION_TTL });
}

export function verifySession(token: string): string | null {
  return unsign<{ email: string }>(token)?.email ?? null;
}

export function cookieOpts(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path:     '/',
    maxAge:   maxAgeSeconds,
  };
}
