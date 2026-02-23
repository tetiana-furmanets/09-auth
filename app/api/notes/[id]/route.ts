// app/api/notes/[id]/route.ts

import { NextResponse } from 'next/server';
import { api } from '@/lib/api';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await api.get(`/notes/${params.id}`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { data } = await api.patch(`/notes/${params.id}`, body);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await api.delete(`/notes/${params.id}`);
    return NextResponse.json(null);
  } catch {
    return NextResponse.json(null);
  }
}