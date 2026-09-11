import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Yönetici Paneli | JOKER YAZILIM',
  description: 'JOKER YAZILIM özel yönetim paneli.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
