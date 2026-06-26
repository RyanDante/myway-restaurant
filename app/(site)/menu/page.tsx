'use client';

import React, { useEffect, useState } from 'react';
import { type MenuItem } from '@/lib/constants';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        setMenu(data.data || []);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const categories = ['all', 'starters', 'mains', 'desserts', 'wines', 'drinks'];

  const filteredMenu = activeCategory === 'all'
    ? menu
    : menu.filter((item) => item.category === activeCategory);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Gastronomy</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Our Culinary Selection
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-gold-500 border-gold-500 text-black'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      {loading ? (
        <div className="text-center text-neutral-500 text-sm">Loading delicacies...</div>
      ) : filteredMenu.length === 0 ? (
        <div className="text-center text-neutral-500 text-sm">No items found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start gap-4 pb-6 border-b border-neutral-900"
            >
              <div className="flex-1">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-base font-bold text-white tracking-wide">{item.name}</h3>
                  <div className="border-b border-dotted border-neutral-800 flex-1 mx-4 h-[1px]"></div>
                  <span className="text-base font-semibold text-gold-500">${item.price}</span>
                </div>
                <p className="text-xs text-neutral-400 font-light pr-8">{item.description}</p>
                {item.dietary && item.dietary.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {item.dietary.map((diet) => (
                      <span
                        key={diet}
                        className="text-[10px] bg-neutral-900 border border-neutral-800 text-gold-500/80 px-2 py-0.5"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
