import type { Metadata } from "next";
import { BabySeatLandingPage } from "@/components/BabySeatLandingPage";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: {
    absolute: "Bali Airport Transfer with Baby Seat | From IDR 250K",
  },
  description:
    "Private Bali airport pickup with pre-installed baby & booster seats (IDR 50K/seat). Fixed fares from IDR 250,000, Circle K meet & greet, 60-min wait.",
  alternates: {
    canonical:
      "https://greatbaliairporttransfer.com/bali-airport-transfer-with-baby-seat",
  },
  openGraph: {
    title: "Bali Airport Transfer with Baby & Booster Seat (DPS) | Fixed Rates",
    description:
      "Safe family transfers from Ngurah Rai Airport (DPS) with sanitized baby seats (0-2 yrs) and booster seats (3-7 yrs) for IDR 50,000 per seat.",
    url: "https://greatbaliairporttransfer.com/bali-airport-transfer-with-baby-seat",
    images: ["/images/innova-zenix.jpg"],
  },
};

export default async function BaliAirportBabySeatPage() {
  const fx = await fetchLiveExchangeRates();
  return <BabySeatLandingPage exchangeRates={fx.rates} />;
}
