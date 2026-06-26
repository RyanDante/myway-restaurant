"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function FinalCTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".rotating-badge-bottom", {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      gsap.from(".cta-text", {
        scale: 0.8,
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-[#0a0a0a] py-40 border-t border-neutral-900 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background massive text overlay (faint) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
        <h2 className="text-[20vw] font-black uppercase text-white whitespace-nowrap">
          MYWAY
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Rotating Badge */}
        <div className="w-24 h-24 md:w-32 md:h-32 rotating-badge-bottom flex items-center justify-center mb-8">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-gold-500 fill-current"
          >
            <path
              id="circlePathBottom"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text fontSize="8" fontWeight="bold" letterSpacing="2">
              <textPath href="#circlePathBottom" startOffset="0%">
                JOIN US TODAY • EXPERIENCE MYWAY •
              </textPath>
            </text>
            <circle cx="50" cy="50" r="8" className="fill-background" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="cta-text text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-white text-center leading-[0.85] mb-12">
          WHERE <br /> TO NEXT?
        </h2>

        {/* CTA Button */}
        <button className="cta-text bg-gold-500 hover:bg-gold-400 text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm transition-transform duration-300 hover:scale-110 shadow-[0_0_40px_rgba(197,168,55,0.4)]">
          Reserve A Table
        </button>
      </div>
    </section>
  );
}
