// app/(private routes)/notes/filter/[...slug]/Notes.client.tsx

'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import Link from 'next/link';
import type { FetchNotesResponse } from '@/types/note';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debounced, setDebounced] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debounced, tag],
    queryFn: () => fetchNotes(page, 12, debounced, tag),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notes</p>;

  return (
    <>
      <SearchBox value={search} onChange={handleSearchChange} />

      <Link href="/notes/action/create">
        <button>Create note +</button>
      </Link>

      {/* Передаємо нотатки у NoteList */}
      <NoteList notes={data.notes} />

      {data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </>
  );
}