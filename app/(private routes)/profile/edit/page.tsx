// app/(private routes)/profile/edit/page.tsx

import { requireAuth } from '@/lib/proxy';

export default async function EditProfilePage() {
  await requireAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Profile</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <label>
          Name:
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Your email" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}