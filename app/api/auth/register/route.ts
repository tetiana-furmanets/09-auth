//app/api/auth/logout/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ message: 'User registered', user: body }, { status: 201 });
}