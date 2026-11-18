import type { Metadata } from "next";
import { AboutPageContent } from "@/components/AboutPageContent";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: {
    absolute: "About Great Bali Airport Transfer | Local DPS Chauffeurs",
  },
  description:
    "Meet the local Balinese chauffeur team behind Great Bali Airport Transfer (Great Rides Bali): 24/7 DPS pickup, zero deposit, and transparent pricing.",
  alternates: {
    canonical: "https://greatbaliairporttransfer.com/about",
  },
  openGraph: {
    title: "About Great Bali Airport Transfer | Local DPS Chauffeurs",
    description:
      "Operated by Great Rides Bali: licensed local drivers, Circle K exit-gate DPS meet & greet, and 100% flat rates with zero deposit.",
    url: "https://greatbaliairporttransfer.com/about",
    images: ["/images/innova-zenix.jpg"],
  },
};

export default async function AboutPage() {
  const fx = await fetchLiveExchangeRates();
  return <AboutPageContent exchangeRates={fx.rates} />;
}
