"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function ModernHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Text entrance animation
      gsap.fromTo(
        ".hero-heading-line",
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 1,
        },
      );

      // Rotating Badge
      gsap.to(".rotating-badge", {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      // Floating side images
      gsap.to(".float-img", {
        y: "+=20",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden bg-background"
    >
      {/* Side floating images */}
      <div className="absolute left-0 top-1/4 -translate-x-1/2 float-img hidden md:block">
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-8 border-background shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400"
            alt="Gourmet"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute right-0 top-1/3 translate-x-1/3 float-img hidden md:block">
        <div className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-background shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400"
            alt="Gourmet"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Rotating Badge */}
        <div className="absolute -top-24 mt-15 md:-top-32 z-20 w-48 h-48 md:w-64 md:h-64 rotating-badge flex items-center justify-center mt-3 drop-shadow-2xl">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-gold-500 fill-current"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              fill="transparent"
            />
            <text fontSize="8" fontWeight="bold" letterSpacing="0.5">
              <textPath href="#circlePath" startOffset="0%">
                PREMIUM QUALITY • LUXURY DINING • MYWAY RESTAURANT •
              </textPath>
            </text>
            <circle cx="50" cy="50" r="8" className="fill-background" />
          </svg>
        </div>

        {/* Main Massive Typography */}
        <div className="text-center w-full flex flex-col items-center mt-8 perspective-1000">
          <div className="overflow-hidden">
            <h1 className="hero-heading-line text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-white">
              SYMPHONY
            </h1>
          </div>
          <div className="overflow-hidden flex items-center">
            <h1 className="hero-heading-line text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-white">
              OF{" "}
              <span className="font-serif italic text-gold-500 font-normal">
                TASTE
              </span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-heading-line text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-white">
              EXPERIENCE
            </h1>
          </div>
        </div>

        {/* Bottom Description & CTA */}
        <div className="mt-16 w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-8 hero-fade">
          <Link
            href="/reservations"
            className="bg-gold-500 hover:bg-gold-400 text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(197,168,55,0.3)] shrink-0"
          >
            Book A Table
          </Link>
          <p className="text-neutral-400 text-sm md:text-base max-w-sm text-center md:text-left leading-relaxed">
            Immerse yourself in a world of exquisite flavors, where every dish
            is an artisanal masterpiece crafted to elevate your dining experience.
          </p>
        </div>
      </div>
    </section>
  );
}
