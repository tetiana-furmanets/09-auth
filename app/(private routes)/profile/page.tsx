// app/(private routes)/profile/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getMe } from '@/lib/api/serverApi';
import type { User } from '@/types/user';
import css from './Profile.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - NoteHub',
  description: 'User profile page',
};

export default async function ProfilePage() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

  const user: User = await getMe(cookieHeader);

  return (
    <div className={css.container}>
      <div className={css.profileHeader}>
        <Image
          src={user.avatar}
          alt={`${user.username} avatar`}
          width={120}
          height={120}
          className={css.avatar}
        />
        <h1 className={css.username}>{user.username}</h1>
        <p className={css.email}>{user.email}</p>
        <Link href="/profile/edit" className={css.editLink}>
          Edit Profile
        </Link>
      </div>
    </div>
  );
}