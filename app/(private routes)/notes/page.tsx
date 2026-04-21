// app/(private routes)/notes/page.tsx

'use client';

import NotesClient from './filter/[...slug]/Notes.client';
import SidebarNotes from '@/app/(private routes)/notes/filter/@sidebar/SidebarNotes';
import css from './NotesPage.module.css';



export default function NotesPage() {
  return (
<div className={css.container}>
  <div className={css.sidebar}>
    <SidebarNotes />
  </div>

  <div className={css.content}>
    <NotesClient tag="all" />
  </div>
</div>
  );
}