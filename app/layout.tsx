'use client';

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tracker from './components/Tracker';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [progress, setProgress] = useState(50);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

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