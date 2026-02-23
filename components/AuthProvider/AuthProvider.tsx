// components/AuthProvider/AuthProvider.tsx
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
        // Перевіряємо, чи сесія дійсна
        const sessionValid = await checkSession();
        if (sessionValid) {
          // Отримуємо дані користувача через getMe()
          const userData = await getMe();
          setUser(userData);
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