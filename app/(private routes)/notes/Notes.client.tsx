//app/(private routes)/notes/Notes.client.tsx

import Link from 'next/link';
import css from './NotesClient.module.css';

export default function NotesClient() {
  return (
    <div>
      <Link href="/notes/action/create" className={css.createBtn}>
        Create note +
      </Link>

      {/* список нотаток */}
    </div>
  );
}