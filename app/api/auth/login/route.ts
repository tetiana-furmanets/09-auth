//app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (email === 'test@test.com' && password === '123') {
    return NextResponse.json({ message: 'Logged in' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}