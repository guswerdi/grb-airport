import type { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import {
  DEPARTURE_LEAVE_GUIDE,
  fillPrice,
  formatPrice,
  type Destination,
} from "@/data/destinations";
import { PAYMENT_POLICY } from "@/data/policies";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

const BASE = "https://greatbaliairporttransfer.com";

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

/**
 * Meta description for a route page.
 *
 * Each destination carries its own hand-written `metaDescription`; this only
 * expands the `{price}` token with its live Standard-car fare. All 13 generated
 * route pages used to share one built sentence ("Fast private transfer from Bali
 * Airport to X. Fixed fare from IDR Y. Meet & greet at DPS arrivals, pristine AC
 * cars.") with only the name and number swapped. Google treats near-duplicate
 * descriptions much like duplicate content and will often discard them in favour
 * of a snippet it pulls from the page body, so the templated text was doing no
 * work.
 */
export function routeDescription(dest: Destination): string {
  return fillPrice(dest.metaDescription, dest.rates.standard);
}

/** Shared metadata for all hardcoded route landing pages. */
export function routeMetadata(dest: Destination): Metadata {
  return {
    title: routeTitle(dest),
    description: routeDescription(dest),
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

/** Shared page body for all generated route landing pages. */
export async function GenericRouteContent({ destination }: { destination: Destination }) {
  const fx = await fetchLiveExchangeRates();
  const shortName = destination.metaName || destination.name.split("(")[0].trim();
  const leaveGuide = DEPARTURE_LEAVE_GUIDE[destination.id] || {
    internationalBefore: "3.5 – 4.5 hrs",
    domesticBefore: "2.5 – 3.5 hrs",
  };
  const hotelSample = destination.popularHotels.slice(0, 3).join(", ");

  const regionTip =
    destination.region === "North & East Bali"
      ? `For this ${destination.durationMinutes} cross-island drive to ${shortName}, our Toyota Innova Zenix (Comfort Car) gives extra legroom for winding mountain and coastal roads, with complimentary coffee/ATM rest stops on request.`
      : destination.region === "Central Bali"
      ? `Village and hillside lanes around ${shortName} can be narrow; share your exact villa pin via WhatsApp before landing so your chauffeur chooses the cleanest access road (HiAce vans may drop you off at the lane entrance where villas forbid wide vans).`
      : `Your chauffeur uses the Bali Mandara Ocean Tollway or bypass arterial roads when beneficial—all electronic toll charges, DPS parking fees, and fuel are 100% included.`;

  const tips = [
    `${destination.name} is roughly ${destination.distanceKm} km from Ngurah Rai Airport (DPS), taking ${destination.durationMinutes} in typical traffic.`,
    destination.trafficTip,
    regionTip,
    `Meet your driver directly outside the DPS arrivals exit at the Circle K minimart, where they wait with your name sign—60 minutes free wait included, with zero 12 AM–5 AM midnight surcharge.`,
    `Returning from ${shortName} to Bali Airport later? Schedule pickup ${leaveGuide.internationalBefore} before International flights or ${leaveGuide.domesticBefore} before Domestic flights.`,
  ];

  const faqs = [
    {
      question: `How much is a private transfer from Bali Airport (DPS) to ${shortName}?`,
      answer: `Flat one-way rates per vehicle are ${formatPrice(destination.rates.standard, "IDR")} (~${formatPrice(destination.rates.standard, "USD", fx.rates)}) for a Standard Car (Avanza/Veloz, 1–4 pax), ${formatPrice(destination.rates.comfort, "IDR")} for a Comfort Car (Innova Zenix, 1–5 pax), ${formatPrice(destination.rates.van, "IDR")} for a 12-seat HiAce van, and ${formatPrice(destination.rates.luxury, "IDR")} for a VIP Luxury Toyota Alphard (1–5 pax). Same flat rate 24/7 with zero midnight surcharge.`,
    },
    {
      question: `How far is Bali Airport to ${shortName} and how long does the drive take?`,
      answer: `The distance from Bali Airport (DPS) to ${shortName} is approximately ${destination.distanceKm} km. The drive takes ${destination.offPeakMinutes} in off-peak hours and ${destination.peakMinutes} during peak afternoon traffic along the route to ${hotelSample}. ${destination.trafficTip}`,
    },
    {
      question: `Is a pre-booked transfer better than Grab or an airport taxi to ${shortName}?`,
      answer: `Yes. Ride-hailing apps (Grab/Gojek) cannot pick up at the immediate DPS arrivals exit curb—passengers must walk with bags to the ride-hail lounge and pay airport pickup surcharges, peak surge, and tolls extra. Our chauffeur meets you right at the Circle K exit gate with a 100% fixed all-inclusive fare.`,
    },
    {
      question: `Where do I meet my driver at Bali Airport for ${shortName}?`,
      answer: `Clear immigration, baggage claim, and customs, then walk straight outside to the Circle K minimart right at the DPS exit gate. Your driver waits there with your name sign (WhatsApp number and car plate sent 2 hours before arrival), with 60 minutes complimentary waiting time from landing.`,
    },
    {
      question: `How do I pay and is a deposit needed for a ${shortName} transfer?`,
      answer: `Zero deposit is required. ${PAYMENT_POLICY.shortSummary}`,
    },
    {
      question: `Can I stop at an ATM, SIM kiosk, or add a baby seat on the way to ${shortName}?`,
      answer: `Yes. Quick en-route stops at trusted bank ATMs (BCA/Mandiri), official Telkomsel SIM kiosks, or licensed money changers are completely free. Pre-installed baby seats (0–2 yrs) or child boosters (3–7 yrs) can be added for IDR 50,000 per seat per trip.`,
    },
    {
      question: `Can I book a ${shortName} to Bali Airport return transfer back to DPS?`,
      answer: `Yes—${shortName} to Bali Airport (DPS) departure transfers cost the exact same fixed rate (${formatPrice(destination.rates.standard, "IDR")} Standard Car) with free 24-hour cancellation. We recommend leaving ${shortName} ${leaveGuide.internationalBefore} prior to International flights (${leaveGuide.domesticBefore} for Domestic).`,
    },
  ];

  return (
    <RouteLandingPage
      destination={destination}
      heroImage={REGION_IMAGES[destination.region]}
      routeOverview={destination.description}
      travelTips={tips}
      faqs={faqs}
      exchangeRates={fx.rates}
    />
  );
}
