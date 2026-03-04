// app/(private routes)/profile/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getMe } from '@/lib/api/serverApi';
import type { User } from '@/types/user';
import css from './Profile.module.css';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Profile - NoteHub',
  description: 'User profile page',
};

export default async function ProfilePage() {
  const cookieStore = await cookies(); // <-- await
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

  let user: User;

  try {
    user = await getMe(cookieHeader);
  } catch (error: any) {
    if (error.response?.status === 401) {
      redirect('/sign-in'); // редірект на логін
    }
    console.error('Failed to fetch user:', error);
    return <p>Failed to load profile. Please log in.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.profileHeader}>
        <Image
          src={user.avatar || '/default-avatar.png'}
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