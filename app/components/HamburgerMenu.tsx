'use client';
import { useState } from 'react';
import Link from 'next/link';

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="sm:hidden p-2">
        ☰
      </button>

      <ul className={`flex flex-col sm:flex-row gap-4 ${open ? 'block' : 'hidden sm:flex'}`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/tabs">Tabs</Link>
        </li>
        <li>
          <Link href="/escape-room">Escape Room</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
