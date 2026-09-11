import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../content';
export function generateStaticParams(){return blogPosts.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=blogPosts.find(x=>x.slug===slug);if(!p)return {};return {title:`${p.title} | JOKER YAZILIM`,description:p.excerpt,alternates:{canonical:`/blog/${p.slug}`},openGraph:{title:p.title,description:p.excerpt,type:'article'}};}
export default async function Post({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=blogPosts.find(x=>x.slug===slug);if(!p)notFound();return <main className="seo-page"><header className="seo-nav"><Link href="/" className="seo-brand"><span>J</span> JOKER <b>YAZILIM</b></Link><Link href="/#iletisim" className="seo-cta">Teklif Al <ArrowRight size={15}/></Link></header><article className="article-wrap"><Link href="/blog" className="back-link"><ArrowLeft size={15}/> Bloga dön</Link><span className="seo-eyebrow">{p.category} · {p.read}</span><h1>{p.title}<span>.</span></h1><p className="article-date">{p.date}</p><div className="article-body">{p.body.map((x,i)=><p key={i}>{x}</p>)}</div><div className="article-cta"><strong>Bu konuyu projenizde uygulamak ister misiniz?</strong><Link href="/#iletisim" className="seo-cta">JOKER YAZILIM'a danışın <ArrowRight size={15}/></Link></div></article></main>}
