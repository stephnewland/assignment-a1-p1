import dynamic from 'next/dynamic';

// Dynamically import the client component
const CodeGenerator = dynamic(() => import('./CodeGenerator'), { ssr: false });

export default function CodeGeneratorWrapper() {
  return <CodeGenerator />;
}