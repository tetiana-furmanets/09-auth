'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import styles from './NotesClient.module.css';

type Props = {
  filterTag?: string | null;
};

export default function NotesClient({ filterTag }: Props) {
  const normalizedTag = filterTag === 'All' ? undefined : filterTag || undefined;

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', normalizedTag],
    queryFn: () => fetchNotes(1, 12, '', normalizedTag),
  });

  const notes: Note[] = data?.notes || [];

  const filteredNotes = normalizedTag
    ? notes.filter(note => note.tag === normalizedTag)
    : notes;

  if (isLoading) return <p className={styles.message}>Loading notes...</p>;
  if (error) return <p className={styles.message}>Error loading notes</p>;
  if (!filteredNotes.length) return <p className={styles.message}>No notes found</p>;

  return (
    <div className={styles.notesGrid}>
      {filteredNotes.map((note) => (
      <div key={note.id} className={styles.noteCard}>
  <h3 className={styles.noteTitle}>{note.title}</h3>
  <p className={styles.noteContent}>{note.content}</p>
  <span className={styles.noteTag}>{note.tag}</span>
</div>
      ))}
    </div>
  );
}