import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeDescription, routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

/** Hoisted so the metadata export builds its title from the same record. */
const cangguDest = BALI_DESTINATIONS.find((d) => d.id === "canggu")!;

export const metadata: Metadata = {
  title: routeTitle(cangguDest),
  description: routeDescription(cangguDest),
  alternates: {
    canonical: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-canggu",
  },
  openGraph: {
    title: "Bali Airport to Canggu Private Transfer (DPS) | Fixed From IDR 325K",
    description:
      "Direct private transfer to Canggu, Berawa, Echo Beach, and Pererenan. Surfboard friendly vans and bypass routing.",
    url: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-canggu",
    images: ["/images/dest-seminyak.jpg"],
  },
};

export default async function CangguRoutePage() {
  const fx = await fetchLiveExchangeRates();
  const tips = [
    "The distance from Bali Airport (DPS) to Canggu is 19 km, taking 45–55 minutes off-peak and 60–80 minutes during peak afternoon rush.",
    "Canggu shortcut and Jl. Pantai Berawa get congested late afternoon; our experienced drivers use alternate routes to reach Berawa, Batu Bolong, Echo Beach, and Pererenan villas smoothly.",
    "Traveling with surfboards or bulky beach luggage? Our Toyota HiAce Premio van easily accommodates longboards up to 7'6\" and multiple board bags inside the cabin.",
    "Returning from Canggu to Bali Airport? Schedule your villa pickup 4.5–5 hours before International flights (3.5–4 hours for Domestic).",
  ];

  const faqs = [
    {
      question: "How much is a taxi or private transfer from Bali Airport to Canggu?",
      answer:
        "Our fixed price from Bali Airport (DPS) to Canggu (including Berawa, Batu Bolong, Echo Beach, and Pererenan) is IDR 325,000 (~$20 USD) per Standard Car (Toyota Avanza, 1–4 pax), IDR 450,000 per Comfort Car (Innova Zenix, 1–5 pax), IDR 700,000 per Big Van (12-seat HiAce), and IDR 1,000,000 per VIP Luxury Toyota Alphard. All airport parking, fuel, and 60 minutes free wait are included.",
    },
    {
      question: "How far is Bali Airport to Canggu and how long does the drive take?",
      answer:
        "Bali Airport (DPS) to Canggu is approximately 19 kilometers (11.8 miles). The drive takes 45–55 minutes during off-peak hours (morning or late night) and 60–80 minutes during peak afternoon traffic (3:30 PM–7:30 PM).",
    },
    {
      question: "Why book a private transfer to Canggu instead of Grab or an airport taxi?",
      answer:
        "Grab and Gojek cannot pick up at the immediate DPS arrivals exit curb—passengers must walk with bags and surfboards to the airport ride-hail lounge and pay airport fees plus heavy afternoon Canggu traffic surge pricing. Our chauffeur greets you right outside customs at the Circle K exit gate at a fixed IDR 325,000 rate.",
    },
    {
      question: "Can I bring my surfboard bag in the car to Canggu?",
      answer:
        "Yes! For 1–2 standard shortboards (up to 6'4\"), our Avanza/Veloz or Innova Zenix fits them with folded rear seats. For longboards up to 7'6\" or groups of surfers, book our 12-seat Toyota HiAce Premio van.",
    },
    {
      question: "Are there extra charges if the Canggu shortcut has heavy traffic or my flight lands late?",
      answer:
        "Never. Our pricing is 100% fixed per vehicle 24/7 regardless of traffic conditions, route adjustments, or midnight arrivals—plus 60 minutes of free waiting time from landing.",
    },
    {
      question: "How do I pay and is a deposit required for a Canggu airport pickup?",
      answer:
        "Zero deposit is required. Pay cash to your chauffeur upon arrival at your Canggu villa (IDR, AUD, USD, or EUR) or prepay online via Visa, Mastercard, Wise, or PayPal link.",
    },
    {
      question: "Can I book a return transfer from Canggu to Bali Airport (DPS)?",
      answer:
        "Yes—a Canggu to Bali Airport departure transfer costs the exact same fixed rate (from IDR 325,000 per car) with free 24-hour cancellation. Because of Canggu shortcut traffic, we recommend leaving 4.5–5 hours before International flights (3.5–4 hours for Domestic).",
    },
  ];

  return (
    <RouteLandingPage
      destination={cangguDest}
      heroImage="/images/dest-seminyak.jpg"
      routeOverview="Canggu (spanning Berawa, Batu Bolong, Echo Beach, and Pererenan) is Bali's epicenter of surfing, digital nomads, beach clubs (Finns, Atlas), and oceanfront villas just 19 km from DPS Airport. Pre-booking your airport pickup ensures a stress-free ride straight from the Circle K exit gate to your villa doorstep."
      travelTips={tips}
      faqs={faqs}
      exchangeRates={fx.rates}
    />
  );
}
