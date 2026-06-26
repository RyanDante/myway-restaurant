"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function PremiumGallery() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".gallery-text", {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".gallery-img-1", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      gsap.from(".gallery-img-2", {
        y: 150,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
      });

      // Parallax on images
      gsap.to(".gallery-img-1", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".gallery-img-2", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full bg-background py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Text */}
        <div className="flex flex-col items-start pr-0 lg:pr-12">
          <h2 className="gallery-text text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.9]">
            A PREMIUM RESTAURANT IN THE HEART OF BUEA
          </h2>
          <p className="gallery-text text-neutral-400 text-base md:text-lg mb-10 max-w-md">
            Discover a luxurious ambiance designed for those who appreciate the
            finer things in life. Our elegant dining room sets the perfect stage
            for any occasion.
          </p>
          <button className="gallery-text bg-gold-500 hover:bg-gold-400 text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-transform duration-300 hover:scale-105 shadow-xl">
            Our Menu
          </button>
        </div>

        {/* Right Gallery (Split / Overlapping Images) */}
        <div className="relative h-150 w-full mt-16 lg:mt-0">
          <div className="gallery-img-1 absolute left-0 top-0 w-3/4 h-100 rounded-sm overflow-hidden border border-neutral-800 z-10 shadow-2xl">
            <Image
              src="/images/interior.png"
              alt="Restaurant Ambiance"
              fill
              className="object-cover scale-110"
            />
          </div>
          <div className="gallery-img-2 absolute right-0 bottom-0 w-3/5 h-87.5 rounded-sm overflow-hidden z-20 shadow-2xl">
            <Image
              src="/images/hero.jpg"
              fill
              alt="Chef cooking"
              className="object-contain scale-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
