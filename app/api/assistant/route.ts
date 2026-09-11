import { NextResponse } from 'next/server';

const buckets = new Map<string, { count: number; reset: number }>();
function allowed(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || current.reset < now) {
    buckets.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (current.count >= 10) return false;
  current.count += 1;
  return true;
}

function localAnswer(idea: string) {
  const s = idea.toLocaleLowerCase('tr-TR');
  const parts: string[] = [];
  if (/e.?ticaret|mağaza|ürün|satış/.test(s)) parts.push('E-ticaret arayüzü + ürün/stok/sipariş yönetimi');
  if (/mobil|android|ios|uygulama/.test(s)) parts.push('Mobil uygulama + API + bildirim altyapısı');
  if (/crm|müşteri|firma|müşteri yönet/.test(s)) parts.push('CRM modülü + kullanıcı rolleri + raporlama');
  if (/yapay|ai|chatbot|otomatik|otomasyon/.test(s)) parts.push('AI entegrasyonu + otomasyon iş akışları');
  if (/randevu|rezervasyon|takvim/.test(s)) parts.push('Randevu/rezervasyon + takvim + bildirim sistemi');
  if (/stok|depo|envanter/.test(s)) parts.push('Stok/depo modülü + hareket takibi + raporlama');
  if (!parts.length) parts.push('Responsive web uygulaması + yönetim paneli + API altyapısı');
  return `${parts.join(' · ')}. İlk kapsam görüşmesinde netleştirilebilir.`;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!allowed(ip)) return NextResponse.json({ ok: false, error: 'Çok fazla istek. Lütfen biraz sonra tekrar deneyin.' }, { status: 429 });
    const body = await req.json();
    const idea = typeof body?.idea === 'string' ? body.idea.trim() : '';
    if (!idea) return NextResponse.json({ ok: false, error: 'Proje fikrinizi yazın.' }, { status: 400 });
    if (idea.length > 2500) return NextResponse.json({ ok: false, error: 'Proje açıklaması çok uzun.' }, { status: 400 });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ ok: true, mode: 'local', answer: localAnswer(idea) });

    const model = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
    const prompt = `Sen JOKER YAZILIM'ın proje danışmanısın. Türkçe, kısa ve profesyonel cevap ver. Kullanıcının fikrini yazılım kapsamına dönüştür. En fazla 5 madde kullan. Kesin fiyat, garanti, gerçek müşteri/referans veya doğrulanmamış şirket bilgisi uydurma. Tıbbi/finansal/hukuki kesin sonuç verme. Sonunda "Bu yalnızca ilk kapsam taslağıdır; kesin kapsam ve teklif görüşmede netleşir." cümlesini ekle. JOKER YAZILIM; web, mobil, e-ticaret, özel yazılım, AI, otomasyon, API ve kurumsal yazılım geliştirir. Kullanıcı fikri:\n${idea}`;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, input: prompt, store: false }),
    });
    if (!response.ok) return NextResponse.json({ ok: true, mode: 'local', answer: localAnswer(idea) });
    const data = await response.json();
    const answer = typeof data?.output_text === 'string' ? data.output_text.trim() : '';
    return NextResponse.json({ ok: true, mode: answer ? 'ai' : 'local', answer: answer || localAnswer(idea) });
  } catch {
    return NextResponse.json({ ok: false, error: 'Asistan şu anda yanıt veremiyor.' }, { status: 500 });
  }
}
