import React from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-24 px-6 max-w-4xl mx-auto w-full min-h-screen">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Privacy Policy
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-4 font-mono">
          Last Updated: July 2026
        </p>
      </div>

      <div className="space-y-8 text-neutral-350 text-sm leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            1. Information We Collect
          </h2>
          <p>
            At MyWay Restaurant, we collect information when you reserve a table, contact us, order items on WhatsApp, or join our newsletter list. This includes:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 text-neutral-400">
            <li>Personal details: Name, email address, telephone number.</li>
            <li>Reservation details: Dining date, timeslot, guests count, pre-ordered food/drink requests.</li>
            <li>Technical data: IP addresses, cookie logs, device browser settings.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            2. How We Use Your Information
          </h2>
          <p>
            We use the collected information for booking operations and marketing communication:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5 text-neutral-400">
            <li>To secure, confirm, and manage your dining table reservations.</li>
            <li>To optimize your pre-ordered food and drinks selections.</li>
            <li>To send promotional emails, newsletters, or dining event invites (which you can opt-out of at any time).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            3. Data Storage & Security
          </h2>
          <p>
            Your information is stored securely on servers compliant with modern standards (including Appwrite databases). We implement various security protocols to keep your personal data protected from unauthorized leaks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            4. Third-Party Sharing
          </h2>
          <p>
            We do not sell, lease, or distribute your private information to third parties. We may share data with secure service providers (e.g. databases, email hosts) solely to operate the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gold-500 uppercase tracking-wider">
            5. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data removal, please contact us at:
          </p>
          <p className="text-neutral-400">
            Email: <span className="text-gold-500">privacy@myway-restaurant.com</span><br />
            Phone: <span className="text-gold-500">+237 6 51 37 18 00</span>
          </p>
        </section>
      </div>
    </div>
  );
}
