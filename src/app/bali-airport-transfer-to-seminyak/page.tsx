import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeDescription, routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";

/** Hoisted so the metadata export builds its title from the same record. */
const seminyakDest = BALI_DESTINATIONS.find((d) => d.id === "seminyak")!;

export const metadata: Metadata = {
  title: routeTitle(seminyakDest),
  description: routeDescription(seminyakDest),
  keywords: [
    "bali airport transfer to seminyak",
    "dps airport to seminyak taxi",
    "bali airport taxi cost to seminyak",
    "denpasar to seminyak transfer price",
    "best way to get from bali airport to seminyak",
  ],
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-seminyak",
  },
  openGraph: {
    title: "Bali Airport Transfer to Seminyak (DPS) | VIP Chauffeur & Fixed Rates",
    description:
      "Direct private transfer to Seminyak beach clubs & luxury villas. Skip taxi haggling at DPS airport.",
    url: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-seminyak",
    images: ["/images/dest-seminyak.jpg"],
  },
};

export default function SeminyakRoutePage() {
  const tips = [
    "Seminyak is located just 12 km north of DPS Airport. The drive typically takes 30 to 45 minutes.",
    "During sunset rush hour (5 PM - 7:30 PM), Sunset Road and Jl. Kayu Aya (Eat Street) experience heavy traffic. Our drivers know quiet backstreets to reach your villa quicker.",
    "Heading straight to Ku De Ta, Potato Head, or Mrs Sippy? We can take your luggage directly into the hotel lobby while you refresh.",
  ];

  const faqs = [
    {
      question: "How much is a taxi from Bali airport to Seminyak?",
      answer:
        "Our fixed price from DPS Airport to Seminyak is IDR 250,000 (~$16 USD) for a Standard Car (Toyota Avanza), IDR 300,000 for a Comfort Car (Innova), and IDR 600,000 for a Big Van (HiAce). No haggling or surge pricing.",
    },
    {
      question: "Is it easy to find my driver at the airport?",
      answer:
        "Yes, our driver will stand in the primary arrival hall holding a clear digital sign with your name. We also send a WhatsApp message with their photo before you land.",
    },
    {
      question: "Can we drop bags at our hotel and go straight to the beach?",
      answer:
        "Absolutely. Your chauffeur can assist with check-in luggage drop and drop you at your favorite beach lounge or restaurant.",
    },
  ];

  return (
    <RouteLandingPage
      destination={seminyakDest}
      heroImage="/images/dest-seminyak.jpg"
      routeOverview="Seminyak is Bali's premier stylish beach playground, boasting iconic sunset spots, award-winning culinary dining, and designer fashion boutiques. Arrive relaxed and start your vacation immediately with our meet-and-greet airport transfer service."
      travelTips={tips}
      faqs={faqs}
    />
  );
}
