'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * @typedef FloatingImageProps
 * @property {string} src - The source URL for the image.
 * @property {string} alt - The alt text for the image for accessibility.
 * @property {string} className - Tailwind CSS classes for positioning, sizing, and animation.
 */
interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
}

/**
 * @typedef FloatingFoodHeroProps
 * @property {string} title - The main heading text.
 * @property {string} description - The paragraph text below the heading.
 * @property {FloatingImageProps[]} images - An array of image objects to be displayed.
 * @property {string} [className] - Optional additional classes for the section container.
 */
export interface FloatingFoodHeroProps {
  title: string;
  description: string;
  images: FloatingImageProps[];
  className?: string;
}

/**
 * A decorative SVG component for the background swirl lines.
 */
const Swirls = () => (
  <>
    <svg
      className="swirl-svg absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-gold-500/20 dark:text-gold-900/10"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    <svg
      className="swirl-svg absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-gold-500/20 dark:text-gold-900/10"
      width="700"
      height="700"
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
);

/**
 * A responsive and animated hero section component.
 */
export function FloatingFoodHero({
  title,
  description,
  images,
  className,
}: FloatingFoodHeroProps) {
  const container = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(() => {
    // Animate text
    gsap.fromTo(
      '.hero-text-element',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
      }
    );

    // Floating effect for images
    imagesRef.current.forEach((img, i) => {
      if (img) {
        // Initial pop-in
        gsap.fromTo(
          img,
          { scale: 0, opacity: 0, rotation: gsap.utils.random(-30, 30) },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            delay: i * 0.15,
            ease: 'back.out(1.7)',
          }
        );

        // Continuous float
        gsap.to(img, {
          y: `+=${gsap.utils.random(15, 30)}`,
          x: `+=${gsap.utils.random(-10, 10)}`,
          rotation: gsap.utils.random(-5, 5),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5 + i * 0.1,
        });
        
        // Scroll parallax effect
        gsap.to(img, {
          yPercent: gsap.utils.random(-50, 50),
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    // Swirls slow rotation
    gsap.to('.swirl-svg', {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className={cn(
        'relative w-full min-h-[60vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-background py-20 md:py-32',
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>
      
      {/* Render floating images */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {images.map((image, index) => {
          // Clean up old CSS animation classes if present
          const cleanClassName = image.className.replace(/animate-\[.*?\]/g, '').replace('animate-float', '').trim();
          return (
            <img
              key={index}
              ref={(el) => { imagesRef.current[index] = el; }}
              src={image.src}
              alt={image.alt}
              className={cn('absolute object-cover rounded-full shadow-2xl border-4 border-gold-500/30', cleanClassName)}
            />
          );
        })}
      </div>

      {/* Text Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl mt-12">
        <h1 className="hero-text-element text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight text-white uppercase leading-tight mb-6">
          {title.split(' ').map((word, i) => 
            word.toLowerCase() === 'luxury' ? (
              <span key={i} className="text-gold-500 italic"> {word} </span>
            ) : (
              <span key={i}> {word} </span>
            )
          )}
        </h1>
        <p className="hero-text-element mt-6 text-lg sm:text-xl leading-8 text-neutral-300 font-light tracking-wide max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
