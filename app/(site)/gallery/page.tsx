"use client";

import React from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Fine Plating",
      category: "Food",
      url: getCloudinaryImageUrl("fine_plating"),
    },
    {
      id: 2,
      title: "Luxury Ambiance",
      category: "Interior",
      url: getCloudinaryImageUrl("interior"),
    },
    {
      id: 3,
      title: "Master Chef Selection",
      category: "Food",
      url: getCloudinaryImageUrl("masterchef"),
    },
    {
      id: 4,
      title: "The Lounge",
      category: "Interior",
      url: getCloudinaryImageUrl("interior_lounge"),
    },
    {
      id: 5,
      title: "Wine Cellar",
      category: "Drinks",
      url: getCloudinaryImageUrl("wine_cellar"),
    },
    {
      id: 6,
      title: "Signature Dessert",
      category: "Food",
      url: getCloudinaryImageUrl("desert1"),
    },
    {
      id: 7,
      title: "Welcoming",
      category: "exterior",
      url: getCloudinaryImageUrl("exterior"),
    },
    {
      id: 8,
      title: "Luxury Ambiance",
      category: "drink",
      url: getCloudinaryImageUrl("cocktail_mix"),
    },
    {
      id: 9,
      title: "5 Star Chef",
      category: "Chef",
      url: getCloudinaryImageUrl("chef"),
    },
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Visual Journey</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Our Gallery
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden bg-neutral-900 border border-neutral-800 aspect-video md:aspect-square flex flex-col justify-end"
          >
            {/* Optimized Image with skeleton */}
            <OptimizedImage
              src={item.url}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              containerClassName="absolute inset-0"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300 z-1" />

            {/* Meta */}
            <div className="relative z-2 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[10px] text-gold-500 uppercase tracking-widest font-semibold">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-white tracking-wider uppercase mt-1">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
