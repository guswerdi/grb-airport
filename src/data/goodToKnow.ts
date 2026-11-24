export interface GoodToKnowItem {
  id: string;
  category:
    | "Arrival & Meeting"
    | "Pricing & Tolls"
    | "Flight Tracking"
    | "Vehicles & Luggage"
    | "Payment & Booking"
    | "Traveler Perks";
  title: string;
  keyFact: string;
  summary: string;
  iconName: string;
  badge?: string;
  faqQuestion: string;
}

export const GOOD_TO_KNOW_ITEMS: GoodToKnowItem[] = [
  {
    id: "meeting-point",
    category: "Arrival & Meeting",
    title: "Official Meeting Point: Circle K at DPS Exit Gate",
    keyFact: "Your driver waits directly outside the arrivals exit at the Circle K minimart holding your name sign.",
    summary:
      "Clear immigration, baggage claim, and customs, then follow the green exit signs out of the terminal straight to the Circle K minimart at the exit gate. Your driver's name, car plate, and live WhatsApp number arrive 2 hours before landing.",
    iconName: "MapPin",
    badge: "Arrival Essential",
    faqQuestion: "Where do I meet my driver at Bali Airport (DPS)?",
  },
  {
    id: "flight-delays",
    category: "Flight Tracking",
    title: "Live Flight Tracking & 60-Minute Free Wait",
    keyFact: "60 minutes complimentary grace wait from actual touchdown, plus free rescheduling if airlines delay.",
    summary:
      "We track your flight in real time and include 60 minutes free wait from actual touchdown for e-VoA, immigration, and baggage. Flight delayed or moved? Message us on WhatsApp anytime to adjust pickup with zero fee.",
    iconName: "Plane",
    badge: "Flexible",
    faqQuestion: "What happens if my flight to Bali is delayed or arrives early?",
  },
  {
    id: "all-inclusive-pricing",
    category: "Pricing & Tolls",
    title: "All-Inclusive Flat Fares • Zero Midnight Fee",
    keyFact: "Bali Mandara Ocean Toll, DPS airport parking, fuel, and 24/7 midnight pickups (12 AM–5 AM) are 100% included.",
    summary:
      "Quoted per-vehicle rates (never per person) cover every road cost—including Bali Mandara toll fees, DPS exit parking, petrol, and late-night or pre-dawn pickups. Your WhatsApp confirmation states the exact final total.",
    iconName: "ShieldCheck",
    badge: "Zero Hidden Fees",
    faqQuestion: "Are tolls, airport parking, and late-night pickup fees included?",
  },
  {
    id: "zero-deposit-payment",
    category: "Payment & Booking",
    title: "Zero Deposit • Cash on Drop-Off or Online Link",
    keyFact: "No deposit or card hold needed. Pay cash to your driver on drop-off (IDR, AUD, USD, EUR) or prepay online before pickup.",
    summary:
      "Confirm in seconds with zero upfront deposit. Settle in cash directly with your driver at your hotel in IDR, AUD, USD, or EUR (drivers do not carry mobile card machines inside cars), OR request an online Visa, Mastercard, Wise, or PayPal link via WhatsApp before pickup.",
    iconName: "Banknote",
    badge: "Clear Payment Rules",
    faqQuestion: "What payment methods are accepted and is a deposit required?",
  },
  {
    id: "taxi-vs-prebook",
    category: "Arrival & Meeting",
    title: "Pre-Booked Driver vs. Terminal Taxis & Grab/Gojek",
    keyFact: "Skip terminal taxi haggling (often 2x–3x flat rates) and peak queues at the Grab/Gojek pickup lounge.",
    summary:
      "Unofficial terminal touts frequently quote IDR 500,000+ for short Kuta/Seminyak rides, while Grab/Gojek drivers cannot pick up at the main exit curb and require walking with bags to the rideshare lounge. Pre-booking locks in a flat rate meeting right at Circle K.",
    iconName: "Car",
    badge: "Save Time",
    faqQuestion: "Why pre-book instead of taking an airport taxi or Grab/Gojek?",
  },
  {
    id: "free-stops",
    category: "Traveler Perks",
    title: "Free ATM, Telkomsel SIM & Money Changer Stop",
    keyFact: "Ask for a free quick stop en route at bank ATMs (BCA/Mandiri), official SIM kiosks, or licensed money changers.",
    summary:
      "Need IDR cash, a tourist SIM/eSIM, or bottled drinks before villa check-in? Your English-speaking driver will make a brief en-route stop at trusted bank ATMs, official Telkomsel counters, or licensed money changers at zero extra charge.",
    iconName: "Smartphone",
    badge: "Free Inclusion",
    faqQuestion: "Can my driver stop at an ATM, SIM kiosk, or money changer on the way?",
  },
  {
    id: "luggage-fleet",
    category: "Vehicles & Luggage",
    title: "Luggage, Golf Bag & Surfboard Capacities",
    keyFact: "Standard MPVs hold 3 large suitcases; Innova Zenix fits 4; 12-seat HiAce Premio vans carry 10 bags + surfboards.",
    summary:
      "Standard MPVs (Avanza/Veloz) seat 4 passengers with 3 large bags; Comfort SUVs (Innova Zenix) carry 5 with 4 large bags. Traveling with family, golf bags, or surfboards up to 7'6\"? Choose our 12-seat Toyota HiAce Premio van (10 large suitcases).",
    iconName: "Luggage",
    badge: "Vehicle Guide",
    faqQuestion: "How much luggage and surfboard gear can each vehicle carry?",
  },
  {
    id: "child-safety",
    category: "Vehicles & Luggage",
    title: "Pre-Installed Baby Seats (0–2 yrs) & Boosters (3–7 yrs)",
    keyFact: "Sanitized infant seats (0–2 yrs) and booster seats (3–7 yrs) pre-installed for IDR 50,000 per seat per trip.",
    summary:
      "Share your child's age when booking so we sanitize and pre-install the right European-standard baby seat (0–2 yrs) or booster seat (3–7 yrs) before airport dispatch—flat IDR 50,000 (~$3 USD) per seat per trip.",
    iconName: "Baby",
    badge: "Family Safety",
    faqQuestion: "How do I book a baby car seat or child booster seat?",
  },
  {
    id: "free-cancellation",
    category: "Payment & Booking",
    title: "Free Cancellation (24h) & Instant WhatsApp Edits",
    keyFact: "Cancel free up to 24 hours before pickup, or adjust flight dates anytime at zero charge.",
    summary:
      "Plans change—cancel free up to 24 hours before pickup (full refund within 3 business days on prepaid bookings), or message our 24/7 WhatsApp desk anytime to update flight numbers, hotel drop-offs, or pickup times with no amendment fee.",
    iconName: "Clock",
    badge: "Risk-Free",
    faqQuestion: "What is your cancellation and flight-change policy?",
  },
  {
    id: "chauffeurs",
    category: "Arrival & Meeting",
    title: "Licensed English-Speaking Balinese Drivers",
    keyFact: "Local Balinese drivers—conversational English, non-smoking, and reliable 24/7.",
    summary:
      "Every driver is a local Balinese chauffeur with strong English and deep shortcut knowledge around Kuta, Canggu, Seminyak, Uluwatu, and Ubud—happy to recommend dining spots or help with check-in.",
    iconName: "UserCheck",
    badge: "Local Team",
    faqQuestion: "Do your drivers speak English and operate 24/7?",
  },
  {
    id: "cabin-comfort",
    category: "Vehicles & Luggage",
    title: "Private Non-Smoking A/C Fleet & USB Charging",
    keyFact: "Daily sanitized non-smoking cabins, dual-zone cold A/C, and USB phone chargers in every car.",
    summary:
      "Step straight from Bali's humidity into a clean, ice-cold private cabin with accessible USB charging ports and zero smoking odor. Every booking is 100% private—never shared with other passengers.",
    iconName: "Sparkles",
    badge: "100% Private",
    faqQuestion: "Are vehicles air-conditioned, non-smoking, and strictly private?",
  },
  {
    id: "customs-queues",
    category: "Flight Tracking",
    title: "Long Immigration, Visa-on-Arrival or Baggage Queues",
    keyFact: "Message your driver via free DPS airport Wi-Fi ('Ngurah Rai Free WiFi')—your car stays on standby.",
    summary:
      "If peak-hour e-VoA or baggage lines push past the included 60-minute wait, connect to free DPS Wi-Fi and send a quick WhatsApp message to your driver so we hold your car ready outside Circle K.",
    iconName: "Wifi",
    badge: "Pro Tip",
    faqQuestion: "What if immigration or baggage claim takes longer than 60 minutes?",
  },
];
