// app/api/notes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';
import { logErrorResponse } from '@/lib/utils/logErrorResponse';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag');

    // perPage завжди 12 (референс)
    const params: Record<string, string> = {
      page,
      perPage: '12',
    };

    if (search) {
      params.search = search;
    }

    // Якщо tag !== 'All' — передаємо, інакше пропускаємо
    if (tag && tag !== 'All') {
      params.tag = tag;
    }

    const cookieStore = cookies();

    // Форвардинг ВСІХ cookies
    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.get('/notes', {
      params,
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'GET /notes failed');

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Failed to fetch notes',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('GET /notes failed', error);

    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = cookies();

    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.post('/notes', body, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'POST /notes failed');

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Failed to create note',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('POST /notes failed', error);

    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}