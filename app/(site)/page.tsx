import React from 'react';
import { ModernHero } from '@/components/home/ModernHero';
import { CategoryBar } from '@/components/home/CategoryBar';
import { ShowcaseGrid } from '@/components/home/ShowcaseGrid';
import { AboutSection } from '@/components/home/AboutSection';
import { PremiumGallery } from '@/components/home/PremiumGallery';
import { FAQSection } from '@/components/home/FAQSection';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "MyWay Restaurant",
    "image": [
      "https://res.cloudinary.com/dplbjvow2/image/upload/c_fill,w_800,h_600/v1719700000/showcase_interior",
      "https://res.cloudinary.com/dplbjvow2/image/upload/c_fill,w_800,h_600/v1719700000/fine_plating",
      "https://res.cloudinary.com/dplbjvow2/image/upload/c_fill,w_800,h_600/v1719700000/outdoor_terrace"
    ],
    "@id": "https://myway-restaurant.vercel.app/#restaurant",
    "url": "https://myway-restaurant.vercel.app",
    "telephone": "+237651371800",
    "priceRange": "$$",
    "menu": "https://myway-restaurant.vercel.app/menu",
    "acceptsReservations": "True",
    "servesCuisine": ["Italian", "French", "Cameroonian", "Steaks", "Pizza", "Burgers"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Molyko, UB Junction, Lacave Building",
      "addressLocality": "Buea",
      "addressRegion": "Southwest Region",
      "addressCountry": "CM"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 4.1539,
      "longitude": 9.2435
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "12:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "12:00",
        "closes": "00:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/myway_restaurant",
      "https://facebook.com/myway_restaurant",
      "https://www.tiktok.com/@myway.restaurant"
    ]
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Structured Local Business SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModernHero />
      <CategoryBar />
      <ShowcaseGrid />
      <AboutSection />
      <PremiumGallery />
      <FAQSection />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
