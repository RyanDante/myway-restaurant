import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { WhatsappButton } from '@/components/ui/WhatsappButton';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
      <WhatsappButton />
    </div>
  );
}
