// app/lib/proxy.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function requireAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get('token'); 

  if (!token) {
    redirect('/sign-in'); 
  }
}

export function requireGuest() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (token) {
    redirect('/profile'); 
  }
}
