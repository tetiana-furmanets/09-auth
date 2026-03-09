'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import styles from './NotesClient.module.css';

type Props = {
  filterTag?: string | null;
};

export default function NotesClient({ filterTag }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(1), 
  });

  const allNotes: Note[] = data?.notes || [];

  const notes = filterTag && filterTag !== 'All'
    ? allNotes.filter(note => note.tag === filterTag)
    : allNotes;

  if (isLoading) return <p className={styles.message}>Loading notes...</p>;
  if (error) return <p className={styles.message}>Error loading notes</p>;
  if (!notes.length) return <p className={styles.message}>No notes found</p>;

  return (
    <div className={styles.notesGrid}>
      {notes.map((note) => (
        <div key={note.id} className={styles.noteCard}>
          <h3 className={styles.noteTitle}>{note.title}</h3>
          <p className={styles.noteContent}>{note.content}</p>
          <span className={styles.noteTag}>{note.tag}</span>
        </div>
      ))}
    </div>
  );
}