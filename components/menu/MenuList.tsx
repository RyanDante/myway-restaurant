"use client";

import React, { useState } from "react";
import { type MenuItem } from "@/lib/constants";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface MenuListProps {
  filteredMenu: MenuItem[];
  categories: string[];
  categoryLabels: Record<string, { en: string; fr: string }>;
  currentLang: "en" | "fr";
  viewMode: "grid" | "list";
  noItemsText: string;
}

export function MenuList({
  filteredMenu,
  categories,
  categoryLabels,
  currentLang,
  viewMode,
}: MenuListProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const closeDetailModal = () => setSelectedItem(null);

  // Generate WhatsApp order message link
  const getWhatsAppLink = (item: MenuItem) => {
    const itemName = currentLang === "en" ? item.nameEn : item.nameFr;
    const imageUrl = getCloudinaryImageUrl(item.image || "logo");
    const msg = encodeURIComponent(
      `Hello MyWay, I would like to order the delicious:\n\n*${itemName}*\nPrice: *${item.price.toLocaleString()} XOF*\n\nPreview Image: ${imageUrl}`,
    );
    return `https://wa.me/237651371800?text=${msg}`;
  };

  return (
    <div className="space-y-24">
      {categories.map((catId) => {
        const itemsInCategory = filteredMenu.filter(
          (item) => item.category === catId,
        );
        if (itemsInCategory.length === 0) return null;

        return (
          <div key={catId} id={`category-${catId}`} className="scroll-mt-40">
            {/* Category Header */}
            <div className="mb-10 text-center">
              <SectionLabel>{categoryLabels[catId][currentLang]}</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
                {categoryLabels[catId][currentLang]}
              </h2>
              <GoldDivider
                variant="diamond"
                className="max-w-xs mx-auto mt-3"
              />
            </div>

            {/* Grid layout */}
            {viewMode === "grid" ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {itemsInCategory.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group bg-neutral-900/40 border border-neutral-900 hover:border-gold-500/30 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
                  >
                    <OptimizedImage
                      src={getCloudinaryImageUrl(item.image || "logo")}
                      alt={currentLang === "en" ? item.nameEn : item.nameFr}
                      width={400}
                      height={250}
                      containerClassName="w-full aspect-[4/3]"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <h3 className="text-base font-bold text-white tracking-wide group-hover:text-gold-500 transition-colors duration-300">
                            {currentLang === "en" ? item.nameEn : item.nameFr}
                          </h3>
                          <span className="text-gold-500 font-mono text-sm font-bold shrink-0">
                            {item.price.toLocaleString()} XOF
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed mb-4 line-clamp-3">
                          {currentLang === "en"
                            ? item.descriptionEn
                            : item.descriptionFr}
                        </p>
                      </div>

                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 border-t border-neutral-900/60 pt-4">
                          {item.dietary.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] bg-neutral-950 border border-neutral-850 text-gold-500/80 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* List layout */
              <motion.div layout className="max-w-4xl mx-auto space-y-6">
                {itemsInCategory.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-neutral-900/20 border border-neutral-900/60 hover:border-gold-500/20 p-4 rounded-xl flex gap-6 items-center hover:bg-neutral-900/40 transition-all duration-300 cursor-pointer group"
                  >
                    <OptimizedImage
                      src={getCloudinaryImageUrl(item.image || "logo")}
                      alt={currentLang === "en" ? item.nameEn : item.nameFr}
                      width={150}
                      height={100}
                      containerClassName="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-neutral-850"
                      className="object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-gold-500 transition-colors duration-300 truncate pr-4">
                          {currentLang === "en" ? item.nameEn : item.nameFr}
                        </h3>
                        <div className="hidden sm:block border-b border-dotted border-neutral-800 flex-1 mx-4 h-px" />
                        <span className="text-xs sm:text-sm font-bold text-gold-500 font-mono shrink-0">
                          {item.price.toLocaleString()} XOF
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400 font-light line-clamp-2 leading-relaxed">
                        {currentLang === "en"
                          ? item.descriptionEn
                          : item.descriptionFr}
                      </p>
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {item.dietary.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] bg-neutral-950 border border-neutral-850 text-gold-500/80 px-2.5 py-0.5 rounded text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        );
      })}

      {/* Item Detail Overlay Modal Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDetailModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative bg-neutral-950 border border-neutral-800 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
            >
              {/* Close Button overlay */}
              <button
                onClick={closeDetailModal}
                className="absolute top-4 right-4 bg-black/60 hover:bg-gold-500 hover:text-black border border-neutral-850 hover:border-gold-500 text-neutral-400 p-2 rounded-full transition-all duration-300 cursor-pointer z-20"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Image container */}
              <div className="w-full md:w-1/2 aspect-4/3 md:aspect-auto relative bg-neutral-900">
                <OptimizedImage
                  src={getCloudinaryImageUrl(selectedItem.image || "logo")}
                  alt={
                    currentLang === "en"
                      ? selectedItem.nameEn
                      : selectedItem.nameFr
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  containerClassName="absolute inset-0 w-full h-full"
                  className="object-cover"
                />
              </div>

              {/* Product Info description */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between gap-6">
                <div>
                  <span className="text-[10px] text-gold-500 uppercase tracking-widest font-bold">
                    {selectedItem.category.replace("_", " ")}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase mt-2 tracking-wide">
                    {currentLang === "en"
                      ? selectedItem.nameEn
                      : selectedItem.nameFr}
                  </h3>
                  <div className="text-gold-500 font-mono font-bold text-lg mt-2">
                    {selectedItem.price.toLocaleString()} XOF
                  </div>

                  <GoldDivider variant="solid" className="my-4 opacity-30" />

                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {currentLang === "en"
                      ? selectedItem.descriptionEn
                      : selectedItem.descriptionFr}
                  </p>

                  {/* Dietary tags */}
                  {selectedItem.dietary && selectedItem.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {selectedItem.dietary.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-neutral-900 border border-neutral-800 text-gold-500/80 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-900">
                  <a
                    href={getWhatsAppLink(selectedItem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <FaWhatsapp className="w-8 h-8 text-white pl-3" />
                    {currentLang === "en"
                      ? "Order on WhatsApp"
                      : "Commander sur WhatsApp"}
                  </a>
                  <Link
                    href={`/reservations?preorder=${selectedItem.id}`}
                    onClick={closeDetailModal}
                    className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-gold-500/10 border border-gold-500 text-gold-500 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    {currentLang === "en" ? "Book Table" : "Réserver"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default MenuList;
