// app/api/users/me/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';
import { logErrorResponse } from '@/lib/utils/logErrorResponse';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();

    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.get('/users/me', {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'GET /users/me failed');

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Failed to fetch user',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('GET /users/me failed', error);

    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = cookies();

    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.patch('/users/me', body, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'PATCH /users/me failed');

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Failed to update user',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('PATCH /users/me failed', error);

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}