// components/Logout/Logout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

export default function LogoutButton() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearAuth();
    router.push('/sign-in');
  };

  return <button onClick={handleLogout}>Logout</button>;
}