"use client";

import { useState } from "react";

export default function CodeGenerator() {
  const [htmlCode, setHtmlCode] = useState("");
  const [headingText, setHeadingText] = useState("Hello from generated HTML!");

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
        <h1>${headingText}</h1>
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
    alert("Code copied to clipboard!");
  };

  return (
    <>
      <label htmlFor="heading" style={{ display: "block", marginBottom: "0.5rem" }}>
        Enter heading text:
      </label>
      <input
        id="heading"
        type="text"
        value={headingText}
        onChange={(e) => setHeadingText(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />

      <button
        onClick={generateCode}
        style={{
          marginBottom: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Generate Code
      </button>

      <button
        onClick={copyToClipboard}
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#00b894",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Copy to Clipboard
      </button>

      <textarea
        value={htmlCode}
        readOnly
        rows={15}
        style={{
          width: "100%",
          fontFamily: "monospace",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fff",
          resize: "vertical",
          marginTop: "1rem",
        }}
        aria-label="Generated HTML code"
      />
    </>
  );
}
