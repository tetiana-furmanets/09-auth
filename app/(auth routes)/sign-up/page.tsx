// app/(auth routes)/sign-up/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignUp.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await register({ email, password });
      setUser(user);
      router.push('/profile');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={css.input}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={css.error}>{error}</p>}
        <button className={css.button} type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}