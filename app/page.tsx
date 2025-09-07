import Link from 'next/link';
import CodeGeneratorWrapper from './components/CodeGeneratorWrapper';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = await cookies(); // <- note the await
  const lastTabCookie = cookieStore.get('lastTab');
  const lastTab =
    lastTabCookie?.value && /^[a-z\-]+$/.test(lastTabCookie.value) ? lastTabCookie.value : null;

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>CSE3CWA</h1>

      {lastTab ? (
        <div>
          <p>
            Last visited tab: <strong>{formatTabName(lastTab)}</strong>
          </p>
          <Link
            href={`/${lastTab}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Last Tab
          </Link>
        </div>
      ) : (
        <p aria-live="polite">Welcome! Choose a tab to begin.</p>
      )}

      <div className="mt-6">
        <CodeGeneratorWrapper />
      </div>
    </main>
  );
}

function formatTabName(tab: string) {
  return tab
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
