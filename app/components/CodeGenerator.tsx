'use client';

import { useState } from 'react';

export default function CodeGenerator() {
  const [htmlCode, setHtmlCode] = useState('');

  const generateCode = () => {
    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello</title>
  <style>
    body { font-family: sans-serif; background: #f0f0f0; padding: 2rem; }
    h1 { color: #0070f3; }
  </style>
</head>
<body>
  <h1>Hello from generated HTML!</h1>
  <script>
    console.log("Hello from JavaScript!");
  </script>
</body>
</html>
    `.trim();
    setHtmlCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    alert('Code copied to clipboard!');
  };

  return (
    <>
      <textarea
        value={htmlCode}
        readOnly
        rows={20}
        style={{
          width: '100%',
          fontFamily: 'monospace',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff',
          resize: 'vertical',
          marginBottom: '1rem',
        }}
        aria-label="Generated HTML code"
      />

      <button
        onClick={generateCode}
        style={{
          marginBottom: '0.5rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
        aria-label="Generate HTML code"
      >
        Generate Code
      </button>

      <button
        onClick={copyToClipboard}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#00b894',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
        aria-label="Copy HTML code to clipboard"
      >
        Copy to Clipboard
      </button>
    </>
  );
}