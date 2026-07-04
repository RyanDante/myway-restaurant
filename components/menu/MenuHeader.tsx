"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import "@/lib/i18n"; // Ensure i18n is initialized on client

interface MenuHeaderProps {
  onLanguageChange: (lang: "en" | "fr") => void;
}

export function MenuHeader({ onLanguageChange }: MenuHeaderProps) {
  const { i18n } = useTranslation();

  const handleLangToggle = () => {
    const nextLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(nextLang);
    onLanguageChange(nextLang);
  };

  return (
    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
      <span className="text-xl font-serif font-black tracking-widest text-white uppercase">
        MyWay <span className="text-gold-500 font-sans font-bold">Menu</span>
      </span>
      <button
        onClick={handleLangToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 hover:border-gold-500 hover:text-black hover:bg-gold-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-350 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xl"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{i18n.language === "en" ? "Version Française" : "English Version"}</span>
      </button>
    </div>
  );
}
