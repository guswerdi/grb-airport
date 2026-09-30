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
  /** Long, keyword-rich label used for on-page H1 copy. */
  name: string;
  /**
   * Short label used ONLY in <title> / meta tags. Kept separate from `name`
   * because the long form (e.g. "Nusa Dua Atas / Hills (Kampial, Sawangan, ...)")
   * pushes meta titles past the ~60 character limit Google displays.
   */
  metaName: string;
  region: "South Bali" | "Central Bali" | "Uluwatu & Bukit" | "North & East Bali" | "West Bali";
  distanceKm: number;
  durationMinutes: string;
  slug: string;
  /** Short marketing blurb: on-page route overview + Open Graph. */
  description: string;
  /**
   * Unique, hand-written meta description for this route, used for Google's
   * snippet. `{price}` is expanded at build time with the destination's live
   * Standard-car fare (see `fillPrice`), so a snippet can never quote a stale
   * price. Keep it under ~155 characters so nothing is truncated.
   */
  metaDescription: string;
  popularHotels: string[];
  trafficTip: string;
  rates: {
    standard: number; // IDR (Veloz/Avanza)
    comfort: number;  // IDR (Innova Zenix)
    luxury: number;   // IDR (legacy VIP tier, not shown in UI)
    van: number;      // IDR (HiAce Premio 12 Pax)
  };
}

