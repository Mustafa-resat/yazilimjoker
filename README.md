# JOKER YAZILIM V9 — SEO + Growth Edition

Next.js 15 + TypeScript tabanlı, mobil uyumlu ve SEO odaklı yazılım ajansı sitesi.

## V10 — Yayına Hazırlık
- Hizmet bazlı SEO landing pages: /hizmetler/*
- Yazılım blogu ve SEO içerikleri: /blog/*
- Yalova yerel SEO landing page: /yalova
- SEO metadata, canonical, Open Graph ve JSON-LD Service/Organization verileri
- Otomatik sitemap ve robots
- Google Search Console verification env desteği
- Google Analytics env desteği
- Teklif formu için server-side /api/quote endpoint
- Resend REST API ile Gmail'e teklif e-postası gönderme desteği
- Honeypot spam koruması
- Gerçek admin teklif merkezi: /admin (Supabase + güvenli session)
- Case study / proje detayları: /projeler/*
- Tekliflerin Supabase veritabanına kaydı
- Güvenlik response headerları ve powered-by kapatma
- Teklif API rate limit + alan uzunluğu doğrulama
- 404 / error / loading durumları
- Gizlilik ve kullanım şartları sayfaları
- Google Analytics yalnızca kullanıcı onayıyla yüklenir
- WebSite JSON-LD ve canonical yapılandırması
- Dark / light tema, mevcut premium tasarım, logo, WhatsApp ve responsive yapı korunmuştur.

## Kurulum
```bash
npm install
npm run dev
```

## E-posta / Gmail
`.env.local` oluşturup `.env.example` içindeki değişkenleri doldurun. `RESEND_API_KEY` zorunludur. Gönderici domainini Resend'de doğrulamanız önerilir.

## SEO
Production domaininizi `NEXT_PUBLIC_SITE_URL` ile belirtin. Sonra Search Console'a `/sitemap.xml` gönderin ve `GOOGLE_SITE_VERIFICATION` değerini ekleyin. Analytics için `NEXT_PUBLIC_GA_ID` eklenebilir.

İletişim: 0539 682 81 77 · mustafaresat69@gmail.com


## Yayın öncesi kontrol listesi
- `NEXT_PUBLIC_SITE_URL` gerçek domain ile değiştirilmeli.
- Resend gönderici domaini doğrulanmalı ve `RESEND_FROM` gerçek bir kurumsal adres olmalı.
- `RESEND_API_KEY` sadece server environment içinde tutulmalı.
- Google Search Console doğrulaması yapılmalı ve `/sitemap.xml` gönderilmeli.
- Gerçek şirket adresi, vergi/unvan bilgileri veya sosyal medya hesapları kullanılacaksa yayın öncesi içeriklere eklenmeli.
- Gizlilik/kullanım metinleri gerçek veri işleme ve sözleşme süreçlerine göre hukuki olarak gözden geçirilmeli.
- Production deploy sonrası mobil, form, WhatsApp, e-posta, 404 ve tüm SEO URLleri manuel test edilmeli.

## Production veritabanı ve admin
Supabase üzerinde `supabase-schema.sql` dosyasını çalıştırın. Ardından `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` ve uzun rastgele bir `ADMIN_SESSION_SECRET` tanımlayın. Service role anahtarını yalnızca server environment içinde tutun. `/admin` artık gerçek teklif kayıtlarını ve durum/not yönetimini kullanır.

## V12 — Conversion & Trust
- Akıllı proje/kapsam ön tahmini (kesin fiyat değildir).
- JOKER AI proje danışmanı: kullanıcı fikrinden deterministik ilk kapsam önerisi.
- “Hangi yazılıma ihtiyacınız var?” mini çözüm testi.
- Otomasyon potansiyeli için varsayımsal zaman/değer hesaplayıcı.
- İnteraktif demo modalı ve örnek dashboard ekranları.
- Trust Center: kanıtlanabilir yaklaşım ve hizmet prensipleri.

Not: V12 araçları yönlendirme/ön değerlendirme içindir; kesin fiyat, finansal sonuç veya performans garantisi vermez.

## V13 / Production hardening
- Optional real AI project advisor via `OPENAI_API_KEY` and `OPENAI_MODEL` (server-side only).
- AI endpoint uses the Responses API with `store:false`; without an API key the site falls back to a local deterministic project assistant.
- Admin login is rate-limited and signed sessions expire after 12 hours.
- Quote form can send an optional customer acknowledgement with `SEND_CUSTOMER_REPLY=true`.
- Set `NEXT_PUBLIC_SITE_URL` to the real production origin before deployment; the code intentionally does not assume a real domain when the variable is missing.


## Private Admin

The `/admin` area is a single-owner control center. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` as server-only Vercel Environment Variables. The admin route is marked `noindex` and quote APIs require a signed HTTP-only session cookie.

## Gerçek Proje Medyaları
Portföye gerçek proje medyaları eklendi:
- Sağlık Analiz Platformu: `public/projects/saglik/` altında 4 ekran görüntüsü
- Gıda Deposu Websitesi: `public/projects/gida/gida-deposu.mp4`
- Çilingir Websitesi: `public/projects/cilingir/cilingir.mp4`
- Kafe Websitesi: `public/projects/kafe/kafe.mp4`
- Aydoğan Çanta: yayındaki proje bağlantısı `https://aydogancanta.com/`
