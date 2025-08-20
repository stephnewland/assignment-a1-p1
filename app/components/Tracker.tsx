'use client';

export default function Tracker({ progress, theme }: { progress: number; theme: string }) {
  const containerStyle = {
    backgroundColor: theme === 'light' ? '#ddd' : '#555',
    height: '8px',
    width: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '1rem 0',
  };

  const fillStyle = {
    width: `${progress}%`,
    height: '100%',
    backgroundColor: theme === 'light' ? '#4caf50' : '#81c784',
    transition: 'width 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={fillStyle}></div>
    </div>
  );
}