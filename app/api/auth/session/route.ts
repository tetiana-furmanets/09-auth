// app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import axios from 'axios';
import { logErrorResponse } from '@/lib/utils/logErrorResponse';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value || null;
    const refreshToken = cookieStore.get('refreshToken')?.value || null;

    if (!accessToken && !refreshToken) {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    const headers: Record<string, string> = {};
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
    if (refreshToken) headers['x-refresh-token'] = refreshToken; // якщо сервер потребує окремо refreshToken

    const response = await api.get('/auth/session', { headers });

    const res = NextResponse.json({ success: true }, { status: 200 });

    if (response.data?.accessToken) {
      res.cookies.set({
        name: 'accessToken',
        value: response.data.accessToken,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    if (response.data?.refreshToken) {
      res.cookies.set({
        name: 'refreshToken',
        value: response.data.refreshToken,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'GET /auth/session failed');
    } else {
      console.error('GET /auth/session failed', error);
    }

    return NextResponse.json({ success: false }, { status: 200 });
  }
}