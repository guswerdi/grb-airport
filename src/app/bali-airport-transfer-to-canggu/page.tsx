import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { BALI_DESTINATIONS } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Bali Airport Transfer to Canggu (DPS) | Fixed Price from IDR 325k",
  description:
    "Pre-book private airport transfer from Bali DPS Ngurah Rai to Canggu, Berawa, Batu Bolong & Pererenan. Fixed price from IDR 325,000 ($20 USD). Surfboard friendly, AC, flight tracking.",
  keywords: [
    "bali airport transfer to canggu",
    "bali airport to canggu taxi cost",
    "how to get from bali airport to canggu",
    "dps airport to berawa beach transfer",
    "bali airport transfer surfboard",
  ],
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-canggu",
  },
  openGraph: {
    title: "Bali Airport Transfer to Canggu (DPS) | Private Driver & Fixed Rates",
    description:
      "Direct private transfer to Canggu, Berawa, and Echo Beach. Surfboard friendly vans and bypass routing.",
    url: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-canggu",
    images: ["/images/dest-seminyak.jpg"],
  },
};

export default function CangguRoutePage() {
  const cangguDest = BALI_DESTINATIONS.find((d) => d.id === "canggu")!;

  const tips = [
    "The distance to Canggu is approximately 19 km and usually takes between 45 to 75 minutes depending on traffic on Sunset Road and Jl. Raya Canggu.",
    "Canggu traffic can be notoriously tight; our experienced drivers know alternate shortcuts and avoid peak bottleneck junctions.",
    "Traveling with surfboards or bulky beach luggage? Our Toyota HiAce Premio van easily accommodates longboards and multiple boardbags with dedicated interior space.",
  ];

  const faqs = [
    {
      question: "How much is a transfer from Bali Airport to Canggu?",
      answer:
        "Our transparent fixed fare to Canggu (including Berawa, Batu Bolong, Echo Beach, and Pererenan) starts at IDR 325,000 (~$20 USD) for a Standard Car (Toyota Avanza), IDR 450,000 for a Comfort Car (Innova), and IDR 700,000 for a Big Van (HiAce).",
    },
    {
      question: "Can I bring my surfboard bag in the car?",
      answer:
        "Yes! For 1-2 standard shortboards, our Veloz or Innova Zenix fits them with folded rear seats. For large boardbags or groups of surfers, we recommend our Toyota HiAce Premio 12-seater van.",
    },
    {
      question: "Are there extra charges if the Canggu shortcut has heavy traffic?",
      answer:
        "Never. Our pricing is 100% fixed regardless of traffic conditions or route adjustments.",
    },
  ];

  return (
    <RouteLandingPage
      destination={cangguDest}
      heroImage="/images/dest-seminyak.jpg"
      routeOverview="Canggu is Bali's epicentre of surfing, digital nomads, beach clubs (Finns, Atlas), and cafe culture. With vibrant energy and renowned breaks at Batu Bolong and Echo Beach, pre-booking your airport pickup ensures a relaxed ride without getting trapped in airport taxi queues."
      travelTips={tips}
      faqs={faqs}
    />
  );
}
