// lib/api/clientApi.ts
import { nextServer } from '@/lib/api/api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { LoginCredentials, RegisterCredentials, UpdateUserData } from '@/types/auth';

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
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });
  return response.data;
};

export const createNote = async (note: { title: string; content: string; tag: Note['tag'] }): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  const response = await nextServer.post<User>('/auth/register', credentials);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await nextServer.post<User>('/auth/login', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const response = await nextServer.get<User>('/auth/session');
    return response.data ?? null;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>('/users/me');
  return response.data;
};

export const updateMe = async (data: UpdateUserData): Promise<User> => {
  const response = await nextServer.patch<User>('/users/me', data);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};