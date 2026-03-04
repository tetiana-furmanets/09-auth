// app/lib/api/serverApi.ts
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function getAuthCookieHeader() {
  const cookieStore = await cookies(); // <-- await
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) return undefined;

  return [
    accessToken ? `accessToken=${accessToken}` : null,
    refreshToken ? `refreshToken=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join('; ');
}

export const getMe = async (cookieHeader?: string): Promise<User> => {
  const header = cookieHeader || (await getAuthCookieHeader());

  const response = await api.get<User>('/users/me', {
    headers: header ? { cookie: header } : undefined,
  });

  return response.data;
};

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const header = await getAuthCookieHeader();

  const response = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
    headers: header ? { cookie: header } : undefined,
  });

  return response.data;
};