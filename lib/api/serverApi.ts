// lib/api/serverApi.ts

import { nextServer } from '@/lib/api/api';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { AxiosResponse, AxiosError } from 'axios';

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  return allCookies
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}

export const serverCheckSession = async (): Promise<AxiosResponse<User | null>> => {
  const cookieHeader = await getCookieHeader();

  try {
    return await nextServer.get<User | null>('/auth/session', {
      headers: { Cookie: cookieHeader },
    });
  } catch (error) {
    const err = error as AxiosError<User | null>;

    if (err.response) {
      return err.response;
    }

    throw error;
  }
};

export const serverGetMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get<User>('/users/me', {
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

  const res = await nextServer.get<FetchNotesResponse>('/notes', {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};

export const serverFetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};