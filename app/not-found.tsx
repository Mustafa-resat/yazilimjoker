import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
export default function NotFound(){return <main className="error-page"><span className="seo-eyebrow">JOKER / 404</span><h1>Bu sayfa <span>bulunamadı.</span></h1><p>Aradığınız içerik taşınmış, kaldırılmış veya adresi yanlış yazılmış olabilir.</p><div><Link href="/" className="seo-cta"><ArrowLeft size={15}/> Ana sayfaya dön</Link><Link href="/hizmetler" className="outline-btn">Hizmetleri incele <ArrowRight size={15}/></Link></div></main>}
