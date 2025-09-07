'use client';

import { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter();

  // Toggle light/dark theme
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Redirect to last visited tab on page load
  useEffect(() => {
    const lastTab = Cookies.get('lastTab');
    if (lastTab && lastTab !== window.location.pathname) {
      router.push(lastTab);
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Assignment A1 P1 | Steph Newland</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}
        style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}
      >
        {/* Sticky Header */}
        <Header theme={theme} toggleTheme={toggleTheme} />

        {/* Main Content */}
        <main id="main-content" role="main" className="pt-20 px-4">
          {/* Sticky Breadcrumbs below header */}
          <Breadcrumbs />

          {/* Page content */}
          {children}
        </main>

        {/* Footer */}
        <Footer theme={theme} />
      </body>
    </html>
  );
}
