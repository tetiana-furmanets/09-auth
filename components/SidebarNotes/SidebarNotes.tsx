'use client';

import { useState } from 'react';
import type { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

const TAGS: (NoteTag | 'All')[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface SidebarProps {
  onSelectTag: (tag: NoteTag | null) => void;
}

export default function SidebarNotes({ onSelectTag }: SidebarProps) {
  const [activeTag, setActiveTag] = useState<NoteTag | null>(null);

  const handleClick = (tag: NoteTag | 'All') => {
    const value = tag === 'All' ? null : tag;
    setActiveTag(value);
    onSelectTag(value);
  };

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Tags</h2>
      <ul className={css.list}>
        {TAGS.map((tag) => (
          <li
            key={tag}
            className={`${css.item} ${
              activeTag === (tag === 'All' ? null : tag) ? css.active : ''
            }`}
            onClick={() => handleClick(tag)}
          >
            {tag}
          </li>
        ))}
      </ul>
    </aside>
  );
}