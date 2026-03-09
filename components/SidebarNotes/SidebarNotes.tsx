'use client';

import css from './SidebarNotes.module.css';

type Props = {
  onSelectTag: (tag: string | null) => void;
};

const tags = ['All', 'Meeting', 'Shopping', 'Personal', 'Study', 'Other'];

export default function SidebarNotes({ onSelectTag }: Props) {
  return (
    <aside className={css.sidebar}>
      <ul className={css.list}>
        {tags.map(tag => (
          <li key={tag}>
            <button
              className={css.tagBtn}
              onClick={() => onSelectTag(tag === 'All' ? null : tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}