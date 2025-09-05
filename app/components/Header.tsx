'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  // const router = useRouter(); -- lint warning; check to see if remove
  const pathname = usePathname();

  // Focus first link when menu opens
  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = (path: string) => {
    if (path !== '/') document.cookie = `lastTab=${path}; path=/`;
    setMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home', ariaLabel: 'Go to homepage' },
    { href: '/about', label: 'About', ariaLabel: 'Learn more about this project' },
    { href: '/coding-races', label: 'Coding Races', ariaLabel: 'Go to Coding Races tab' },
    { href: '/court-room', label: 'Court Room', ariaLabel: 'Go to Court Room tab' },
    { href: '/escape-room', label: 'Escape Room', ariaLabel: 'Go to Escape Room tab' },
    { href: '/tabs', label: 'Tabs', ariaLabel: 'View all tab options' },
  ];

  const headerStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    color: theme === 'dark' ? '#eee' : '#333',
    borderBottom: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    flexWrap: 'wrap',
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

  const iconStyle: React.CSSProperties = { fontSize: '1.2rem' };

  const menuButtonStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme === 'dark' ? '#eee' : '#333',
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: theme === 'dark' ? '#eee' : '#333',
    fontWeight: 'bold',
  };

  return (
    <header role="banner" style={headerStyle}>
      {/* Decorative top bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '4px',
          width: '100%',
          backgroundColor: theme === 'light' ? '#000' : '#00ffcc',
        }}
      />

      {/* Left section: Student ID + Desktop Nav */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p aria-label="Student ID" style={{ fontWeight: 'bold' }}>
          Student #21993608
        </p>

        {!isMobile && (
          <nav
            role="navigation"
            tabIndex={0}
            aria-label="Main navigation"
            style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}
          >
            {navLinks.map(({ href, label, ariaLabel }, index) => (
              <Link
                key={href}
                href={href}
                style={linkStyle}
                aria-label={ariaLabel}
                aria-current={pathname === href ? 'page' : undefined}
                onClick={() => handleLinkClick(href)}
                ref={index === 0 ? firstLinkRef : null}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Right section: Theme Toggle + Mobile Menu Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

        <button
          aria-label="Toggle menu visibility"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          tabIndex={0}
          style={menuButtonStyle}
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown Nav with smooth slide-down */}
      <div
        ref={mobileNavRef}
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? `${mobileNavRef.current?.scrollHeight ?? 0}px` : '0',
          transition: 'max-height 0.3s ease-in-out',
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          borderTop: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}`,
          padding: menuOpen ? '1rem' : '0 1rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}
        aria-hidden={!menuOpen}
      >
        <nav
          role="navigation"
          tabIndex={0}
          aria-label="Dropdown navigation"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          {navLinks.map(({ href, label, ariaLabel }) => (
            <Link
              key={href}
              href={href}
              style={linkStyle}
              aria-label={ariaLabel}
              aria-current={pathname === href ? 'page' : undefined}
              onClick={() => handleLinkClick(href)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
