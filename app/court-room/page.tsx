'use client';

import { useEffect } from 'react';

export default function CourtRoomPage() {
  useEffect(() => {
    document.cookie = 'lastTab=court-room; path=/';
  }, []);

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 aria-label="Court Room Page">Court Room Page</h1>
      <h2>This page is under construction.</h2>
      <p>Please check back later for updates.</p>
    </main>
  );
}