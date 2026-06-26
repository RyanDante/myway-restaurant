'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const categories = [
  { name: '🍔 BURGER' },
  { name: '🍕 PIZZA' },
  { name: '🌭 HOTDOG' },
  { name: '🍩 DESSERT' },
  { name: '🍷 DRINKS' },
  { name: '🍝 PASTA' },
  { name: '🥗 SALAD' },
];

export function CategoryBar() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.category-item', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 90%',
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full border-y border-neutral-800 bg-neutral-950/50 py-6 overflow-x-auto hide-scrollbar">
      <div className="flex items-center justify-start md:justify-center min-w-max px-6 gap-12">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className="category-item flex items-center gap-2 group outline-none"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 group-hover:text-gold-500 transition-colors duration-300">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
