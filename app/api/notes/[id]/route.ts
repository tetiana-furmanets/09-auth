// app/api/notes/[id]/route.ts

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

async function handleApiRequest(
  method: 'get' | 'patch' | 'delete',
  id: string,
  body?: any
) {
  const cookieHeader = await getAuthCookieHeader();
  return api.request({
    url: `/notes/${id}`,
    method,
    data: body,
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await handleApiRequest('get', params.id);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) logErrorResponse(error, 'GET /notes/:id failed');
    else console.error('GET /notes/:id failed', error);

    return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const response = await handleApiRequest('patch', params.id, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) logErrorResponse(error, 'PATCH /notes/:id failed');
    else console.error('PATCH /notes/:id failed', error);

    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await handleApiRequest('delete', params.id);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) logErrorResponse(error, 'DELETE /notes/:id failed');
    else console.error('DELETE /notes/:id failed', error);

    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}