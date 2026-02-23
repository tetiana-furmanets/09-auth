// app/api/notes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') || '1';
    const perPage = url.searchParams.get('perPage') || '12';
    const search = url.searchParams.get('search') || '';
    const tag = url.searchParams.get('tag') || '';

    const cookieStore = cookies();
    const cookieHeader = cookieStore.get('accessToken')?.value;

    const response = await api.get('/notes', {
      params: { page, perPage, search, tag },
      headers: cookieHeader ? { cookie: `accessToken=${cookieHeader}` } : undefined,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('GET /notes failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to fetch notes' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = cookies();
    const cookieHeader = cookieStore.get('accessToken')?.value;

    const response = await api.post('/notes', body, {
      headers: cookieHeader ? { cookie: `accessToken=${cookieHeader}` } : undefined,
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /notes failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to create note' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to create note' },
      { status: 500 }
    );
  }
}