// app/lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.get('accessToken')?.value
    ? `accessToken=${cookieStore.get('accessToken')?.value}; refreshToken=${cookieStore.get('refreshToken')?.value || ''}`
    : '';

  const response = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.get('accessToken')?.value
    ? `accessToken=${cookieStore.get('accessToken')?.value}; refreshToken=${cookieStore.get('refreshToken')?.value || ''}`
    : '';

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.get('accessToken')?.value
    ? `accessToken=${cookieStore.get('accessToken')?.value}; refreshToken=${cookieStore.get('refreshToken')?.value || ''}`
    : '';

  const response = await api.get<User>('/users/me', {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  return response.data;
};

export const checkSession = async () => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.get('accessToken')?.value
    ? `accessToken=${cookieStore.get('accessToken')?.value}; refreshToken=${cookieStore.get('refreshToken')?.value || ''}`
    : '';

  try {
    const response = await api.get('/auth/session', {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return response;
  } catch {
    return null;
  }
};