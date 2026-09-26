export interface VehicleOption {
  id: string;
  name: string;
  model: string;
  category: "Standard" | "Comfort" | "Luxury VIP" | "Group Van";
  passengers: number;
  luggage: number;
  priceIdr: number;
  priceUsd: number;
  priceAud: number;
  priceEur: number;
  image: string;
  features: string[];
  popular?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  region: "South Bali" | "Central Bali" | "Uluwatu & Bukit" | "North & East Bali" | "West Bali";
  distanceKm: number;
  durationMinutes: string;
  slug: string;
  description: string;
  popularHotels: string[];
  trafficTip: string;
  rates: {
    standard: number; // IDR (Veloz/Avanza)
    comfort: number;  // IDR (Innova Zenix)
    luxury: number;   // IDR (Alphard VIP)
    van: number;      // IDR (HiAce Premio 12 Pax)
  };
}

export const BALI_DESTINATIONS: Destination[] = [
  // --- TIER 1 (+100k): 250k (Avanza) | 300k (Innova) | 750k (Alphard) | 600k (HiAce) ---
  {
    id: "kuta-legian",
    name: "Kuta & Legian Beach",
    region: "South Bali",
    distanceKm: 6,
    durationMinutes: "15 - 25 mins",
    slug: "bali-airport-transfer-to-kuta",
    description: "Bali's iconic surf beaches, Beachwalk shopping mall, vibrant street markets, and family resorts.",
    popularHotels: ["Sheraton Bali Kuta", "Hard Rock Hotel Bali", "The Stones Legian", "Padma Resort Legian", "Pullman Legian", "Discovery Kartika Plaza"],
    trafficTip: "Drivers navigate narrow one-way beach roads seamlessly to drop you right at your hotel lobby.",
    rates: {
      standard: 250000,
      comfort: 300000,
      luxury: 750000,
      van: 600000,
    },
  },
  {
    id: "jimbaran",
    name: "Jimbaran Bay & Kedonganan",
    region: "South Bali",
    distanceKm: 7,
    durationMinutes: "15 - 25 mins",
    slug: "bali-airport-transfer-to-jimbaran",
    description: "Renowned beachfront seafood barbecue shacks on the sand, tranquil sunset bays, and secluded clifftop luxury.",
    popularHotels: ["AYANA Resort & Rock Bar", "Four Seasons Jimbaran", "InterContinental Bali Resort", "Mövenpick Resort Jimbaran", "RIMBA by AYANA"],
    trafficTip: "Closest luxury resort destination from DPS Airport. Quick and smooth 15-minute drive.",
    rates: {
      standard: 250000,
      comfort: 300000,
      luxury: 750000,
      van: 600000,
    },
  },
  {
    id: "seminyak",
    name: "Seminyak & Petitenget",
    region: "South Bali",
    distanceKm: 12,
    durationMinutes: "30 - 45 mins",
    slug: "bali-airport-transfer-to-seminyak",
    description: "Cosmopolitan hub with world-class beach clubs (Ku De Ta, Potato Head), designer boutiques, and sunset dining.",
    popularHotels: ["W Bali Seminyak", "The Legian", "Alila Seminyak", "Hotel Indigo", "Potato Head Suites", "The Oberoi"],
    trafficTip: "Sunset beachgoers cause slow traffic on Jl. Kayu Aya (Eat Street) from 5 PM onwards. Drivers navigate back lanes seamlessly.",
    rates: {
      standard: 250000,
      comfort: 300000,
      luxury: 750000,
      van: 600000,
    },
  },
  {
    id: "nusa-dua",
    name: "Nusa Dua (ITDC Enclave & Mengiat Beach)",
    region: "South Bali",
    distanceKm: 14,
    durationMinutes: "20 - 30 mins",
    slug: "bali-airport-transfer-to-nusa-dua",
    description: "Gated 5-star beachfront enclave with manicured golf courses, calm swimming beaches, and family water sports.",
    popularHotels: ["The Mulia", "Grand Hyatt Bali", "Melia Bali", "St. Regis Bali (Beachfront)", "Sofitel Nusa Dua", "Merusaka Nusa Dua"],
    trafficTip: "Extremely fast and smooth transfer via the scenic Bali Mandara Ocean Tollway (toll fee included with our service).",
    rates: {
      standard: 250000,
      comfort: 300000,
      luxury: 750000,
      van: 600000,
    },
  },

  // --- TIER 2 (+100k): 275k (Avanza) | 400k (Innova) | 850k (Alphard) | 650k (HiAce) ---
  {
    id: "kerobokan",
    name: "Kerobokan & Umalas",
    region: "South Bali",
    distanceKm: 15,
    durationMinutes: "35 - 50 mins",
    slug: "bali-airport-transfer-to-kerobokan",
    description: "Charming expat and villa neighborhood nestled between stylish Seminyak and vibrant Canggu.",
    popularHotels: ["Berry Amour Romantic Villas", "The Dusun", "Villa Komea", "Umalas Hotel & Residence"],
    trafficTip: "Drivers utilize shortcut routes to bypass sunset traffic along Jl. Kerobokan.",
    rates: {
      standard: 275000,
      comfort: 400000,
      luxury: 850000,
      van: 650000,
    },
  },
  {
    id: "sanur",
    name: "Sanur & Fast Boat Harbor (Nusa Penida / Lembongan)",
    region: "South Bali",
    distanceKm: 16,
    durationMinutes: "25 - 35 mins",
    slug: "bali-airport-transfer-to-sanur",
    description: "Relaxed coastal resort town with serene sunrise beachfront boardwalks and the primary harbor to Nusa Penida.",
    popularHotels: ["Andaz Bali", "Hyatt Regency Bali", "Maya Sanur", "InterContinental Bali Sanur", "Puri Santrian"],
    trafficTip: "Smooth transit via the Ngurah Rai Bypass road. Morning fast boat departures run 7 AM - 9 AM.",
    rates: {
      standard: 275000,
      comfort: 400000,
      luxury: 850000,
      van: 650000,
    },
  },
  {
    id: "nusa-dua-atas",
    name: "Nusa Dua Atas / Hills (Kampial, Sawangan, Mumbul, Bualu, Kutuh)",
    region: "South Bali",
    distanceKm: 16,
    durationMinutes: "25 - 35 mins",
    slug: "bali-airport-transfer-to-nusa-dua-atas",
    description: "Kawasan perbukitan dan tebing Nusa Dua: Kampial (Poltekpar), tebing Sawangan (The Apurva Kempinski, Ritz-Carlton cliff, Hilton), Taman Mumbul, Bualu Atas, dan Kutuh (Pandawa).",
    popularHotels: ["The Apurva Kempinski Bali", "The Ritz-Carlton Bali (Cliff)", "Hilton Bali Resort", "Samabe Bali Suites & Villas", "Amaroossa Suite", "Vinila Villas"],
    trafficTip: "Includes ocean tollway and direct access up through Jl. Siligita or Jl. Dharmawangsa to elevated villas and cliff resorts.",
    rates: {
      standard: 275000,
      comfort: 400000,
      luxury: 850000,
      van: 650000,
    },
  },
  {
    id: "benoa",
    name: "Tanjung Benoa & Pratama Beach (Water Sports)",
    region: "South Bali",
    distanceKm: 15,
    durationMinutes: "20 - 30 mins",
    slug: "bali-airport-transfer-to-tanjung-benoa",
    description: "Bali's world-famous water sports peninsula (jet ski, parasailing, diving) and calm ocean beachfront resorts.",
    popularHotels: ["Conrad Bali", "Grand Mirage Resort", "Holiday Inn Resort Benoa", "Novotel Bali Benoa", "Hotel Nikko Bali Benoa"],
    trafficTip: "Fast highway access across the Bali Mandara Ocean Tollway straight onto Jl. Pratama.",
    rates: {
      standard: 275000,
      comfort: 400000,
      luxury: 850000,
      van: 650000,
    },
  },

  // --- TIER 3 (+100k): 325k (Avanza) | 450k (Innova) | 1.000k (Alphard) | 700k (HiAce) ---
  {
    id: "canggu",
    name: "Canggu (Berawa, Batu Bolong, Echo Beach & Pererenan)",
    region: "South Bali",
    distanceKm: 19,
    durationMinutes: "45 - 75 mins",
    slug: "bali-airport-transfer-to-canggu",
    description: "Trending surfer, digital nomad, and nightlife hotspot with chic cafes, beach clubs (Finns, Atlas), and ocean villas.",
    popularHotels: ["COMO Uma Canggu", "Hotel Tugu Bali", "The Slow", "ASTON Canggu", "Secana Beachtown"],
    trafficTip: "The Canggu shortcut and Jl. Pantai Berawa get congested during late afternoons. We utilize optimized alternate routes.",
    rates: {
      standard: 325000,
      comfort: 450000,
      luxury: 1000000,
      van: 700000,
    },
  },
  {
    id: "uluwatu",
    name: "Uluwatu, Pecatu, Balangan, Bingin & Padang Padang",
    region: "Uluwatu & Bukit",
    distanceKm: 22,
    durationMinutes: "45 - 65 mins",
    slug: "bali-airport-transfer-to-uluwatu",
    description: "Clifftop majesty overlooking world-class surf breaks, sunset temples, and ultra-luxury clifftop resorts.",
    popularHotels: ["Bulgari Resort Bali", "Alila Villas Uluwatu", "Six Senses Uluwatu", "Anantara Uluwatu", "Jumeirah Bali", "Radisson Blu Uluwatu"],
    trafficTip: "Hilly roads and temple sunset traffic near Uluwatu Temple around 5:30 PM - 7 PM for the Kecak Fire Dance.",
    rates: {
      standard: 325000,
      comfort: 450000,
      luxury: 1000000,
      van: 700000,
    },
  },

  // --- TIER 4 (+100k): 400k (Avanza) | 500k (Innova) | 1.200k (Alphard) | 800k (HiAce) ---
  {
    id: "ubud",
    name: "Ubud Center (Monkey Forest, Sayan, Pengosekan)",
    region: "Central Bali",
    distanceKm: 38,
    durationMinutes: "60 - 90 mins",
    slug: "bali-airport-transfer-to-ubud",
    description: "Bali's cultural, yoga, and wellness sanctuary surrounded by lush rainforests and artistic heritage.",
    popularHotels: ["Four Seasons Sayan", "Mandapa Ritz-Carlton", "Kamandalu", "Viceroy Bali", "Alila Ubud", "Bisma Eight"],
    trafficTip: "Afternoon arrivals (3 PM - 7 PM) can experience moderate traffic through Batubulan; our drivers choose the bypass tollway to avoid bottlenecks.",
    rates: {
      standard: 400000,
      comfort: 500000,
      luxury: 1200000,
      van: 800000,
    },
  },
  {
    id: "tanah-lot-tabanan",
    name: "Tanah Lot, Tabanan & Mengwi",
    region: "Central Bali",
    distanceKm: 32,
    durationMinutes: "50 - 75 mins",
    slug: "bali-airport-transfer-to-tanah-lot",
    description: "Home to Bali's iconic sea temple at Tanah Lot, royal Mengwi Taman Ayun temple, and peaceful western rice plains.",
    popularHotels: ["Pan Pacific Bali / Nirwana", "Natya Hotel Tanah Lot", "De Moksha Eco Friendly Boutique Resort"],
    trafficTip: "Sunset visitors flock to Tanah Lot temple between 4:30 PM and 6:30 PM.",
    rates: {
      standard: 400000,
      comfort: 500000,
      luxury: 1200000,
      van: 800000,
    },
  },
  {
    id: "klungkung",
    name: "Klungkung & Kusamba Port",
    region: "North & East Bali",
    distanceKm: 44,
    durationMinutes: "55 - 75 mins",
    slug: "bali-airport-transfer-to-klungkung",
    description: "Historic royal capital of Bali and traditional salt-farming coast, gateway to Nusa Penida fast boats from Kusamba.",
    popularHotels: ["Wyndham Tamansari Jivva Resort", "Mara River Safari Lodge"],
    trafficTip: "Smooth drive via the Prof. Dr. Ida Bagus Mantra East Coast Bypass highway.",
    rates: {
      standard: 400000,
      comfort: 500000,
      luxury: 1200000,
      van: 800000,
    },
  },

  // --- TIER 5 (+100k): 450k (Avanza) | 500k (Innova) | 1.400k (Alphard) | 900k (HiAce) ---
  {
    id: "tegallalang-payangan",
    name: "Tegallalang, Payangan & Tampaksiring",
    region: "Central Bali",
    distanceKm: 52,
    durationMinutes: "80 - 110 mins",
    slug: "bali-airport-transfer-to-tegallalang",
    description: "Spectacular UNESCO Tegallalang rice terraces, Tirta Empul holy water springs, and luxury rainforest retreats in Payangan.",
    popularHotels: ["Padma Resort Ubud (Payangan)", "Hanging Gardens of Bali", "Capella Ubud", "Komaneka at Tanggayuda"],
    trafficTip: "Scenic northern mountain foothills road with cooling breezes and rainforest vistas.",
    rates: {
      standard: 450000,
      comfort: 500000,
      luxury: 1400000,
      van: 900000,
    },
  },

  // --- TIER 6 (+100k): 850k (Avanza) | 1.000k (Innova) | 1.900k (Alphard) | 1.100k (HiAce) ---
  {
    id: "sidemen-candidasa",
    name: "Padangbai Harbor, Candidasa, Manggis & Karangasem",
    region: "North & East Bali",
    distanceKm: 65,
    durationMinutes: "90 - 120 mins",
    slug: "bali-airport-transfer-to-padangbai",
    description: "Gili Islands ferry port at Padangbai, serene Candidasa beachfront, Alila Manggis, and authentic East Bali royal palaces.",
    popularHotels: ["Alila Manggis", "Candi Beach Resort & Spa", "Wapa di Ume Sidemen", "Samanvaya Luxury Resort"],
    trafficTip: "Bypass highway gives a smooth ride all the way past Kusamba towards Padangbai and Candidasa.",
    rates: {
      standard: 850000,
      comfort: 1000000,
      luxury: 1900000,
      van: 1100000,
    },
  },
  {
    id: "munduk",
    name: "Munduk Highlands & Bedugul (Lake Beratan)",
    region: "North & East Bali",
    distanceKm: 78,
    durationMinutes: "2.5 - 3 hrs",
    slug: "bali-airport-transfer-to-munduk",
    description: "Cool mountain highlands, misty waterfalls, coffee estates, and iconic Ulun Danu Beratan water temple.",
    popularHotels: ["Munduk Moding Plantation", "Sanak Retreat Bali", "Munduk Cabins", "Handara Golf & Resort"],
    trafficTip: "Winding scenic mountain ascent through Bedugul; our chauffeurs are experienced with mountain terrain.",
    rates: {
      standard: 850000,
      comfort: 1000000,
      luxury: 1900000,
      van: 1100000,
    },
  },

  // --- TIER 7 (+100k): 850k (Avanza) | 1.000k (Innova) | 2.400k (Alphard) | 1.600k (HiAce) ---
  {
    id: "lovina-munduk",
    name: "Lovina Beach & Singaraja (North Bali Coast)",
    region: "North & East Bali",
    distanceKm: 88,
    durationMinutes: "2.5 - 3.5 hrs",
    slug: "bali-airport-transfer-to-lovina",
    description: "Tranquil northern Bali coastline famous for sunrise dolphin watching boat tours, calm seas, and historical Singaraja city.",
    popularHotels: ["The Damai Lovina", "Padmasari Resort", "Puri Bagus Lovina"],
    trafficTip: "Mountain pass traverse. Free refreshment stop upon request at zero extra charge.",
    rates: {
      standard: 850000,
      comfort: 1000000,
      luxury: 2400000,
      van: 1600000,
    },
  },
  {
    id: "amed-tulamben",
    name: "Tulamben & Amed (Diving & Snorkeling Coast)",
    region: "North & East Bali",
    distanceKm: 98,
    durationMinutes: "2.5 - 3.5 hrs",
    slug: "bali-airport-transfer-to-amed",
    description: "World-renowned diving mecca with the USAT Liberty shipwreck in Tulamben and picturesque sunrise fishing bays of Amed.",
    popularHotels: ["Mimpi Resort Tulamben", "The Griya Villas and Spa", "Mathis Lodge Amed", "Blue Earth Village"],
    trafficTip: "Long-distance coastal drive. Rest stops with clean restrooms available anytime.",
    rates: {
      standard: 850000,
      comfort: 1000000,
      luxury: 2400000,
      van: 1600000,
    },
  },
];

