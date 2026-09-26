import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://greatbaliairporttransfer.com"),
  title: {
    default: "Bali Airport Transfer (DPS) | VIP Private Chauffeur & Fixed Rates",
    template: "%s | Great Bali Airport Transfer",
  },
  description:
    "Pre-book reliable Bali airport transfers at Denpasar Ngurah Rai (DPS). 100% fixed transparent fares from IDR 250k. Free flight tracking, personalized meet & greet with name sign, toll included, pristine AC fleet.",
  keywords: [
    "bali airport transfer",
    "bali airport taxi",
    "denpasar airport transfer",
    "dps airport transfer",
    "bali airport transfer to ubud",
    "bali airport transfer to seminyak",
    "bali airport transfer to canggu",
    "bali airport transfer to uluwatu",
    "bali airport transfer cost",
    "bali private driver airport pickup",
    "bali vip airport chauffeur",
    "ngurah rai airport taxi rates",
  ],
  authors: [{ name: "Great Bali Airport Transfer Chauffeurs" }],
  creator: "Great Bali Airport Transfer",
  publisher: "PT Bali Transport Wisata",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://greatbaliairporttransfer.com",
  },
  openGraph: {
    title: "Bali Airport Transfer (DPS) | Private VIP Chauffeur & Fixed Rates",
    description:
      "Arrive stress-free in Bali. Personalized arrival hall greeting, flight delay tracking, and fixed transparent fares to Ubud, Seminyak, Canggu, Uluwatu, and Nusa Dua.",
    url: "https://greatbaliairporttransfer.com",
    siteName: "Great Bali Airport Transfer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-alphard.jpg",
        width: 1200,
        height: 630,
        alt: "Bali Airport Transfer Chauffeur at Ngurah Rai DPS Airport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bali Airport Transfer (DPS) | VIP Chauffeur & Fixed Rates",
    description:
      "Pre-book your Bali airport pickup. English-speaking driver with name board, free flight tracking, toll & parking included.",
    images: ["/images/hero-alphard.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${playfairDisplay.variable} scroll-smooth`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
