// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your notes easily with NoteHub',
  openGraph: {
    title: 'NoteHub',
    description: 'Manage your notes easily with NoteHub',
    url: 'https://notehub.com',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview',
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
<body className={`${roboto.variable}`}>        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal ?? null}            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}