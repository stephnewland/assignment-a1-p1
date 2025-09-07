'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Restore last visited tab on initial load
  useEffect(() => {
    const lastTab = Cookies.get('lastTab');
    if (lastTab && lastTab !== window.location.pathname) {
      router.push(lastTab);
    }
  }, [router]);

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

  // Trap keyboard focus inside mobile menu when open
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (!menuOpen) return;
      const focusableEls = mobileNavRef.current?.querySelectorAll('a, button');
      if (!focusableEls || focusableEls.length === 0) return;

      const firstEl = focusableEls[0] as HTMLElement;
      const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [menuOpen]);

  // Handle link clicks: close menu & save last tab
  const handleLinkClick = (path: string) => {
    if (path !== '/') Cookies.set('lastTab', path);
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

  const linkStyle = {
    textDecoration: 'none',
    color: theme === 'dark' ? '#eee' : '#333',
    fontWeight: 'bold',
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 bg-background border-b border-gray-300"
      style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        color: theme === 'dark' ? '#eee' : '#333',
      }}
    >
      {/* Left: Student ID + Desktop Nav */}
      <div className="flex flex-col">
        <p aria-label="Student ID" className="font-bold">
          Student #21993608
        </p>

        {!isMobile && (
          <nav
            role="navigation"
            tabIndex={0}
            aria-label="Main navigation"
            className="flex gap-4 mt-2"
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

      {/* Right: Theme Toggle + Hamburger */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="px-3 py-1 rounded"
          style={{
            backgroundColor: theme === 'light' ? '#333' : '#eee',
            color: theme === 'light' ? '#fff' : '#000',
          }}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>

        {/* Hamburger menu (mobile only) */}
        {isMobile && (
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={mobileNavRef}
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? `${mobileNavRef.current?.scrollHeight ?? 0}px` : '0',
          transition: 'max-height 0.3s ease-in-out',
        }}
        className="absolute top-full left-0 w-full bg-background border-t border-gray-300 shadow-md p-4 flex flex-col gap-2 z-50"
        aria-hidden={!menuOpen}
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
      </div>
    </header>
  );
}
