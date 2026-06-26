import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`text-gold-500 uppercase tracking-widest text-xs font-semibold block mb-2 ${className}`}
    >
      {children}
    </span>
  );
}
