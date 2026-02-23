// app/api/users/me/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import axios from 'axios';

export const dynamic = 'force-dynamic'; // динамічний рендеринг

export async function GET() {
  try {
    // Отримуємо всі cookies
    const cookieStore = cookies();
    const cookieHeader = Array.from(cookieStore.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join('; ');

    // Викликаємо API із форвардингом усіх cookies
    const response = await api('/users/me', {
      method: 'GET',
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('GET /users/me failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to fetch user' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to fetch user' },
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

    const response = await api('/users/me', {
      method: 'PATCH',
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      data: body,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('PATCH /users/me failed', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to update user' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    );
  }
}