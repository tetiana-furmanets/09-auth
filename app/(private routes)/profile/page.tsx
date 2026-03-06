// app/(private routes)/profile/page.tsx

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
  const cookieStore = cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

  let user: User;

  try {
    user = await getMe(cookieHeader);
  } catch (error: any) {
    redirect('/sign-in'); 
  }

  return (
    <div className={css.container}>
      <h1>{user.username}</h1>
      <p>{user.email}</p>
    </div>
  );
}