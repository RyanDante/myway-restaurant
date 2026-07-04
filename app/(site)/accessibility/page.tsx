import React from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function AccessibilityStatementPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto w-full min-h-screen">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Inclusivity</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Accessibility Statement
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-4 font-mono">
          Last Updated: July 2026
        </p>
      </div>

      <div className="space-y-8 text-neutral-350 text-sm leading-relaxed font-light font-sans">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            1. Our Commitment
          </h2>
          <p>
            At MyWay Restaurant, we believe dining should be an inclusive experience. We are committed to making our digital interface and physical spaces accessible to everyone, including guests with sensory, cognitive, or physical impairments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            2. Web Accessibility Goals
          </h2>
          <p>
            We actively design this website to conform to WCAG 2.1 Level AA recommendations, focusing on:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 text-neutral-400">
            <li>High contrast ratios for clean text readability.</li>
            <li>Semantic HTML structure to support screen readers.</li>
            <li>Keyboard navigation compatibility across desktop menus.</li>
            <li>Accessible forms with clear labels and error alerts.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            3. Physical Space Accessibility
          </h2>
          <p>
            Our restaurant lounge is equipped with:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 text-neutral-400">
            <li>Wheelchair-friendly entrance ramps and corridors.</li>
            <li>Fully accessible bathroom facilities.</li>
            <li>Adaptable seating arrangements. Please mention any specific table setup needs in the "Special Requests" field of your table reservation form.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            4. Ongoing Work & Feedback
          </h2>
          <p>
            Accessibility is an ongoing process. If you encounter any technical obstacles while accessing our platform, or if you have suggestions for improvement, please share your thoughts:
          </p>
          <p className="text-neutral-400">
            Email: <span className="text-gold-500">accessibility@myway-restaurant.com</span><br />
            Phone: <span className="text-gold-500">+237 6 51 37 18 00</span>
          </p>
        </section>
      </div>
    </div>
  );
}
