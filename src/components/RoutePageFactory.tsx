import type { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import type { Destination } from "@/data/destinations";

const BASE = "https://www.greatbaliairporttransfer.com";

/** Region-based scenic photo for OG image & page hero. */
const REGION_IMAGES: Record<Destination["region"], string> = {
  "South Bali": "/images/dest-seminyak.jpg",
  "Central Bali": "/images/dest-ubud.jpg",
  "Uluwatu & Bukit": "/images/dest-uluwatu.jpg",
  "North & East Bali": "/images/dest-ubud.jpg",
  "West Bali": "/images/dest-ubud.jpg",
};

/** "250000" -> "250K", matching the compact form used across the meta titles. */
function rateLabel(idr: number): string {
  return `${(idr / 1000).toLocaleString("id-ID")}K`;
}

/**
 * Meta title for a route page.
 *
 * Uses `absolute` so the brand template from the root layout is NOT appended.
 * Before this, `%s | Great Bali Airport Transfer` was suffixed onto titles that
 * already ended in a price, pushing every route title to 93-152 characters -
 * well past the ~60 characters Google renders, so the price was always cut off.
 * `dest.metaName` (not `dest.name`) keeps the destination label short.
 */
export function routeTitle(dest: Destination): Metadata["title"] {
  return {
    absolute: `Bali Airport Transfer to ${dest.metaName} | Fixed IDR ${rateLabel(
      dest.rates.standard
    )}`,
  };
}

/** Shared metadata for all hardcoded route landing pages. */
export function routeMetadata(dest: Destination): Metadata {
  return {
    title: routeTitle(dest),
    description: `Fast private transfer from Bali Airport to ${dest.name}. Fixed fare from IDR ${dest.rates.standard.toLocaleString("id-ID")}. Meet & greet at DPS arrivals, pristine AC cars.`,
    keywords: [
      `bali airport transfer to ${dest.name.toLowerCase()}`,
      `bali airport to ${dest.name.toLowerCase()} taxi cost`,
      `denpasar airport to ${dest.name.toLowerCase()} transfer`,
    ],
    alternates: {
      canonical: `${BASE}/${dest.slug}`,
    },
    openGraph: {
      title: `Bali Airport Transfer to ${dest.name} (DPS) | Chauffeur & Fixed Rates`,
      description: dest.description,
      url: `${BASE}/${dest.slug}`,
      images: [REGION_IMAGES[dest.region]],
    },
  };
}

/** Shared page body for all hardcoded route landing pages. */
export function GenericRouteContent({ destination }: { destination: Destination }) {
  const tips = [
    `${destination.name} is approximately ${destination.distanceKm} km from DPS Airport. The drive typically takes ${destination.durationMinutes}.`,
    destination.trafficTip,
    "Our professional chauffeurs track your flight in real-time, so we will be waiting for you even if your flight is delayed.",
    "The electronic toll fee (if applicable) and airport parking are 100% included in our fixed rate.",
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
      answer:
        "Yes! You can book round-trip transfers or arrange your departure pickup at any time directly with your chauffeur or on WhatsApp.",
    },
  ];

  return (
    <RouteLandingPage
      destination={destination}
      heroImage={REGION_IMAGES[destination.region]}
      routeOverview={destination.description}
      travelTips={tips}
      faqs={faqs}
    />
  );
}
