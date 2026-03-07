// components/AuthProvider/AuthProvider.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearAuth]);

 if (loading) {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

  return <>{children}</>;
}