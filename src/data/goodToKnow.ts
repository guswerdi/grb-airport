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
    keyFact: "Your chauffeur waits in front of the Circle K minimart holding a personalized name sign.",
    summary:
      "After clearing immigration, baggage claim, and customs, follow the green exit signs out of the terminal. Head straight to the Circle K minimart right at the exit gate — that is our designated meeting point. Your chauffeur's name, vehicle plate, and live WhatsApp number are sent to you 2 hours before landing so you can connect immediately.",
    iconName: "MapPin",
    badge: "Arrival Essential",
    faqQuestion: "Where do I meet my driver for the Bali airport pickup?",
  },
  {
    id: "flight-delays",
    category: "Flight Tracking",
    title: "Flight Delays & 60-Minute Complimentary Grace Wait",
    keyFact: "60-minute complimentary waiting time from aircraft touchdown, with free rescheduling for airline delays.",
    summary:
      "We provide a complimentary 60-minute grace period starting from your actual landing time to allow ample time for immigration, visa on arrival (e-VoA), and baggage claim. If your airline delays or reschedules your flight prior to departure, simply notify us via WhatsApp and we will adjust your pickup time with zero penalty fee.",
    iconName: "Plane",
    badge: "Flexible",
    faqQuestion: "What happens if my flight to Bali is delayed or arrives early?",
  },
  {
    id: "all-inclusive-pricing",
    category: "Pricing & Tolls",
    title: "100% All-Inclusive Fixed Rates (Tolls & Parking Included)",
    keyFact: "Bali Mandara Ocean Tollway fees, airport parking surcharges, fuel, and taxes are 100% covered.",
    summary:
      "All published rates are strictly flat and all-inclusive. You will never encounter hidden extras for airport parking, midnight arrival fees, vehicle petrol, or tollway access on the Bali Mandara Ocean Toll. The price shown on your booking confirmation is the exact total amount you pay.",
    iconName: "ShieldCheck",
    badge: "Zero Hidden Fees",
    faqQuestion: "Are there any hidden costs, toll fees, or airport parking surcharges?",
  },
  {
    id: "zero-deposit-payment",
    category: "Payment & Booking",
    title: "Zero Deposit Required & Multi-Currency Cash or Online Pay",
    keyFact: "Book instantly without credit card hold. Pay cash on arrival in IDR, USD, AUD, EUR, or prepay online.",
    summary:
      "Reserve in seconds with zero advance deposit. You can settle in cash directly with your chauffeur upon arrival at your hotel in Indonesian Rupiah (IDR), Australian Dollars (AUD), US Dollars (USD), or Euros (EUR). Prefer to settle in advance? Secure online checkout via Visa, Mastercard, PayPal, or Wise is also supported.",
    iconName: "Banknote",
    badge: "Pay on Arrival",
    faqQuestion: "What payment methods are accepted and do I need to pay a deposit?",
  },
  {
    id: "taxi-vs-prebook",
    category: "Arrival & Meeting",
    title: "Avoid Airport Taxi Touts & 45-Min Rideshare Parking Queues",
    keyFact: "Skip aggressive terminal haggling (often 2x-3x normal fares) and long queues in the multi-story parking garage.",
    summary:
      "DPS arrival halls have unofficial freelance touts notorious for aggressive haggling (often demanding IDR 500,000+ for short trips to Kuta). Ride-hailing apps (Grab/Gojek) require dragging bags to the multi-level parking lot with peak surge pricing and 45+ minute wait times. Pre-booking ensures a private air-conditioned car waiting curbside.",
    iconName: "Car",
    badge: "Traveler Advice",
    faqQuestion: "Why should I pre-book instead of taking an airport taxi or Grab/Gojek on arrival?",
  },
  {
    id: "free-stops",
    category: "Traveler Perks",
    title: "Complimentary Stops for ATM, Telkomsel SIM & Money Exchange",
    keyFact: "Enjoy a free en-route stop at trusted bank ATMs (BCA/Mandiri), official SIM kiosks, or licensed money changers.",
    summary:
      "Need Indonesian cash or a local tourist eSIM/data card before reaching your villa? Your English-speaking chauffeur will gladly make a quick stop at trusted bank ATMs, an official Telkomsel SIM card outlet, or an authorized currency exchange counter along your route at zero additional surcharge.",
    iconName: "Smartphone",
    badge: "Free Inclusion",
    faqQuestion: "Can our driver stop by an ATM or Bali SIM card / money changer on the way to the hotel?",
  },
  {
    id: "luggage-fleet",
    category: "Vehicles & Luggage",
    title: "Fleet Luggage Capacities & Surfboard / Golf Bag Space",
    keyFact: "Standard MPVs carry 3 large suitcases; HiAce vans accommodate up to 10 suitcases plus surfboards.",
    summary:
      "Our Standard MPVs (Toyota Avanza/Veloz) carry up to 4 passengers with 3 large suitcases. Comfort SUVs (Toyota Innova Zenix) take 5 passengers and 4 large bags with captain-chair legroom. For larger groups, surfboards, or golf gear, our Toyota HiAce Premio van seats 12 passengers with room for 10 large suitcases.",
    iconName: "Luggage",
    badge: "Vehicle Guide",
    faqQuestion: "How much luggage can each vehicle carry? What about surfboards?",
  },
  {
    id: "child-safety",
    category: "Vehicles & Luggage",
    title: "Certified European-Standard Baby Seats & Child Boosters",
    keyFact: "Sanitized infant seats (0-2 yrs) and booster seats (3-7 yrs) available upon request for IDR 50,000 per trip.",
    summary:
      "Family safety on Bali's bustling roads is our top priority. Properly sanitized, European-standard baby car seats (for infants 0-2 years) and booster seats (for kids 3-7 years) can be added during reservation for a nominal fee of IDR 50,000 per seat per trip, pre-installed before airport pickup.",
    iconName: "Baby",
    badge: "Family Safety",
    faqQuestion: "Can we request a baby car seat or child booster?",
  },
  {
    id: "free-cancellation",
    category: "Payment & Booking",
    title: "100% Free Cancellation & Instant WhatsApp Rescheduling",
    keyFact: "Cancel free up to 24 hours before pickup, or change flight dates anytime with zero rescheduling fee.",
    summary:
      "Travel itineraries change unexpectedly. Enjoy complete peace of mind with 100% free cancellation up to 24 hours before scheduled pickup. If your airline delays, reschedules, or alters your flight details, message our 24/7 WhatsApp concierge and we will update your chauffeur assignment without penalty.",
    iconName: "Clock",
    badge: "Risk-Free",
    faqQuestion: "What is your cancellation and amendment policy?",
  },
  {
    id: "chauffeurs",
    category: "Arrival & Meeting",
    title: "Licensed English-Speaking Local Balinese Chauffeurs",
    keyFact: "Professional, non-smoking Balinese chauffeurs with conversational English and deep local route knowledge.",
    summary:
      "Every chauffeur on our team is a licensed tourism driver with excellent conversational English skills. They are courteous, non-smoking, strictly adhere to safety standards, and are happy to share insider recommendations on Bali restaurants, cultural customs, and scenic detours.",
    iconName: "UserCheck",
    badge: "VIP Chauffeur",
    faqQuestion: "Do your drivers speak fluent English?",
  },
  {
    id: "cabin-comfort",
    category: "Vehicles & Luggage",
    title: "Spotless Non-Smoking Fleet with Ice-Cold A/C & USB Chargers",
    keyFact: "Dual-zone ice-cold air conditioning, spotless non-smoking interiors, and USB phone chargers in every car.",
    summary:
      "Step directly out of Bali's tropical heat into a crisp, air-conditioned sanctuary. Every vehicle undergoes daily interior sanitization, provides accessible USB charging ports to power your mobile devices, and guarantees a strictly non-smoking cabin. (Complimentary chilled bottled water is provided with our private driver charter service).",
    iconName: "Sparkles",
    badge: "Top Comfort",
    faqQuestion: "Are your cars air-conditioned, non-smoking, and clean?",
  },
  {
    id: "customs-queues",
    category: "Flight Tracking",
    title: "What to Do During Extended Customs or e-VoA Queues",
    keyFact: "Connect to free airport Wi-Fi ('Ngurah Rai Free WiFi') and ping your driver — we will remain on standby.",
    summary:
      "While our complimentary waiting period is 60 minutes after actual touchdown, busy international arrival banks occasionally experience baggage or immigration backlogs. Simply connect to the free airport Wi-Fi and send a brief WhatsApp message to your assigned chauffeur. We will keep your car stationed until you emerge.",
    iconName: "Wifi",
    badge: "Pro Tip",
    faqQuestion: "How long will my driver wait if immigration or VoA takes very long?",
  },
];
