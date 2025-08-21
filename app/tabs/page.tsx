'use client';

import { useState, useEffect } from 'react';

export default function TabsPage() {
  const [tabs, setTabs] = useState([
    { label: 'Escape Room', content: 'Escape Room – Not yet finished.' },
    { label: 'Coding Races', content: 'Coding Races – Not yet finished.' },
    { label: 'Court Room', content: 'Court Room – Not yet finished.' },
  ]);
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    document.cookie = 'lastTab=tabs; path=/';
  }, []);

  const handleTabChange = (index: number, field: 'label' | 'content', value: string) => {
    const updated = [...tabs];
    updated[index][field] = value;
    setTabs(updated);
  };

  const addTab = () => {
    setTabs([...tabs, { label: `Tab ${tabs.length + 1}`, content: 'Not yet finished.' }]);
  };

  const deleteTab = (index: number) => {
    if (tabs.length === 1) return;
    const updated = [...tabs];
    updated.splice(index, 1);
    setTabs(updated);
  };

  const generateCode = () => {
    const buttons = tabs
      .map((tab, i) => {
        const id = `tab${i}`;
        const selected = i === 0 ? 'true' : 'false';
        return `<button role="tab" aria-selected="${selected}" onclick="showTab('${id}', this)">${tab.label}</button>`;
      })
      .join('\n    ');

    const contents = tabs
      .map((tab, i) => {
        const id = `tab${i}`;
        const active = i === 0 ? 'active' : '';
        return `<div id="${id}" class="tab-content ${active}" role="tabpanel">${tab.content}</div>`;
      })
      .join('\n    ');

    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tab Interface</title>
  <style>
    body { font-family: sans-serif; padding: 1rem; }
    .tabs { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .tab-content { display: none; padding: 1rem; border: 1px solid #ccc; }
    .tab-content.active { display: block; }
    button[aria-selected="true"] { font-weight: bold; }
  </style>
</head>
<body>
  <h1>Interactive Tabs</h1>
  <div class="tabs" role="tablist">
    ${buttons}
  </div>

  ${contents}

  <script>
    function showTab(id, btn) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('[role="tab"]').forEach(tab => tab.setAttribute('aria-selected', 'false'));
      document.getElementById(id).classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }
  </script>
</body>
</html>`;

    setGeneratedCode(fullCode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copied to clipboard!');
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Tab Generator</h1>

      {tabs.map((tab, index) => (
        <div key={index} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            value={tab.label}
            onChange={(e) => handleTabChange(index, 'label', e.target.value)}
            placeholder={`Label for Tab ${index + 1}`}
            style={{ padding: '0.5rem' }}
            aria-label={`Label for Tab ${index + 1}`}
          />
          <input
            type="text"
            value={tab.content}
            onChange={(e) => handleTabChange(index, 'content', e.target.value)}
            placeholder={`Content for Tab ${index + 1}`}
            style={{ padding: '0.5rem', width: '60%' }}
            aria-label={`Content for Tab ${index + 1}`}
          />
          <button
            onClick={() => deleteTab(index)}
            style={{
              padding: '0.5rem',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: tabs.length === 1 ? 'not-allowed' : 'pointer',
              opacity: tabs.length === 1 ? 0.5 : 1,
            }}
            disabled={tabs.length === 1}
            aria-label={`Delete Tab ${index + 1}`}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addTab}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#555',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
        aria-label="Add new tab"
      >
        + Add Tab
      </button>

      <br />

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
        aria-label="Generate tab HTML code"
      >
        Generate Code
      </button>

      <button
        onClick={copyToClipboard}
        style={{
          marginLeft: '1rem',
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

      <textarea
        value={generatedCode}
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
          marginTop: '1rem',
        }}
        aria-label="Generated tab HTML code"
      />
    </main>
  );
}