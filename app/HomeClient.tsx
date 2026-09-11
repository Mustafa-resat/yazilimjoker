'use client';

import ConversionSuite from './components/ConversionSuite';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Bot, Check, ChevronDown, ChevronRight, Code2, Database,
  Globe2, Layers3, Menu, MessageCircle, Monitor, Moon, Phone, Rocket, Send,
  ShieldCheck, Smartphone, Sparkles, X, Zap, ShoppingCart, Cpu, Cloud, Palette,
  Workflow, CircleCheck, Headphones, GitBranch, Target, Plus, Server, KeyRound, Gauge,
  Search, BarChart3, Users, CalendarClock, FileCode2, Boxes, TestTube2, Wrench,
  GitPullRequest, CloudCog, Layers, type LucideIcon,
} from 'lucide-react';

const services = [
  { icon: Globe2, no: '01', title: 'Web Yazılım', text: 'Kurumsal web siteleri, yönetim panelleri, SaaS ürünleri ve özel web uygulamaları.', points: ['Responsive tasarım', 'SEO ve performans', 'Admin paneli'] },
  { icon: Smartphone, no: '02', title: 'Mobil Uygulama', text: 'Android ve iOS için modern, hızlı ve kullanıcı odaklı mobil uygulamalar.', points: ['Modern UI/UX', 'API entegrasyonu', 'Yayın desteği'] },
  { icon: ShoppingCart, no: '03', title: 'E-Ticaret', text: 'Ürün, sipariş, ödeme, stok ve müşteri süreçlerini tek sistemde birleştiren mağazalar.', points: ['Ödeme sistemleri', 'Stok & sipariş', 'Yönetim paneli'] },
  { icon: Monitor, no: '04', title: 'Masaüstü Yazılım', text: 'Windows ve işletmelerin özel ihtiyaçlarına göre geliştirilen masaüstü uygulamaları.', points: ['Özel iş akışları', 'Yerel veri', 'Entegrasyonlar'] },
  { icon: Bot, no: '05', title: 'AI & Otomasyon', text: 'Yapay zekâ, veri işleme ve otomasyon ile zaman alan işleri akıllı hale getiriyoruz.', points: ['AI entegrasyonu', 'Otomatik raporlama', 'Akıllı iş akışları'] },
  { icon: Workflow, no: '06', title: 'Özel Yazılım', text: 'Hazır paketlere uymayan fikirler için sıfırdan, ölçeklenebilir yazılım çözümleri.', points: ['İhtiyaca özel', 'Modüler mimari', 'Uzun vadeli destek'] },
];

const technologies = [
  ['React', 'Frontend'], ['Next.js', 'Full-stack'], ['TypeScript', 'Web'], ['Node.js', 'Backend'],
  ['Python', 'Backend'], ['Django', 'Backend'], ['Flask', 'API'], ['Java', 'Backend'],
  ['SQL', 'Database'], ['MongoDB', 'Database'], ['Docker', 'DevOps'], ['Azure', 'Cloud'],
  ['Linux', 'Infrastructure'], ['Git', 'Version Control'], ['Figma', 'Design'], ['TensorFlow', 'AI/ML'],
];

