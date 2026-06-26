'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const images = [
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600', alt: 'Chef preparing dish' },
  { src: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600', alt: 'Gourmet meal' },
  { src: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=600', alt: 'Fine dining plate' },
];

export function ShowcaseGrid() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.showcase-img', {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full max-w-7xl mx-auto px-6 py-24 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`showcase-img relative w-full h-[400px] overflow-hidden ${i === 1 ? 'md:-mt-12' : ''}`}
          >
            <Image 
              src={img.src} 
              alt={img.alt} 
              fill 
              className="object-cover transition-transform duration-700 hover:scale-110" 
            />
            {/* Dark gradient overlay for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </div>
        ))}
      </div>
    </section>
  );
}
