'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
      document.body.dataset.theme = saved;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      setTheme(defaultTheme);
      document.body.dataset.theme = defaultTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.dataset.theme = newTheme;
  };

  return (
    <button onClick={toggleTheme}
      aria-label="Toggle theme" 
      aria-pressed={theme === 'dark'}
      style={{ margin: '1rem' }}
      >
      {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}