import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const existingSlugs = [
    "bali-airport-transfer-to-canggu",
    "bali-airport-transfer-to-nusa-dua",
    "bali-airport-transfer-to-seminyak",
    "bali-airport-transfer-to-ubud",
    "bali-airport-transfer-to-uluwatu",
  ];
  return BALI_DESTINATIONS.filter((dest) => !existingSlugs.includes(dest.slug)).map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = BALI_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return {};

  return {
    title: `Bali Airport Transfer to ${dest.name} (DPS) | Fixed Price from IDR ${(dest.rates.standard / 1000).toLocaleString("id-ID")}k`,
    description: `Fast private transfer from Bali Airport to ${dest.name}. Fixed fare from IDR ${dest.rates.standard.toLocaleString("id-ID")}. Meet & greet at DPS arrivals, pristine AC cars.`,
    keywords: [
      `bali airport transfer to ${dest.name.toLowerCase()}`,
      `bali airport to ${dest.name.toLowerCase()} taxi cost`,
      `denpasar airport to ${dest.name.toLowerCase()} transfer`,
    ],
    alternates: {
      canonical: `https://greatbaliairporttransfer.com/${dest.slug}`,
    },
    openGraph: {
      title: `Bali Airport Transfer to ${dest.name} (DPS) | Chauffeur & Fixed Rates`,
      description: dest.description,
      url: `https://greatbaliairporttransfer.com/${dest.slug}`,
      images: ["/images/hero-alphard.jpg"],
    },
  };
}

export default async function GenericRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const destination = BALI_DESTINATIONS.find((d) => d.slug === slug);
  
  if (!destination) {
    notFound();
  }

  const tips = [
    `${destination.name} is approximately ${destination.distanceKm} km from DPS Airport. The drive typically takes ${destination.durationMinutes}.`,
    destination.trafficTip,
    "Our professional chauffeurs track your flight in real-time, so we will be waiting for you even if your flight is delayed.",
    "The electronic toll fee (if applicable) and airport parking are 100% included in our fixed rate."
  ];

  const faqs = [
    {
      question: `How much does a taxi from Bali Airport to ${destination.name} cost?`,
      answer: `Our fixed all-inclusive rate to ${destination.name} starts from IDR ${destination.rates.standard.toLocaleString("id-ID")} for a Standard Car (Avanza), IDR ${destination.rates.comfort.toLocaleString("id-ID")} for a Comfort Car (Innova), and IDR ${destination.rates.van.toLocaleString("id-ID")} for a Big Van (HiAce).`,
    },
    {
      question: `How long is the drive from Denpasar Airport to ${destination.name}?`,
      answer: `Depending on the time of day, the drive is about ${destination.distanceKm} km and takes approximately ${destination.durationMinutes}. ${destination.trafficTip}`,
    },
    {
      question: `Can we book a return transfer from ${destination.name} back to Bali Airport?`,
      answer: "Yes! You can book round-trip transfers or arrange your departure pickup at any time directly with your chauffeur or on WhatsApp.",
    },
  ];

  return (
    <RouteLandingPage
      destination={destination}
      heroImage="/images/hero-alphard.jpg"
      routeOverview={destination.description}
      travelTips={tips}
      faqs={faqs}
    />
  );
}
