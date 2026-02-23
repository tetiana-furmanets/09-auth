// app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Отримуємо accessToken з cookie
    const cookieStore = req.cookies;
    const accessToken = cookieStore.get('accessToken')?.value;

    // Викликаємо API з токеном
    const { data } = await api.get('/auth/session', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Axios session error:', error.response?.data);
      return NextResponse.json(null, { status: error.response?.status || 500 });
    }

    console.error('Unknown session error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}