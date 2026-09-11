import type { Metadata, Viewport } from 'next';
import './globals.css';
import Analytics from './components/Analytics';
import ClientErrorBoundary from './components/ClientErrorBoundary';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yazilimjoker.com'),
  title: { default: 'JOKER YAZILIM | Web, Mobil ve Özel Yazılım', template: '%s | JOKER YAZILIM' },
  description: 'JOKER YAZILIM; web yazılım, mobil uygulama, e-ticaret, özel yazılım, yapay zekâ, otomasyon, API ve dijital çözümler geliştirir. Modern teknoloji, şeffaf süreç ve uygun fiyat.',
  keywords: [
    'JOKER YAZILIM', 'yazılım şirketi', 'yazılım geliştirme', 'web yazılım', 'web uygulama',
    'mobil uygulama', 'e-ticaret yazılımı', 'özel yazılım', 'yapay zeka', 'AI otomasyon',
    'Next.js', 'React', 'Python', 'Flask', 'Django', 'Yalova yazılım', 'Türkiye yazılım'
  ],
  applicationName: 'JOKER YAZILIM',
  authors: [{ name: 'JOKER YAZILIM' }],
  creator: 'JOKER YAZILIM',
  publisher: 'JOKER YAZILIM',
  category: 'technology',
  classification: 'Software Development',
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    title: 'JOKER YAZILIM | Fikirden Gerçeğe, Kodla.',
    description: 'Web, mobil, e-ticaret, özel yazılım, yapay zekâ ve otomasyon çözümleri.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'JOKER YAZILIM',
    images: [{ url: '/hero-reference.png', width: 1648, height: 910, alt: 'JOKER YAZILIM teknoloji ve yazılım çözümleri' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOKER YAZILIM | Fikirden Gerçeğe, Kodla.',
    description: 'Modern web, mobil, e-ticaret, AI, otomasyon ve özel yazılım çözümleri.',
    images: ['/hero-reference.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/joker-symbol.svg', shortcut: '/joker-symbol.svg', apple: '/joker-symbol.svg' },
  manifest: '/site.webmanifest',
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#05080d',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yazilimjoker.com';
  const websiteLd = {'@context':'https://schema.org','@type':'WebSite',name:'JOKER YAZILIM',url:siteUrl,description:'Web, mobil, e-ticaret, AI, otomasyon ve özel yazılım çözümleri.'};
  return <html lang="tr"><body><ClientErrorBoundary>{children}</ClientErrorBoundary><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteLd)}}/><Analytics id={process.env.NEXT_PUBLIC_GA_ID}/></body></html>;
}
