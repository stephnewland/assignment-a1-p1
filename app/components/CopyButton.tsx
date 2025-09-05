'use client';

import { useState } from 'react';

interface CopyButtonProps {
  htmlCode: string;
}

export default function CopyButton({ htmlCode }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
    });
  };

  return (
    <div>
      <button
        onClick={copyToClipboard}
        style={{
          marginBottom: '0.5rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#00b894',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
        aria-label="Copy tab HTML code to clipboard"
      >
        Copy to Clipboard
      </button>

      {/* Accessible confirmation message */}
      <p aria-live="polite" style={{ color: '#00b894', marginTop: '0.5rem', minHeight: '1.2rem' }}>
        {copied ? 'Code copied!' : ''}
      </p>
    </div>
  );
}
