"use client";

import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Grid, List, SlidersHorizontal, X } from "lucide-react";
import { type MenuItem } from "@/lib/constants";
import "@/lib/i18n";

interface MenuControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  suggestions: MenuItem[];
  handleSuggestionClick: (item: MenuItem) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  setFilterOpen: (open: boolean) => void;
  currentLang: "en" | "fr";
}

export function MenuControls({
  searchQuery,
  setSearchQuery,
  showSuggestions,
  setShowSuggestions,
  suggestions,
  handleSuggestionClick,
  viewMode,
  setViewMode,
  setFilterOpen,
  currentLang,
}: MenuControlsProps) {
  const { t } = useTranslation();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  return (
    <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-2xl justify-end">
      {/* Search Input Container */}
      <div ref={searchContainerRef} className="relative flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder={t("menu.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-neutral-950 border border-neutral-900 focus:border-gold-500/50 rounded-lg pl-10 pr-4 py-2 text-xs font-medium outline-none transition-colors text-white"
          />
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-neutral-600" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-2.5 text-neutral-600 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete suggestion popup dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-neutral-950 border border-neutral-900 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-40 max-h-60 overflow-y-auto">
            <div className="text-[10px] uppercase font-bold text-neutral-500 px-4 py-2 border-b border-neutral-900">
              {t("menu.suggestionHeader")}
            </div>
            {suggestions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSuggestionClick(item)}
                className="w-full text-left px-4 py-2.5 text-xs hover:bg-neutral-900 flex justify-between items-center transition-colors cursor-pointer"
              >
                <span className="font-semibold text-neutral-200">
                  {currentLang === "en" ? item.nameEn : item.nameFr}
                </span>
                <span className="text-gold-500 font-mono text-[10px]">
                  {item.price.toLocaleString()} XOF
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid vs List layout buttons */}
      <div className="flex items-center border border-neutral-900 rounded-lg overflow-hidden shrink-0">
        <button
          onClick={() => setViewMode("grid")}
          aria-label={t("menu.gridView")}
          className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
            viewMode === "grid" ? "bg-gold-500 text-black font-bold" : "bg-neutral-950 text-neutral-400 hover:text-white"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span className="hidden md:inline text-[10px]">{t("menu.gridView")}</span>
        </button>
        <button
          onClick={() => setViewMode("list")}
          aria-label={t("menu.listView")}
          className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider border-l border-neutral-900 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
            viewMode === "list" ? "bg-gold-500 text-black font-bold" : "bg-neutral-950 text-neutral-400 hover:text-white"
          }`}
        >
          <List className="w-4 h-4" />
          <span className="hidden md:inline text-[10px]">{t("menu.listView")}</span>
        </button>
      </div>

      {/* Filter trigger button */}
      <button
        onClick={() => setFilterOpen(true)}
        className="flex items-center gap-2 bg-neutral-950 border border-neutral-900 hover:border-gold-500 hover:text-gold-500 text-xs font-bold px-4 py-2.5 rounded-lg text-neutral-300 transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 cursor-pointer shadow-lg"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline">{t("menu.filterLabel")}</span>
      </button>
    </div>
  );
}
export default MenuControls;
