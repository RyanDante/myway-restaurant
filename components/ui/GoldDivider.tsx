import React from 'react';

interface GoldDividerProps {
  className?: string;
  variant?: 'solid' | 'gradient' | 'diamond';
}

export function GoldDivider({ className = '', variant = 'diamond' }: GoldDividerProps) {
  if (variant === 'diamond') {
    return (
      <div className={`flex items-center justify-center my-6 gap-4 w-full ${className}`}>
        <div className="h-[1px] bg-gradient-to-r from-transparent to-gold-500 flex-1" />
        <div className="w-2.5 h-2.5 rotate-45 border border-gold-500 bg-transparent" />
        <div className="h-[1px] bg-gradient-to-l from-transparent to-gold-500 flex-1" />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent w-full my-6 ${className}`} />
    );
  }

  return (
    <div className={`h-[1px] bg-gold-500/30 w-full my-6 ${className}`} />
  );
}
