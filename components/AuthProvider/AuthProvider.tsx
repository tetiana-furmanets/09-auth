// components/AuthProvider/AuthProvider.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

interface Props {
  children: ReactNode;
}

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

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

          if (publicRoutes.includes(pathname)) {
            router.replace('/profile');
          }
        } else {
          clearAuth();

          if (privateRoutes.some(route => pathname.startsWith(route))) {
            router.replace('/sign-in');
          }
        }
      } catch {
        clearAuth();

        if (privateRoutes.some(route => pathname.startsWith(route))) {
          router.replace('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearAuth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}