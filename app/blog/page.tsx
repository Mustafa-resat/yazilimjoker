import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../content';
export const metadata: Metadata={title:'Yazılım Blogu | JOKER YAZILIM',description:'Yazılım, web geliştirme, SEO, yapay zekâ, e-ticaret ve dijital ürünler hakkında rehber içerikler.',alternates:{canonical:'/blog'}};
export default function Blog(){return <main className="seo-page"><header className="seo-nav"><Link href="/" className="seo-brand"><span>J</span> JOKER <b>YAZILIM</b></Link><Link href="/#iletisim" className="seo-cta">Teklif Al <ArrowRight size={15}/></Link></header><div className="seo-wrap"><span className="seo-eyebrow">JOKER / BLOG</span><h1>Yazılımı <span>anlayın.</span></h1><p className="seo-lead">Web, mobil, AI, e-ticaret ve yazılım geliştirme süreçleri hakkında pratik ve anlaşılır içerikler.</p><div className="blog-grid">{blogPosts.map((p)=><article className="blog-card" key={p.slug}><div><small>{p.category} · {p.read}</small><h2>{p.title}</h2><p>{p.excerpt}</p></div><Link href={`/blog/${p.slug}`}>Yazıyı oku <ArrowRight size={15}/></Link></article>)}</div></div></main>}
