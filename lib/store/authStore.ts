// lib/store/authStore.ts
import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearAuth: () => void;
  logout: () => void; // додаємо logout у тип
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));