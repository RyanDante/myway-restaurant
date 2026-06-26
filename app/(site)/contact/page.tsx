import React from 'react';
import { RESTAURANT_INFO } from '@/lib/constants';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function ContactPage() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Concierge</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Contact Us
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Info Column */}
        <div className="space-y-8 bg-neutral-900 border border-neutral-800 p-8 rounded-lg">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">
            Get In Touch
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-1">
                Location
              </h3>
              <p className="text-sm text-neutral-400 font-light">{RESTAURANT_INFO.address}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-1">
                Hours of Operation
              </h3>
              <p className="text-sm text-neutral-400 font-light">
                Weekdays: {RESTAURANT_INFO.hours.weekdays}
              </p>
              <p className="text-sm text-neutral-400 font-light">
                Weekends: {RESTAURANT_INFO.hours.weekends}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-1">
                Direct Contact
              </h3>
              <p className="text-sm text-neutral-400 font-light">Phone: {RESTAURANT_INFO.phone}</p>
              <p className="text-sm text-neutral-400 font-light">Email: {RESTAURANT_INFO.email}</p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg flex flex-col justify-center">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">
            Send Message
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm"
                placeholder="johndoe@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm resize-none"
                placeholder="Write your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-black py-3 rounded font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
