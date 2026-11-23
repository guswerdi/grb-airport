import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeDescription, routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

/** Hoisted so the metadata export builds its title from the same record. */
const ubudDest = BALI_DESTINATIONS.find((d) => d.id === "ubud")!;

export const metadata: Metadata = {
  title: routeTitle(ubudDest),
  description: routeDescription(ubudDest),
  alternates: {
    canonical: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-ubud",
  },
  openGraph: {
    title: "Bali Airport to Ubud Private Transfer (DPS) | Fixed Rates From IDR 400K",
    description:
      "Arrive stress-free in Ubud. Personal chauffeur meet & greet at the DPS Circle K exit gate, free flight tracking, toll & parking included.",
    url: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-ubud",
    images: ["/images/dest-ubud.jpg"],
  },
};

export default async function UbudRoutePage() {
  const fx = await fetchLiveExchangeRates();
  const tips = [
    "Distance from Bali Airport (DPS) to Ubud is 38 km, taking 60–75 minutes off-peak and 75–95 minutes during peak afternoon rush (3 PM–7 PM).",
    "Our drivers take the Ida Bagus Mantra Bypass or Tollway to avoid the congested Batubulan town center.",
    "If your villa is located down a pedestrian-only lane (common in central Ubud, Sayan, or Penestanan), your chauffeur will coordinate with villa staff and assist carrying your luggage right to your villa door.",
    "Need to buy a local Telkomsel tourist SIM card or withdraw Rupiah cash from a bank ATM? Just notify your chauffeur and we will make a quick stop at no extra charge.",
    "Returning from Ubud to Bali Airport (DPS)? Schedule your hotel pickup 5–5.5 hours before International flights (4–4.5 hours for Domestic).",
  ];

  const faqs = [
    {
      question: "How much is a taxi or private transfer from Bali Airport to Ubud?",
      answer:
        "Our guaranteed fixed price from Bali Airport (DPS) to Central Ubud is IDR 400,000 (~$25 USD) per Standard Car (Toyota Avanza, 1–4 pax), IDR 500,000 per Comfort Car (Innova Zenix, 1–5 pax), IDR 800,000 per Big Van (12-seat HiAce), and IDR 1,200,000 per VIP Luxury Toyota Alphard. For Tegallalang and Payangan north of Ubud, rates start from IDR 450,000. All tolls, airport parking, and fuel are included with zero midnight surcharge.",
    },
    {
      question: "What is the distance from Bali Airport to Ubud and how far is the drive?",
      answer:
        "The distance from Bali Airport (DPS) to Ubud is approximately 38 kilometers (23.6 miles). Travel time is 60–75 minutes in off-peak morning or evening hours, and 75–95 minutes during peak afternoon traffic (3 PM–7 PM).",
    },
    {
      question: "Why book a private transfer to Ubud instead of Grab or an airport taxi?",
      answer:
        "Grab and Gojek cannot pick up directly at the DPS arrivals curb—passengers must carry bags to the ride-hail lounge and pay airport pickup fees, peak-hour surge, and tolls extra (plus some drivers refuse single-way night returns from Ubud). Our chauffeur greets you right at the Circle K exit gate holding your name sign at a fixed all-inclusive rate.",
    },
    {
      question: "Where do I meet my driver at Bali Airport for Ubud?",
      answer:
        "After immigration, baggage claim, and customs, walk straight out the terminal doors to the Circle K minimart at the DPS exit gate. Your chauffeur waits there with your personalized name sign (driver WhatsApp and plate number sent 2 hours before landing).",
    },
    {
      question: "Will my driver wait if my flight into Bali is delayed?",
      answer:
        "Yes! We track your flight number live and include 60 minutes of complimentary waiting time from actual touchdown at zero extra charge.",
    },
    {
      question: "How do I pay and is a deposit required for a Bali Airport to Ubud transfer?",
      answer:
        "Zero deposit is required. Pay cash on drop-off in Ubud (IDR, AUD, USD, or EUR) or prepay online prior to pickup via Visa, Mastercard, Wise, or PayPal link sent on WhatsApp.",
    },
    {
      question: "Can I book a return transfer from Ubud to Bali Airport (DPS)?",
      answer:
        "Yes—an Ubud to Bali Airport departure transfer costs the exact same fixed rate (from IDR 400,000 per Standard Car) with free 24-hour cancellation. We recommend leaving Ubud 5–5.5 hours before International flights and 4–4.5 hours before Domestic flights.",
    },
  ];

  return (
    <RouteLandingPage
      destination={ubudDest}
      heroImage="/images/dest-ubud.jpg"
      routeOverview="The scenic 38 km journey from Denpasar Ngurah Rai Airport (DPS) north to Ubud transitions from coastal urban views into emerald jungle valleys, terraced rice paddies, and stone-carved Hindu shrines. Enjoy peace of mind knowing your private Balinese chauffeur is waiting for you at the Circle K arrivals exit gate."
      travelTips={tips}
      faqs={faqs}
      exchangeRates={fx.rates}
    />
  );
}
