/**
 * Single source of truth for payment methods, core USPs, and concise direct answers.
 * Consumed by UI components, JSON-LD, Terms & Policies, and /llms*.txt so
 * every page and AI endpoint states identical, unambiguous facts.
 */

export const PAYMENT_POLICY = {
  headline: "Zero deposit to book. Pay cash to your driver on drop-off or prepay online before pickup.",
  shortSummary:
    "Cash on drop-off (IDR, AUD, USD, EUR) or online prepay link before pickup (Visa, Mastercard, Wise, PayPal). Drivers do not carry card readers in vehicles.",
  cashOnArrival: {
    title: "Option A: Cash to Driver (On Drop-Off)",
    currencies: ["IDR", "AUD", "USD", "EUR"],
    note: "Pay cash directly to your chauffeur when you arrive at your hotel or villa. Zero deposit or card hold required. Note: drivers do not carry mobile card machines inside vehicles.",
  },
  onlinePrepay: {
    title: "Option B: Prepay Online (Before Pickup)",
    methods: ["Visa", "Mastercard", "Wise", "PayPal"],
    note: "Prefer cashless? Request an encrypted invoice link via WhatsApp after confirming your booking and pay online prior to pickup.",
  },
  cancellationRule:
    "100% free cancellation and schedule changes up to 24 hours before pickup (full refund within 3 business days on prepaid bookings).",
};

export interface UspItem {
  id: string;
  badge: string;
  title: string;
  summary: string;
}

export const CORE_USPS: UspItem[] = [
  {
    id: "zero-deposit",
    badge: "No Card Hold",
    title: "Zero Deposit • Pay Cash on Drop-Off",
    summary:
      "Reserve instantly with zero upfront payment. Pay cash to your driver in IDR, AUD, USD, or EUR—or request an online Card/Wise/PayPal link.",
  },
  {
    id: "all-inclusive-24-7",
    badge: "24/7 Same Rate",
    title: "All-Inclusive Flat Fares • Zero Midnight Fee",
    summary:
      "Bali Mandara toll, DPS parking, fuel, and 12 AM–5 AM midnight pickups are 100% included. No meter surprises or peak-hour surge.",
  },
  {
    id: "circle-k-meet",
    badge: "Zero Terminal Walk",
    title: "Circle K Exit-Gate Meet & 60-Min Free Wait",
    summary:
      "Meet your driver right at the Circle K minimart at the DPS exit gate with your name sign—plus 60 minutes free grace wait from touchdown.",
  },
  {
    id: "family-surf-ready",
    badge: "Family & Surf",
    title: "Pre-Installed Baby Seats & Surfboard Vans",
    summary:
      "Request sanitized baby (0–2 yrs) or booster seats (3–7 yrs) at IDR 50k/seat, book 12-seat HiAce vans for 7'6\" boards, or ask for a free ATM/SIM stop.",
  },
];

export interface DirectAnswerItem {
  question: string;
  answer: string;
}

export const HOME_DIRECT_ANSWERS: DirectAnswerItem[] = [
  {
    question: "How much is a private Bali airport transfer?",
    answer:
      "Fixed rates per vehicle (not per person) start at IDR 250,000 (~$16 USD) to Kuta, Seminyak, Jimbaran, and Nusa Dua; IDR 275,000 to Sanur; IDR 325,000 to Canggu and Uluwatu; and IDR 400,000 to Ubud.",
  },
  {
    question: "Where do I meet my driver at Bali Airport (DPS)?",
    answer:
      "Clear immigration, baggage claim, and customs, then walk straight outside the exit doors to the Circle K minimart at the exit gate. Your driver waits there holding your name sign (WhatsApp contact & plate sent 2 hours prior).",
  },
  {
    question: "How can I pay—and is a deposit required?",
    answer:
      "No deposit is required. Pay cash on drop-off in IDR, AUD, USD, or EUR, or prepay before pickup via Visa, Mastercard, Wise, or PayPal link sent on WhatsApp (drivers do not carry card readers in cars).",
  },
  {
    question: "What if my flight is delayed or arrives after midnight?",
    answer:
      "We operate 24/7 with zero midnight surcharge and include 60 minutes of complimentary wait time from actual landing. If customs or e-VoA takes longer, message your driver using free airport Wi-Fi.",
  },
  {
    question: "Do you offer baby seats, surfboards, and hotel-to-airport departures?",
    answer:
      "Yes: baby/booster seats are IDR 50,000 per seat, HiAce vans carry up to 12 passengers and 7'6\" surfboards, and hotel-to-DPS departure rides cost the exact same fixed rate with zero early-morning fee.",
  },
];

export const TRANSFER_INCLUSIONS: string[] = [
  "100% private air-conditioned vehicle & fuel (flat price per car, never per person)",
  "Licensed English-speaking Balinese chauffeur & full luggage handling",
  "Circle K exit-gate meet & greet at DPS Airport with your personalized name sign",
  "60-minute complimentary grace wait from touchdown + real-time flight delay tracking",
  "Bali Mandara Ocean Tollway electronic fees & official DPS airport parking fees",
  "24/7 operation with zero midnight or 4 AM early-morning surcharge",
  "Complimentary quick en-route stop at a bank ATM (BCA/Mandiri), Telkomsel SIM kiosk, or money changer",
];

export const TRANSFER_EXCLUSIONS: string[] = [
  "Pre-installed baby car seat (0–2 yrs) or child booster (3–7 yrs): optional add-on at IDR 50,000 per seat",
  "Extended sightseeing detours or multi-hour stops off the direct route (book a 10-Hour Private Charter instead)",
  "Unannounced waiting beyond 60 mins after landing (waived when you message your driver via free airport Wi-Fi during long customs queues)",
  "Chilled bottled mineral water (included on 10-Hour Private Driver Charters; not standard point-to-point airport transfers)",
  "Fast-boat tickets, temple/attraction entrance fees, and optional driver gratuity",
];
