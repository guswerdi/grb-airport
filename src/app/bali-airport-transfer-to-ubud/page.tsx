import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";

/** Hoisted so the metadata export builds its title from the same record. */
const ubudDest = BALI_DESTINATIONS.find((d) => d.id === "ubud")!;

export const metadata: Metadata = {
  title: routeTitle(ubudDest),
  description:
    "Pre-book your private Bali airport transfer from DPS Ngurah Rai to Ubud. Fixed transparent rates from IDR 400,000 ($25 USD). Meet & greet with name board, toll included, pristine AC cars.",
  keywords: [
    "bali airport transfer to ubud",
    "bali airport to ubud taxi cost",
    "denpasar airport to ubud private driver",
    "dps to ubud transfer price",
    "how to get from bali airport to ubud",
  ],
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-ubud",
  },
  openGraph: {
    title: "Bali Airport Transfer to Ubud (DPS) | Private Chauffeur & Fixed Rates",
    description:
      "Arrive stress-free in Ubud. Personal chauffeur greeting at DPS arrival hall, free flight tracking, toll & parking included.",
    url: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-ubud",
    images: ["/images/dest-ubud.jpg"],
  },
};

export default function UbudRoutePage() {
  const tips = [
    "The typical drive from Denpasar Airport to Ubud takes 60 to 90 minutes depending on departure time.",
    "Our drivers take the Ida Bagus Mantra Bypass or Tollway to avoid the congested Batubulan town center.",
    "If your villa is located down a pedestrian-only lane (common in central Ubud or Penestanan), your chauffeur will coordinate with villa staff and assist carrying your luggage right to your villa door.",
    "Need to buy a local Telkomsel tourist SIM card or withdraw Rupiah cash from a bank ATM? Just notify your chauffeur and we will make a quick stop at no extra charge.",
  ];

  const faqs = [
    {
      question: "How much does a private taxi from Bali airport to Ubud cost?",
      answer:
        "Our guaranteed fixed price from DPS Airport to Central Ubud starts at IDR 400,000 (~$25 USD) for a Standard Car (Toyota Avanza), IDR 500,000 for a Comfort Car (Innova), and IDR 800,000 for a Big Van (HiAce). For Tegallalang and Payangan, rates start from IDR 450,000. All tolls and parking are included.",
    },
    {
      question: "How long does it take from DPS Airport to Ubud?",
      answer:
        "The drive is approximately 38 kilometers and takes between 60 to 75 minutes in normal traffic. During peak afternoon rush hours (4 PM - 7 PM), it may take up to 90 minutes. Our drivers monitor traffic maps continuously to choose the fastest route.",
    },
    {
      question: "Will my driver wait if my flight into Bali is delayed?",
      answer:
        "Yes! We monitor your flight number in real time. We automatically adjust pickup times for flight delays with zero extra waiting fees.",
    },
  ];

  return (
    <RouteLandingPage
      destination={ubudDest}
      heroImage="/images/dest-ubud.jpg"
      routeOverview="The scenic journey from Denpasar Ngurah Rai Airport (DPS) north to Ubud transitions from coastal urban views into emerald jungle valleys, terraced rice paddies, and stone-carved Hindu shrines. Enjoy peace of mind knowing your private Balinese chauffeur is waiting for you at the airport arrivals terminal."
      travelTips={tips}
      faqs={faqs}
    />
  );
}
