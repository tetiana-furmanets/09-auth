// app/(private routes)/notes/filter/layout.tsx

import type { ReactNode } from 'react';
import css from './NotesLayout.module.css';

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <section className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{children}</main>
    </section>
  );
}