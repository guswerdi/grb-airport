import type { Metadata } from "next";
import { VipAlphardLandingPage } from "@/components/VipAlphardLandingPage";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: {
    absolute: "Bali VIP Airport Transfer | Luxury Toyota Alphard Chauffeur",
  },
  description:
    "Book a luxury Toyota Alphard VIP transfer from Bali Airport (DPS) from IDR 750K. Reclining captain seats, Circle K exit meet, toll included, zero deposit.",
  alternates: {
    canonical:
      "https://greatbaliairporttransfer.com/bali-airport-transfer-vip-alphard",
  },
  openGraph: {
    title: "Bali VIP Airport Transfer | Executive Toyota Alphard Chauffeur",
    description:
      "First-class Toyota Alphard airport pickup at Ngurah Rai Airport (DPS) for Nusa Dua, Uluwatu, Seminyak, Canggu, and Ubud resorts from IDR 750,000.",
    url: "https://greatbaliairporttransfer.com/bali-airport-transfer-vip-alphard",
    images: ["/images/hero-alphard.jpg"],
  },
};

export default async function BaliAirportVipAlphardPage() {
  const fx = await fetchLiveExchangeRates();
  return <VipAlphardLandingPage exchangeRates={fx.rates} />;
}
