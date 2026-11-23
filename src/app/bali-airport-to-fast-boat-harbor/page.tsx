import type { Metadata } from "next";
import { HarborTransferLandingPage } from "@/components/HarborTransferLandingPage";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: {
    absolute: "Bali Airport to Nusa Penida & Gili Fast Boat Transfer",
  },
  description:
    "Private car from Bali Airport (DPS) to Sanur Harbor for Nusa Penida (IDR 275K) & Padangbai for Gili Islands (IDR 850K). Zero deposit, 24/7 port pickup.",
  alternates: {
    canonical:
      "https://greatbaliairporttransfer.com/bali-airport-to-fast-boat-harbor",
  },
  openGraph: {
    title: "Bali Airport to Nusa Penida & Gili Islands Fast Boat Harbor Transfer",
    description:
      "Direct fixed-rate transfers from DPS Airport to Sanur, Kusamba & Padangbai harbors for Nusa Penida, Lembongan, and Gili Trawangan from IDR 275,000.",
    url: "https://greatbaliairporttransfer.com/bali-airport-to-fast-boat-harbor",
    images: ["/images/dest-ubud.jpg"],
  },
};

export default async function BaliAirportFastBoatHarborPage() {
  const fx = await fetchLiveExchangeRates();
  return <HarborTransferLandingPage exchangeRates={fx.rates} />;
}
