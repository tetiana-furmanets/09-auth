// app/(private routes)/notes/filter/[...slug]/NotesClient.tsx


'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api/clientApi';
import type { Note, NoteTag } from '@/types/note';
import Link from 'next/link';

import SearchBox from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import styles from './Notes.client.module.css';

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const normalizedTag: NoteTag | undefined =
    tag === 'all' ? undefined : (tag as NoteTag);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', normalizedTag, page, search],
    queryFn: () => fetchNotes(page, limit, search, normalizedTag),
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) return <p className={styles.message}>Loading notes...</p>;
  if (error) return <p className={styles.message}>Error loading notes</p>;

  return (
    <div className={styles.wrapper}>
      <Link href="/notes/action/create" className={styles.createLink}>
        Create note
      </Link>

      <SearchBox value={search} onChange={setSearch} />

      <NoteList notes={notes} />

      {!notes.length && (
        <p className={styles.message}>No notes found</p>
      )}

<Pagination
  currentPage={page}
  pageCount={totalPages}
  onPageChange={setPage}
/>
    </div>
  );
}