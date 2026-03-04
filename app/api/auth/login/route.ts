// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import axios from 'axios';
import { logErrorResponse } from '@/lib/utils/logErrorResponse';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await api.post('/auth/login', body);

    const setCookieHeader = response.headers['set-cookie'];

    const res = NextResponse.json(response.data, { status: response.status });

    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

      cookiesArray.forEach((cookieStr) => {
        const [cookiePair] = cookieStr.split(';');
        const [name, value] = cookiePair.split('=');
        res.cookies.set({
          name,
          value,
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      });
    }

    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'POST /auth/login failed');

      return NextResponse.json(
        { error: error.response?.data?.error || 'Login failed' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('POST /auth/login failed', error);

    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}