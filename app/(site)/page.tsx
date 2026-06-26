import React from 'react';
import { ModernHero } from '@/components/home/ModernHero';
import { CategoryBar } from '@/components/home/CategoryBar';
import { ShowcaseGrid } from '@/components/home/ShowcaseGrid';
import { AboutSection } from '@/components/home/AboutSection';
import { PremiumGallery } from '@/components/home/PremiumGallery';
import { FAQSection } from '@/components/home/FAQSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      <ModernHero />
      <CategoryBar />
      <ShowcaseGrid />
      <AboutSection />
      <PremiumGallery />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}
