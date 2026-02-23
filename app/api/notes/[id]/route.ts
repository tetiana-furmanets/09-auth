// app/api/notes/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

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

    const response = await api(`/notes/${params.id}`, {
      method: 'GET',
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('GET /notes/:id failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to fetch note' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to fetch note' },
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

    const response = await api(`/notes/${params.id}`, {
      method: 'PATCH',
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      data: body,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('PATCH /notes/:id failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to update note' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to update note' },
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

    const response = await api(`/notes/${params.id}`, {
      method: 'DELETE',
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('DELETE /notes/:id failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to delete note' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to delete note' },
      { status: 500 }
    );
  }
}