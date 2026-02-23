// app/lib/proxy.ts

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverApi } from './api/serverApi';

export async function requireAuth(routeType: 'private' | 'public' = 'private') {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!accessToken?.value && !refreshToken?.value) {
    if (routeType === 'private') redirect('/sign-in');
    return null;
  }

  try {
    const session = await serverApi.get('/auth/session', {
      headers: { cookie: `accessToken=${accessToken?.value}; refreshToken=${refreshToken?.value}` },
    });

    if (routeType === 'public' && session?.data) {
      redirect('/');
    }

    return session?.data;
  } catch (err) {
    if (refreshToken?.value) {
      try {
        const refreshed = await serverApi.post('/auth/session/refresh', {
          refreshToken: refreshToken.value,
        });

        const setCookieHeaders = refreshed.headers['set-cookie'];
        if (setCookieHeaders) {
          setCookieHeaders.forEach((header) => cookieStore.set(header));
        }

        return refreshed.data;
      } catch {
        if (routeType === 'private') redirect('/sign-in');
        return null;
      }
    } else {
      if (routeType === 'private') redirect('/sign-in');
      return null;
    }
  }
}