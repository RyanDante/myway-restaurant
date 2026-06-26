"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Utensils,
  Pizza,
  Flame,
  Coffee,
  Wine,
  UtensilsCrossed,
  Leaf,
} from "lucide-react";

const categories = [
  { name: "BURGER", icon: Utensils },
  { name: "PIZZA", icon: Pizza },
  { name: "GRILL", icon: Flame },
  { name: "CAFE", icon: Coffee },
  { name: "WINES", icon: Wine },
  { name: "PASTA", icon: UtensilsCrossed },
  { name: "SALAD", icon: Leaf },
];

export function CategoryBar() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="w-full border-y border-neutral-800 bg-neutral-950/50 py-6 overflow-hidden relative pointer-events-none select-none"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `,
        }}
      />

      <div className="marquee-track hide-scrollbar">
        {/* Track 1 */}
        <div className="flex items-center gap-16 pr-16">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={`t1-${i}`}
                className="category-item flex items-center gap-2 shrink-0"
              >
                <Icon className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 italic">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Duplicate for infinite seamless loop) */}
        <div className="flex items-center gap-16 pr-16" aria-hidden="true">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={`t2-${i}`}
                className="category-item flex items-center gap-2 shrink-0"
              >
                <Icon className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 italic">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
