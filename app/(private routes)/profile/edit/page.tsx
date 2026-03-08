// app/(private routes)/profile/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const me = await getMe();
        setUser(me);
        setUsername(me.username);
        setEmail(me.email);
        setAvatar(me.avatar);
      }
    };

    fetchUser();
  }, [user, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Update failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h1>Edit Profile</h1>

      {avatar && (
        <Image
          src={avatar}
          alt={`${username} avatar`}
          width={120}
          height={120}
          className={css.avatar}
        />
      )}

      <form onSubmit={handleSubmit} className={css.form}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input type="email" value={email} readOnly />
        </label>

        {error && <p className={css.error}>{error}</p>}

        <div className={css.buttons}>
          <button className={css.button} type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>

          <button
            className={css.button}
            type="button"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}