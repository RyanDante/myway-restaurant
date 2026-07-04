import React from "react";
import Link from "next/link";
import { FaInstagram,FaFacebook, FaTiktok } from 'react-icons/fa';
import { RESTAURANT_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand & Tagline */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold tracking-widest text-gold-500">
            {RESTAURANT_INFO.name.toUpperCase()}
          </h2>
          <p className="text-sm text-neutral-400 max-w-xs font-light italic">
            &ldquo;{RESTAURANT_INFO.tagline}&rdquo;
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href={RESTAURANT_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-gold-500 transition-colors text-sm"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href={RESTAURANT_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-gold-500 transition-colors text-sm"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href={RESTAURANT_INFO.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-gold-500 transition-colors text-sm"
            >
             <FaTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Hours & Contact */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold tracking-widest uppercase text-gold-500">
            Hours & Location
          </h3>
          <div className="text-sm text-neutral-400 space-y-2 font-light">
            <p>Mon: Closed</p>
            <p>Tue - Fri: {RESTAURANT_INFO.hours.weekdays}</p>
            <p>Sat - Sun: {RESTAURANT_INFO.hours.weekends}</p>
            <p className="pt-2">{RESTAURANT_INFO.address}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold tracking-widest uppercase text-gold-500">
            Reservations
          </h3>
          <div className="text-sm text-neutral-400 space-y-2 font-light">
            <p>Phone: {RESTAURANT_INFO.phone}</p>
            <p>Email: {RESTAURANT_INFO.email}</p>
            <p className="pt-2">
              <Link
                href="/reservations"
                className="text-gold-500 hover:underline"
              >
                Book a table online
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
        <p>
          &copy; {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights
          reserved.
        </p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-neutral-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-neutral-300">
            Terms of Service
          </Link>
          <Link href="/accessibility" className="hover:text-neutral-300">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
