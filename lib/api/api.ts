// lib/api/api.ts
import axios from 'axios';

export const nextServer = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});