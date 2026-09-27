export interface FAQItem {
  question: string;
  answer: string;
  category: "Arrival & Pickup" | "Pricing & Payment" | "Vehicles & Luggage" | "Flight Delays";
}

export const BALI_FAQS: FAQItem[] = [
  {
    category: "Arrival & Pickup",
    question: "Where do I meet my driver at Bali Ngurah Rai Airport (DPS)?",
    answer: "After clearing immigration, customs, and the duty-free walkway, exit into the main Arrival Hall. Look for the designated driver meeting zone near the Information Desk. Your personal chauffeur will be waiting right at the front holding a prominent digital tablet or name sign clearly displaying your name. We also send you a photo and live WhatsApp contact of your driver 2 hours before your flight lands.",
  },
  {
    category: "Flight Delays",
    question: "What happens if my flight to Bali is delayed or arrives early?",
    answer: "You do not need to worry. We track all inbound commercial flights in real-time using your flight number. Even if your flight is delayed by 2, 4, or 6 hours, your driver's schedule automatically adjusts to your actual touchdown time. We also provide a complimentary 90-minute grace waiting period after your aircraft lands to allow ample time for visa on arrival (e-VoA) and baggage claim.",
  },
  {
    category: "Pricing & Payment",
    question: "Are there any hidden costs, toll fees, or airport parking surcharges?",
    answer: "No. All our Bali airport transfer rates are 100% all-inclusive fixed prices. This covers airport parking fees, the Bali Mandara Ocean Tollway fee, vehicle petrol/fuel, taxes, and luggage assistance. The price you see during booking is the exact total amount you pay.",
  },
  {
    category: "Pricing & Payment",
    question: "What payment methods are accepted?",
    answer: "We offer maximum flexibility: You can pay cash in Indonesian Rupiah (IDR), Australian Dollars (AUD), US Dollars (USD), or Euros (EUR) directly to the chauffeur upon arrival at your hotel. Alternatively, you can pay online securely in advance via Credit/Debit Card (Visa, Mastercard), PayPal, or Wise transfer.",
  },
  {
    category: "Arrival & Pickup",
    question: "Why should I pre-book instead of getting an airport taxi or Grab/Gojek on arrival?",
    answer: "Airport taxi touts at DPS are notorious for aggressive haggling and inflating prices up to 2-3x normal rates (often demanding 500,000 IDR for a short ride to Kuta). While ride-hailing apps operate at the airport, wait times in the hot parking building can exceed 45-60 minutes during peak arrival hours with hefty airport surcharges. Pre-booking with Great Bali Airport Transfer guarantees an air-conditioned car waiting at the terminal with your personal chauffeur holding your name sign, zero waiting in taxi queues, and guaranteed fixed pricing.",
  },
  {
    category: "Vehicles & Luggage",
    question: "Can we request a baby car seat or child booster?",
    answer: "Yes! Safety is our top priority. We offer sanitized European-standard baby car seats (0-2 years) and booster seats (3-7 years) for IDR 50,000 per seat per trip, upon request during booking.",
  },
  {
    category: "Arrival & Pickup",
    question: "Can our driver stop by an ATM or Bali SIM card / money changer on the way to the hotel?",
    answer: "Absolutely! Our friendly English-speaking driver will gladly make a quick stop at a trusted bank ATM (such as Mandiri or BCA), an official Telkomsel SIM card outlet, or authorized money changer on the route to your villa at no extra charge.",
  },
  {
    category: "Vehicles & Luggage",
    question: "How much luggage can each vehicle carry? What about surfboards?",
    answer: "Our Standard MPV (Toyota Veloz) accommodates up to 4 passengers with 3 large suitcases. The Comfort SUV (Innova Zenix) takes 5 passengers and 4 large suitcases. For larger groups or travelers with surfboards, golf bags, and extra luggage, our Toyota HiAce Premio van holds up to 12 passengers and 10 large suitcases with surfboard racks inside.",
  },
  {
    category: "Pricing & Payment",
    question: "What is your cancellation and amendment policy?",
    answer: "We provide 100% free cancellation and unlimited date/time amendments up to 12 hours prior to scheduled pickup. If your airline reschedules or cancels your flight, just message us on WhatsApp and we will reschedule your transfer without any penalty fees.",
  },
  {
    category: "Arrival & Pickup",
    question: "Do your drivers speak fluent English?",
    answer: "Yes, all our chauffeurs are licensed Balinese tourism drivers who speak good conversational English. They are knowledgeable, courteous, non-smoking, and happy to share local Bali insights and recommendations for your stay.",
  },
  {
    category: "Pricing & Payment",
    question: "Do I need to pay a deposit or pay in advance?",
    answer: "No deposit is required. Simply book via WhatsApp or our on-site form, and pay in cash (IDR, USD, AUD, or EUR) to your chauffeur upon arrival at your hotel. If you prefer to settle everything before you fly, secure online payment by Visa, Mastercard, PayPal, or Wise transfer is also available.",
  },
  {
    category: "Vehicles & Luggage",
    question: "Which car should I choose for my group?",
    answer: "For 1-4 passengers with standard luggage, our Standard Car (Toyota Avanza) is the best value. For extra legroom and captain-style comfort, choose the Comfort Car (Toyota Innova Zenix) for up to 5 passengers. Groups of 6-12, surfers with boardbags, golfers, or families with lots of luggage should take the Big Van (Toyota HiAce Premio).",
  },
  {
    category: "Vehicles & Luggage",
    question: "Are your cars air-conditioned, non-smoking, and clean?",
    answer: "Yes. Every vehicle in our fleet is 100% non-smoking, deep-cleaned before every journey, and equipped with ice-cold air conditioning, USB phone chargers, and complimentary chilled bottled water.",
  },
  {
    category: "Flight Delays",
    question: "How long will my driver wait if immigration or VoA takes very long?",
    answer: "Your chauffeur waits with a complimentary 90-minute grace period after your aircraft lands, which comfortably covers visa on arrival (e-VoA) and baggage claim. Because we track your flight live, we know exactly when you touch down — and if queues are exceptionally long, just message your driver on WhatsApp and we will keep coordinating until you exit.",
  },
  {
    category: "Flight Delays",
    question: "What happens if my flight is diverted or cancelled?",
    answer: "Just message us on WhatsApp as soon as you know. We will reschedule your transfer to your new arrival at no penalty, subject to vehicle availability. If you cancel outright, our standard free-cancellation policy (up to 12 hours before pickup) applies.",
  },
  {
    category: "Flight Delays",
    question: "Do I need to tell you if I already know my flight will depart late?",
    answer: "It helps but is not required. If your airline notifies you of a schedule change before departure, simply forward your new flight number via WhatsApp so we can reassign your chauffeur to the updated landing time. Either way, our live flight tracking picks up the delay automatically.",
  },
];
