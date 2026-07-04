import React, { Suspense } from 'react';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function ReservationsPage() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="text-center mb-16">
        <SectionLabel>Booking</SectionLabel>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
          Secure A Table
        </h1>
        <GoldDivider variant="diamond" className="max-w-md mx-auto" />
        <p className="text-sm text-neutral-400 font-light mt-4 max-w-lg mx-auto leading-relaxed">
          Please fill out the form below to request a dining reservation. Our booking team will review your requests and send a confirmation to your email shortly.
        </p>
      </div>

      <Suspense fallback={<div className="text-center text-neutral-500 text-xs py-10 uppercase tracking-widest">Loading Booking Details...</div>}>
        <ReservationForm />
      </Suspense>
    </div>
  );
}
