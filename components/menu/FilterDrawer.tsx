"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal, X, Check } from "lucide-react";
import "@/lib/i18n";

interface FilterDrawerProps {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedDietary: string[];
  toggleDietaryFilter: (tag: string) => void;
  clearAllFilters: () => void;
}

export function FilterDrawer({
  filterOpen,
  setFilterOpen,
  maxPrice,
  setMaxPrice,
  selectedDietary,
  toggleDietaryFilter,
  clearAllFilters,
}: FilterDrawerProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        filterOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Dim background overlay */}
      <div
        onClick={() => setFilterOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Panel Drawer container */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-neutral-950 border-l border-neutral-900 p-8 shadow-2xl transition-transform duration-500 flex flex-col justify-between ${
          filterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-neutral-900 pb-4">
            <h3 className="text-lg font-bold tracking-wider uppercase text-white flex items-center gap-2.5">
              <SlidersHorizontal className="w-5 h-5 text-gold-500" />
              {t("menu.filterTitle")}
            </h3>
            <button
              onClick={() => setFilterOpen(false)}
              className="text-neutral-500 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slider Price range */}
          <div className="mb-8 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t("menu.priceRange")}
            </h4>
            <div className="flex justify-between text-xs font-mono text-gold-500 font-semibold">
              <span>1,000 XOF</span>
              <span>{maxPrice.toLocaleString()} XOF</span>
            </div>
            <input
              type="range"
              min="1000"
              max="18000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
          </div>

          {/* Tag Selection list */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t("menu.dietaryLabel")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { tag: "Vegetarian", label: t("menu.vegetarian") },
                { tag: "Vegan", label: t("menu.vegan") },
                { tag: "Gluten-Free", label: t("menu.glutenFree") },
                { tag: "Seafood", label: t("menu.seafood") },
                {
                  tag: "Cameroonian Classic",
                  label: t("menu.cameroonianClassics"),
                },
              ].map((item) => {
                const isChecked = selectedDietary.includes(item.tag);
                return (
                  <button
                    key={item.tag}
                    onClick={() => toggleDietaryFilter(item.tag)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border text-xs font-semibold transition-all duration-300 text-left cursor-pointer ${
                      isChecked
                        ? "bg-gold-500/10 border-gold-500/40 text-gold-500"
                        : "bg-neutral-950 border-neutral-900 text-neutral-400 hover:border-neutral-850 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <div
                      className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-gold-500 border-gold-500 text-black"
                          : "border-neutral-800 bg-black/40"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reset buttons */}
        <div className="border-t border-neutral-900 pt-6">
          <button
            onClick={clearAllFilters}
            className="w-full py-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-bold uppercase tracking-widest text-xs rounded-lg transition-colors cursor-pointer"
          >
            {t("menu.clearFilters")}
          </button>
        </div>
      </div>
    </div>
  );
}
export default FilterDrawer;
