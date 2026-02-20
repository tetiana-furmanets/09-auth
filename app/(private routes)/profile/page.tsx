// app/(private routes)/profile/page.tsx

import { requireAuth } from '@/lib/proxy';
import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import css from './Profile.module.css';

export default async function ProfilePage() {
  await requireAuth(); // перевірка авторизації
  const user = await getMe(); // отримуємо користувача

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
