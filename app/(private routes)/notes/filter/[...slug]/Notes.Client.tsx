// app/(private routes)/notes/filter/[...slug]/NotesClient.tsx


'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api/clientApi';
import type { Note, NoteTag } from '@/types/note';
import styles from './Notes.Client.module.css';

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
const normalizedTag: NoteTag | undefined =
  tag === 'all' ? undefined : (tag as NoteTag);
  
const { data, isLoading, error } = useQuery<FetchNotesResponse>({
  queryKey: ['notes', normalizedTag],
  queryFn: () => fetchNotes(1, 12, '', normalizedTag),
});

const notes: Note[] = data?.notes ?? [];
  if (isLoading) return <p className={styles.message}>Loading notes...</p>;
  if (error) return <p className={styles.message}>Error loading notes</p>;
  if (!notes.length) return <p className={styles.message}>No notes found</p>;

return (
  <div className={styles.list}>
    {notes.map(note => (
      <div key={note.id} className={styles.card}>
        <h3 className={styles.title}>{note.title}</h3>
        <p className={styles.content}>{note.content}</p>
        <span className={styles.tag}>{note.tag}</span>
      </div>
    ))}
  </div>
);
}