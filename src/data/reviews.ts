export interface Review {
  id: string;
  author: string;
  country: string;
  countryFlag: string;
  route: string;
  vehicle: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export const BALI_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Liam & Sarah Jenkins",
    country: "Sydney, Australia",
    countryFlag: "🇦🇺",
    route: "DPS Airport → Ubud (Sayan)",
    vehicle: "Toyota Innova Zenix SUV",
    rating: 5,
    date: "March 2026",
    title: "Best decision after a long 6-hour flight with 2 toddlers!",
    comment: "Landing at Denpasar airport with two sleepy kids was daunting, but our driver Wayan was waiting right at the exit gate holding our name on an iPad. The Innova Zenix was spotless, ice cold AC, cold bottled water, and pre-installed child safety seats. Total lifesaver and zero stress.",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Charlotte Davies",
    country: "London, United Kingdom",
    countryFlag: "🇬🇧",
    route: "DPS Airport → Seminyak (W Hotel)",
    vehicle: "Toyota Veloz MPV",
    rating: 5,
    date: "February 2026",
    title: "Avoided the chaotic airport taxi crowd completely",
    comment: "The taxi touts at Bali airport arrivals can be very pushy and quote crazy prices. Pre-booking Great Bali Airport Transfer for $16 USD was seamless. Driver Ketut messaged me on WhatsApp before takeoff and was right there when I walked out. Fast, safe, and professional.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Marcus & Elena Vance",
    country: "California, USA",
    countryFlag: "🇺🇸",
    route: "DPS Airport → Uluwatu (Bulgari Resort)",
    vehicle: "Toyota Alphard Executive VIP",
    rating: 5,
    date: "March 2026",
    title: "Genuine 5-Star VIP Chauffeur Service in Bali",
    comment: "We booked the Alphard VIP transfer for our honeymoon. The car was immaculate luxury—reclining captain leather seats, refreshing cold towels, and chilled sparkling water. Our driver Made was impeccably dressed and drove with extreme care. Felt like royalty.",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Tan Wei Ming & Surf Crew",
    country: "Singapore",
    countryFlag: "🇸🇬",
    route: "DPS Airport → Canggu (Echo Beach)",
    vehicle: "Toyota HiAce Premio Luxury Van",
    rating: 5,
    date: "January 2026",
    title: "Perfect for 7 guys plus surfboard bags!",
    comment: "Traveling with 7 surfboards and 8 bulky luggage bags usually means booking 3 separate cabs. The HiAce Premio swallowed everything effortlessly. High ceiling, USB chargers for everyone, and great driver music playlist. Will book every surf trip!",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Julian Schmidt",
    country: "Munich, Germany",
    countryFlag: "🇩🇪",
    route: "DPS Airport → Nusa Dua (The Mulia)",
    vehicle: "Toyota Veloz MPV",
    rating: 5,
    date: "March 2026",
    title: "Flight delayed by 3 hours—driver was still there with a smile!",
    comment: "Our Emirates flight had a 3-hour delay in Dubai. I didn't even have Wi-Fi to notify them mid-air, but they tracked the flight number online! When we arrived at 1 AM, Nyoman was there waiting patiently with no extra fee. Outstanding reliability.",
    verified: true,
  },
  {
    id: "rev-6",
    author: "Camille Laurent",
    country: "Paris, France",
    countryFlag: "🇫🇷",
    route: "DPS Airport → Amed (Diving Resort)",
    vehicle: "Toyota Innova Zenix SUV",
    rating: 5,
    date: "February 2026",
    title: "Smooth 3-hour journey to East Bali with scenic stops",
    comment: "Driving across Bali to Amed takes almost 3 hours. Our driver Gede made the ride delightful, stopped at a clean coffee stop with volcano views, and drove very smoothly. Fair fixed price without hidden charges. Highly recommended.",
    verified: true,
  },
];
