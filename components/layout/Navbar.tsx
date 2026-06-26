"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-[0.2em] text-white hover:text-gold-400 transition-colors duration-300 uppercase flex items-center justify-center"
        >
          <Image
            src="/images/logo.png"
            alt="Restaurant Logo"
            width={150}
            height={150}
            className="w-16 h-16 object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-sm font-medium tracking-widest text-neutral-300 hover:text-white transition-colors duration-300 uppercase"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-gold-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
            </Link>
          ))}
          <Link
            href="/reservations"
            className="group relative overflow-hidden border border-gold-500 text-gold-500 text-xs font-bold tracking-widest uppercase px-6 py-2.5 transition-all duration-300 hover:text-black"
          >
            <span className="relative z-10">Book Table</span>
            <span className="absolute inset-0 w-full h-full bg-gold-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 text-white hover:text-gold-400 focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-0 left-0 w-full bg-neutral-950 flex flex-col items-center justify-center space-y-8 overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif tracking-widest text-white hover:text-gold-500 transition-colors uppercase"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.1 }}
              className="pt-8"
            >
              <Link
                href="/reservations"
                onClick={() => setIsOpen(false)}
                className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black text-center text-sm font-bold tracking-widest uppercase px-10 py-4 transition-all duration-300 block"
              >
                Book Table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
