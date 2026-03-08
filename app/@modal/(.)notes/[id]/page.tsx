// app/@modal/(.)notes/[id]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { serverFetchNoteById } from '@/lib/api/serverApi';import NotePreviewClient from './NotePreview.client';
import ModalWrapper from './ModalWrapper';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => serverFetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalWrapper>
        <NotePreviewClient id={id} />
      </ModalWrapper>
    </HydrationBoundary>
  );
}