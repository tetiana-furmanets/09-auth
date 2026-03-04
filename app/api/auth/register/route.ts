// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import axios from 'axios';
import { logErrorResponse } from '@/lib/utils/logErrorResponse';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await api.post('/auth/register', body);

    const res = NextResponse.json(response.data, { status: response.status });

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
      logErrorResponse(error, 'POST /auth/register failed');

      return NextResponse.json(
        { error: error.response?.data?.error || 'Registration failed' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('POST /auth/register failed', error);

    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}