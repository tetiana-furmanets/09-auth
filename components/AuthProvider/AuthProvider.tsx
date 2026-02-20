'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe, logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const sessionUser = await checkSession();
        if (sessionUser) {
          setUser(sessionUser);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
        await logout();
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
