// app/(private routes)/notes/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNotes, getMe } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import css from './Notes.module.css';

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await getMe(); // якщо 401 — кине помилку
        const data = await fetchNotes();
        setNotes(data.notes);
      } catch {
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>My Notes</h1>

      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        <ul className={css.list}>
          {notes.map((note) => (
            <li key={note.id} className={css.card}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <span className={css.tag}>{note.tag}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}