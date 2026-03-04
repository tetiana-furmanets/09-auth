// components/AuthProvider/AuthProvider.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getMe();
        setUser(userData);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}