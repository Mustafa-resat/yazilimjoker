import type { MetadataRoute } from 'next';
import { servicePages, blogPosts, caseStudies } from './content';
export default function sitemap(): MetadataRoute.Sitemap {
 const base=process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yazilimjoker.com';
 const core=['','/hizmetler','/blog','/projeler','/yalova','/gizlilik','/kullanim-sartlari'].map(path=>({url:`${base}${path}`,changeFrequency:'weekly' as const,priority:path===''?1:.8}));
 const services=servicePages.map(s=>({url:`${base}/hizmetler/${s.slug}`,changeFrequency:'monthly' as const,priority:.75}));
 const posts=blogPosts.map(p=>({url:`${base}/blog/${p.slug}`,changeFrequency:'monthly' as const,priority:.65}));
 const projects=caseStudies.map(p=>({url:`${base}/projeler/${p.slug}`,changeFrequency:'monthly' as const,priority:.7}));
 return [...core,...services,...posts,...projects];
}
