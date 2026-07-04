import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MyWay Restaurant - Upscale Fine Dining in Buea, Cameroon",
    template: "%s | MyWay Restaurant",
  },
  description:
    "MyWay is Buea's premium upscale restaurant located at UB Junction. We offer an extraordinary culinary journey including wood-fired pizzas, gourmet burgers, local Cameroonian delicacies (Ndole Royale), steaks, pastas, and cocktails.",
  keywords: [
    "MyWay Restaurant",
    "Buea Restaurant",
    "Cameroon Fine Dining",
    "Best Restaurant in Buea",
    "MyWay Buea",
    "Cameroonian Food",
    "Steakhouse Buea",
    "Pizza Buea",
    "WhatsApp Food Order Buea",
    "Molyko Restaurants",
  ],
  metadataBase: new URL("https://myway-restaurant.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MyWay Restaurant - Upscale Fine Dining in Buea, Cameroon",
    description:
      "Experience a symphony of luxury and taste in Buea. Book a table online or order premium meals directly via WhatsApp.",
    url: "https://myway-restaurant.vercel.app",
    siteName: "MyWay Restaurant",
    images: [
      {
        url: "https://res.cloudinary.com/dplbjvow2/image/upload/c_fill,w_1200,h_630/v1719700000/showcase_interior",
        width: 1200,
        height: 630,
        alt: "MyWay Restaurant Fine Gastronomy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyWay Restaurant - Upscale Fine Dining in Buea, Cameroon",
    description:
      "Fine dining and premium gastronomy in the heart of Molyko, Buea. Book online.",
    images: ["https://res.cloudinary.com/dplbjvow2/image/upload/c_fill,w_1200,h_630/v1719700000/showcase_interior"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning />
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
