// components/AuthProvider/AuthProvider.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

interface Props {
  children: ReactNode;
}

const privateRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export default function AuthProvider({ children }: Props) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();

        if (session) {
          const user = await getMe();
          setUser(user);

          // якщо залогінений і відкрив auth сторінку
          if (publicRoutes.includes(pathname)) {
            router.push('/profile');
          }
        } else {
          clearIsAuthenticated();

          // якщо НЕ залогінений і лізе в приватну
          if (privateRoutes.includes(pathname)) {
            router.push('/sign-in');
          }
        }
      } catch {
        clearIsAuthenticated();
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}