const projects = [
  { category: 'Web', title: 'Sağlık Analiz Platformu', text: 'React.js ve Flask ile geliştirilen; kalp krizi ve diyabet risklerini analiz eden, makine öğrenmesi destekli dashboard deneyimi.', tech: ['React.js', 'Flask', 'Python', 'Machine Learning'], metric: 'Gerçek proje', visual: 'ai', accent: '01', status: 'Gerçek çalışma', media: { type:'images', items:['/projects/saglik/login.jpeg','/projects/saglik/assistant.jpeg','/projects/saglik/risk.jpeg','/projects/saglik/report.jpeg'] } },
  { category: 'Web', title: 'Gıda Deposu Websitesi', text: 'Gıda deposu markası için hazırlanan gerçek web sitesi çalışması; ürün ve kurumsal iletişim deneyimini modern bir arayüzde birleştiriyor.', tech: ['Web Design', 'Responsive UI', 'SEO', 'Frontend'], metric: 'Gerçek proje', visual: 'shop', accent: '02', status: 'Gerçek çalışma', media: { type:'video', src:'/projects/gida/gida-deposu.mp4' } },
  { category: 'Web', title: 'Çilingir Websitesi', text: 'Çilingir hizmetleri için hazırlanan gerçek web sitesi; hızlı iletişim, mobil dönüşüm ve hizmet odaklı kullanıcı akışına göre kurgulandı.', tech: ['Web Design', 'Responsive UI', 'Local SEO', 'Conversion'], metric: 'Gerçek proje', visual: 'dashboard', accent: '03', status: 'Gerçek çalışma', media: { type:'video', src:'/projects/cilingir/cilingir.mp4' } },
  { category: 'Web', title: 'Kafe Websitesi', text: 'Kafe işletmesi için hazırlanan gerçek web sitesi çalışması; marka sunumu ve ziyaretçi deneyimini öne çıkaran modern bir yapı.', tech: ['Web Design', 'Responsive UI', 'Frontend', 'UX'], metric: 'Gerçek proje', visual: 'mobile', accent: '04', status: 'Gerçek çalışma', media: { type:'video', src:'/projects/kafe/kafe.mp4' } },
  { category: 'Web / UI', title: 'Modern Dashboard Interfaces', text: 'React ve Next.js ile modern dashboard arayüzleri; veri yoğun ekranları sade ve kullanılabilir hale getiren gerçek çalışma.', tech: ['React', 'Next.js', 'UI/UX', 'Dashboard'], metric: 'Gerçek proje', visual: 'dashboard', accent: '05', status: 'Gerçek çalışma', media: { type:'images', items:['/projects/dashboard/modern-dashboard.png'] } },
  { category: 'Web / E-Ticaret', title: 'Aydoğan Çanta', text: 'Çanta imalatı markası için yayında olan gerçek web sitesi.', tech: ['Web Development', 'E-Commerce', 'Responsive UI', 'SEO'], metric: 'Yayındaki proje', visual: 'shop', accent: '06', status: 'Yayında', media: { type:'images', items:['/projects/aydogan/aydogan-canta.png'] }, external: 'https://aydogancanta.com/' },
  { category: 'E-Ticaret', title: 'E-Ticaret Operasyon Merkezi', text: 'Ürün, stok, sipariş, ödeme ve müşteri süreçlerini merkezi bir yönetim deneyiminde birleştiren çözüm vitrini.', tech: ['React', 'Node.js', 'SQL', 'Payment API'], metric: 'Örnek çözüm', visual: 'shop', accent: '07', status: 'Örnek çözüm', media: { type:'images', items:['/projects/ecommerce/e-ticaret-operasyon.png'] } },
  { category: 'Web', title: 'Kurumsal Web Platformu', text: 'Kurumsal firmaların hizmet, içerik, ekip ve iletişim süreçlerini tek dijital deneyimde birleştiren çözüm vitrini.', tech: ['Next.js', 'TypeScript', 'SEO', 'CMS'], metric: 'Örnek çözüm', visual: 'web', accent: '08', status: 'Örnek çözüm', media: { type:'images', items:['/projects/kurumsal/kurumsal-platform.png'] } },
  { category: 'AI & Otomasyon', title: 'AI Destekli İş Asistanı', text: 'İş akışlarını, görevleri, raporları ve müşteri süreçlerini yapay zekâ desteğiyle yöneten çözüm vitrini.', tech: ['AI', 'Automation', 'React', 'API'], metric: 'Örnek çözüm', visual: 'ai', accent: '09', status: 'Örnek çözüm', media: { type:'images', items:['/projects/ai-asistan/ai-asistan.png'] } },
  { category: 'Özel Yazılım', title: 'İşletme Yönetim Sistemi', text: 'Satış, stok, müşteri, sipariş, finans ve raporlama süreçlerini tek merkezde yöneten çözüm vitrini.', tech: ['React', 'Dashboard', 'SQL', 'Automation'], metric: 'Örnek çözüm', visual: 'dashboard', accent: '10', status: 'Örnek çözüm', media: { type:'images', items:['/projects/isletme/isletme-yonetim.png'] } },
  { category: 'Mobil', title: 'Mobil Servis Uygulaması', text: 'Saha ekiplerinin görev, müşteri, konum ve servis süreçlerini tek mobil uygulamada yöneten çözüm vitrini.', tech: ['Mobile UI', 'Maps', 'Task Management', 'API'], metric: 'Örnek çözüm', visual: 'mobile', accent: '11', status: 'Örnek çözüm', media: { type:'images', items:['/projects/mobil/mobil-servis.png'] } },
  { category: 'Web', title: 'API & Entegrasyon Hub', text: 'API, webhook, entegrasyon ve otomasyon süreçlerini tek merkezde yöneten çözüm vitrini.', tech: ['REST API', 'Webhooks', 'Integrations', 'Monitoring'], metric: 'Örnek çözüm', visual: 'api', accent: '12', status: 'Örnek çözüm', media: { type:'images', items:['/projects/api/api-hub.png'] } },
]

const processSteps = [
  ['01', 'Fikri Dinliyoruz', 'İhtiyacınızı, hedefinizi ve bütçenizi netleştiriyoruz.'],
  ['02', 'Yol Haritası', 'Kapsam, teknoloji, tasarım ve teslim planını birlikte oluşturuyoruz.'],
  ['03', 'Tasarım & Geliştirme', 'Arayüzü tasarlıyor, kodluyor, test ediyor ve düzenli olarak gösteriyoruz.'],
  ['04', 'Yayın & Destek', 'Projeyi yayına alıyor, eğitim ve devam eden teknik destek sağlıyoruz.'],
];

const delivery = [
  ['01', 'UI / UX Tasarım', 'Figma akışları, responsive ekranlar, component sistemi ve dönüşüm odaklı arayüz.'],
  ['02', 'Frontend', 'Next.js, React ve TypeScript ile hızlı, erişilebilir ve modern kullanıcı deneyimi.'],
  ['03', 'Backend & API', 'İş kuralları, kimlik doğrulama, REST API, entegrasyonlar ve güvenli servis katmanı.'],
  ['04', 'Veri & Altyapı', 'SQL/NoSQL, cache, dosya yönetimi, Docker ve bulut ortamına uygun mimari.'],
  ['05', 'Test & Kalite', 'Fonksiyon, responsive, performans ve temel güvenlik kontrolleriyle yayın öncesi kalite.'],
  ['06', 'Deploy & Destek', 'Domain, SSL, CI/CD, yayınlama ve sonrasında bakım-geliştirme desteği.'],
];

const stackGroups = [
  ['FRONTEND', 'Next.js · React · TypeScript · HTML · CSS'],
  ['BACKEND', 'Node.js · Python · Django · Flask · Java'],
  ['DATA', 'PostgreSQL · MySQL · MongoDB · SQL'],
  ['DEVOPS', 'Docker · Git · Linux · Azure · CI/CD'],
  ['AI / ML', 'Python · TensorFlow · Keras · API entegrasyonları'],
  ['DESIGN', 'Figma · Design Systems · Responsive UI · UX'],
];

const maintenance = [
  ['START', 'Yayın sonrası temel destek', 'Hata düzeltmeleri, küçük içerik/değişiklik talepleri ve teknik yönlendirme.'],
  ['GROW', 'Sürekli geliştirme', 'Yeni özellikler, performans iyileştirmeleri, entegrasyonlar ve düzenli bakım.'],
  ['CUSTOM', 'Özel teknik ekip', 'Uzun vadeli ürün geliştirme, refactor, altyapı ve yeni modüller için esnek destek.'],
];

