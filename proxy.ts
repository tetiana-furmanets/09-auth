// proxy.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { serverCheckSession } from './lib/api/serverApi';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookieStore = await cookies(); // ✅ await
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  const isPrivateRoute =
    pathname.startsWith('/notes') || pathname.startsWith('/profile');

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const session = await serverCheckSession();

      const response = NextResponse.next();

      if (session.data?.accessToken) {
        response.cookies.set('accessToken', session.data.accessToken, {
          httpOnly: true,
          secure: true,
          path: '/',
        });
      }

      if (session.data?.refreshToken) {
        response.cookies.set('refreshToken', session.data.refreshToken, {
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
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};