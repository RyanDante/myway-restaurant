import React from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function TermsConditionsPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto w-full min-h-screen">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Terms & Conditions
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-4 font-mono">
          Last Updated: July 2026
        </p>
      </div>

      <div className="space-y-8 text-neutral-350 text-sm leading-relaxed font-light font-sans">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            1. Table Reservations & Pre-orders
          </h2>
          <p>
            By booking a table at MyWay Restaurant through our website, you agree to:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 text-neutral-400">
            <li>Provide accurate details (Full Name, Phone number, Email, Guests count).</li>
            <li>Arrive on time. We hold reservations for a maximum of 15 minutes past the slot time.</li>
            <li>Pre-orders selected during reservations are requests and remain subject to kitchen availability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            2. Cancellation Policy
          </h2>
          <p>
            If you need to cancel or modify your reservation details, please notify us at least 2 hours before your timeslot. This allows our team to reallocate the table and manage kitchen prep.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            3. Menu Items & Pricing
          </h2>
          <p>
            Prices for food items and drinks are displayed in Cameroonian Francs (XOF) on the Menu. We make every effort to keep details updated, but we reserve the right to alter menu lists, pricing, and availability without prior warning.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            4. Limitation of Liability
          </h2>
          <p>
            MyWay Restaurant is not liable for technical delays, link issues, or booking omissions arising from external network failures or incorrect user inputs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            5. Governing Law
          </h2>
          <p>
            These terms are governed and construed in accordance with local regulations in Cameroon.
          </p>
        </section>
      </div>
    </div>
  );
}
