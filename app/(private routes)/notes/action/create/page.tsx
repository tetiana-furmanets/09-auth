// app/(private routes)/notes/action/create/page.tsx

import type { Metadata } from 'next';
import NoteFormWrapper from './NoteFormWrapper';
import css from './CreateNote.module.css';

const baseUrl = 'https://your-vercel-url.vercel.app';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub.',
  url: `${baseUrl}/notes/action/create`, // ✅ ДОДАЛИ

  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub.',
    url: `${baseUrl}/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteFormWrapper />
      </div>
    </main>
  );
}