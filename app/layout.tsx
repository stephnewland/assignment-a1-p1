'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter();
  const pathname = usePathname();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const bodyStyle = {
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    color: theme === 'dark' ? '#f9f9f9' : '#333',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    padding: '2rem',
  };

  const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
      '/': 'Home',
      '/tabs': 'Tabs',
      '/coding-races': 'Coding Races',
      '/court-room': 'Court Room',
      '/escape-room': 'Escape Room',
      '/about': 'About',
    };
    return `${titles[path] || 'Page'} | Assignment A1 P1 | Steph Newland`;
  };

  return (
    <html lang="en">
      <Head>
        <title>{getPageTitle(pathname)}</title>
        <meta name="description" content="Accessible tab memory demo using Next.js App Router" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body style={bodyStyle}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main id="main-content" role="main">
          <Breadcrumbs />
          {children}
        </main>
        <Footer theme={theme} />
      </body>
    </html>
  );
}