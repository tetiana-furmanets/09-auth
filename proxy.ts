// proxy.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/serverApi';

type RouteType = 'private' | 'auth' | 'public';

export async function requireAuth(req: NextRequest, routeType: RouteType) {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (routeType === 'auth' && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (routeType === 'private' && (!accessToken || !refreshToken)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (accessToken) {
    return accessToken;
  }

  if (refreshToken) {
    try {
      const sessionData = await checkSession(refreshToken);

      const res = NextResponse.next();
      if (sessionData.accessToken) {
        res.cookies.set('accessToken', sessionData.accessToken, {
          httpOnly: true,
          path: '/',
          secure: true,
        });
      }
      if (sessionData.refreshToken) {
        res.cookies.set('refreshToken', sessionData.refreshToken, {
          httpOnly: true,
          path: '/',
          secure: true,
        });
      }

      return sessionData.accessToken;
    } catch (error) {
      console.error('Failed to refresh session', error);
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.redirect(new URL('/sign-in', req.url));
}