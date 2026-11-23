import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeDescription, routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

/** Hoisted so the metadata export builds its title from the same record. */
const seminyakDest = BALI_DESTINATIONS.find((d) => d.id === "seminyak")!;

export const metadata: Metadata = {
  title: routeTitle(seminyakDest),
  description: routeDescription(seminyakDest),
  alternates: {
    canonical: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-seminyak",
  },
  openGraph: {
    title: "Bali Airport to Seminyak Private Transfer (DPS) | Fixed From IDR 250K",
    description:
      "Direct private transfer to Seminyak beach clubs & luxury villas. Skip taxi haggling at DPS airport.",
    url: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-seminyak",
    images: ["/images/dest-seminyak.jpg"],
  },
};

export default async function SeminyakRoutePage() {
  const fx = await fetchLiveExchangeRates();
  const tips = [
    "Bali Airport (DPS) to Seminyak distance is 12 km, taking 25–35 minutes off-peak and 40–55 minutes during sunset peak hours.",
    "During sunset rush hour (5 PM - 7:30 PM), Sunset Road and Jl. Kayu Aya (Eat Street) experience heavy traffic. Our drivers use quiet backstreets to reach your villa quicker.",
    "Heading straight to Ku De Ta, Potato Head, W Bali, or Petitenget? We carry your luggage directly into the hotel lobby or villa entrance.",
    "Returning from Seminyak to Bali Airport later? Schedule hotel pickup 4–4.5 hours before International flights (3–3.5 hours for Domestic).",
  ];

  const faqs = [
    {
      question: "How much is a taxi or private transfer from Bali Airport to Seminyak?",
      answer:
        "Our fixed price from Bali Airport (DPS) to Seminyak and Petitenget is IDR 250,000 (~$16 USD) per Standard Car (Toyota Avanza, 1–4 pax), IDR 300,000 per Comfort Car (Innova Zenix, 1–5 pax), IDR 600,000 per Big Van (12-seat HiAce), and IDR 750,000 per VIP Luxury Toyota Alphard. All airport parking, fuel, and 60 minutes free wait are included with zero midnight surcharge.",
    },
    {
      question: "What is the Bali Airport to Seminyak distance and travel time?",
      answer:
        "The distance from Bali Airport (DPS) to Seminyak is 12 kilometers (7.5 miles). The drive takes 25–35 minutes in off-peak traffic and 40–55 minutes during peak sunset hours (4:30 PM–7:30 PM) around Sunset Road and Eat Street.",
    },
    {
      question: "Why pre-book a private transfer to Seminyak instead of Grab at Bali Airport?",
      answer:
        "Grab and Gojek cannot pick up at the immediate DPS arrivals exit curb—passengers must walk with luggage to the airport ride-hail lounge and pay airport surcharges plus sunset surge pricing. Our chauffeur waits right outside the exit doors at Circle K with your name board at a flat IDR 250,000 rate.",
    },
    {
      question: "Where do I meet my driver at Bali Airport for Seminyak?",
      answer:
        "Walk out of DPS customs straight to the Circle K minimart at the arrivals exit gate, where your chauffeur waits holding a sign with your name (driver WhatsApp & car plate sent 2 hours before landing).",
    },
    {
      question: "How do I pay and is a deposit required for a Seminyak transfer?",
      answer:
        "Zero deposit is required. Pay cash on drop-off in Seminyak (IDR, AUD, USD, or EUR) or prepay online before pickup via Visa, Mastercard, Wise, or PayPal link.",
    },
    {
      question: "Can we stop at an ATM, SIM card shop, or add a baby seat on the way to Seminyak?",
      answer:
        "Yes—a quick stop at an official bank ATM or Telkomsel SIM shop on the route to Seminyak is completely free. Pre-installed baby or booster seats can be added for IDR 50,000 per seat.",
    },
    {
      question: "Can I book a return transfer from Seminyak to Bali Airport (DPS)?",
      answer:
        "Yes—a Seminyak to Bali Airport departure transfer is the exact same fixed rate (from IDR 250,000 per car) with free 24-hour cancellation. Leave Seminyak 4–4.5 hours before International flights (3–3.5 hours for Domestic).",
    },
  ];

  return (
    <RouteLandingPage
      destination={seminyakDest}
      heroImage="/images/dest-seminyak.jpg"
      routeOverview="Seminyak is Bali's premier stylish beach playground, just 12 km north of DPS Airport and boasting iconic sunset beach clubs (Potato Head, Ku De Ta), award-winning dining along Eat Street, and private pool villas. Arrive relaxed with our Circle K exit-gate meet-and-greet service."
      travelTips={tips}
      faqs={faqs}
      exchangeRates={fx.rates}
    />
  );
}
