import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, Bot, Globe2, Smartphone, ShoppingCart, Workflow, Plug, Building2 } from 'lucide-react';
import { servicePages } from '../content';

export const metadata: Metadata = {
  title: 'Yazılım Hizmetleri | Web, Mobil, E-Ticaret ve Özel Yazılım',
  description: 'JOKER YAZILIM web yazılım, mobil uygulama, e-ticaret, özel yazılım, yapay zekâ, otomasyon, API ve kurumsal yazılım çözümleri geliştirir.',
  alternates: { canonical: '/hizmetler' },
};
const icons = [Globe2, Smartphone, ShoppingCart, Workflow, Bot, Workflow, Plug, Building2];
export default function ServicesPage() {
 return <main className="seo-page"><header className="seo-nav"><Link href="/" className="seo-brand"><span>J</span> JOKER <b>YAZILIM</b></Link><Link href="/#iletisim" className="seo-cta">Teklif Al <ArrowRight size={15}/></Link></header><div className="seo-wrap"><span className="seo-eyebrow">JOKER / HİZMETLER</span><h1>İşinize uygun <span>yazılım.</span></h1><p className="seo-lead">Fikrinizi analiz ediyor, doğru teknolojiyi seçiyor ve tasarımdan yayına kadar modern yazılım çözümleri geliştiriyoruz.</p><div className="seo-grid">{servicePages.map((s,i)=>{const Icon=icons[i];return <Link className="seo-card" href={`/hizmetler/${s.slug}`} key={s.slug}><Icon/><small>0{i+1}</small><h2>{s.title}</h2><p>{s.short}</p><span>Detayları incele <ArrowRight size={15}/></span></Link>})}</div></div></main>
}
