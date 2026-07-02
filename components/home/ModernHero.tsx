"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaAward} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function ModernHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Micro-banner rating entry
      gsap.fromTo(
        ".hero-rating-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 },
      );

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
        duration: 12, // Slightly slowed down for better text readability
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

      // Entry animation for floating cards
      gsap.fromTo(
        [".float-card-1", ".float-card-2"],
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.5)",
          delay: 0.8,
          stagger: 0.2,
        },
      );

      // Idle floating animation on inner cards
      gsap.to(".float-card-inner-1", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-card-inner-2", {
        y: 12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax Scroll Motion using ScrollTrigger on outer cards
      gsap.to(".float-card-1", {
        yPercent: -45,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".float-card-2", {
        yPercent: 45,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
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
      className="relative w-full min-h-[95vh] flex flex-col items-center justify-center pt-36 pb-16 overflow-hidden bg-background"
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

      {/* Floating social proof divs */}
      <div className="absolute top-[12%] left-[3%] md:left-[10%] lg:left-[15%] z-25 float-card-1 pointer-events-none md:pointer-events-auto">
        <div className="float-card-inner-1 px-5 py-3.5 rounded-2xl bg-black/40 border border-gold-500/20 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3.5 transition-all duration-300 hover:border-gold-500/40 hover:bg-black/60">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500/10 text-gold-500 shadow-[0_0_15px_rgba(197,168,55,0.2)]">
             <FaStar color="#ffc107" size={30} />
          </div>
          <div>
            <div className="text-white font-black text-sm tracking-wide">
              4.5 / 5.0 Rating
            </div>
            <div className="text-neutral-400 text-[10px] font-bold tracking-wider uppercase">
              Average rating score
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[10%] right-[1%] md:right-[10%] lg:right-[15%] z-25 float-card-2 pointer-events-none md:pointer-events-auto">
        <div className="float-card-inner-2 px-5 py-3.5 rounded-2xl bg-black/40 border border-gold-500/20 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3.5 transition-all duration-300 hover:border-gold-500/40 hover:bg-black/60">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <FaAward color="#10b981" size={30} />
          </div>
          <div>
            <div className="text-white font-black text-sm tracking-wide">
              Ranked #2 in Buea
            </div>
            <div className="text-neutral-400 text-[10px] font-bold tracking-wider uppercase">
              tripadvisor.com
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Rotating SVG Badge with Explicit Circle Path */}
        <div className="absolute -top-40 mt-15 md:-top-32 z-20 w-48 h-48 md:w-64 md:h-64 rotating-badge flex items-center justify-center drop-shadow-2xl pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            className="w-10 h-10 text-gold-500 fill-current"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill=""
            />
            <text
              fontSize="4"
              fontWeight="bold"
              letterSpacing="0.6"
              className="tracking-widest"
            >
              {/* <textPath href="#circlePath" startOffset="0%">
                ★ 4.5/5 TOP RATED • #2 TRIPADVISOR BUEA • MYWAY RESTAURANT •
              </textPath> */}
            </text>
          </svg>
        </div>

        {/* Main Massive Typography */}
        <div className="text-center w-full flex flex-col items-center mt-4 perspective-1000">
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
        <div className="mt-8 md:mt-16 w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 hero-fade">
          <Link
            href="/reservations"
            className="w-full sm:w-auto text-center bg-gold-500 hover:bg-gold-400 text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(197,168,55,0.3)] shrink-0"
          >
            Book A Table
          </Link>
        </div>
      </div>
    </section>
  );
}
