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

export const serverCheckSession = async (): Promise<User | null> => {
  const cookieHeader = await getCookieHeader();

  try {
    const res = await nextServer.get('/auth/session', {
      headers: { Cookie: cookieHeader },
    });

    return res.data ?? null;
  } catch {
    return null;
  }
};

export const serverGetMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get('/users/me', {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const serverFetchNotes = async (): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get('/notes', {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};

export const serverFetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};