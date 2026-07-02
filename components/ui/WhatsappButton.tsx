import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { RESTAURANT_INFO } from '@/lib/constants';

interface WhatsappButtonProps {
  className?: string;
}

export function WhatsappButton({ className = '' }: WhatsappButtonProps) {
  return (
    <a
      href={RESTAURANT_INFO.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 flex items-center justify-center ${className}`}
    >
       <FaWhatsapp className="w-8 h-8 text-white" />
    </a>
  );
}
