//app/api/users/me/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ id: 1, name: 'Test User', email: 'test@test.com' });
}