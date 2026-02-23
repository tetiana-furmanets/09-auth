import { NextResponse } from 'next/server';
import { api } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;

    await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const res = NextResponse.json(null);
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');

    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Axios logout error:', error.response?.data);
      return NextResponse.json(
        { message: error.response?.data?.message || 'Logout failed' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Unknown logout error:', error);
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}