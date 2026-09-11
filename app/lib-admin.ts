import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'joker_admin';
const MAX_AGE = 60 * 60 * 12;
function sign(value: string) {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'change-me').update(value).digest('hex');
}
export function createSession() {
  const value = `admin.${Date.now()}.${randomUUID()}`;
  return `${value}.${sign(value)}`;
}
export function isValidSession(token?: string) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 4 || parts[0] !== 'admin') return false;
  const value = parts.slice(0, 3).join('.');
  const sig = parts[3];
  const timestamp = Number(parts[1]);
  if (!Number.isFinite(timestamp) || Date.now() - timestamp > MAX_AGE * 1000 || timestamp > Date.now() + 60_000) return false;
  try { return timingSafeEqual(Buffer.from(sig), Buffer.from(sign(value))); } catch { return false; }
}
export async function isAdmin() { return isValidSession((await cookies()).get(COOKIE)?.value); }
export const adminCookieName = COOKIE;
