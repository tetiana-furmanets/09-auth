// app/api/notes/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api/api';

export async function GET() {
  try {
    const { data } = await api.get('/notes');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data } = await api.post('/notes', body);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null);
  }
}