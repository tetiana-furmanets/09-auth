// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';

export const metadata = {
  title: 'NoteHub',
  description: 'Your note app',
};

interface RootLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}