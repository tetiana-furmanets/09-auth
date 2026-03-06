// app/lib/api/serverApi.ts
import axios from 'axios';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const serverApi = axios.create({
  baseURL,
});

export const fetchNotes = async (): Promise<Note[]> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  const response = await serverApi.get('/notes', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.notes;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  const response = await serverApi.get(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  const response = await serverApi.get('/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const checkSession = async (refreshToken: string) => {
  const response = await serverApi.post('/auth/refresh', {
    refreshToken,
  });

  return response.data;
};