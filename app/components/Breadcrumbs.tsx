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
    <nav
      aria-label="Breadcrumb"
      className="sticky top-[72px] z-40 bg-background shadow-sm px-4 py-2 my-4"
    >
      <ol className="flex gap-2 list-none p-0 text-sm">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map(({ href, label }, i) => (
          <li key={href} className="flex items-center gap-1">
            <span aria-hidden="true" className="text-gray-400">
              ›
            </span>
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="font-semibold">
                {label}
              </span>
            ) : (
              <Link href={href} className="text-blue-600 hover:underline">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
