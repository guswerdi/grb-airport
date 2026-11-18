import type { Metadata } from "next";
import { DepartureLandingPage } from "@/components/DepartureLandingPage";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: {
    absolute: "Bali Airport Departure Transfer | Hotel to DPS Fixed",
  },
  description:
    "Pre-book hotel or villa to Bali Airport (DPS) rides. Fixed fares from IDR 250,000, zero early-morning surcharge, plus 2026 traffic buffer times.",
  alternates: {
    canonical:
      "https://greatbaliairporttransfer.com/bali-airport-departure-transfer",
  },
  openGraph: {
    title: "Bali Airport Departure Transfer (Hotel & Villa to DPS) | Fixed Rates",
    description:
      "Private hotel-to-DPS departure transfers across Ubud, Canggu, Seminyak, Uluwatu, and Sanur. Fixed rates from IDR 250,000 with zero night fee.",
    url: "https://greatbaliairporttransfer.com/bali-airport-departure-transfer",
    images: ["/images/dest-ubud.jpg"],
  },
};

export default async function BaliAirportDeparturePage() {
  const fx = await fetchLiveExchangeRates();
  return <DepartureLandingPage exchangeRates={fx.rates} />;
}
