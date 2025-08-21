'use client';

import { useEffect } from 'react';

export default function EscapeRoomPage() {
  useEffect(() => {
    document.cookie = 'lastTab=escape-room; path=/';
  }, []);

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 aria-label="Escape Room Page">Escape Room Page</h1>
      <h2>This page is under construction.</h2>
      <p>Please check back later for updates.</p>
    </main>
  );
}