// app/not-found.tsx

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '404 | Page not found',
  description: 'This page does not exist in NoteHub.',

  alternates: {
    canonical: 'https://your-vercel-url.vercel.app/not-found',
  },

  openGraph: {
    title: '404 | Page not found',
    description: 'This page does not exist in NoteHub.',
    url: 'https://your-vercel-url.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};