// app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';

export async function GET() {
  try {
    const { data } = await api.get('/auth/session');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null);
  }
}