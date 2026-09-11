'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Analytics({ id }: { id?: string }) {
  const [consent, setConsent] = useState(false);
  const [choice, setChoice] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  useEffect(() => {
    const saved = localStorage.getItem('joker-analytics-consent');
    if (saved === 'accepted' || saved === 'rejected') {
      setChoice(saved);
      setConsent(saved === 'accepted');
    }
  }, []);
  if (!id) return null;
  const accept = () => { localStorage.setItem('joker-analytics-consent', 'accepted'); setChoice('accepted'); setConsent(true); };
  const reject = () => { localStorage.setItem('joker-analytics-consent', 'rejected'); setChoice('rejected'); setConsent(false); };
  return <>
    {consent && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive"/><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true})`}</Script></>}
    {choice === 'pending' && <div className="cookie-banner" role="dialog" aria-label="Analiz çerezleri tercihi"><div><b>Gizliliğiniz bizim için önemli.</b><p>Siteyi geliştirmek için anonim kullanım analizleri kullanabiliriz. Tercihinizi istediğiniz zaman değiştirebilirsiniz.</p></div><div className="cookie-actions"><button onClick={reject} className="cookie-secondary">Reddet</button><button onClick={accept} className="cookie-primary">Kabul Et</button></div></div>}
  </>;
}
