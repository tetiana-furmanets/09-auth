// lib/api/api.ts
import axios from 'axios';

console.log('NEXT_PUBLIC_API_URL =', process.env.NEXT_PUBLIC_API_URL);

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});