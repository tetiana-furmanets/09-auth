// proxy.ts

import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';

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
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isPrivateRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const session = await checkSession(refreshToken);

      const response = NextResponse.next();

      if (session.accessToken) {
        response.cookies.set('accessToken', session.accessToken, {
          httpOnly: true,
          secure: true,
          path: '/',
        });
      }

      if (session.refreshToken) {
        response.cookies.set('refreshToken', session.refreshToken, {
          httpOnly: true,
          secure: true,
          path: '/',
        });
      }

      return response;
    } catch (error) {
      console.error('Session refresh failed', error);

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