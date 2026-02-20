// app/lib/api/serverApi.ts
import axios from 'axios';
import type { Note } from '@/types/note';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = '',
  tag?: string,
  cookies?: string
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${baseURL}/notes`, {
    params: { page, perPage, search, tag },
    headers: cookies ? { cookie: cookies } : undefined,
  });
  return response.data;
};

export const fetchNoteById = async (id: string, cookies?: string): Promise<Note> => {
  const response = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers: cookies ? { cookie: cookies } : undefined,
  });
  return response.data;
};

export const getMe = async (cookies?: string) => {
  const response = await axios.get(`${baseURL}/users/me`, {
    headers: cookies ? { cookie: cookies } : undefined,
  });
  return response.data;
};

export const checkSession = async (cookies?: string) => {
  try {
    const response = await axios.get(`${baseURL}/auth/session`, {
      headers: cookies ? { cookie: cookies } : undefined,
    });
    return response.data || null;
  } catch {
    return null;
  }
};
