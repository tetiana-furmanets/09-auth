// lib/api/serverApi.ts
import { nextServer } from '@/lib/api/api';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies(); 
  const allCookies = cookieStore.getAll();

  return allCookies
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}

export const serverRegister = async (
  email: string,
  password: string
): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.post(
    '/auth/register',
    { email, password },
    { headers: { Cookie: cookieHeader } }
  );

  return res.data;
};

export const serverLogin = async (
  email: string,
  password: string
): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.post(
    '/auth/login',
    { email, password },
    { headers: { Cookie: cookieHeader } }
  );

  return res.data;
};

export const serverCheckSession = async () => {
  const cookieHeader = await getCookieHeader();

  return nextServer.get('/auth/session', {
    headers: { Cookie: cookieHeader },
  });
};

export const serverGetMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get('/users/me', {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};

export const serverFetchNotes = async (): Promise<Note[]> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get('/notes', {
    headers: { Cookie: cookieHeader },
  });

  return res.data.notes;
};

export const serverFetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};