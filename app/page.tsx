import { cookies } from 'next/headers';
import CodeGeneratorWrapper from './components/CodeGeneratorWrapper';

export default async function HomePage() {
  const cookieStore = await cookies(); // ✅ Await the cookies() call
  const lastTab = cookieStore.get('lastTab')?.value || '';

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>CSE3CWA</h1>

      {lastTab ? (
        <p>
          Last visited tab: <strong>{lastTab.replace('/', '')}</strong>
        </p>
      ) : (
        <p aria-live="polite">Welcome! Choose a tab to begin.</p>
      )}

      <CodeGeneratorWrapper />
    </main>
  );
}