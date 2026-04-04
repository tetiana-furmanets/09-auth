// src/components/App/App.tsx
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { useDebouncedCallback } from 'use-debounce';
import type { Note } from '@/types/note';
import styles from './App.module.css'; 

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); 
  }, 300);

const { data, isLoading, error } = useQuery({
  queryKey: ['notes', page, search],
  queryFn: () => fetchNotes(page, 12, search),
  staleTime: 5000, 
});

  const notes: Note[] = data?.notes || [];

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <input
          type="text"
          placeholder="Search notes..."
          onChange={(e) => updateSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={() => setIsOpen(true)}>Create Note</button>
      </header>

      <main className={styles.notesGrid}>
        {isLoading && <p>Loading notes...</p>}
        {error && <p>Error loading notes.</p>}
        {!isLoading && !notes.length && <p>No notes found.</p>}

        {notes.map((note) => (
          <div key={note.id} className={styles.noteCard}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span>{note.tag}</span>
          </div>
        ))}
      </main>

      <footer className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </footer>

      {isOpen && (
        <div className={styles.modal}>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;