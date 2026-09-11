import { NextResponse } from 'next/server';
import { createSession, adminCookieName } from '../../../lib-admin';

const attempts = new Map<string, { count: number; reset: number }>();
function allowed(ip: string) {
  const now = Date.now();
  const item = attempts.get(ip);
  if (!item || item.reset < now) { attempts.set(ip, { count: 1, reset: now + 10 * 60_000 }); return true; }
  if (item.count >= 8) return false;
  item.count += 1;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!allowed(ip)) return NextResponse.json({ ok: false, error: 'Çok fazla giriş denemesi. 10 dakika sonra tekrar deneyin.' }, { status: 429 });
  const { email, password } = await req.json().catch(() => ({}));
  const configuredEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const valid = Boolean(
    configuredEmail &&
    process.env.ADMIN_PASSWORD &&
    process.env.ADMIN_SESSION_SECRET &&
    typeof email === 'string' &&
    email.trim().toLowerCase() === configuredEmail &&
    password === process.env.ADMIN_PASSWORD
  );
  if (!valid) return NextResponse.json({ ok: false, error: 'Şifre hatalı.' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 12 });
  return res;
}
