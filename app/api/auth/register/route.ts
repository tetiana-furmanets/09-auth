//app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await api.post('/auth/register', body);

    const cookieStore = cookies();
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
      console.error('POST /auth/register failed', error.response?.data);

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Registration failed',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('Unknown registration error', error);

    return NextResponse.json(
      {
        error: 'Registration failed',
      },
      { status: 500 }
    );
  }
}