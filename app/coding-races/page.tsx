'use client';

import { useEffect } from 'react';

export default function CodingRacesPage() {
  useEffect(() => {
    document.cookie = 'lastTab=coding-races; path=/';
  }, []);

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 aria-label="Coding Race Page">Coding Race Page</h1>
      <h2>This page is under construction.</h2>
      <p>Please check back later for updates.</p>
    </main>
  );
}
