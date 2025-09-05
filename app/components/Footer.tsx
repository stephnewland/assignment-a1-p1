'use client';

import Link from 'next/link';

type FooterProps = {
  theme: 'light' | 'dark';
};

export default function Footer({ theme }: FooterProps) {
  const style: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    color: theme === 'dark' ? '#eee' : '#333',
    borderTop: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
    textAlign: 'center',
    padding: '1rem',
    marginTop: '2rem',
  };

  const linkStyle: React.CSSProperties = {
    display: 'inline-block',
    marginBottom: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: theme === 'dark' ? '#444' : '#333',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  };

  return (
    <footer role="contentinfo" style={style}>
      <Link href="/" style={linkStyle} aria-label="Home">
        Home
      </Link>
      <p>&copy; Steph Newland | #21993608 | August 2025</p>
    </footer>
  );
}
