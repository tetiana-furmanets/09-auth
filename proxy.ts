// proxy.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { serverCheckSession } from './lib/api/serverApi';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookieStore = await cookies();
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
      const response = await serverCheckSession();

      const res = NextResponse.next();

      const setCookie = response?.headers?.['set-cookie'];

      if (setCookie) {
        const cookiesArr = Array.isArray(setCookie)
          ? setCookie
          : [setCookie];

        cookiesArr.forEach((cookie) => {
          res.headers.append('set-cookie', cookie);
        });
      }

      if (isAuthRoute) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return res;
    } catch {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};