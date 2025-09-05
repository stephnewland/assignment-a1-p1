// app/components/CodeGeneratorWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const CodeGenerator = dynamic(() => import('./CodeGenerator'), { ssr: false });

export default function CodeGeneratorWrapper() {
  return <CodeGenerator />;
}
