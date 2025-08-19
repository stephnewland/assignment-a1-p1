'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lastVisited = document.cookie
      .split('; ')
      .find((row) => row.startsWith('lastTab='))
      ?.split('=')[1];

    if (lastVisited && router.pathname === '/') {
      router.push(lastVisited);
    }
  }, [router]);

  const headerStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    color: theme === 'dark' ? '#eee' : '#333',
    borderBottom: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: theme === 'light' ? '#333' : '#eee',
    color: theme === 'light' ? '#fff' : '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '1.2rem',
  };

  const menuButtonStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme === 'dark' ? '#eee' : '#333',
    marginLeft: '1rem',
  };

  const menuStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: theme === 'dark' ? '#eee' : '#333',
    fontWeight: 'bold',
  };

  const handleLinkClick = (path: string) => {
    document.cookie = `lastTab=${path}; path=/`;
    setMenuOpen(false);
  };

  return (
    <header role="banner" style={headerStyle}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '4px',
          width: '100%',
          backgroundColor: theme === 'light' ? '#000' : '#00ffcc',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p aria-label="Student ID" style={{ fontWeight: 'bold' }}>
          Student #21993608
        </p>

        {!isMobile && (
          <nav style={menuStyle} aria-label="Main navigation">
            <Link href="/tabs" style={linkStyle} aria-label="Navigate to Tabs page">Tabs</Link>
            <Link href="/coding-races" style={linkStyle} aria-label="Navigate to Coding Races page">Coding Races</Link>
            <Link href="/court-room" style={linkStyle} aria-label="Navigate to Court Room page">Court Room</Link>
            <Link href="/escape-room" style={linkStyle} aria-label="Navigate to Escape Room page">Escape Room</Link>
            <Link href="/about" style={linkStyle} aria-label="Navigate to About page">About</Link>
          </nav>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          aria-label="Toggle between light and dark theme"
          onClick={toggleTheme}
          style={buttonStyle}
        >
          {theme === 'light' ? (
            <>
              <span style={iconStyle}>🌙</span>
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <span style={iconStyle}>☀️</span>
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>

      <button
        aria-label="Toggle menu visibility"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        style={menuButtonStyle}
      >
        ☰
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
            borderTop: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}`,
            padding: '1rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} aria-label="Dropdown navigation">
            <Link href="/tabs" style={linkStyle} aria-label="Navigate to Tabs page" onClick={() => handleLinkClick('/tabs')}>Tabs</Link>
            <Link href="/coding-races" style={linkStyle} aria-label="Navigate to Coding Races page" onClick={() => handleLinkClick('/coding-races')}>Coding Races</Link>
            <Link href="/court-room" style={linkStyle} aria-label="Navigate to Court Room page" onClick={() => handleLinkClick('/court-room')}>Court Room</Link>
            <Link href="/escape-room" style={linkStyle} aria-label="Navigate to Escape Room page" onClick={() => handleLinkClick('/escape-room')}>Escape Room</Link>
            <Link href="/about" style={linkStyle} aria-label="Navigate to About page" onClick={() => handleLinkClick('/about')}>About</Link>
          </nav>
        </div>
      )}
    </header>
  );
}