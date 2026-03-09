'use client';

import { useState } from 'react';
import NotesClient from '@/components/Notes/NotesClient';
import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';
import css from './NotesPage.module.css'; 

export default function NotesPage() {
  const [filterTag, setFilterTag] = useState<string | null>(null);

  return (
    <div className={css.page}>
      <SidebarNotes onSelectTag={setFilterTag} />
      <main className={css.notesMain}>
        <h1 className={css.title}>My Notes</h1>
        <NotesClient filterTag={filterTag} />
      </main>
    </div>
  );
}