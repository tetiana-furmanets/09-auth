// app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';

export async function POST() {
  try {
    await api.post('/auth/logout');
    return NextResponse.json(null);
  } catch {
    return NextResponse.json(null);
  }
}