// app/(private routes)/notes/filter/[...slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import NotesClient from './NotesClient';

export default function NotesFilterPage() {
  const params = useParams();
  const tag = Array.isArray(params?.slug) ? params.slug[0] : '';
  return <NotesClient tag={tag} />;
}