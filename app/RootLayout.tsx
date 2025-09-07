'use client';

import { useState } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const bodyStyle = {
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    color: theme === 'dark' ? '#f9f9f9' : '#333',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  };

  return (
    <html lang="en">
      <Head>
        <title>Assignment A1 P1 | Steph Newland</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body style={bodyStyle}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Breadcrumbs />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer theme={theme} />
      </body>
    </html>
  );
}
