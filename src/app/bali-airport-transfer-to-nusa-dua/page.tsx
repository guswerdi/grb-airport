import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeDescription, routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";

export const revalidate = 21600;

/** Hoisted so the metadata export builds its title from the same record. */
const nusaDuaDest = BALI_DESTINATIONS.find((d) => d.id === "nusa-dua")!;

export const metadata: Metadata = {
  title: routeTitle(nusaDuaDest),
  description: routeDescription(nusaDuaDest),
  alternates: {
    canonical: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-nusa-dua",
  },
  openGraph: {
    title: "Bali Airport to Nusa Dua Private Transfer (DPS) | Fixed From IDR 250K",
    description:
      "Arrive at Nusa Dua 5-star beachfront resorts via Bali Mandara ocean tollway. Mulia, Grand Hyatt, Ayodya, St. Regis, Sofitel.",
    url: "https://greatbaliairporttransfer.com/bali-airport-transfer-to-nusa-dua",
    images: ["/images/dest-uluwatu.jpg"],
  },
};

export default async function NusaDuaRoutePage() {
  const fx = await fetchLiveExchangeRates();
  const tips = [
    "Nusa Dua is 14 km from Bali Airport (DPS). Via the Bali Mandara Ocean Tollway, the drive takes only 20–25 minutes off-peak and 25–35 minutes during peak hours.",
    "The electronic toll fee for the Bali Mandara ocean highway is 100% included in our fixed rate—you never pay extra for toll cards or airport parking.",
    "Headed to the gated ITDC resort enclave (Grand Hyatt, Ayodya Resort Bali, Melia, St. Regis, Sofitel, Merusaka, or The Mulia)? Our drivers have full security-checkpoint clearance straight to your lobby.",
    "Returning from Nusa Dua to Bali Airport? Schedule hotel pickup 3.5–4 hours before International flights (2.5–3 hours for Domestic).",
  ];

  const faqs = [
    {
      question: "How much is a taxi or private transfer from Bali Airport to Nusa Dua?",
      answer:
        "Our fixed all-inclusive rate from Bali Airport (DPS) to Nusa Dua (ITDC beachfront enclave) is IDR 250,000 (~$16 USD) per Standard Car (Toyota Avanza, 1–4 pax), IDR 300,000 per Comfort Car (Innova Zenix, 1–5 pax), IDR 600,000 per Big Van (12-seat HiAce), and IDR 750,000 per VIP Luxury Toyota Alphard. For Nusa Dua Hills / Sawangan (Apurva Kempinski, Ritz-Carlton, Hilton), rates start from IDR 275,000. Bali Mandara Ocean Tollway fees are 100% included.",
    },
    {
      question: "How far is Bali Airport to Nusa Dua and how long does the drive take?",
      answer:
        "The distance from Bali Airport (DPS) to Nusa Dua is 14 kilometers (8.7 miles) across the over-water Bali Mandara Tollway. The drive takes just 20–25 minutes off-peak and 25–35 minutes during peak hours.",
    },
    {
      question: "Why book a private transfer to Nusa Dua instead of Grab or an airport taxi?",
      answer:
        "Grab and metered airport taxis charge the Bali Mandara Ocean Tollway fee and airport exit surcharge separately on top of the fare, and Grab cannot pick up at the immediate arrivals curb. Our chauffeur greets you at the Circle K exit gate with toll and parking 100% included in one fixed IDR 250,000 fare.",
    },
    {
      question: "Do you drop off at Grand Hyatt, Ayodya Resort, The Mulia, and Apurva Kempinski?",
      answer:
        "Yes—we provide direct lobby drop-offs to all ITDC resorts (Grand Hyatt, Ayodya Resort Bali, St. Regis, Sofitel, Melia, Merusaka, Westin), Tanjung Benoa resorts (Conrad Bali), and Sawangan clifftop hotels (The Apurva Kempinski, Ritz-Carlton, Hilton).",
    },
    {
      question: "Can we add a baby car seat for our family resort stay in Nusa Dua?",
      answer:
        "Yes! Pre-installed sanitized baby car seats (0–2 yrs) and child booster seats (3–7 yrs) are available for IDR 50,000 per seat per trip when requested at booking.",
    },
    {
      question: "How do I pay and is a deposit required for a Nusa Dua airport transfer?",
      answer:
        "Zero deposit is required. Pay cash to your chauffeur upon arrival at your Nusa Dua resort (IDR, AUD, USD, or EUR) or prepay online before pickup via Visa, Mastercard, Wise, or PayPal link.",
    },
    {
      question: "Can we book a return transfer from Nusa Dua back to Bali Airport (DPS)?",
      answer:
        "Yes—a Nusa Dua to Bali Airport departure transfer costs the exact same fixed rate (from IDR 250,000 per car) with free 24-hour cancellation. We recommend leaving Nusa Dua 3.5–4 hours before International flights (2.5–3 hours for Domestic).",
    },
  ];

  return (
    <RouteLandingPage
      destination={nusaDuaDest}
      heroImage="/images/dest-uluwatu.jpg"
      routeOverview="Nusa Dua is Bali's premier manicured 5-star beachfront enclave just 14 km from DPS Airport, renowned for calm ocean swimming lagoons, championship golf, and iconic resorts (Grand Hyatt, Ayodya, St. Regis, Sofitel, The Mulia). Cruise over the scenic Bali Mandara Ocean Tollway with all toll fees included."
      travelTips={tips}
      faqs={faqs}
      exchangeRates={fx.rates}
    />
  );
}
