// app/(private routes)/profile/page.tsx

import { serverGetMe } from '@/lib/api/serverApi';import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import css from './Profile.module.css';
import { Metadata } from 'next';
import type { User } from '@/types/user';

export const metadata: Metadata = {
  title: 'Profile - NoteHub',
  description: 'User profile page',
};

export default async function ProfilePage() {
  let user: User;

  try {
    user = await serverGetMe();
  } catch {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
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