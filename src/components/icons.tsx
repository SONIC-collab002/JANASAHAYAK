import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="JanSahayak Logo"
    >
      <defs>
        <linearGradient id="tricolor-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FF9933' }} /> 
          <stop offset="50%" style={{ stopColor: '#FFFFFF' }} />
          <stop offset="100%" style={{ stopColor: '#138808' }} />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="50" r="48" fill="url(#tricolor-gradient)" stroke="#E0E0E0" strokeWidth="2"/>
      
      <circle cx="50" cy="50" r="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
      
      {[...Array(24)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2="50"
          y2="32"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${i * 15}, 50, 50)`}
        />
      ))}
    </svg>
  );
}
