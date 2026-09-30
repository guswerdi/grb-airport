import { Metadata } from "next";
import { RouteLandingPage } from "@/components/RouteLandingPage";
import { routeTitle } from "@/components/RoutePageFactory";
import { BALI_DESTINATIONS } from "@/data/destinations";

/** Hoisted so the metadata export builds its title from the same record. */
const uluwatuDest = BALI_DESTINATIONS.find((d) => d.id === "uluwatu")!;

export const metadata: Metadata = {
  title: routeTitle(uluwatuDest),
  description:
    "Private airport transfer from Bali DPS Ngurah Rai to Uluwatu, Bingin, Padang Padang & Pecatu. Fixed fare from IDR 325,000 ($20 USD). Clifftop resort drop-offs, VIP fleet, toll included.",
  keywords: [
    "bali airport transfer to uluwatu",
    "bali airport to uluwatu taxi cost",
    "dps airport to bulgari bali transfer",
    "denpasar to uluwatu private driver",
    "how to get to uluwatu from bali airport",
  ],
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-uluwatu",
  },
  openGraph: {
    title: "Bali Airport Transfer to Uluwatu (DPS) | VIP Chauffeur & Fixed Rates",
    description:
      "Arrive at Bali's southern clifftop luxury haven in pristine style. Bulgari, Alila Villas, Six Senses, and Bingin beach transfers.",
    url: "https://www.greatbaliairporttransfer.com/bali-airport-transfer-to-uluwatu",
    images: ["/images/dest-uluwatu.jpg"],
  },
};

export default function UluwatuRoutePage() {
  const tips = [
    "Uluwatu is approximately 22 km south of Ngurah Rai Airport. Travel time is usually 45 to 65 minutes.",
    "Roads in the Bukit peninsula can be steep and winding; our drivers are experienced local chauffeurs with smooth, defensive driving standards.",
    "Staying at a 5-star clifftop resort like Bulgari, Alila Villas, Six Senses, or Jumeirah? Our Toyota Innova Zenix comfort transfer is the premier choice for a smooth, stylish arrival.",
  ];

  const faqs = [
    {
      question: "How much is a private transfer from Bali Airport to Uluwatu?",
      answer:
        "Our fixed price to Uluwatu, Bingin, and Padang Padang is IDR 325,000 (~$20 USD) for a Standard Car (Toyota Avanza), IDR 450,000 for a Comfort Car (Innova), and IDR 700,000 for a Big Van (HiAce).",
    },
    {
      question: "Do drivers take us all the way to clifftop villas or beaches?",
      answer:
        "Yes, our chauffeurs drop you off directly at the resort reception or villa driveway and handle all heavy luggage.",
    },
    {
      question: "Can we stop for groceries or an ATM before climbing into Uluwatu?",
      answer:
        "Yes, just let your driver know. We can make a complimentary stop at a supermarket or bank ATM in Jimbaran along the way.",
    },
  ];

  return (
    <RouteLandingPage
      destination={uluwatuDest}
      heroImage="/images/dest-uluwatu.jpg"
      routeOverview="Perched atop dramatic limestone cliffs soaring over the Indian Ocean, Uluwatu features Bali's most breathtaking ocean panoramas, premier surf breaks, and world-class clifftop luxury resorts. Our chauffeur greets you at DPS Airport and ensures a tranquil ride to your southern retreat."
      travelTips={tips}
      faqs={faqs}
    />
  );
}
