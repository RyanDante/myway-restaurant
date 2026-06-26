import React from 'react';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function GalleryPage() {
  // Placeholder images using high-quality Unsplash URLs for food/restaurants
  const galleryItems = [
    {
      id: 1,
      title: 'Fine Plating',
      category: 'Food',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      title: 'Luxury Ambiance',
      category: 'Interior',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      title: 'Master Chef Selection',
      category: 'Food',
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 4,
      title: 'The Lounge',
      category: 'Interior',
      url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 5,
      title: 'Wine Cellar',
      category: 'Drinks',
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60',
    },
    {
      id: 6,
      title: 'Signature Dessert',
      category: 'Food',
      url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=60',
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
