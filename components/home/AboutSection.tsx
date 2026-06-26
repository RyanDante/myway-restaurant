"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function AboutSection() {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // Text reveal
      gsap.from(".about-text", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-container",
          start: "top 80%",
        },
      });

      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stats reveal
      gsap.from(".stat-box", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full bg-[#111111] py-32 overflow-hidden border-y border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Headings */}
        <div className="about-text-container mb-16 flex flex-col items-center">
          <p className="about-text font-serif italic text-gold-500 text-xl md:text-2xl mb-6">
            Your premium dining destination
          </p>
          <h2 className="about-text text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white max-w-5xl leading-[0.9]">
            THE BEST CULINARY EXPERIENCE IN BUEA
          </h2>
        </div>

        {/* Parallax Image */}
        <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden rounded-sm border border-neutral-800">
          <video
            src="/videos/highlight2.mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover scale-100"
          />
          {/* Button overlaid on image */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <button className="bg-gold-500 hover:bg-gold-400 text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-transform duration-300 hover:scale-105 shadow-xl flex items-center gap-3">
              About Us
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-xs font-serif italic">
                i
              </span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container w-full mt-24 flex flex-col md:flex-row justify-between items-center text-left gap-12 border-t border-neutral-800 pt-16">
          <p className="text-neutral-400 text-sm md:text-base max-w-sm leading-relaxed">
            Known for its modern, stylish ambiance, the restaurant features a
            mix of comfortable indoor seating and an outdoor terrace area.
          </p>

          <div className="flex gap-16">
            <div className="stat-box flex items-center gap-4">
              <span className="text-5xl md:text-6xl font-black text-white">
                +50
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-gold-500 max-w-20">
                Menu Options
              </span>
            </div>

            <div className="w-px h-16 bg-neutral-800 hidden md:block"></div>

            <div className="stat-box flex items-center gap-4">
              <span className="text-5xl md:text-6xl font-black text-white">
                100<span className="text-3xl">%</span>
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-gold-500 max-w-20">
                Quality Foods
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
