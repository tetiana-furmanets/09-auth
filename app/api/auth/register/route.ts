//app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, headers } = await api.post('/auth/register', body);

    const res = NextResponse.json(data, { status: 201 });

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
      console.error('Axios registration error:', error.response?.data);
      return NextResponse.json(
        { message: error.response?.data?.message || 'Registration failed' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Unknown registration error:', error);
    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 500 }
    );
  }
}