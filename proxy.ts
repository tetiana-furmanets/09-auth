// proxy.ts

import { NextRequest, NextResponse } from 'next/server';
import { serverCheckSession } from './lib/api/serverApi';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isAuthRoute =
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up');

  const isPrivateRoute =
    pathname.startsWith('/notes') ||
    pathname.startsWith('/profile');

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  if (isPrivateRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const session = await serverCheckSession();
const { accessToken: newAccessToken, refreshToken: newRefreshToken } = session.data;

const response = NextResponse.next();

if (newAccessToken) {
  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
  });
}

if (newRefreshToken) {
  response.cookies.set('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
  });
}
      return response;
    } catch {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/notes/:path*',
    '/profile/:path*',
    '/sign-in',
    '/sign-up',
  ],
};