import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../content';
export const metadata:Metadata={title:'Projeler ve Case Study | JOKER YAZILIM',description:'JOKER YAZILIM projeleri: problem, çözüm, teknoloji ve mimari yaklaşımını inceleyin.',alternates:{canonical:'/projeler'}};
export default function Projects(){return <main className="seo-page"><header className="seo-nav"><Link href="/" className="seo-brand"><span>J</span> JOKER <b>YAZILIM</b></Link><Link href="/#iletisim" className="seo-cta">Teklif Al <ArrowRight size={15}/></Link></header><div className="seo-wrap"><span className="seo-eyebrow">JOKER / CASE STUDIES</span><h1>İşi <span>nasıl çözüyoruz?</span></h1><p className="seo-lead">Gerçek çalışmalarımızı ve örnek çözüm konseptlerini problem → çözüm → teknoloji → mimari yaklaşımıyla inceleyin.</p><div className="seo-grid">{caseStudies.map(p=><Link className="seo-card" href={`/projeler/${p.slug}`} key={p.slug}><small>{p.status}</small><h2>{p.title}</h2><p>{p.summary}</p><span>Case study <ArrowUpRight size={15}/></span></Link>)}</div></div></main>}
