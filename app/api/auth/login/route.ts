//app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await api.post('/auth/login', body);

    const res = NextResponse.json(response.data, { status: 200 });

    const setCookie = response.headers['set-cookie'];

    if (setCookie) {
      res.headers.set('set-cookie', setCookie);
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response?.data?.message || 'Login failed',
      },
      { status: error.response?.status || 500 }
    );
  }
}