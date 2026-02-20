// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/api'; 

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') ?? '';

    const response = await api.get('/auth/session', {
      headers: cookie ? { cookie } : undefined,
    });

    if (response.data) {
      return NextResponse.json(response.data, { status: 200 });
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error: any) {
    console.error('Session check failed', error.message);
    return NextResponse.json(null, { status: 200 });
  }
}