// components/Logout/Logout.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function LogoutButton() {
  const { clearAuth } = useAuthStore();
  const router = useRouter(); 

  const handleLogout = async () => {
    clearAuth();
    router.push('/login'); 
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}