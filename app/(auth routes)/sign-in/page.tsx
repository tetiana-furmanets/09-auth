// app/(auth routes)/sign-in/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignIn.module.css';

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    try {
      const user = await login({ email, password });
      setUser(user);
      router.push('/profile');
    } catch {
      setServerError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={css.input}
          required
        />

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={css.input}
          required
        />

        {serverError && <p className={css.error}>{serverError}</p>}

        <button className={css.button} type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}