//app/api/notes/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ id, title: 'Sample note', content: 'This is a note.' });
}