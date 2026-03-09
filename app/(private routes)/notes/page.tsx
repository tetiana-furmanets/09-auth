// app/(private routes)/notes/page.tsx

'use client';

import { useState } from 'react';
import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';
import NoteList from '@/components/NoteList/NoteList';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import type { FetchNotesResponse } from '@/types/note';
import css from './Notes.module.css';

export default function NotesPage() {
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', filterTag],
    queryFn: () => fetchNotes(1, 50, '', filterTag || ''),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={css.page}>
      <SidebarNotes onSelectTag={setFilterTag} />
      <main className={css.notesMain}>
        <h1 className={css.title}>My Notes</h1>
        {data?.notes.length ? <NoteList notes={data.notes} /> : <p>No notes yet</p>}
      </main>
    </div>
  );
}