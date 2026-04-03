// app/(private routes)/notes/filter/[...slug]/page.tsx

import { Metadata } from 'next';
import NotesClient from './NotesClient';

type Props = {
  params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] || 'all';

  const isAll = tag === 'all';

  const title = isAll
    ? 'All Notes | NoteHub'
    : `Notes by tag: ${tag} | NoteHub`;

  const description = isAll
    ? 'Browse all your notes in NoteHub.'
    : `Browse notes filtered by tag: ${tag}.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `https://your-vercel-url.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default function NotesFilterPage({ params }: Props) {
  const tag = params.slug?.[0] || 'all';

  return <NotesClient tag={tag} />;
}