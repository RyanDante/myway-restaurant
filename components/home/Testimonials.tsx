"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const reviews = [
  {
    name: "Dr. Julius Ebini",
    role: "University Professor",
    rating: 5,
    comment:
      "The lamb chops at MyWay Buea are culinary perfection. Extremely tender, flawlessly seasoned, and served with a degree of elegance that is rare to find. Easily the best dining spot in the region.",
    date: "June 2026",
  },
  {
    name: "Sarah Enow",
    role: "Food Connoisseur & Blogger",
    rating: 5,
    comment:
      "A magnificent addition to Buea's dining scene. The Wagyu Ribeye A5 is absolutely worth it—meltingly tender. The luxury gold accent aesthetics and ambient lighting create a truly premium atmosphere.",
    date: "May 2026",
  },
  {
    name: "Marcelle Tcham",
    role: "Tech Consultant",
    rating: 5,
    comment:
      "Excellent client service, fast Wi-Fi, and top-tier pizza. It's the perfect environment for both business dinners and private celebrations. I highly recommend their custom cocktails.",
    date: "April 2026",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Title fade in
      gsap.fromTo(
        ".review-title-elem",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // Mobile cards reveal
      gsap.fromTo(
        ".review-card-mobile",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reviews-mobile-list",
            start: "top 85%",
          },
        },
      );

      // Desktop marquee container reveal
      gsap.fromTo(
        ".reviews-marquee-container",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reviews-marquee-container",
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 relative bg-neutral-950 overflow-hidden border-t border-neutral-900"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[30%] bottom-[-20%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="review-title-elem">
            <SectionLabel>Client Testimonials</SectionLabel>
          </div>
          <h2 className="review-title-elem text-3xl md:text-5xl font-black text-white uppercase tracking-wider mb-6">
            Voices of{" "}
            <span className="text-gold-500 italic font-serif lowercase">
              Satisfaction
            </span>
          </h2>
          <div className="review-title-elem">
            <GoldDivider variant="diamond" className="max-w-xs mx-auto" />
          </div>
        </div>

        {/* Mobile View: Vertical stack list (showing 3 reviews) */}
        <div className="reviews-mobile-list md:hidden flex flex-col gap-6">
          {reviews.slice(0, 3).map((rev, i) => (
            <div
              key={i}
              className="review-card-mobile bg-black/40 border border-neutral-900 p-8 rounded-2xl relative flex flex-col justify-between backdrop-blur-sm"
            >
              <Quote className="absolute top-6 right-8 w-8 h-8 text-neutral-900/60 pointer-events-none" />
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 text-gold-500 fill-gold-500"
                    />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm font-light leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="border-t border-neutral-900 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-xs tracking-wide">
                    {rev.name}
                  </h4>
                  <p className="text-neutral-500 text-[10px] font-medium mt-0.5">
                    {rev.role}
                  </p>
                </div>
                <span className="text-neutral-600 text-[9px] uppercase font-bold tracking-wider">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Infinite Marquee Row */}
        <div className="reviews-marquee-container hidden md:block overflow-hidden w-full relative py-4">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-neutral-950 via-neutral-950/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-neutral-950 via-neutral-950/80 to-transparent z-20 pointer-events-none" />

          <div className="animate-marquee flex gap-8">
            {/* Repeat reviews to fill space and enable seamless sliding */}
            {[...reviews, ...reviews, ...reviews, ...reviews].map((rev, i) => (
              <div
                key={i}
                className="review-card w-[420px] shrink-0 group bg-black/40 border border-neutral-900 hover:border-gold-500/30 p-8 rounded-2xl relative flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
              >
                <Quote className="absolute top-6 right-8 w-10 h-10 text-neutral-900 group-hover:text-gold-500/5 transition-colors duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-gold-500 fill-gold-500"
                      />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-sm font-light leading-relaxed italic mb-8">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="border-t border-neutral-900 pt-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">
                      {rev.name}
                    </h4>
                    <p className="text-neutral-500 text-xs font-medium mt-0.5">
                      {rev.role}
                    </p>
                  </div>
                  <span className="text-neutral-600 text-[10px] uppercase font-bold tracking-wider">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
