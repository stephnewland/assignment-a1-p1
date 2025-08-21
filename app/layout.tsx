'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter();
  const pathname = usePathname();

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Cookie reader utility
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  // Redirect to last visited tab if on homepage
  /*useEffect(() => {
    const lastTab = getCookie('lastTab');
    const validTabs = ['/tabs', '/coding-races', '/court-room', '/escape-room'];

    if (
      lastTab &&
      validTabs.includes(lastTab) &&
      pathname === '/' // only redirect from homepage
    ) {
      router.push(lastTab);
    }
  }, [pathname, router]);*/

  // Theme-aware body styles
  const bodyStyle = {
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    color: theme === 'dark' ? '#eee' : '#333',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    padding: '2rem',
  };

  return (
    <html lang="en">
      <body style={bodyStyle}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>{children}</main>
        <Footer theme={theme} />
      </body>
    </html>
  );
}