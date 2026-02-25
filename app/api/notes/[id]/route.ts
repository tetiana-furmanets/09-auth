// app/api/notes/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';
import { logErrorResponse } from '@/lib/utils/logErrorResponse';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();

    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.get(`/notes/${params.id}`, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'GET /notes/:id failed');

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Failed to fetch note',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('GET /notes/:id failed', error);

    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const cookieStore = cookies();

    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.patch(`/notes/${params.id}`, body, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'PATCH /notes/:id failed');

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Failed to update note',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('PATCH /notes/:id failed', error);

    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();

    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    const response = await api.delete(`/notes/${params.id}`, {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      logErrorResponse(error, 'DELETE /notes/:id failed');

      return NextResponse.json(
        {
          error: error.response?.data?.error || 'Failed to delete note',
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    console.error('DELETE /notes/:id failed', error);

    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}