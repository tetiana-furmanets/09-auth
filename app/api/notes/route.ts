// app/api/notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import axios from 'axios';
import { logErrorResponse } from '@/lib/utils/logErrorResponse';

export const dynamic = 'force-dynamic';

async function getAuthCookieHeader() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return [
    accessToken ? `accessToken=${accessToken}` : null,
    refreshToken ? `refreshToken=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join('; ');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';

    const params: Record<string, string> = { page, perPage: '12' };

    if (search) params.search = search;
    if (tag && tag.toLowerCase() !== 'all') params.tag = tag;

    const cookieHeader = await getAuthCookieHeader();

    const response = await api.get('/notes', {
      params,
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) logErrorResponse(error, 'GET /notes failed');
    else console.error('GET /notes failed', error);

    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: axios.isAxiosError(error) ? error.response?.status || 500 : 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieHeader = await getAuthCookieHeader();

    const response = await api.post('/notes', body, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) logErrorResponse(error, 'POST /notes failed');
    else console.error('POST /notes failed', error);

    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: axios.isAxiosError(error) ? error.response?.status || 500 : 500 }
    );
  }
}