// app/(private routes)/notes/page.tsx

'use client';

import NotesClient from './filter/[...slug]/NotesClient';
import SidebarNotes from '@/app/(private routes)/notes/filter/@sidebar/SidebarNotes';
import css from './NotesPage.module.css';



export default function NotesPage() {
  return (
    <div className={css.container}>
      <SidebarNotes />
      <NotesClient tag="all" />
    </div>
  );
}