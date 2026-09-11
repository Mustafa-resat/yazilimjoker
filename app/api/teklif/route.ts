import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const type = String(body.type ?? '').trim();
    const message = String(body.message ?? '').trim();
    const website = String(body.website ?? '').trim();

    // Honeypot: normal users never see/fill this field.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message || !emailPattern.test(email)) {
      return NextResponse.json({ ok: false, message: 'Lütfen zorunlu alanları doğru şekilde doldurun.' }, { status: 400 });
    }

    if (name.length > 120 || email.length > 180 || phone.length > 40 || type.length > 80 || message.length > 5000) {
      return NextResponse.json({ ok: false, message: 'Girilen bilgiler beklenenden uzun.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.QUOTE_TO_EMAIL || 'mustafaresat69@gmail.com';
    const from = process.env.QUOTE_FROM_EMAIL || 'JOKER YAZILIM <onboarding@resend.dev>';

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured.');
      return NextResponse.json({ ok: false, message: 'Teklif sistemi şu anda yapılandırılıyor. Lütfen WhatsApp veya telefon üzerinden ulaşın.' }, { status: 503 });
    }

    const subject = `Yeni Teklif Talebi — ${name}${type ? ` / ${type}` : ''}`;
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#151515">
        <div style="background:#090b10;padding:24px 28px;color:#fff;border-radius:16px 16px 0 0">
          <div style="font-size:12px;letter-spacing:3px;color:#ff3038">JOKER YAZILIM</div>
          <h1 style="margin:8px 0 0;font-size:26px">Yeni Teklif Talebi</h1>
        </div>
        <div style="border:1px solid #e7e7e7;border-top:0;padding:26px 28px;border-radius:0 0 16px 16px">
          <p><strong>Ad / Firma:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(phone || 'Belirtilmedi')}</p>
          <p><strong>Proje türü:</strong> ${escapeHtml(type || 'Belirtilmedi')}</p>
          <hr style="border:0;border-top:1px solid #eee;margin:22px 0" />
          <p><strong>Proje detayları</strong></p>
          <div style="background:#f7f7f8;padding:16px;border-radius:10px;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
          <p style="font-size:12px;color:#777;margin-top:24px">Bu mesaj JOKER YAZILIM teklif formundan otomatik gönderildi.</p>
        </div>
      </div>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend error:', errorText);
      return NextResponse.json({ ok: false, message: 'Mesaj gönderilemedi. Lütfen birkaç dakika sonra tekrar deneyin.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, message: 'Teklif talebiniz başarıyla gönderildi. En kısa sürede dönüş yapacağız.' });
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json({ ok: false, message: 'Beklenmeyen bir hata oluştu. Lütfen WhatsApp veya telefon üzerinden ulaşın.' }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
