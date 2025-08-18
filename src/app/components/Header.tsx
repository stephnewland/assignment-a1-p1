'use client';

import Link from 'next/link';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const headerStyle: React.CSSProperties = {
    position: 'relative', // 👈 Needed for absolute bar
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

  return (
    <header role="banner" style={headerStyle}>
      {/* 🔝 Top bar positioned absolutely */}
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

      {/* Left side: Student number + nav links */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 'bold' }}>Student #21993608</div>

        <nav style={menuStyle}>
          <Link href="/tabs" style={linkStyle}>Tabs</Link>
          <Link href="/coding-races" style={linkStyle}>Coding Races</Link>
          <Link href="/court-room" style={linkStyle}>Court Room</Link>
          <Link href="/escape-room" style={linkStyle}>Escape Room</Link>
          <Link href="/about" style={linkStyle}>About</Link>
        </nav>
      </div>

      {/* Right side: Theme toggle + hamburger */}
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

        <button
          aria-label="Open menu"
          onClick={() => alert('Menu clicked')}
          style={menuButtonStyle}
        >
          ☰
        </button>
      </div>
    </header>
  );
}