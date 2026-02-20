// lib/api/api.ts
import axios from 'axios';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  withCredentials: true, 
});

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};