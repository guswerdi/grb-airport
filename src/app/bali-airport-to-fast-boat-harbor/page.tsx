import type { Metadata } from "next";
import { HarborTransferLandingPage } from "@/components/HarborTransferLandingPage";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: {
    absolute: "Bali Airport to Sanur & Padangbai Fast Boat Transfer",
  },
  description:
    "Private car from Bali Airport (DPS) to Sanur (IDR 275K), Kusamba (400K), and Padangbai Harbor (850K). Zero deposit, toll included, 24/7 port pickup.",
  alternates: {
    canonical:
      "https://greatbaliairporttransfer.com/bali-airport-to-fast-boat-harbor",
  },
  openGraph: {
    title: "Bali Airport to Sanur, Kusamba & Padangbai Fast Boat Transfers",
    description:
      "Direct fixed-rate transfers from DPS Airport to Bali fast-boat harbors for Nusa Penida, Lembongan, and the Gili Islands from IDR 275,000.",
    url: "https://greatbaliairporttransfer.com/bali-airport-to-fast-boat-harbor",
    images: ["/images/dest-ubud.jpg"],
  },
};

export default async function BaliAirportFastBoatHarborPage() {
  const fx = await fetchLiveExchangeRates();
  return <HarborTransferLandingPage exchangeRates={fx.rates} />;
}
