// app/api/notes/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.get('accessToken')?.value;

    const response = await api.get(`/notes/${params.id}`, {
      headers: cookieHeader ? { cookie: `accessToken=${cookieHeader}` } : undefined,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('GET /notes/:id failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to fetch note' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json({ message: 'Failed to fetch note' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    const cookieHeader = cookieStore.get('accessToken')?.value;

    const response = await api.patch(`/notes/${params.id}`, body, {
      headers: cookieHeader ? { cookie: `accessToken=${cookieHeader}` } : undefined,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('PATCH /notes/:id failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to update note' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json({ message: 'Failed to update note' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore.get('accessToken')?.value;

    await api.delete(`/notes/${params.id}`, {
      headers: cookieHeader ? { cookie: `accessToken=${cookieHeader}` } : undefined,
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error: unknown) {
    console.error('DELETE /notes/:id failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to delete note' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json({ message: 'Failed to delete note' }, { status: 500 });
  }
}