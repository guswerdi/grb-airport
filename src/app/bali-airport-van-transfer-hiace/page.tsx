import type { Metadata } from "next";
import { HiAceVanLandingPage } from "@/components/HiAceVanLandingPage";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: {
    absolute: "Bali Airport HiAce Van Transfer | 12 Pax & Surfboards",
  },
  description:
    "Book a private 12-seat Toyota HiAce van from Bali Airport (DPS) from IDR 550K. Fits 10 bags & 7'6 surfboards with zero deposit and 24/7 flat fares.",
  alternates: {
    canonical:
      "https://greatbaliairporttransfer.com/bali-airport-van-transfer-hiace",
  },
  openGraph: {
    title: "Bali Airport HiAce Van Transfer (12 Seats & Surfboards) | Fixed Fares",
    description:
      "Spacious Toyota HiAce Premio airport van for families, golf trips, and surf crews with 7'6\" surfboard capacity. Fixed flat rates from IDR 550,000.",
    url: "https://greatbaliairporttransfer.com/bali-airport-van-transfer-hiace",
    images: ["/images/hiace-premio.jpg"],
  },
};

export default async function BaliAirportHiAcePage() {
  const fx = await fetchLiveExchangeRates();
  return <HiAceVanLandingPage exchangeRates={fx.rates} />;
}
