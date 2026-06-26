"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const faqs = [
  {
    question:
      "What are the most recommended traditional and continental dishes at MyWay Restaurant Buea?",
    answer: (
      <div className="space-y-4 text-neutral-400 text-sm md:text-base">
        <p>
          At MyWay Restaurant Buea, the “most recommended” items people
          consistently rave about tend to fall into two buckets: hearty
          traditional Cameroonian-style plates and continental/international
          comfort food.
        </p>

        <div className="space-y-2 mt-2">
          <h4 className="text-gold-400 font-bold text-sm tracking-wide flex items-center gap-2">
            Most recommended traditional / indigenous-style picks
          </h4>
          <ul className="space-y-2 pl-4 border-l border-gold-500/20">
            <li className="leading-relaxed">
              <strong className="text-white">
                Grilled fish (often with local sides):
              </strong>{" "}
              This is a common crowd-pleaser at spots like MyWay Restaurant
              Buea, especially if you want something distinctly “Cameroon” while
              still broadly approachable.
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">Seafood-forward dishes:</strong>{" "}
              Their offering is known to include seafood + indigenous options,
              so if you like coastal flavors, ask what the “chef’s special” is
              that day at MyWay Restaurant Buea.
            </li>
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="text-gold-400 font-bold text-sm tracking-wide flex items-center gap-2">
            Most recommended continental / international picks
          </h4>
          <ul className="space-y-2 pl-4 border-l border-gold-500/20">
            <li className="leading-relaxed">
              <strong className="text-white">Pizza:</strong> Multiple guests
              specifically mention going to MyWay Restaurant Buea for pizza
              (it’s one of their best-known items).
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">Lamb chops:</strong> This is the
              single most explicitly “must-try” dish called out in customer
              feedback, someone even said the lamb chops at MyWay Restaurant
              Buea were the best they’d had so far.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question:
      "What is the typical price range for main courses and meals at MyWay Restaurant Buea?",
    answer:
      "Based on user reports, MyWay Restaurant Buea is generally considered affordable for the quality. Main courses typically fall in the range of 3,000 to 7,000 FCFA, with combo meals and special dishes sometimes going slightly higher. This makes it a mid-range spot, not the cheapest eats in Buea, but very reasonable for dinner, especially for visitors or locals treating themselves.",
  },
  {
    question:
      "What are the daily opening and closing times for MyWay Restaurant Buea, including weekends?",
    answer: (
      <div className="space-y-3 text-neutral-400 text-sm md:text-base">
        <p>
          Here are the daily opening/closing times for MyWay Restaurant Buea,
          including weekends:
        </p>
        <div className="mt-3 max-w-xs border border-gold-500/20 bg-neutral-950/40 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gold-400 font-bold mb-3 border-b border-gold-500/10 pb-2">
            Hours of Operation
          </div>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-300">Sunday</span>
              <span className="text-white font-bold">12:00 PM – 12:00 AM</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900 pt-1.5">
              <span className="text-rose-400">Monday</span>
              <span className="text-rose-400 font-bold">Closed</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900 pt-1.5">
              <span className="text-neutral-300">Tuesday</span>
              <span className="text-white font-bold">12:00 PM – 12:00 AM</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900 pt-1.5">
              <span className="text-neutral-300">Wednesday</span>
              <span className="text-white font-bold">12:00 PM – 12:00 AM</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900 pt-1.5">
              <span className="text-neutral-300">Thursday</span>
              <span className="text-white font-bold">12:00 PM – 12:00 AM</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900 pt-1.5">
              <span className="text-neutral-300">Friday</span>
              <span className="text-white font-bold">12:00 PM – 12:00 AM</span>
            </div>
            <div className="flex justify-between border-t border-neutral-900 pt-1.5">
              <span className="text-neutral-300">Saturday</span>
              <span className="text-white font-bold">12:00 PM – 12:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    question:
      "Does MyWay Restaurant Buea offer any discounts, Wi‑Fi, or seating arrangements that cater to University of Buea students?",
    answer:
      "Wi-Fi: Yes, reviews specifically mention fast/free Wi‑Fi, and one review notes staff helped a guest scan for the Wi‑Fi access.",
  },
  {
    question:
      "Can MyWay Restaurant Buea accommodate large groups or private events, and what is the reservation policy?",
    answer: (
      <div className="space-y-4 text-neutral-400 text-sm md:text-base">
        <div className="space-y-2">
          <h4 className="text-gold-400 font-bold text-sm tracking-wide flex items-center gap-2">
            Large Groups & Private Events
          </h4>
          <p className="leading-relaxed">
            For MyWay Restaurant Buea, the available info strongly suggests they
            can handle groups and celebrations:
          </p>
          <ul className="space-y-2 pl-4 border-l border-gold-500/20">
            <li className="leading-relaxed">
              It’s listed as reservable, and at least one guest review mentions
              staff asking whether they had a reservation on arrival, both are
              good signs for organized group dining.
            </li>
            <li className="leading-relaxed">
              Reviews also mention birthdays being celebrated there, which
              typically indicates they’re open to small private celebrations and
              may be able to support larger group setups depending on size and
              timing.
            </li>
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="text-gold-400 font-bold text-sm tracking-wide flex items-center gap-2">
            Reservation Policy
          </h4>
          <ul className="space-y-2 pl-4 border-l border-gold-500/20">
            <li className="leading-relaxed">
              <strong className="text-white">
                Reservations are supported:
              </strong>{" "}
              The restaurant is explicitly marked as reservable.
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">Walk-ins vs. Booking:</strong>{" "}
              While walk-ins may still be possible, staff do ask about
              reservations upon arrival (per customer reviews), so reserving in
              advance is highly advisable, especially for groups.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];

interface FAQItemProps {
  faq: { question: string; answer: React.ReactNode };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ faq, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <div
      className={`faq-item faq-item-${index} border-b border-gold-500/20 py-6`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
      >
        <h3
          className={`text-lg md:text-xl font-bold tracking-wide transition-colors duration-300 ${
            isOpen ? "text-gold-400" : "text-white group-hover:text-gold-500/80"
          }`}
        >
          {faq.question}
        </h3>
        <div
          className={`ml-4 shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-gold-500 bg-gold-500 text-black rotate-180"
              : "border-neutral-700 text-neutral-400 group-hover:border-gold-500/50 group-hover:text-gold-500"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-neutral-400 leading-relaxed max-w-3xl pr-8">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Title animation
      gsap.fromTo(
        ".faq-title-elem",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // FAQ items stagger animation
      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 85%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 relative bg-black overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute left-[-20%] top-[20%] w-[50%] h-[50%] bg-gold-500/5 blur-[120px] rounded-full" />
        <div className="absolute right-[-20%] bottom-[10%] w-[40%] h-[40%] bg-gold-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="faq-title-elem text-gold-500 font-bold tracking-widest text-sm uppercase mb-4">
            Curious Minds
          </p>
          <h2 className="faq-title-elem text-3xl md:text-5xl font-black text-white uppercase tracking-wider mb-6">
            Frequently Asked{" "}
            <span className="text-gold-500 italic font-serif lowercase">
              Questions
            </span>
          </h2>
          <div className="faq-title-elem">
            <GoldDivider variant="diamond" className="max-w-xs mx-auto" />
          </div>
        </div>

        <div className="faq-list mt-12">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
