// app/lib/api/serverApi.ts


import { api } from '@/lib/api/api';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

async function getCookieHeader() {
  const cookieStore = cookies();
  return cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}

export const fetchNotes = async (): Promise<Note[]> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get('/notes', { headers: { Cookie: cookieHeader } });
  return response.data.notes;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get(`/notes/${id}`, { headers: { Cookie: cookieHeader } });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get('/users/me', { headers: { Cookie: cookieHeader } });
  return response.data;
};

export const checkSession = async (): Promise<User | null> => {
  const cookieHeader = await getCookieHeader();
  try {
    const response = await api.get('/auth/session', { headers: { Cookie: cookieHeader } });
    return response.data || null;
  } catch {
    return null;
  }
};