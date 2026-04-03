// app/(private routes)/notes/[id]/page.tsx
import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { serverFetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const baseUrl = 'https://your-vercel-url.vercel.app';

  const note = await serverFetchNoteById(id);

  if (!note) {
    return {
      title: 'Note not found',
      description: 'The requested note does not exist in NoteHub.',
      openGraph: {
        title: 'Note not found',
        description: 'The requested note does not exist in NoteHub.',
        url: `${baseUrl}/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          },
        ],
      },
    };
  }

  const description = note.content.slice(0, 150);

  return {
    title: note.title,
    description,
    openGraph: {
      title: note.title,
      description,
      url: `${baseUrl}/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => serverFetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}