"use client";

import React, { useRef, useEffect } from "react";

interface CategoryBarProps {
  categories: string[];
  categoryLabels: Record<string, { en: string; fr: string }>;
  currentLang: "en" | "fr";
  activeCategory?: string;
  onCategoryClick: (catId: string) => void;
}

export function CategoryBar({
  categories,
  categoryLabels,
  currentLang,
  activeCategory,
  onCategoryClick,
}: CategoryBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the CategoryBar container to center the active category button
  useEffect(() => {
    if (!activeCategory) return;
    const activeButton = document.getElementById(`btn-category-${activeCategory}`);
    if (activeButton && containerRef.current) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1 border-t border-neutral-900/60 pt-3 w-full"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((catId) => {
        const isActive = activeCategory === catId;
        return (
          <button
            key={catId}
            id={`btn-category-${catId}`}
            onClick={() => onCategoryClick(catId)}
            className={`shrink-0 text-xs md:text-sm font-bold tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer border ${
              isActive
                ? "bg-gold-500 border-gold-500 text-black shadow-lg shadow-gold-500/10 scale-105"
                : "bg-neutral-950/60 border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            {categoryLabels[catId][currentLang]}
          </button>
        );
      })}
    </div>
  );
}
export default CategoryBar;
