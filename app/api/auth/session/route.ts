// app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();

    // Форвардинг ВСІХ cookies
    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.get('/auth/session', {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    // Обробка set-cookie (refresh токени тощо)
    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      cookiesArray.forEach((cookieString: string) => {
        const parts = cookieString.split(';').map(part => part.trim());
        const [name, value] = parts[0].split('=');

        const cookieOptions: Record<string, any> = {};

        parts.slice(1).forEach(part => {
          const [key, val] = part.split('=');

          switch (key.toLowerCase()) {
            case 'path':
              cookieOptions.path = val;
              break;
            case 'expires':
              cookieOptions.expires = new Date(val);
              break;
            case 'max-age':
              cookieOptions.maxAge = Number(val);
              break;
            case 'httponly':
              cookieOptions.httpOnly = true;
              break;
            case 'secure':
              cookieOptions.secure = true;
              break;
          }
        });

        cookieStore.set(name, value, cookieOptions);
      });
    }

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('GET /auth/session failed', error.response?.data);

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Session fetch failed',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('Unknown session error', error);

    return NextResponse.json(
      { error: 'Session fetch failed' },
      { status: 500 }
    );
  }
}