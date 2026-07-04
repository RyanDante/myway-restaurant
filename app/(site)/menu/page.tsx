"use client";

import React, { useEffect, useState } from "react";
import { type MenuItem } from "@/lib/constants";
import { MenuHeader } from "@/components/menu/MenuHeader";
import { MenuControls } from "@/components/menu/MenuControls";
import { CategoryBar } from "@/components/menu/CategoryBar";
import { FilterDrawer } from "@/components/menu/FilterDrawer";
import { MenuList } from "@/components/menu/MenuList";
import { useTranslation } from "react-i18next";
import "@/lib/i18n"; // Initialise i18n manager client-side

const categoryLabels: Record<string, { en: string; fr: string }> = {
  starters: { en: "Starters & Appetizers", fr: "Entrées & Hors-d'œuvres" },
  salads: { en: "Salads", fr: "Salades" },
  burgers: { en: "Burgers", fr: "Burgers" },
  pizzas: { en: "Pizzas", fr: "Pizzas" },
  pasta_rice: { en: "Pasta & Rice", fr: "Pâtes & Riz" },
  chicken: { en: "Chicken Dishes", fr: "Plats de Poulet" },
  beef_lamb: { en: "Beef, Pork & Lamb", fr: "Bœuf, Porc & Agneau" },
  seafood: { en: "Seafood", fr: "Fruits de Mer" },
  local: {
    en: "Local Specialities(cameroonian classics)",
    fr: "Spécialités Locales(classique du cameroun)",
  },
  desserts: { en: "Desserts", fr: "Desserts" },
  ice_cream: { en: "Ice Cream", fr: "Glaces" },
  fruit_juice: { en: "Natural Fruit Juice", fr: "Jus de Fruits Naturels" },
  cocktails_shakes: { en: "Cocktails & Shakes(alcoholic + mocktails)", fr: "Cocktails & Shakes" },
  wines_champagne: { en: "Wines & Champagne", fr: "Vins & Champagne" },
  non_alcoholic_beverages: { en: "Non-Alcoholic Beverages", fr: "Boissons Sans Alcool" },
  beers: { en: "Beers", fr: "Bières" },
  spirits_liqueurs: { en: "Spirits & Liqueurs", fr: "Spiritueux & Liqueurs" },
  drinks: { en: "Drinks & Cocktails", fr: "Boissons & Cocktails" },
};

export default function MenuPage() {
  const { t, i18n } = useTranslation();

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<"en" | "fr">("en");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("starters");

  // Filters state
  const [maxPrice, setMaxPrice] = useState<number>(18000);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  // Sync state language with i18n library
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentLang(i18n.language as "en" | "fr");
  }, [i18n.language]);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenu(data.data || []);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Intersection Observer for scroll spy functionality
  useEffect(() => {
    if (loading || menu.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-180px 0px -50% 0px", // Offset for sticky menu header
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const catId = entry.target.id.replace("category-", "");
          setActiveCategory(catId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const categoriesList = Object.keys(categoryLabels);

    categoriesList.forEach((catId) => {
      const element = document.getElementById(`category-${catId}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading, menu]);

  // Fuzzy matching check
  const fuzzyMatch = (text: string, query: string) => {
    if (!query) return true;
    const cleanText = text.toLowerCase();
    const cleanQuery = query.toLowerCase();

    if (cleanText.includes(cleanQuery)) return true;

    let queryIdx = 0;
    for (let textIdx = 0; textIdx < cleanText.length; textIdx++) {
      if (cleanText[textIdx] === cleanQuery[queryIdx]) {
        queryIdx++;
        if (queryIdx === cleanQuery.length) return true;
      }
    }
    return false;
  };

  // Autocomplete Suggestions
  const suggestions = searchQuery
    ? menu.filter(
        (item) =>
          fuzzyMatch(item.nameEn, searchQuery) ||
          fuzzyMatch(item.nameFr, searchQuery) ||
          fuzzyMatch(item.descriptionEn, searchQuery) ||
          fuzzyMatch(item.descriptionFr, searchQuery),
      )
    : [];

  const handleSuggestionClick = (item: MenuItem) => {
    setSearchQuery(currentLang === "en" ? item.nameEn : item.nameFr);
    setShowSuggestions(false);
  };

  // Filter Menu catalog list
  const filteredMenu = menu.filter((item) => {
    const nameMatch = currentLang === "en" ? item.nameEn : item.nameFr;
    const descMatch =
      currentLang === "en" ? item.descriptionEn : item.descriptionFr;
    const textMatch =
      fuzzyMatch(nameMatch, searchQuery) || fuzzyMatch(descMatch, searchQuery);

    const priceMatch = item.price <= maxPrice;

    const dietaryMatch =
      selectedDietary.length === 0 ||
      (item.dietary &&
        selectedDietary.every((tag) => item.dietary?.includes(tag)));

    return textMatch && priceMatch && dietaryMatch;
  });

  const toggleDietaryFilter = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleCategoryScroll = (catId: string) => {
    const element = document.getElementById(`category-${catId}`);
    if (element) {
      const offset = 160; // Offset spacing for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const categories = Object.keys(categoryLabels);

  return (
    <div className="min-h-screen bg-black text-white relative pt-24 pb-16">
      {/* Sticky Header Nav Controls */}
      <div className="sticky top-[72px] z-30 w-full bg-black/95 border-b border-neutral-900 backdrop-blur-md py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo and Language switcher */}
            <MenuHeader
              onLanguageChange={(newLang) => setCurrentLang(newLang)}
            />

            {/* Layout view controls and Search inputs */}
            <MenuControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
              viewMode={viewMode}
              setViewMode={setViewMode}
              setFilterOpen={setFilterOpen}
              currentLang={currentLang}
            />
          </div>

          {/* Horizontal food Category scroll Bar */}
          <CategoryBar
            categories={categories}
            categoryLabels={categoryLabels}
            currentLang={currentLang}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryScroll}
          />
        </div>
      </div>

      {/* Main List Body */}
      <div className="max-w-7xl mx-auto px-6 mt-12 w-full">
        {loading ? (
          <div className="text-center py-20 text-neutral-500 text-sm tracking-widest uppercase">
            {t("menu.loading")}
          </div>
        ) : (
          <MenuList
            filteredMenu={filteredMenu}
            categories={categories}
            categoryLabels={categoryLabels}
            currentLang={currentLang}
            viewMode={viewMode}
            noItemsText={t("menu.noItems")}
          />
        )}
      </div>

      {/* Slide-out Filters Drawer Panel */}
      <FilterDrawer
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedDietary={selectedDietary}
        toggleDietaryFilter={toggleDietaryFilter}
        clearAllFilters={() => {
          setMaxPrice(18000);
          setSelectedDietary([]);
        }}
      />
    </div>
  );
}
