// app/api/notes/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: '1', title: 'First note', content: 'Some content' },
    { id: '2', title: 'Second note', content: 'Another content' },
  ]);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json(
    {
      id: Date.now().toString(),
      ...body,
    },
    { status: 201 }
  );
}