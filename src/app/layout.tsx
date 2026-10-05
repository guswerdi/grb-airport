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
  title: "Bali Airport Transfers & Pickup (DPS) | VIP Private Driver",
  description:
    "Pre-book your private Bali airport pickup for a stress-free arrival. Top-rated Bali airport transfers with VIP meet & greet, 60-min free waiting, and fixed prices.",
  authors: [{ name: "Great Bali Airport Transfer Chauffeurs" }],
  creator: "Great Bali Airport Transfer",
  publisher: "Great Bali Airport Transfer",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com",
  },
  openGraph: {
    title: "Bali Airport Transfers & Pickup (DPS) | VIP Private Driver",
    description:
      "Pre-book your private Bali airport pickup for a stress-free arrival. Top-rated Bali airport transfers with VIP meet & greet, 60-min free waiting, and fixed prices.",
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
    title: "Bali Airport Transfers & Pickup (DPS) | VIP Private Driver",
    description:
      "Pre-book your private Bali airport pickup for a stress-free arrival. Top-rated Bali airport transfers with VIP meet & greet, 60-min free waiting, and fixed prices.",
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
  other: {
    "geo.region": "ID-BA",
    "geo.placename": "Bali",
    "geo.position": "-8.7482;115.1672",
    "ICBM": "-8.7482, 115.1672"
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
