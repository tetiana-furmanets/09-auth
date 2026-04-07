//src/components/NoteForm

'use client';

import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import { createNote } from '@/lib/api/clientApi';
import css from './NoteForm.module.css';

const TAGS: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

type NoteFormProps = {
  onClose: () => void;
};


export default function NoteForm({ onClose }: NoteFormProps) {  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      [name]: name === 'tag' ? (value as NoteTag) : value,
    });
  };

  const formAction = async (formData: FormData) => {
    const newNote = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };

    await createNote(newNote);

    clearDraft();
router.push('/notes');
onClose();
  };

  return (
    <form className={css.form} action={formAction}>
      <div className={css.field}>
        <input
          key={draft.title}
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.field}>
        <textarea
          key={draft.content}
          name="content"
          placeholder="Content"
          defaultValue={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.field}>
        <select
          key={draft.tag}
          name="tag"
          defaultValue={draft.tag}
          onChange={handleChange}
          required
        >
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
      <button type="button" onClick={onClose}>          Cancel
        </button>

        <button type="submit">Create Note</button>
      </div>
    </form>
  );
}