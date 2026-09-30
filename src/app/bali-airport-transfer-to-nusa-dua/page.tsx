import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";

/** Hoisted so the metadata export builds its title from the same record. */
const nusaDuaDest = BALI_DESTINATIONS.find((d) => d.id === "nusa-dua")!;

export const metadata: Metadata = {
  title: routeTitle(nusaDuaDest),
  description:
    "Fast private transfer from Bali Airport to Nusa Dua & Tanjung Benoa via Mandara Tollway. Fixed fare from IDR 250,000 ($16 USD). Meet & greet at DPS arrivals, pristine AC cars, toll included.",
  keywords: [
    "bali airport transfer to nusa dua",
    "bali airport to nusa dua taxi cost",
    "denpasar airport to apurva kempinski transfer",
    "dps airport to mulia bali transfer",
    "bali mandara tollway airport taxi",
  ],
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-nusa-dua",
  },
  openGraph: {
    title: "Bali Airport Transfer to Nusa Dua (DPS) | Chauffeur & Fixed Rates",
    description:
      "Arrive at Nusa Dua 5-star beachfront resorts via Bali Mandara ocean tollway. Mulia, Kempinski, St. Regis, Sofitel.",
    url: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-nusa-dua",
    images: ["/images/dest-uluwatu.jpg"],
  },
};

export default function NusaDuaRoutePage() {
  const tips = [
    "Nusa Dua is just 14 km from DPS Airport. Thanks to the Bali Mandara Ocean Tollway, the drive takes only 20 to 30 minutes.",
    "The electronic toll fee for the ocean bypass is 100% included in our fixed rate. You do not need Indonesian toll cards or cash for tolls.",
    "Headed to the ITDC hotel zone (The Mulia, Grand Hyatt, Melia, St. Regis)? Our drivers have authorized access to all security checkpoints.",
  ];

  const faqs = [
    {
      question: "How much does a taxi from Bali Airport to Nusa Dua cost?",
      answer:
        "Our fixed all-inclusive rate to Nusa Dua (ITDC coastal) starts from IDR 250,000 (~$16 USD) for a Standard Car (Avanza), IDR 300,000 for a Comfort Car (Innova), and IDR 600,000 for a Big Van (HiAce). For Nusa Dua Atas (Kampial, Sawangan cliff, Mumbul), rates start from IDR 275,000. Ocean tollway fee is fully included.",
    },
    {
      question: "Is Nusa Dua the fastest transfer from the airport?",
      answer:
        "Along with Jimbaran, Nusa Dua is one of the fastest transfers in Bali because it connects directly via the over-water toll highway, completely avoiding city traffic.",
    },
    {
      question: "Can we book a return transfer from Nusa Dua back to Bali Airport?",
      answer:
        "Yes! You can book round-trip transfers or arrange your departure pickup at any time directly with your chauffeur or on WhatsApp.",
    },
  ];

  return (
    <RouteLandingPage
      destination={nusaDuaDest}
      heroImage="/images/dest-uluwatu.jpg"
      routeOverview="Nusa Dua is Bali's premier manicured luxury enclave, renowned for pristine white sand beaches, tranquil ocean swimming lagoons, championship golf, and iconic 5-star beachfront resorts. Enjoy the quickest and smoothest transfer in Bali cruising over the scenic Bali Mandara toll highway."
      travelTips={tips}
      faqs={faqs}
    />
  );
}
