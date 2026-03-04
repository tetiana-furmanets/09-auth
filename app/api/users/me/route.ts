// app/api/users/me/route.ts

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
  return [accessToken ? `accessToken=${accessToken}` : null,
          refreshToken ? `refreshToken=${refreshToken}` : null]
         .filter(Boolean)
         .join('; ');
}

async function handleApiRequest(method: 'get' | 'patch', body?: any) {
  const cookieHeader = await getAuthCookieHeader();
  return api.request({
    url: '/users/me',
    method,
    data: body,
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });
}

export async function GET() {
  try {
    const response = await handleApiRequest('get');
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) logErrorResponse(error, 'GET /users/me failed');
    else console.error('GET /users/me failed', error);

    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: axios.isAxiosError(error) ? error.response?.status || 500 : 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await handleApiRequest('patch', body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) logErrorResponse(error, 'PATCH /users/me failed');
    else console.error('PATCH /users/me failed', error);

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: axios.isAxiosError(error) ? error.response?.status || 500 : 500 }
    );
  }
}