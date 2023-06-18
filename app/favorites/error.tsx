'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <div>
      <h2>{error.message}</h2>
      <button onClick={() => router.back()}>go back</button>
    </div>
  );
}
