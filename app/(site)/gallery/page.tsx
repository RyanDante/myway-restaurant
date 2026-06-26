import React from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { video } from "framer-motion/client";

export default function GalleryPage() {
  // Placeholder images using high-quality Unsplash URLs for food/restaurants
  const galleryItems = [
    {
      id: 1,
      title: "Fine Plating",
      category: "Food",
      url: "/images/fine_plating.jpg",
    },
    {
      id: 2,
      title: "Luxury Ambiance",
      category: "Interior",
      url: "/images/interior.png",
    },
    {
      id: 3,
      title: "Master Chef Selection",
      category: "Food",
      url: "/images/masterchef.jpeg",
    },
    {
      id: 4,
      title: "The Lounge",
      category: "Interior",
      url: "/images/interior_lounge.jpeg",
    },
    {
      id: 5,
      title: "Wine Cellar",
      category: "Drinks",
      url: "/images/wine_cellar.jpeg",
    },
    {
      id: 6,
      title: "Signature Dessert",
      category: "Food",
      url: "/images/desert1.jpeg",
    },
    {
      id: 7,
      title: "Welcoming",
      category: "exterior",
      url: "/images/exterior.jpeg",
    },
    {
      id: 8,
      title: "Luxury Ambiance",
      category: "drink",
      url: "/images/cocktail_mix.jpeg",
    },
    {
      id: 9,
      title: "5 Star Chef",
      category: "Chef",
      url: "/images/chef.png",
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
            {/* Image Placeholder */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.url})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

            {/* Meta */}
            <div className="relative z-10 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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
