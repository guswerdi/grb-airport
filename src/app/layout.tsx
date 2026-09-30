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
  metadataBase: new URL("https://www.greatbaliairporttransfer.com"),
  // Google Search Console ownership token is injected via env so the token
  // itself never lives in the repo. To verify the property:
  //   1. In Search Console choose "Meta tag", copy the content value from
  //      <meta name="google-site-verification" content="...">.
  //   2. In Vercel: Project Settings -> Environment Variables, add
  //      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = <that value> (all environments).
  //   3. Redeploy. If the variable is empty, no tag is emitted at all.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  // Plain string title (no `template`).
  //
  // The previous `template: "%s | Great Bali Airport Transfer"` was appended to
  // every child route that already wrote its own full title. That doubled the
  // brand on the blog article and pushed all 18 route titles to 93-152 chars,
  // so Google truncated the keyword/price out of every snippet. Route pages now
  // opt out with `title.absolute`; a plain string here keeps the homepage short.
  title: "Bali Airport Transfer DPS | Fixed Price from IDR 250K",
  description:
    "Pre-book a private Bali airport transfer from Denpasar Ngurah Rai (DPS). Fixed fares from IDR 250,000 ($16 USD), name-sign meet & greet, flight tracking.",
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
    canonical: "https://www.greatbaliairporttransfer.com",
  },
  openGraph: {
    title: "Bali Airport Transfer (DPS) | Private VIP Chauffeur & Fixed Rates",
    description:
      "Arrive stress-free in Bali. Personalized arrival hall greeting, flight delay tracking, and fixed transparent fares to Ubud, Seminyak, Canggu, Uluwatu, and Nusa Dua.",
    url: "https://www.greatbaliairporttransfer.com",
    siteName: "Great Bali Airport Transfer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/innova-zenix.jpg",
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
    images: ["/images/innova-zenix.jpg"],
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
