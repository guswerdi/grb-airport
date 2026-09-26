export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Airport Guide" | "Travel Tips" | "Cost & Comparison" | "Destinations";
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  image: string;
  content: string[];
  popular?: boolean;
}

export const BALI_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "bali-airport-taxi-cost-2026",
    title: "Bali Airport Taxi Cost in 2026: Official Fixed Rates & Fair Fares",
    excerpt: "How much should you really pay for a taxi from Denpasar Ngurah Rai Airport (DPS) to Ubud, Seminyak, Canggu, or Uluwatu? Avoid tourist markups with our transparent 2026 fare guide.",
    category: "Cost & Comparison",
    date: "March 15, 2026",
    readTime: "5 min read",
    author: {
      name: "Wayan Surya",
      role: "Senior Chauffeur & Tour Guide",
    },
    image: "/images/hero-alphard.jpg",
    popular: true,
    content: [
      "Landing at I Gusti Ngurah Rai International Airport (DPS) in Bali is exhilarating, but figuring out taxi pricing after a tiring international flight can quickly become frustrating.",
      "The official airport taxi counter and freelance drivers often quote inflated prices ranging from IDR 400,000 to IDR 600,000 for short rides to Kuta or Seminyak, especially late at night.",
      "By pre-booking a private airport transfer, you lock in transparent fixed rates: Seminyak is just IDR 250,000 (~$16 USD), Ubud is IDR 400,000 (~$25 USD), and Nusa Dua is IDR 250,000 (~$16 USD).",
      "Crucially, private transfers include Bali Mandara Ocean Tollway fees and airport parking surcharges, ensuring zero hidden costs upon arrival at your villa or hotel.",
    ],
  },
  {
    id: "post-2",
    slug: "how-to-avoid-taxi-scams-at-bali-airport",
    title: "7 Crucial Tips to Avoid Airport Taxi Scams at Denpasar (DPS)",
    excerpt: "Learn how to bypass aggressive arrival hall touts, unmetered taxi traps, and luggage fee surprises when arriving at Bali International Airport.",
    category: "Airport Guide",
    date: "March 10, 2026",
    readTime: "6 min read",
    author: {
      name: "Ketut Arimbawa",
      role: "Operations Dispatch Lead",
    },
    image: "/images/innova-zenix.jpg",
    popular: true,
    content: [
      "As soon as you cross customs and the duty-free shop at Denpasar Airport, dozens of freelance drivers will call out: 'Taxi, mister? Transport? Where you go?'.",
      "Tip 1: Never agree to an unmetered taxi ride without a clear written price. Drivers may demand 3x the standard rate once you reach your hotel lobby.",
      "Tip 2: Watch out for luggage porters who grab your bags without asking and demand steep tipping tips of $10-$20 USD.",
      "Tip 3: Look for your name on a pre-assigned digital tablet. Legitimate pre-arranged chauffeurs will stand patiently in the official driver greeting zone with your exact booking voucher.",
      "Tip 4: Always confirm that your driver will use the Bali Mandara Ocean Tollway for south-bound routes (Sanur, Nusa Dua, Jimbaran) to save up to 45 minutes of driving time.",
    ],
  },
  {
    id: "post-3",
    slug: "grab-gojek-vs-private-transfer-bali-airport",
    title: "Grab & Gojek vs Private Chauffeur at Bali Airport: Honest Comparison",
    excerpt: "Is Grab or Gojek reliable at Bali Airport arrivals? We break down wait times, pick-up lounge hassles, luggage room, and price differences.",
    category: "Cost & Comparison",
    date: "February 28, 2026",
    readTime: "7 min read",
    author: {
      name: "Made Suardana",
      role: "Travel Journalist & Local Expat",
    },
    image: "/images/hiace-premio.jpg",
    content: [
      "While ride-hailing apps like Grab and Gojek operate across Bali, catching one directly from DPS airport arrivals is not as simple as at western airports.",
      "Ride-hailing pick-up lounges are located in the multi-story parking building, requiring a 10-15 minute walk pushing heavy luggage through tropical humidity.",
      "During peak flight landing times (e.g. 1 PM - 4 PM and 9 PM - midnight), Grab and Gojek surge pricing frequently raises fares higher than pre-booked private transfers, with wait times exceeding 45 minutes.",
      "With a pre-booked chauffeur from Great Bali Airport Transfer, your driver greets you directly at the air-conditioned arrival gate, takes care of your heavy bags, and brings the vehicle straight to the VIP passenger pick-up zone.",
    ],
  },
  {
    id: "post-4",
    slug: "bali-airport-arrival-guide-customs-evoa-sim",
    title: "Ultimate 2026 Bali Airport Arrival Guide: e-VoA, Customs QR & SIM Cards",
    excerpt: "Everything you need to do before and after touching down at Denpasar Airport (DPS) for a smooth 20-minute journey through customs.",
    category: "Airport Guide",
    date: "February 18, 2026",
    readTime: "8 min read",
    author: {
      name: "Wayan Surya",
      role: "Senior Chauffeur & Tour Guide",
    },
    image: "/images/dest-ubud.jpg",
    content: [
      "To ensure the fastest clearance through Denpasar International Airport, complete your Electronic Visa on Arrival (e-VoA) online via the official Indonesian immigration portal before boarding your flight.",
      "Electronic Customs Declaration (ECD): All passengers must complete the online customs declaration QR code within 3 days of arrival. Free airport Wi-Fi is available, but filling it out beforehand saves valuable time.",
      "Tourist SIM cards: Telkomsel booths are located in the arrival hall. Alternatively, ask your private driver to stop by an authorized local shop along the route for significantly lower prices and local packages.",
      "Currency & ATMs: Official bank ATMs (Mandiri, BCA, BNI) are located right outside customs. We recommend withdrawing local Rupiah cash for your initial spending.",
    ],
  },
];
