'use client';

import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('./HomeClient'), {
  ssr: false,
  loading: () => (
    <main className="site dark" style={{ minHeight: '100vh' }} aria-busy="true">
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: '.18em', opacity: .65 }}>JOKER YAZILIM</div>
          <div style={{ marginTop: 10, fontSize: 16 }}>Yükleniyor…</div>
        </div>
      </div>
    </main>
  ),
});

export default function HomeShell() {
  return <HomeClient />;
}
