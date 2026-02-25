// app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const cookieStore = cookies();

    // Форвардинг ВСІХ cookies
    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.post(
      '/auth/logout',
      {},
      {
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      }
    );

    // Обробка set-cookie (сервер може очищати токени)
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

    return NextResponse.json(null, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('POST /auth/logout failed', error.response?.data);

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Logout failed',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('Unknown logout error', error);

    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}