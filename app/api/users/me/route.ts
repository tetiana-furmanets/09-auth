// app/api/users/me/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/api';

export async function GET() {
  try {
    const { data } = await api.get('/users/me');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null);
  }
}