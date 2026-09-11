'use client';
import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
export default function Error({reset}:{error:Error & {digest?:string};reset:()=>void}){useEffect(()=>{},[]);return <main className="error-page"><span className="seo-eyebrow">JOKER / ERROR</span><h1>Bir şeyler <span>ters gitti.</span></h1><p>Sayfayı yenilemeyi deneyin. Sorun devam ederse WhatsApp üzerinden bize ulaşabilirsiniz.</p><div><button className="seo-cta" onClick={()=>reset()}><RefreshCw size={15}/> Tekrar dene</button><a className="outline-btn" href="https://wa.me/905396828177" target="_blank" rel="noreferrer">WhatsApp</a></div></main>}
