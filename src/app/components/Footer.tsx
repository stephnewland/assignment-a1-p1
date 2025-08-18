'use client';

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

  return (
    <footer role="contentinfo" style={style}>
      &copy; Steph Newland #21993608 2025
    </footer>
  );
}