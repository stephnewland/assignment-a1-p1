'use client';

export default function AboutPage() {
  return (
    <main aria-labelledby="about-heading" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 id="about-heading">About Page</h1>

      <section aria-labelledby="intro-heading" style={{ marginBottom: '2rem' }}>
        <h2 id="intro-heading">Introduction to the Website</h2>
        <p>
          Welcome to my website. My name is <strong>Steph Newland</strong>, and my student number is <strong>21993608</strong>.
        </p>
        <p>
          This site demonstrates a Next.js application with accessibility, theme toggling, and interactive features.
        </p>
      </section>

      <section aria-labelledby="video-heading">
        <h2 id="video-heading">Watch the Tutorial</h2>
        <video
          controls
          width="100%"
          aria-label="Video tutorial on how to use this website"
          style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </main>
  );
}