const faqs = [
  ['Bir yazılım projesinin fiyatı nasıl belirleniyor?', 'Projenin kapsamı, ekran sayısı, kullanıcı rolleri, entegrasyonlar ve teknik ihtiyaçlara göre özel teklif hazırlıyoruz. Hazır paket dayatmak yerine ihtiyacınıza göre fiyatlandırıyoruz.'],
  ['Sadece web sitesi mi yapıyorsunuz?', 'Hayır. Web uygulaması, kurumsal site, e-ticaret, mobil uygulama, masaüstü yazılım, otomasyon, API ve özel yazılım projeleri geliştiriyoruz.'],
  ['Proje tesliminden sonra destek veriyor musunuz?', 'Evet. Yayına alma, teknik bakım, hata düzeltme ve geliştirme ihtiyaçları için proje sonrasında da destek sunuyoruz.'],
  ['Projem için hangi teknoloji kullanılmalı?', 'İhtiyaca göre karar veriyoruz. Performans, bütçe, bakım kolaylığı ve ölçeklenebilirliği değerlendirerek en uygun teknoloji setini seçiyoruz.'],
];

function slug(text: string) { return text.toLowerCase().replaceAll('ı', 'i').replaceAll('ş', 's').replaceAll('ğ', 'g').replaceAll('ü', 'u').replaceAll('ö', 'o').replaceAll('ç', 'c').replaceAll(' & ', '-').replaceAll(' ', '-').replaceAll(/[^a-z0-9-]/g, ''); }

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState('Tümü');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [quoteState, setQuoteState] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteError, setQuoteError] = useState('');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('joker-theme');
    if (savedTheme === 'light') setDark(false);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('joker-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    try {
      const brief = window.sessionStorage.getItem('joker-project-brief');
      if (brief) { setQuoteMessage(brief); window.sessionStorage.removeItem('joker-project-brief'); }
    } catch {}
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => activeProject === 'Tümü' ? projects : projects.filter(p => p.category === activeProject), [activeProject]);
  const nav = ['Hizmetler', 'Projeler', 'Süreç', 'Hakkımızda', 'İletişim'];
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JOKER YAZILIM',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yazilimjoker.com',
    description: 'Web, mobil, e-ticaret, özel yazılım, yapay zekâ ve otomasyon çözümleri.',
    email: 'mustafaresat69@gmail.com',
    telephone: '+90 539 682 81 77',
    knowsAbout: ['Web Development', 'Mobile Development', 'E-commerce', 'Artificial Intelligence', 'Automation', 'API Integration', 'Custom Software'],
    contactPoint: { '@type': 'ContactPoint', telephone: '+90 539 682 81 77', email: 'mustafaresat69@gmail.com', contactType: 'customer service', availableLanguage: ['Turkish', 'English', 'Arabic'] }
  };

  return (
    <main className={dark ? 'site dark' : 'site'}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org', '@type':'ItemList', name:'JOKER YAZILIM Hizmetleri', itemListElement: services.map((s,i)=>({ '@type':'ListItem', position:i+1, name:s.title, description:s.text })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org', '@type':'FAQPage', mainEntity: faqs.map(([q,a])=>({ '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } })) }) }} />
      <div className="noise" />
      <div className="top-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" onClick={() => setMenu(false)}><span className="brand-mark"><img src={dark ? "/joker-logo-dark.svg" : "/joker-logo-light.svg"} alt="JOKER YAZILIM logosu" width={44} height={44} fetchPriority="high" /></span><span>JOKER <b>YAZILIM</b><small>Fikirden gerçeğe, kodla.</small></span></a>
          <div id="mobile-navigation" className={`nav-links ${menu ? 'open' : ''}`}>
            {nav.map(n => <a key={n} href={`#${slug(n)}`} onClick={() => setMenu(false)}>{n}</a>)}
            <a className="mobile-cta" href="#iletisim" onClick={() => setMenu(false)}>Teklif Al <ArrowRight size={15}/></a>
          </div>
          <div className="nav-actions">
            <button className="icon-btn" type="button" aria-label={dark ? "Açık temaya geç" : "Karanlık temaya geç"} title={dark ? "Açık tema" : "Karanlık tema"} onClick={() => setDark(v => !v)}>{dark ? <Sparkles size={17}/> : <Moon size={17}/>}</button>
            <a className="nav-cta" href="#iletisim">Teklif Al <ArrowRight size={16}/></a>
            <button className="menu-btn" type="button" aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(v => !v)} aria-label={menu ? "Menüyü kapat" : "Menüyü aç"}>{menu ? <X/> : <Menu/>}</button>
          </div>
        </nav>
      </header>

      <section id="top" className="hero section-grid">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-glow glow-a"/><div className="hero-glow glow-b"/>
        <div className="container hero-inner">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="pulse"/> YAZILIM ÇÖZÜMLERİNDE GÜVENİLİR ORTAĞINIZ</div>
            <h1>JOKER <span>YAZILIM</span></h1>
            <h2>Fikirlerinizi <em>çalışan yazılımlara</em> dönüştürüyoruz.</h2>
            <p>Web, mobil, e-ticaret, masaüstü, yapay zekâ ve özel yazılım projelerinizi modern teknolojilerle; <strong>uygun fiyat, şeffaf süreç ve güçlü destek</strong> anlayışıyla hayata geçiriyoruz.</p>
            <div className="hero-actions"><a className="primary" href="#iletisim">Ücretsiz Teklif Al <ArrowRight size={18}/></a><a className="secondary" href="#projeler"><Rocket size={17}/> Projeleri İncele</a></div>
            <div className="trust-row"><span><CircleCheck/> Uygun fiyat</span><span><CircleCheck/> Şeffaf süreç</span><span><CircleCheck/> Modern teknoloji</span><span><CircleCheck/> Satış sonrası destek</span></div>
          </div>
          <div className="hero-visual reveal">
            <div className="code-card">
              <div className="window-top"><i/><i/><i/><span>joker-studio.ts</span><b>● LIVE</b></div>
              <pre><code>{`const project = await joker.create({
  idea: "your_next_product",
  design: "premium",
  stack: ["Next.js", "Python"],
  budget: "smart"
});

project.status = "production";
project.support = true;`}</code></pre>
              <div className="terminal-line"><span className="green">●</span> deploy successful <span>✓</span><small>2.4s</small></div>
            </div>
            <div className="floating-card fc-a"><Zap/><div><b>Hızlı</b><small>Performans odaklı</small></div></div>
            <div className="floating-card fc-b"><ShieldCheck/><div><b>Güvenli</b><small>Sağlam altyapı</small></div></div>
            <div className="hero-ring ring-a"/><div className="hero-ring ring-b"/>
            <div className="terminal-cursor">_</div>
          </div>
        </div>
        <div className="hero-bottom container"><span>SCROLL TO EXPLORE</span><ChevronDown size={17}/></div>
      </section>

      <section className="visual-strip" aria-hidden="true"><div className="visual-image vi-one"/><div className="visual-image vi-two"/><div className="visual-image vi-three"/><div className="visual-caption"><span>CODE • DESIGN • AUTOMATION • DIGITAL PRODUCTS</span><b>JOKER YAZILIM</b></div></section>

      <section className="marquee"><div className="marquee-track">{['WEB YAZILIM', 'MOBİL', 'E-TİCARET', 'AI & OTOMASYON', 'ÖZEL YAZILIM', 'MİMARİ & API', 'WEB YAZILIM', 'MOBİL', 'E-TİCARET', 'AI & OTOMASYON'].map((x,i)=><span key={i}>{x}<b>✦</b></span>)}</div></section>

      <section id="hizmetler" className="services container section-pad">
        <SectionTitle kicker="NELER YAPIYORUZ?" title={<>İhtiyacınıza uygun <span>yazılım.</span></>} desc="Fikrinizi analiz ediyor, doğru teknolojiyi seçiyor ve tasarımdan yayına kadar tüm süreci yönetiyoruz." />
        <div className="service-grid">{services.map(({icon: Icon,no,title,text,points},i)=><article className="service-card reveal" key={title} style={{['--delay' as string]: `${i*70}ms`}}><div className="service-top"><div className="icon-box"><Icon/></div><span>{no}</span></div><h3>{title}</h3><p>{text}</p><div className="service-points">{points.map(x=><span key={x}><Check/> {x}</span>)}</div><a href={`/hizmetler/${title === 'E-Ticaret' ? 'e-ticaret-yazilimi' : title === 'AI & Otomasyon' ? 'yapay-zeka' : title === 'Özel Yazılım' ? 'ozel-yazilim' : title === 'Masaüstü Yazılım' ? 'ozel-yazilim' : title === 'Mobil Uygulama' ? 'mobil-uygulama' : title === 'Web Yazılım' ? 'web-yazilim' : 'ozel-yazilim'}` }>Hizmeti incele <ArrowUpRight size={15}/></a></article>)}</div>
      </section>

      <section className="tech-band image-section"><div className="section-image si-code" aria-hidden="true"/><div className="container tech-inner"><div className="tech-intro reveal"><span className="eyebrow">TEKNOLOJİLER</span><h2>Doğru teknoloji.<br/><span>Temiz kod.</span></h2><p>Projenin ihtiyacına göre modern, sürdürülebilir ve performanslı teknoloji setleri kullanıyoruz.</p><div className="tech-meta"><span><Code2/> Clean code</span><span><Zap/> Performance</span></div></div><div className="tech-cloud reveal">{technologies.map(([name,kind])=><div className="tech-item" key={name}><span>{name.slice(0,2)}</span><div><b>{name}</b><small>{kind}</small></div></div>)}</div></div></section>

      <section id="projeler" className="projects container section-pad image-section"><div className="section-image si-network" aria-hidden="true"/>
        <div className="project-heading"><SectionTitle kicker="ÖNE ÇIKAN ÇALIŞMALAR" title={<>Yazılımda sınır yok,<br/><span>çözüm üretmenin sınırı yok.</span></>} desc="Gerçek projelerimizi ve farklı ihtiyaçlar için hazırladığımız çözüm vitrinini bir arada inceleyin. İhtiyacınıza uygun yapıyı birlikte tasarlayabiliriz."/><a className="outline-btn" href="#iletisim">Projenizi Anlatın <ArrowRight size={16}/></a></div>
        <div className="project-stats reveal"><div><strong>12</strong><span>Proje vitrini</span></div><div><strong>16+</strong><span>Teknoloji</span></div><div><strong>03</strong><span>Dil desteği</span></div><div><strong>02</strong><span>Staj deneyimi</span></div></div><div className="filters">{['Tümü','Web','E-Ticaret','Özel Yazılım','AI & Otomasyon','Mobil'].map(x=><button className={activeProject===x?'active':''} key={x} onClick={()=>setActiveProject(x)}>{x}</button>)}</div>
        <div className="project-grid">{filteredProjects.map((p,i)=><article className="project-card reveal" key={p.title}><div className={`project-art ${p.visual}`}>{p.media?.type==='video' ? <video className="project-media-video" src={p.media.src} muted loop autoPlay playsInline preload="metadata" /> : p.media?.type==='images' ? <div className="project-media-images">{p.media.items?.map((src,j)=><img key={src} src={src} alt={`${p.title} ekran görüntüsü ${j+1}`} loading="lazy" />)}</div> : null}<div className="art-top"><span>{p.category}</span><span>{p.accent}</span></div><div className="project-orbit"><i/><i/><i/></div>{!p.media && <div className="mock-ui"><div className="mock-sidebar"><i/><i/><i/><i/></div><div className="mock-content"><div className="mock-title"/><div className="mock-row"><i/><i/><i/></div><div className="mock-chart"><b/><b/><b/><b/><b/><b/></div></div></div>}<div className="art-glow"/></div><div className="project-body"><div className="project-kicker"><small>{p.category}</small><span>{p.metric}</span></div><div className="project-status"><i/>{p.status}</div><h3>{p.title}</h3><p>{p.text}</p><div className="tags">{p.tech.map(x=><span key={x}>{x}</span>)}</div>{p.external ? <a href={p.external} target="_blank" rel="noreferrer">Canlı siteyi incele <ArrowRight size={15}/></a> : <a href="#iletisim">Benzerini geliştirelim <ArrowRight size={15}/></a>}</div></article>)}</div>
      </section>

      <section id="surec" className="process-section image-section"><div className="section-image si-ai" aria-hidden="true"/><div className="container section-pad"><SectionTitle kicker="NASIL ÇALIŞIYORUZ?" title={<>Fikirden yayına <span>net bir süreç.</span></>} desc="Ne yapılacağını, ne zaman yapılacağını ve bütçeyi baştan konuşuyoruz. Sürpriz maliyet yerine şeffaf ilerleme."/><div className="process-grid">{processSteps.map(([n,t,d],i)=><div className="step reveal" key={n}><div className="step-head"><b>{n}</b><span>{i===3?'✓':'→'}</span></div><h3>{t}</h3><p>{d}</p>{i<3&&<div className="step-line"/>}</div>)}</div><div className="stats reveal"><div><strong>01</strong><b>Teklif</b><span>İhtiyacınıza özel</span></div><div><strong>02</strong><b>Plan</b><span>Net yol haritası</span></div><div><strong>03</strong><b>Geliştir</b><span>Düzenli teslim</span></div><div><strong>04</strong><b>Destek</b><span>Yayın sonrası</span></div></div></div></section>

      <section id="hakkimizda" className="about container section-pad"><div className="about-panel reveal"><div className="about-copy"><span className="eyebrow">JOKER YAZILIM</span><h2>Yalnızca kod yazmıyoruz.<br/><span>Çözüm üretiyoruz.</span></h2><p>İyi bir yazılım yalnızca çalışmaz; işinizi kolaylaştırır, markanızı güçlendirir ve büyümeye hazır olur. JOKER YAZILIM olarak farklı ölçekteki fikirleri modern teknoloji ve ulaşılabilir bütçelerle gerçeğe dönüştürmeye odaklanıyoruz.</p><div className="about-grid"><div><Target/><b>İhtiyaca özel</b><span>Hazır kalıp yerine size göre.</span></div><div><Palette/><b>Modern tasarım</b><span>Kullanıcı odaklı deneyim.</span></div><div><Rocket/><b>Ölçeklenebilir</b><span>Bugün ve yarın için.</span></div><div><Headphones/><b>Güçlü destek</b><span>Yayın sonrasında da yanınızdayız.</span></div></div><a className="primary" href="#iletisim">Projenizi Anlatalım <ArrowRight size={17}/></a></div><div className="about-code"><div className="code-lines">{Array.from({length:16},(_,i)=><span key={i} style={{width:`${30+(i*17)%62}%`}} />)}</div><div className="quote"><small>JOKER / MANIFESTO</small><b>Fikirden gerçeğe,<br/><em>kodla.</em></b><span>Modern teknoloji · Şeffaf iletişim · Uygun fiyat</span></div><div className="about-badge"><Sparkles/><b>BUILD<br/>BETTER</b></div></div></div></section>

      <section className="why-section image-section"><div className="section-image si-code-fade" aria-hidden="true"/><div className="container section-pad"><SectionTitle kicker="NEDEN JOKER?" title={<>Bütçenizi değil,<br/><span>fikirinizi büyütüyoruz.</span></>} desc="Kaliteli yazılımın ulaşılmaz olmak zorunda olmadığına inanıyoruz."/><div className="why-grid"><Why icon={Zap} title="Hızlı başlangıç" text="İlk görüşmeden sonra gereksiz bürokrasiyi azaltıp net bir yol haritası çıkarıyoruz."/><Why icon={ShieldCheck} title="Güvenli altyapı" text="Kod kalitesi, veri güvenliği ve sürdürülebilir mimariyi projenin merkezine koyuyoruz."/><Why icon={Database} title="Sağlam mimari" text="Büyüyen projelerin sonradan yeniden yazılmasını önlemek için modüler ilerliyoruz."/><Why icon={GitBranch} title="Şeffaf geliştirme" text="İlerlemeyi düzenli paylaşarak projenin her aşamasında ne durumda olduğunuzu bilmenizi sağlıyoruz."/></div></div></section>

      <section className="capabilities-section image-section"><div className="section-image si-network" aria-hidden="true"/><div className="container section-pad"><SectionTitle kicker="YAZILIM EKOSİSTEMİ" title={<>Tek fikir,<br/><span>çok güçlü ihtimal.</span></>} desc="İster sıfırdan bir ürün, ister mevcut sisteminize yeni bir modül; projeyi ihtiyacınıza göre uçtan uca tasarlıyoruz."/><div className="capability-layout"><div className="capability-list">{[['01','Ürün & MVP','Fikrinizi hızlıca test edebileceğiniz modern bir ürüne dönüştürün.'],['02','Kurumsal Sistemler','Şirket içi süreçleri tek merkezde yöneten özel paneller ve yazılımlar.'],['03','API & Entegrasyon','Ödeme, CRM, ERP, harici servisler ve özel API bağlantıları.'],['04','Veri & Raporlama','Dashboard, filtreleme, raporlama ve operasyon görünürlüğü.'],['05','AI & Otomasyon','Tekrarlayan işleri azaltan akıllı iş akışları ve AI entegrasyonları.'],['06','Bakım & Geliştirme','Yayındaki ürünleri güncel, güvenli ve sürdürülebilir tutma.']].map(([n,t,d])=><article className="capability reveal" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><ArrowUpRight/></article>)}</div><div className="architecture-card reveal"><div className="arch-head"><span className="pulse"/> JOKER / SYSTEM ARCHITECTURE <b>LIVE</b></div><div className="arch-core"><div className="arch-node"><Globe2/><b>Frontend</b><small>Next.js · React</small></div><div className="arch-line"/><div className="arch-node main"><Layers3/><b>API / Backend</b><small>Python · Node.js</small></div><div className="arch-line"/><div className="arch-node"><Database/><b>Data</b><small>SQL · Cloud</small></div></div><div className="arch-foot"><span>SECURITY</span><span>SCALABILITY</span><span>PERFORMANCE</span></div></div></div></div></section>

      <section className="solutions-section"><div className="container section-pad"><SectionTitle kicker="ÇÖZÜM ALANLARI" title={<>Her sektör için<br/><span>özel yazılım.</span></>} desc="Tek bir sektöre bağlı değiliz. İş modelinizi anlayıp size uygun dijital çözümü birlikte tasarlıyoruz."/><div className="solution-grid">{['Eğitim','Sağlık','E-Ticaret','Lojistik','Gayrimenkul','Finans','Üretim','Hizmet','Start-up','Kurumsal'].map((x,i)=><div className="solution-pill reveal" key={x}><span>0{i+1}</span><b>{x}</b><ArrowRight size={15}/></div>)}</div></div></section>

      <section className="quality-section image-section"><div className="section-image si-ai" aria-hidden="true"/><div className="container section-pad"><div className="quality-grid"><div className="quality-copy reveal"><span className="eyebrow">KODUN ÖTESİNDE</span><h2>Güzel görünen değil,<br/><span>iyi çalışan yazılım.</span></h2><p>JOKER YAZILIM'da tasarım ile mühendisliği aynı masada buluşturuyoruz. Performans, güvenlik, kullanılabilirlik ve bakım kolaylığı her projede birlikte düşünülür.</p><div className="quality-tags"><span>01 / PERFORMANCE</span><span>02 / SECURITY</span><span>03 / UX</span><span>04 / SEO</span><span>05 / SCALABILITY</span><span>06 / MAINTENANCE</span></div></div><div className="quality-panel reveal"><div className="quality-row"><span>PERFORMANCE</span><b>FAST</b><i style={{width:'92%'}}/></div><div className="quality-row"><span>RESPONSIVE</span><b>ALL DEVICES</b><i style={{width:'98%'}}/></div><div className="quality-row"><span>SEO READY</span><b>STRUCTURED</b><i style={{width:'88%'}}/></div><div className="quality-row"><span>SECURITY</span><b>BY DESIGN</b><i style={{width:'90%'}}/></div><div className="quality-terminal"><span>joker@studio:~$</span> npm run build<br/><em>✓ optimized production build ready</em></div></div></div></div></section>

      <section className="engineering-section image-section">
        <div className="section-image si-code" aria-hidden="true"/>
        <div className="container section-pad">
          <SectionTitle kicker="MÜHENDİSLİK ALTYAPISI" title={<>Sadece tasarım değil,<br/><span>uçtan uca mühendislik.</span></>} desc="Bir yazılım projesinin görünmeyen taraflarını da baştan planlıyoruz: mimari, veri, güvenlik, test, yayın ve sürdürülebilirlik."/>
          <div className="engineering-grid">
            <article className="engineering-console reveal">
              <div className="console-top"><span><i/> joker-engine</span><b>production ready</b></div>
              <div className="console-body">
                <div className="console-line"><span>01</span><em>ARCHITECTURE</em><b><Layers size={14}/> Modular</b></div>
                <div className="console-line"><span>02</span><em>SECURITY</em><b><KeyRound size={14}/> Protected</b></div>
                <div className="console-line"><span>03</span><em>PERFORMANCE</em><b><Gauge size={14}/> Optimized</b></div>
                <div className="console-line"><span>04</span><em>OBSERVABILITY</em><b><BarChart3 size={14}/> Measurable</b></div>
                <div className="console-line"><span>05</span><em>DELIVERY</em><b><CloudCog size={14}/> Deployable</b></div>
              </div>
              <div className="console-code"><span>const</span> product = <b>build</b>({`{`}</div>
              <div className="console-code indent">stack: [<i>"Next.js"</i>, <i>"Python"</i>],</div>
              <div className="console-code indent">quality: <i>"high"</i>,</div>
              <div className="console-code indent">support: <i>true</i></div>
              <div className="console-code">{`}`});</div>
            </article>
            <div className="engineering-points">
              <div className="eng-point reveal"><div><Server/></div><section><small>01 / ARCHITECTURE</small><h3>Modüler ve büyümeye hazır</h3><p>İhtiyaç arttıkça yeni modüller eklenebilecek temiz bir yapı kuruyoruz.</p></section></div>
              <div className="eng-point reveal"><div><Search/></div><section><small>02 / DISCOVERY</small><h3>Önce doğru problemi çözüyoruz</h3><p>Gereksiz özellik yerine işinize gerçekten değer katacak kapsamı belirliyoruz.</p></section></div>
              <div className="eng-point reveal"><div><TestTube2/></div><section><small>03 / QUALITY</small><h3>Yayın öncesi kontrol</h3><p>Farklı ekranlar, temel performans noktaları ve kritik akışlar test edilir.</p></section></div>
              <div className="eng-point reveal"><div><GitPullRequest/></div><section><small>04 / DELIVERY</small><h3>Düzenli ve izlenebilir geliştirme</h3><p>Git tabanlı çalışma düzeniyle değişiklikleri kontrollü şekilde yönetiyoruz.</p></section></div>
            </div>
          </div>
        </div>
      </section>

      <section className="delivery-section">
        <div className="container section-pad">
          <SectionTitle kicker="TESLİM KAPSAMI" title={<>Bir proje teslimi,<br/><span>koddan çok daha fazlası.</span></>} desc="Projenin ihtiyacına göre aşağıdaki katmanları birlikte ele alıyoruz. Gerekenleri seçiyor, gereksiz maliyeti azaltıyoruz."/>
          <div className="delivery-grid">{delivery.map(([n,t,d],i)=><article className="delivery-card reveal" key={n}><span>{n}</span><div className="delivery-icon">{[Palette,Code2,Server,Database,TestTube2,CloudCog][i] && (()=>{const I=[Palette,Code2,Server,Database,TestTube2,CloudCog][i]; return <I/>})()}</div><h3>{t}</h3><p>{d}</p><ArrowUpRight/></article>)}</div>
        </div>
      </section>

      <section className="stack-section image-section">
        <div className="section-image si-network" aria-hidden="true"/>
        <div className="container section-pad">
          <div className="stack-head"><SectionTitle kicker="TECH STACK" title={<>İhtiyaca göre seçilen<br/><span>doğru araçlar.</span></>} desc="Her projeye aynı teknolojiyi dayatmıyoruz. Performans, bütçe, ekip ve uzun vadeli bakım ihtiyacına göre teknoloji seçiyoruz."/><div className="stack-orbit reveal"><div className="orbit-core"><Code2/><b>JOKER</b><small>ENGINEERING</small></div><i/><i/><i/><span>API</span><span>WEB</span><span>DATA</span><span>CLOUD</span></div></div>
          <div className="stack-grid">{stackGroups.map(([k,v],i)=><article className="stack-card reveal" key={k}><span>0{i+1}</span><small>{k}</small><h3>{v.split(' · ')[0]}</h3><p>{v}</p><div className="stack-line"/></article>)}</div>
        </div>
      </section>

      <section className="maintenance-section">
        <div className="container section-pad">
          <div className="maintenance-head"><div><span className="eyebrow">YAYIN SONRASI</span><h2>Yazılımı teslim edip<br/><span>ortadan kaybolmuyoruz.</span></h2></div><p>Ürün büyüdükçe yeni ihtiyaçlar çıkar. Bakım, geliştirme ve teknik destek seçenekleriyle yanınızda kalıyoruz.</p></div>
          <div className="maintenance-grid">{maintenance.map(([tag,t,d],i)=><article className={`maintenance-card ${i===1?'featured':''} reveal`} key={tag}><div className="maintenance-top"><span>{tag}</span><Wrench/></div><h3>{t}</h3><p>{d}</p><a href="#iletisim">Destek planını konuş <ArrowRight size={15}/></a></article>)}</div>
        </div>
      </section>

      <section className="estimate-section image-section">
        <div className="section-image si-ai" aria-hidden="true"/>
        <div className="container section-pad estimate-inner">
          <div className="estimate-copy reveal"><span className="eyebrow">PROJE KAPSAMI</span><h2>Fikrinizi anlatın,<br/><span>kapsamı birlikte çıkaralım.</span></h2><p>Henüz net bir teknik dokümanınız yoksa sorun değil. Fikrinizden yola çıkarak ekranları, özellikleri, teknoloji ihtiyacını ve geliştirme yol haritasını birlikte netleştirebiliriz.</p><div className="estimate-tags"><span><Users/> Kullanıcı rolleri</span><span><Boxes/> Modüller</span><span><CalendarClock/> Takvim</span><span><BarChart3/> Raporlama</span><span><ShieldCheck/> Güvenlik</span></div></div>
          <div className="estimate-card reveal"><div className="estimate-number">JOKER / 02</div><div className="estimate-step"><span>01</span><div><b>Fikir</b><small>Ne geliştirmek istiyorsunuz?</small></div></div><div className="estimate-step"><span>02</span><div><b>Kapsam</b><small>Hangi özellikler gerekli?</small></div></div><div className="estimate-step"><span>03</span><div><b>Teknoloji</b><small>Hangi altyapı en mantıklı?</small></div></div><div className="estimate-step"><span>04</span><div><b>Teklif</b><small>Net kapsam + uygun bütçe.</small></div></div><a className="primary" href="#iletisim">Ücretsiz Ön Görüşme <ArrowRight size={17}/></a></div>
        </div>
      </section>

      <ConversionSuite />

      <section className="faq-section"><div className="container section-pad faq-grid"><div><span className="eyebrow">SIK SORULANLAR</span><h2>Merak ettikleriniz.<br/><span>Cevaplarımız.</span></h2><p>Projenizle ilgili aklınızdaki soruları görüşmeden önce yanıtlayalım.</p><a href="#iletisim" className="outline-btn">Başka bir sorunuz var mı? <ArrowRight size={15}/></a></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq ${openFaq===i?'open':''}`} key={q}><button onClick={()=>setOpenFaq(openFaq===i?null:i)}><span>{q}</span>{openFaq===i?<X size={17}/>:<Plus size={17}/>}</button><div className="faq-answer"><p>{a}</p></div></div>)}</div></div></section>

      <section className="blog-teaser section-pad"><div className="container"><div className="project-heading"><SectionTitle kicker="JOKER BLOG" title={<>Yazılım hakkında<br/><span>faydalı içerikler.</span></>} desc="Web geliştirme, SEO, yapay zekâ ve dijital ürünler hakkında pratik rehberler."/><div style={{display:'flex',gap:10,flexWrap:'wrap'}}><a className="outline-btn" href="/projeler">Case study'leri gör <ArrowRight size={16}/></a><a className="outline-btn" href="/blog">Tüm yazıları gör <ArrowRight size={16}/></a></div></div><div className="blog-teaser-grid"><a className="blog-teaser-card" href="/blog/ozel-yazilim-mi-hazir-yazilim-mi"><small>YAZILIM · 6 DK</small><h3>Özel yazılım mı, hazır yazılım mı?</h3><p>Doğru seçimi maliyet, esneklik ve ölçeklenebilirlik açısından değerlendirin.</p><ArrowUpRight/></a><a className="blog-teaser-card" href="/blog/seo-uyumlu-web-sitesi-nasil-yapilir"><small>SEO · 7 DK</small><h3>SEO uyumlu web sitesi nasıl yapılır?</h3><p>Teknik SEO, içerik mimarisi, hız ve mobil deneyimi birlikte ele alın.</p><ArrowUpRight/></a><a className="blog-teaser-card" href="/blog/isletmeler-icin-yapay-zeka"><small>AI · 5 DK</small><h3>İşletmeler yapay zekâyı nerede kullanabilir?</h3><p>Gerçek iş akışlarına bağlanabilecek AI kullanım alanlarını keşfedin.</p><ArrowUpRight/></a></div></div></section>

      <section id="iletisim" className="contact-section"><div className="container contact-grid"><div className="contact-copy"><span className="eyebrow">İLETİŞİM</span><h2>Bir fikriniz mi var?<br/><span>Haydi başlayalım.</span></h2><p>Projenizi birkaç cümleyle anlatın. Size en uygun teknoloji, kapsam ve bütçe için ücretsiz ön değerlendirme yapalım.</p><div className="contact-links"><a href="tel:+905396828177"><Phone/><div><small>Telefon</small><b>0539 682 81 77</b></div><ArrowUpRight/></a><a href="mailto:mustafaresat69@gmail.com"><Send/><div><small>E-posta</small><b>mustafaresat69@gmail.com</b></div><ArrowUpRight/></a><a href="https://wa.me/905396828177" target="_blank" rel="noreferrer"><WhatsAppIcon/><div><small>WhatsApp</small><b>Hızlıca mesaj gönderin</b></div><ArrowUpRight/></a></div></div><form className="quote-form" onSubmit={async (e)=>{e.preventDefault();const form=e.currentTarget;setQuoteState('sending');setQuoteError('');const data=Object.fromEntries(new FormData(form).entries());try{const r=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await r.json().catch(()=>({}));if(!r.ok)throw new Error(typeof result.error==='string'?result.error:'Gönderim sırasında sorun oluştu.');setQuoteMessage('');form.reset();setQuoteState('success');setQuoteError('')}catch(error){setQuoteState('error');setQuoteError(error instanceof Error?error.message:'Gönderim sırasında sorun oluştu.')}}}><div className="form-head"><div><span className="eyebrow">ÜCRETSİZ TEKLİF</span><h3>Projenizi anlatın.</h3></div><span className="form-no">JOKER / 01</span></div><label className="hp-field" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><label>Adınız / Firma<input name="name" placeholder="Adınızı veya firma adını yazın" required/></label><div className="form-row"><label>E-posta<input type="email" name="email" placeholder="ornek@mail.com" required/></label><label>Telefon<input name="phone" placeholder="053x xxx xx xx"/></label></div><label>Proje türü<select name="type" defaultValue="" required><option value="" disabled>Bir seçenek seçin</option><option>Web Yazılım</option><option>Mobil Uygulama</option><option>E-Ticaret</option><option>Masaüstü Yazılım</option><option>AI & Otomasyon</option><option>Özel Yazılım</option></select></label><label>Projeniz<textarea name="message" rows={5} value={quoteMessage} onChange={e=>setQuoteMessage(e.target.value)} placeholder="Ne geliştirmek istiyorsunuz? Kısaca anlatın..." required/></label><button className="primary" type="submit" disabled={quoteState==='sending'}>{quoteState==='sending' ? 'Gönderiliyor...' : quoteState==='success' ? 'Teklif Gönderildi ✓' : 'Teklif Talebi Gönder'} <ArrowRight size={17}/></button><div className={`form-result ${quoteState}`}>{quoteState==='error' ? (quoteError || 'Gönderim sırasında sorun oluştu. WhatsApp üzerinden de ulaşabilirsiniz.') : quoteState==='success' ? 'Teşekkürler. Talebiniz JOKER YAZILIM ekibine iletildi.' : ''}</div><small className="form-note"><LockIcon/> Bilgileriniz yalnızca teklif süreci için kullanılır. <a href="/gizlilik">Gizlilik</a></small></form></div></section>

      <a className="floating-whatsapp" href="https://wa.me/905396828177?text=Merhaba%20JOKER%20YAZILIM%2C%20bir%20yaz%C4%B1l%C4%B1m%20projesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer" aria-label="WhatsApp üzerinden JOKER YAZILIM ile iletişime geç"><span className="wa-ping"/><WhatsAppIcon size={24}/><span className="wa-label">WhatsApp'tan Yaz</span></a><footer><div className="container footer-top"><a className="brand" href="#top"><span className="brand-mark"><img src={dark ? "/joker-logo-dark.svg" : "/joker-logo-light.svg"} alt="JOKER YAZILIM logosu" width={44} height={44} fetchPriority="high" /></span><span>JOKER <b>YAZILIM</b><small>Fikirden gerçeğe, kodla.</small></span></a><div className="footer-nav">{nav.map(n=><a key={n} href={`#${slug(n)}`}>{n}</a>)}<a href="/hizmetler">Tüm Hizmetler</a><a href="/blog">Blog</a><a href="/yalova">Yalova Yazılım</a></div><a className="whatsapp" href="https://wa.me/905396828177" target="_blank" rel="noreferrer"><WhatsAppIcon size={18}/> WhatsApp</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} JOKER YAZILIM. Tüm hakları saklıdır.</span><span>Yalova, Türkiye · <a href="mailto:mustafaresat69@gmail.com">mustafaresat69@gmail.com</a> · <a href="/gizlilik">Gizlilik</a> · <a href="/kullanim-sartlari">Kullanım</a></span></div></footer>
    </main>
  );
}

function SectionTitle({kicker,title,desc}:{kicker:string,title:React.ReactNode,desc:string}) { return <div className="section-title reveal"><span className="eyebrow">{kicker}</span><h2>{title}</h2><p>{desc}</p></div> }
function Why({icon:Icon,title,text}:{icon:LucideIcon,title:string,text:string}) { return <article className="why-card reveal"><div className="why-icon"><Icon/></div><h3>{title}</h3><p>{text}</p><span className="why-arrow"><ArrowUpRight size={15}/></span></article> }
function WhatsAppIcon({size=22}:{size?:number}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M12.04 2a9.93 9.93 0 0 0-8.52 15.03L2 22l5.12-1.49A9.94 9.94 0 1 0 12.04 2Zm0 18.12c-1.58 0-3.13-.42-4.49-1.22l-.32-.19-3.04.88.9-2.96-.21-.33a8.17 8.17 0 1 1 7.16 3.82Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.39.11-.52.12-.12.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.17.16 1.61.1.49-.07 1.48-.61 1.69-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.49-.3Z"/></svg>;
}
function LockIcon(){return <ShieldCheck size={13}/>}
