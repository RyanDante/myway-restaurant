import React from 'react';
import Link from 'next/link';
import { FALLBACK_MENU } from '@/lib/constants';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function HomePage() {
  const featuredItems = FALLBACK_MENU.filter((item) => item.featured);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-zinc-950 px-6 py-24 text-center border-b border-neutral-900">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionLabel>Welcome to MyWay</SectionLabel>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 uppercase">
            A Symphony of <span className="text-gold-500 font-serif">Luxury</span> & Taste
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 font-light mb-8 max-w-xl">
            Indulge in an exquisite culinary journey where masterfully crafted dishes meet premium ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/reservations"
              className="bg-gold-500 hover:bg-gold-600 text-black text-xs font-bold tracking-widest uppercase px-8 py-4 transition-all duration-300"
            >
              Book A Table
            </Link>
            <Link
              href="/menu"
              className="border border-neutral-700 hover:border-gold-500 hover:text-gold-500 text-white text-xs font-bold tracking-widest uppercase px-8 py-4 transition-all duration-300"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <SectionLabel>Chef Specials</SectionLabel>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-white">
            Signature Delicacies
          </h2>
          <GoldDivider variant="diamond" className="max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between hover:border-gold-500/50 transition-all duration-300"
            >
              <div>
                <span className="text-xs text-gold-500 font-semibold tracking-wider uppercase block mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                <p className="text-sm text-neutral-400 font-light mb-4">{item.description}</p>
              </div>
              <div className="flex justify-between items-center border-t border-neutral-800 pt-4">
                <span className="text-xs text-neutral-400">
                  {item.dietary?.join(', ') || 'Standard'}
                </span>
                <span className="text-lg font-semibold text-gold-500">${item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="text-xs text-gold-500 hover:text-gold-400 font-semibold tracking-widest uppercase border-b border-gold-500/50 pb-1"
          >
            View Full Menu &rarr;
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-neutral-950 border-t border-b border-neutral-900 w-full text-center">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Our Philosophy</SectionLabel>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-white mb-6">
            Crafted with Passion
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light mb-6">
            At MyWay, culinary art is more than just flavor. It is a sensory dining experience designed to leave lasting impressions. From local organic vegetables to grade A5 Wagyu beef, every ingredient is selected with absolute precision.
          </p>
          <Link
            href="/about"
            className="text-xs text-gold-500 hover:text-gold-400 font-semibold tracking-widest uppercase border-b border-gold-500/50 pb-1"
          >
            Our Story &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
