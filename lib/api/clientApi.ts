// lib/api/clientApi.ts

import { api } from '@/lib/api/api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });
  return response.data;
};

export const createNote = async (
  note: { title: string; content: string; tag: Note['tag'] }
): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (
  credentials: { email: string; password: string }
): Promise<User> => {
  const response = await api.post<User>('/auth/register', credentials);
  return response.data;
};

export const login = async (credentials: { email: string; password: string }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Login failed');
  }

  const data = await response.json();

  return data.user;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/auth/session');
    return response.data || null;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateMe = async (
  data: { username: string }
): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};