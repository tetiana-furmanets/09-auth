// app/(auth routes)/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
        }}
      >
        {children}
      </div>
    </div>
  );
}