//app/api/api.ts

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://example.com/api',
  withCredentials: true,
});