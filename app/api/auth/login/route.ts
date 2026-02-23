//app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, headers } = await api.post('/auth/login', body);

    const res = NextResponse.json(data, { status: 200 });

    const setCookieHeader = headers['set-cookie'];
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      cookiesArray.forEach((cookieStr) => {
        const [cookiePair] = cookieStr.split(';');
        const [name, value] = cookiePair.split('=');
        res.cookies.set(name, value, { path: '/' });
      });
    }

    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Axios login error:', error.response?.data);
      return NextResponse.json(
        { message: error.response?.data?.message || 'Login failed' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Unknown login error:', error);
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}