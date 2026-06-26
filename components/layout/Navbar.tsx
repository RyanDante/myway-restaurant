'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="w-full bg-black/90 border-b border-gold-500/20 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-bold tracking-widest text-gold-500 hover:text-gold-400 transition-colors">
          {RESTAURANT_INFO.name.toUpperCase()}
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wider hover:text-gold-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/reservations"
            className="border border-gold-500 hover:bg-gold-500 hover:text-black text-gold-500 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 transition-all duration-300"
          >
            Book Table
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gold-500 hover:text-gold-400 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-gold-500/20 px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base tracking-wider hover:text-gold-500 transition-colors py-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/reservations"
            onClick={() => setIsOpen(false)}
            className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black text-center text-sm font-semibold tracking-widest uppercase px-5 py-3 transition-all duration-300 w-full block"
          >
            Book Table
          </Link>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
