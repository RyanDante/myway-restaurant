"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const images = [
  { src: getCloudinaryImageUrl("steak"), alt: "Chef preparing dish" },
  {
    src: getCloudinaryImageUrl("twin_cocktail"),
    alt: "Gourmet meal",
  },
  {
    src: getCloudinaryImageUrl("salmon"),
    alt: "Fine dining plate",
  },
];

export function ShowcaseGrid() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".showcase-img", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full max-w-7xl mx-auto px-6 py-24 bg-background"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            className={`showcase-img relative w-full h-100 overflow-hidden ${i === 1 ? "md:-mt-12" : ""}`}
          >
            <OptimizedImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              containerClassName="absolute inset-0"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* Dark gradient overlay for luxury feel */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 z-1" />
          </div>
        ))}
      </div>
    </section>
  );
}