export const FLEET_DETAILS = [
  {
    id: "standard",
    name: "Standard Car",
    shortLabel: "Standard Car (Avanza, 1-4 Pax)",
    model: "Toyota Avanza / Veloz",
    tagline: "Great for couples & small families",
    passengers: 4,
    luggage: 3,
    image: "/images/veloz-mpv.jpg",
    features: [
      "Air Conditioning",
      "Free Bottled Water",
      "Luggage Assistance",
      "Bali Mandara Toll Included",
      "Free Flight Delay Tracking",
      "English-Speaking Driver",
    ],
    popular: true,
  },
  {
    id: "comfort",
    name: "Comfort Car",
    shortLabel: "Comfort Car (Innova, 1-5 Pax)",
    model: "Toyota Innova Zenix",
    tagline: "Extra legroom & smooth ride for families",
    passengers: 5,
    luggage: 4,
    image: "/images/innova-zenix.jpg",
    features: [
      "Spacious Captain Seats",
      "Onboard Wi-Fi",
      "Phone Charging Ports",
      "Free Chilled Bottled Water",
      "Child / Baby Seat on Request",
      "Friendly Experienced Driver",
    ],
    popular: true,
  },
  {
    id: "van",
    name: "Big Van",
    shortLabel: "Big Van (HiAce, 1-12 Pax)",
    model: "Toyota HiAce 12-Seater",
    tagline: "Great for groups, surfboards & extra luggage",
    passengers: 12,
    luggage: 10,
    image: "/images/hiace-premio.jpg",
    features: [
      "Spacious 12-Seat Passenger Van",
      "Huge Luggage Room (Surfboard Friendly)",
      "Rear Air Conditioning for Every Row",
      "Clean & Comfortable Group Travel",
      "Airport Meet & Greet Included",
      "Tollway & Parking Included",
    ],
    popular: false,
  },
];

export const EXCHANGE_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
  IDR: { symbol: "Rp", rate: 1, label: "IDR (Indonesian Rupiah)" },
  USD: { symbol: "$", rate: 0.000062, label: "USD (US Dollar)" },
  AUD: { symbol: "A$", rate: 0.000096, label: "AUD (Australian Dollar)" },
  EUR: { symbol: "€", rate: 0.000058, label: "EUR (Euro)" },
  GBP: { symbol: "£", rate: 0.000049, label: "GBP (British Pound)" },
};

export function formatPrice(amountIdr: number, currency: string = "IDR"): string {
  const info = EXCHANGE_RATES[currency] || EXCHANGE_RATES.IDR;
  if (currency === "IDR") {
    return `IDR ${amountIdr.toLocaleString("id-ID")}`;
  }
  const converted = Math.round(amountIdr * info.rate);
  return `${info.symbol}${converted.toLocaleString()}`;
}
