import { NextResponse } from 'next/server';
import { isAdmin } from '../../../lib-admin';
import { supabaseConfigured, supabaseRequest } from '../../../lib-supabase';

const statuses = new Set(['Yeni', 'İnceleniyor', 'Teklif Gönderildi', 'Tamamlandı', 'İptal']);

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!supabaseConfigured()) return NextResponse.json({ ok: false, error: 'Veritabanı yapılandırılmamış.' }, { status: 503 });
  const r = await supabaseRequest('quotes?select=*&order=created_at.desc&limit=100');
  const data = await r.json();
  return NextResponse.json({ ok: r.ok, data: r.ok ? data : [], error: r.ok ? undefined : 'Teklifler alınamadı.' }, { status: r.ok ? 200 : 502 });
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!supabaseConfigured()) return NextResponse.json({ ok: false, error: 'Veritabanı yapılandırılmamış.' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false, error: 'ID gerekli.' }, { status: 400 });
  if (body.status && !statuses.has(body.status)) return NextResponse.json({ ok: false, error: 'Geçersiz durum.' }, { status: 400 });
  const patch = { status: body.status, note: typeof body.note === 'string' ? body.note.slice(0, 2000) : '' };
  const r = await supabaseRequest(`quotes?id=eq.${encodeURIComponent(body.id)}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(patch) });
  const data = await r.json();
  return NextResponse.json({ ok: r.ok, data }, { status: r.ok ? 200 : 502 });
}