export const BALI_DESTINATIONS: Destination[] = [
  // --- TIER 1 (+100k): 250k (Avanza) | 300k (Innova) | 750k (Alphard) | 600k (HiAce) ---
  {
    id: "kuta-legian",
    name: "Kuta & Legian Beach",
    metaName: "Kuta & Legian",
    region: "South Bali",
    distanceKm: 6,
    durationMinutes: "15 - 25 mins",
    slug: "bali-airport-transfer-to-kuta",
    description: "Bali's iconic surf beaches, Beachwalk shopping mall, vibrant street markets, and family resorts.",
    metaDescription: "Kuta & Legian surf beaches are 15 minutes from DPS. Flat {price} for 1-4 pax, name-sign meet & greet, toll included.",
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
    metaName: "Jimbaran",
    region: "South Bali",
    distanceKm: 7,
    durationMinutes: "15 - 25 mins",
    slug: "bali-airport-transfer-to-jimbaran",
    description: "Renowned beachfront seafood barbecue shacks on the sand, tranquil sunset bays, and secluded clifftop luxury.",
    metaDescription: "The closest luxury beach to DPS: 15 min to Jimbaran seafood BBQ shacks and AYANA. All-in {price}, luggage help included.",
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
    metaName: "Seminyak",
    region: "South Bali",
    distanceKm: 12,
    durationMinutes: "30 - 45 mins",
    slug: "bali-airport-transfer-to-seminyak",
    description: "Cosmopolitan hub with world-class beach clubs (Ku De Ta, Potato Head), designer boutiques, and sunset dining.",
    metaDescription: "Skip the taxi queue to Seminyak and Petitenget beach clubs. Private car from {price}, chauffeur waits with your name sign.",
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
    metaName: "Nusa Dua",
    region: "South Bali",
    distanceKm: 14,
    durationMinutes: "20 - 30 mins",
    slug: "bali-airport-transfer-to-nusa-dua",
    description: "Gated 5-star beachfront enclave with manicured golf courses, calm swimming beaches, and family water sports.",
    metaDescription: "Nusa Dua ITDC resorts via the Mandara ocean tollway, 25 min from DPS. Book {price} for 1-4 pax, toll and parking included.",
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
    metaName: "Kerobokan",
    region: "South Bali",
    distanceKm: 15,
    durationMinutes: "35 - 50 mins",
    slug: "bali-airport-transfer-to-kerobokan",
    description: "Charming expat and villa neighborhood nestled between stylish Seminyak and vibrant Canggu.",
    metaDescription: "Kerobokan and Umalas villa stays, 40 min from DPS between Seminyak and Canggu. Door-to-door private transfer from {price}.",
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
    metaName: "Sanur",
    region: "South Bali",
    distanceKm: 16,
    durationMinutes: "25 - 35 mins",
    slug: "bali-airport-transfer-to-sanur",
    description: "Relaxed coastal resort town with serene sunrise beachfront boardwalks and the primary harbor to Nusa Penida.",
    metaDescription: "Catch the Nusa Penida and Gili fast boats from Sanur harbor, 35 min from DPS. From {price}, early morning pickups available.",
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
    metaName: "Nusa Dua Hills",
    region: "South Bali",
    distanceKm: 16,
    durationMinutes: "25 - 35 mins",
    slug: "bali-airport-transfer-to-nusa-dua-atas",
    metaDescription: "Cliff-top Nusa Dua Hills villas in Sawangan, Kampial and Kutuh, 35 min from DPS. {price} all-in, tollway included.",
    description: "Hillside and clifftop Nusa Dua: Kampial, the Sawangan cliff strip (Apurva Kempinski, Ritz-Carlton, Hilton), Taman Mumbul, Bualu and Kutuh (Pandawa Beach).",
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
    metaName: "Tanjung Benoa",
    region: "South Bali",
    distanceKm: 15,
    durationMinutes: "20 - 30 mins",
    slug: "bali-airport-transfer-to-tanjung-benoa",
    description: "Bali's world-famous water sports peninsula (jet ski, parasailing, diving) and calm ocean beachfront resorts.",
    metaDescription: "Tanjung Benoa water sports and Pratama Beach resorts, 30 min from DPS via the ocean tollway. Private car from {price}.",
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
    metaName: "Canggu",
    region: "South Bali",
    distanceKm: 19,
    durationMinutes: "45 - 75 mins",
    slug: "bali-airport-transfer-to-canggu",
    description: "Trending surfer, digital nomad, and nightlife hotspot with chic cafes, beach clubs (Finns, Atlas), and ocean villas.",
    metaDescription: "Surfboard-friendly transfers to Canggu, Berawa and Batu Bolong, 60 min from DPS. Flat {price}, with free flight delay tracking.",
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
    metaName: "Uluwatu",
    region: "Uluwatu & Bukit",
    distanceKm: 22,
    durationMinutes: "45 - 65 mins",
    slug: "bali-airport-transfer-to-uluwatu",
    description: "Clifftop majesty overlooking world-class surf breaks, sunset temples, and ultra-luxury clifftop resorts.",
    metaDescription: "Drop-off at Uluwatu, Bingin and Padang Padang clifftop villas, 65 min from DPS. Flat {price}, luggage and board handling.",
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
    metaName: "Ubud",
    region: "Central Bali",
    distanceKm: 38,
    durationMinutes: "60 - 90 mins",
    slug: "bali-airport-transfer-to-ubud",
    description: "Bali's cultural, yoga, and wellness sanctuary surrounded by lush rainforests and artistic heritage.",
    metaDescription: "Door-to-door Ubud villa transfers through Sayan and Monkey Forest, 90 min from DPS. Fixed {price}, toll and parking included.",
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
    metaName: "Tanah Lot",
    region: "Central Bali",
    distanceKm: 32,
    durationMinutes: "50 - 75 mins",
    slug: "bali-airport-transfer-to-tanah-lot",
    description: "Home to Bali's iconic sea temple at Tanah Lot, royal Mengwi Taman Ayun temple, and peaceful western rice plains.",
    metaDescription: "Tanah Lot sea temple and Tabanan resort transfers, 75 min from DPS. {price} all-in, flight tracking and free 90-min waiting.",
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
    metaName: "Klungkung",
    region: "North & East Bali",
    distanceKm: 44,
    durationMinutes: "55 - 75 mins",
    slug: "bali-airport-transfer-to-klungkung",
    description: "Historic royal capital of Bali and traditional salt-farming coast, gateway to Nusa Penida fast boats from Kusamba.",
    metaDescription: "Klungkung and Kusamba Port transfers via the east coast bypass, 75 min from DPS. Private car from {price}, live flight tracking.",
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
    metaName: "Tegallalang",
    region: "Central Bali",
    distanceKm: 52,
    durationMinutes: "80 - 110 mins",
    slug: "bali-airport-transfer-to-tegallalang",
    description: "Spectacular UNESCO Tegallalang rice terraces, Tirta Empul holy water springs, and luxury rainforest retreats in Payangan.",
    metaDescription: "Tegallalang rice terraces and Payangan jungle retreats, 110 min from DPS. {price} for 1-4 pax, luggage assistance included.",
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
    metaName: "Padangbai",
    region: "North & East Bali",
    distanceKm: 65,
    durationMinutes: "90 - 120 mins",
    slug: "bali-airport-transfer-to-padangbai",
    description: "Gili Islands ferry port at Padangbai, serene Candidasa beachfront, Alila Manggis, and authentic East Bali royal palaces.",
    metaDescription: "Catch your Gili Islands ferry at Padangbai, or Candidasa beach hotels, 2 hrs from DPS. From {price}, door-to-door drop-off.",
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
    metaName: "Munduk",
    region: "North & East Bali",
    distanceKm: 78,
    durationMinutes: "2.5 - 3 hrs",
    slug: "bali-airport-transfer-to-munduk",
    description: "Cool mountain highlands, misty waterfalls, coffee estates, and iconic Ulun Danu Beratan water temple.",
    metaDescription: "Munduk highlands, Bedugul and Ulun Danu Beratan temple, 3 hrs from DPS. {price} with a mountain-experienced chauffeur.",
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
    metaName: "Lovina",
    region: "North & East Bali",
    distanceKm: 88,
    durationMinutes: "2.5 - 3.5 hrs",
    slug: "bali-airport-transfer-to-lovina",
    description: "Tranquil northern Bali coastline famous for sunrise dolphin watching boat tours, calm seas, and historical Singaraja city.",
    metaDescription: "Lovina dolphin tours and Singaraja hotels, 3.5 hrs from DPS. Fixed {price} for the whole car, comfy AC ride with a rest stop.",
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
    metaName: "Amed & Tulamben",
    region: "North & East Bali",
    distanceKm: 98,
    durationMinutes: "2.5 - 3.5 hrs",
    slug: "bali-airport-transfer-to-amed",
    description: "World-renowned diving mecca with the USAT Liberty shipwreck in Tulamben and picturesque sunrise fishing bays of Amed.",
    metaDescription: "Dive trips to the USAT Liberty wreck in Tulamben and Amed bays, 3.5 hrs from DPS. Gear-friendly car from {price}.",
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
      "Child / Baby Seat on Request (IDR 50k/seat)",
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

/**
 * Expand the `{price}` token used in `Destination.metaDescription`.
 *
 * Produces `"IDR 400,000 ($25 USD)"`. Thousands are separated with commas
 * because `formatPrice`'s Indonesian style (`"IDR 400.000"`) reads as a decimal
 * to a non-Indonesian audience. The USD figure comes from `EXCHANGE_RATES` - the
 * same table the on-page currency switcher uses - so the snippet Google shows
 * and the price on the page can never disagree.
 */
export function fillPrice(template: string, standardIdr: number): string {
  const idr = `IDR ${standardIdr.toLocaleString("en-US")}`;
  return template.replace("{price}", `${idr} (${formatPrice(standardIdr, "USD")} USD)`);
}
