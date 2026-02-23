// app/api/users/me/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.get('accessToken')?.value;

    const response = await api.get('/users/me', {
      headers: cookieHeader ? { cookie: `accessToken=${cookieHeader}` } : undefined,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('GET /users/me failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to fetch user' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
}