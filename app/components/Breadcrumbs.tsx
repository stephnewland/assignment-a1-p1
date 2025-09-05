// app/components/Breadcrumbs.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const labelMap: Record<string, string> = {
    tabs: 'Tabs',
    'coding-races': 'Coding Races',
    'court-room': 'Court Room',
    'escape-room': 'Escape Room',
    about: 'About',
  };

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label =
      labelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" style={{ margin: '1rem 0' }}>
      <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {crumbs.map(({ href, label }, i) => (
          <li key={href}>
            <span aria-hidden="true">›</span>{' '}
            {i === crumbs.length - 1 ? (
              <span aria-current="page">{label}</span>
            ) : (
              <Link href={href}>{label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
