'use client';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const headerStyle: React.CSSProperties = {
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

  return (
    <header role="banner" style={headerStyle}>
      <div style={{ fontWeight: 'bold' }}>Student #21993608</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          aria-label="Toggle between light and dark theme"
          onClick={toggleTheme}
          style={buttonStyle}
        >
          {theme === 'light' ? (
            <>
              <span style={iconStyle}>🌙</span>
              <span>Switch to Dark Mode</span>
            </>
          ) : (
            <>
              <span style={iconStyle}>☀️</span>
              <span>Switch to Light Mode</span>
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