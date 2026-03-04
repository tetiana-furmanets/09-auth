// app/api/auth/logout/route.ts
'use server';

import { NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await api.post('/auth/logout');

    const res = NextResponse.json(null, { status: 200 });

    ['accessToken', 'refreshToken'].forEach((name) => {
      res.cookies.set({
        name,
        value: '',
        path: '/',
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    });

    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('POST /auth/logout failed', error.response?.data);
      return NextResponse.json(
        { error: error.response?.data?.error || 'Logout failed' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Unknown logout error', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}