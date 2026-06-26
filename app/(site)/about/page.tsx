import React from 'react';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function AboutPage() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Heritage</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Our Story
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
      </div>

      <div className="max-w-3xl mx-auto space-y-12 text-center">
        {/* Heritage Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
            Origins of Elegance
          </h2>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Established in the heart of the culinary world, MyWay was founded on a simple vision: to blend traditional classic techniques with modern Gastronomy. We strive to provide our patrons with a luxurious, warm space to celebrate life&apos;s special moments over remarkable food.
          </p>
        </div>

        <GoldDivider variant="gradient" className="max-w-xs mx-auto" />

        {/* Chef Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
            Master Chef Ryan Dante
          </h2>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Leading our kitchen is world-renowned Chef Ryan Dante. With over two decades of fine dining experience in Michelin-starred institutions across Paris, Tokyo, and New York, Chef Dante brings a curated, boundary-pushing philosophy to our seasonal menus.
          </p>
        </div>

        <GoldDivider variant="gradient" className="max-w-xs mx-auto" />

        {/* Accolades Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
            Accolades & Philosophy
          </h2>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            We use only sustainably sourced seafood, organic local produce, and premium imported ingredients to ensure absolute freshness. Our dedication to consistency and perfection has earned us recognition among critics and diners alike.
          </p>
        </div>
      </div>
    </div>
  );
}
