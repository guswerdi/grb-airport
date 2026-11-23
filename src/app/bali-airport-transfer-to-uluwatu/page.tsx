import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeDescription, routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

/** Hoisted so the metadata export builds its title from the same record. */
const uluwatuDest = BALI_DESTINATIONS.find((d) => d.id === "uluwatu")!;

export const metadata: Metadata = {
  title: routeTitle(uluwatuDest),
  description: routeDescription(uluwatuDest),
  alternates: {
    canonical: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-uluwatu",
  },
  openGraph: {
    title: "Bali Airport to Uluwatu Private Transfer (DPS) | Fixed From IDR 325K",
    description:
      "Arrive at Bali's southern clifftop luxury haven in pristine style. Bulgari, Alila Villas, Six Senses, Pecatu, and Bingin beach transfers.",
    url: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-uluwatu",
    images: ["/images/dest-uluwatu.jpg"],
  },
};

export default async function UluwatuRoutePage() {
  const fx = await fetchLiveExchangeRates();
  const tips = [
    "Uluwatu is approximately 22 km south of Ngurah Rai Airport (DPS), taking 40–50 minutes off-peak and 55–70 minutes during sunset temple hours.",
    "Roads in the Bukit peninsula (Pecatu, Bingin, Balangan, Padang Padang) can be steep and winding; our drivers are experienced local chauffeurs with 10+ years of defensive driving standards.",
    "Staying at a 5-star clifftop resort like Bulgari, Alila Villas, Six Senses, or Jumeirah? Our Comfort Innova Zenix or VIP Toyota Alphard offers an ultra-smooth arrival.",
    "Need an Uluwatu to airport return transfer? Schedule pickup 4.5 hours before International flights (3.5 hours for Domestic)—online apps like Grab/Gojek are often restricted in Uluwatu cliff zones.",
  ];

  const faqs = [
    {
      question: "How much is a taxi or private transfer from Bali Airport to Uluwatu?",
      answer:
        "Our fixed price from Bali Airport (DPS) to Uluwatu, Pecatu, Bingin, Balangan, and Padang Padang is IDR 325,000 (~$20 USD) per Standard Car (Toyota Avanza, 1–4 pax), IDR 450,000 per Comfort Car (Innova Zenix, 1–5 pax), IDR 700,000 per Big Van (12-seat HiAce), and IDR 1,000,000 per VIP Luxury Toyota Alphard. All fuel, tolls, and airport parking are included.",
    },
    {
      question: "How far is Bali Airport to Uluwatu and how long does the drive take?",
      answer:
        "The distance from Bali Airport (DPS) to Uluwatu is 22 kilometers (13.7 miles). Travel time is 40–50 minutes in off-peak hours and 55–70 minutes during late-afternoon sunset traffic (4:30 PM–7:00 PM) toward Uluwatu Temple.",
    },
    {
      question: "Why book a private transfer to Uluwatu instead of Grab or an airport taxi?",
      answer:
        "Grab/Gojek cannot pick up directly at the DPS arrivals curb, and many ride-hail zones around Uluwatu, Bingin, and Pecatu restrict app-based return pickups. Our chauffeur meets you at the Circle K exit gate with a name sign and guarantees reliable both-way service.",
    },
    {
      question: "Do drivers take us all the way to Bingin, Pecatu, and clifftop villas?",
      answer:
        "Yes, our chauffeurs drop you off directly at your resort reception or villa driveway in Uluwatu, Pecatu, Bingin, Padang Padang, or Balangan and handle all heavy luggage and surfboards.",
    },
    {
      question: "Can we stop for groceries, a SIM card, or an ATM before climbing into Uluwatu?",
      answer:
        "Yes, just let your driver know. We make a complimentary quick stop at a trusted bank ATM, Telkomsel SIM shop, or supermarket in Jimbaran along the way at zero extra charge.",
    },
    {
      question: "How do I pay and is a deposit required for an Uluwatu airport transfer?",
      answer:
        "Zero deposit is required. Pay cash on drop-off at your Uluwatu hotel/villa (IDR, AUD, USD, or EUR) or prepay online prior to pickup via Visa, Mastercard, Wise, or PayPal link.",
    },
    {
      question: "Can I book an Uluwatu to airport return transfer back to DPS?",
      answer:
        "Yes—an Uluwatu to Bali Airport (DPS) departure transfer costs the exact same fixed rate (from IDR 325,000 per car) with free 24-hour cancellation. We recommend leaving Uluwatu 4.5 hours before International flights (3.5 hours for Domestic).",
    },
  ];

  return (
    <RouteLandingPage
      destination={uluwatuDest}
      heroImage="/images/dest-uluwatu.jpg"
      routeOverview="Perched atop dramatic limestone cliffs 22 km south of DPS Airport, Uluwatu (covering Pecatu, Bingin, Padang Padang, and Balangan) features Bali's most breathtaking Indian Ocean panoramas, world-class surf breaks, and iconic 5-star clifftop resorts. Our chauffeur greets you at the DPS Circle K exit gate for a seamless southern ride."
      travelTips={tips}
      faqs={faqs}
      exchangeRates={fx.rates}
    />
  );
}
