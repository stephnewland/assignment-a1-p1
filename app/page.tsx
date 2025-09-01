import { cookies } from 'next/headers';
import CodeGeneratorWrapper from './components/CodeGeneratorWrapper';

export default async function HomePage() {
  const cookieStore = await cookies(); 
  const lastTab = cookieStore.get('lastTab')?.value;
  const safeTab = lastTab && /^[a-z\-]+$/.test(lastTab) ? lastTab : '';

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>CSE3CWA</h1>

      {safeTab ? (
        <p>
          Last visited tab: <strong>{formatTabName(safeTab)}</strong>
        </p>
      ) : (
        <p aria-live="polite">Welcome! Choose a tab to begin.</p>
      )}

      <CodeGeneratorWrapper />
    </main>
  );
}

function formatTabName(tab: string) {
  return tab
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
