// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Providers from '@/components/Providers/Providers';
export const metadata = {
  title: 'NoteHub',
  description: 'Your note app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
