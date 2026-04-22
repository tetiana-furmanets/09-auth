//src/components/NoteForm

'use client';

import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import { createNote } from '@/lib/api/clientApi';

import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });

      clearDraft();
      router.push('/notes');
      onClose();
    },
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.field}>
        <textarea
          name="content"
          placeholder="Content"
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.field}>
        <select
          name="tag"
          value={draft.tag}
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
        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Note'}
        </button>
      </div>
    </form>
  );
}