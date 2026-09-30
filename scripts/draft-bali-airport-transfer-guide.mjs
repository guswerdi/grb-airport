/**
 * Drafts the long-form article "Bali Airport Transfer Guide: Prices, Options & What to
 * Expect at DPS Airport (2026)" into Sanity as a DRAFT (never published).
 *
 * Run: npm run draft:airport-guide
 *      (or) node scripts/draft-bali-airport-transfer-guide.mjs
 *
 * Why this exists: the blog is fully Sanity-driven (sanity/schemas.ts -> `post`), but the
 * dataset only held system documents, so the first article had to be seeded with Portable
 * Text blocks plus uploaded images. Nothing here ships to the browser - it is a one-off
 * content seeder that can be re-run safely:
 *   - images are de-duplicated by Sanity (the same file returns the same asset id)
 *   - the document id is `drafts.<id>`, so the published dataset stays untouched and an
 *     editor still has to review + press Publish in /studio
 *
 * Requires a logged-in Sanity CLI session (`npx sanity login`) - no API token is needed,
 * and the asset upload / document commands run against the dataset from sanity.cli.ts.
 *
 * Content rules taken from src/components/PortableTextBlocks.tsx and sanity/schemas.ts:
 *   - the body renders: normal paragraphs, h2-h4, blockquote, bullet/number lists, images
 *   - inline marks / links are NOT rendered by the site renderer, so the body stays plain
 *   - Markdown tables are expanded into bullet lists (the schema has no table type)
 *   - every image carries `alt` text (SEO copy), read by PortableTextBlocks and the
 *     blog listing / BlogPosting structured data
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const documentId = "post-bali-airport-transfer-guide";
const draftId = `drafts.${documentId}`;

/* ------------------------------------------------------------------ */
/* Article metadata (mirrors the `post` schema fields)                 */
/* ------------------------------------------------------------------ */

const title =
  "Bali Airport Transfer Guide: Prices, Options & What to Expect at DPS Airport (2026)";
const slug = "bali-airport-transfer-guide";
const category = "Airport Guide";
const excerpt =
  "Bali airport transfer guide 2026: private transfer vs taxi vs Grab, fixed prices from IDR 250,000, and real travel times to Ubud, Canggu and Uluwatu.";
const featured = false;

/* ------------------------------------------------------------------ */
/* Images - site artwork, reused so the article matches the live pages */
/* ------------------------------------------------------------------ */

const IMAGES = {
  heroMeetGreet: {
    file: "public/images/hero-alphard.jpg",
    alt: "Balinese chauffeur holding a welcome name sign next to a private transfer car at Ngurah Rai International Airport arrivals in Bali",
  },
  standardCar: {
    file: "public/images/veloz-mpv.jpg",
    alt: "Standard Car private airport transfer, a white Toyota Avanza Veloz, waiting with its English-speaking driver at a Bali villa",
  },
  comfortCar: {
    file: "public/images/innova-zenix.jpg",
    alt: "Comfort Car Toyota Innova Zenix driving a scenic coastal road in Bali on the way from DPS Airport to Seminyak",
  },
  bigVan: {
    file: "public/images/hiace-premio.jpg",
    alt: "Toyota HiAce 12-seater Big Van parked at a Balinese villa courtyard for a group airport transfer in Bali",
  },
  seminyak: {
    file: "public/images/dest-seminyak.jpg",
    alt: "Seminyak beachfront villas and beach clubs, a popular Bali airport transfer destination 30 to 45 minutes from DPS Airport",
  },
  uluwatu: {
    file: "public/images/dest-uluwatu.jpg",
    alt: "Uluwatu clifftop coastline on Bali's Bukit Peninsula, around 45 to 65 minutes from Ngurah Rai International Airport",
  },
  ubud: {
    file: "public/images/dest-ubud.jpg",
    alt: "Terraced green rice fields near Ubud, roughly 60 to 90 minutes from Bali Airport by private transfer",
  },
};

/* ------------------------------------------------------------------ */
/* Article body (Portable Text source: p / h2-h4 / quote / ul / ol / img) */
/* ------------------------------------------------------------------ */

const CONTENT = [
  {
    p: "Arriving at Bali's Ngurah Rai International Airport is usually the first step of your holiday, but getting from the airport to your hotel can sometimes feel confusing.",
  },
  {
    p: "Should you book a private Bali airport transfer? Take an official airport taxi? Use Grab or Gojek? How much should you expect to pay, and where exactly will your driver meet you?",
  },
  {
    p: "The answer depends on your destination, group size, luggage, arrival time, and how much convenience you want.",
  },
  {
    p: "This Bali airport transfer guide explains the main transportation options from I Gusti Ngurah Rai International Airport (DPS), how private airport transfers work, typical travel times to popular Bali destinations such as Seminyak, Canggu, Uluwatu and Ubud, what affects the price, and what to check before booking.",
  },
  {
    h2: "Quick Answer: What Is the Best Way to Get From Bali Airport to Your Hotel?",
  },
  {
    p: "For travelers who want a simple door-to-door journey, a pre-booked private Bali airport transfer is one of the most convenient options. Your driver can monitor your flight, meet you after arrival, help with your luggage, and take you directly to your hotel, villa, or resort.",
  },
  {
    p: "Other options are also available. You can use an official airport taxi, Grab, Gojek, or other transportation services depending on your destination and preference.",
  },
  {
    p: "The main difference is convenience. A pre-booked private transfer gives you a vehicle arranged before you land, while app-based transportation and airport taxis require you to arrange the ride after arriving.",
  },
  {
    quote:
      "For first-time visitors, families, groups with luggage, and travelers arriving after a long international flight, arranging airport transportation in advance makes the first part of your Bali trip considerably easier.",
  },
  { h2: "Bali Airport: What You Need to Know About DPS" },
  {
    p: "Bali's main airport is I Gusti Ngurah Rai International Airport, commonly referred to as DPS Airport or simply Bali Airport. The airport serves both international and domestic flights and is located in the southern part of Bali, about 6 km from Kuta and around 12 km from Seminyak.",
  },
  {
    p: "After an international arrival, passengers generally go through immigration, collect their luggage, complete customs procedures, and then continue toward the arrival and pickup area.",
  },
  {
    p: "The airport has designated pickup areas for transportation services. Official airport information also provides dedicated facilities for taxis, Grab, and Gojek passengers.",
  },
  {
    p: "This is important because not every transportation service can simply pick passengers up wherever they exit the terminal. If you book a private airport transfer, your provider should give you clear instructions about where to meet your driver.",
  },
  { h2: "Bali Airport Transfer Options" },
  { p: "There are several ways to travel from DPS Airport to your hotel." },
  { h3: "1. Private Bali Airport Transfer" },
  {
    p: "A private airport transfer is arranged before your flight arrives. Typically, you provide:",
  },
  {
    ul: [
      "Arrival date",
      "Arrival time",
      "Flight number",
      "Passenger number",
      "Hotel or villa name",
      "Preferred vehicle",
    ],
  },
  {
    p: "Your driver then uses your flight information to monitor the arrival and coordinates the pickup. With a private transfer, you do not have to negotiate transportation after landing. You simply follow the meeting instructions, meet your driver, load your luggage, and travel directly to your destination.",
  },
  { p: "This is particularly useful when:" },
  {
    ul: [
      "You are visiting Bali for the first time",
      "You have several pieces of luggage",
      "You are traveling with children",
      "You arrive late at night",
      "You are traveling as a group",
      "Your hotel is outside the main tourist areas",
      "You do not want to arrange transportation after a long flight",
    ],
  },
  { h3: "2. Official Airport Taxi" },
  {
    p: "Official taxi services are another option at DPS Airport. The airport provides official taxi facilities and counters for arriving passengers.",
  },
  {
    p: "The advantage is that you can arrange transportation after landing without making an advance reservation. However, you still need to find the appropriate counter, confirm your destination, arrange the ride, and then proceed to the pickup area.",
  },
  {
    p: "For travelers who prefer to have everything arranged before departure, a private airport transfer can be more straightforward.",
  },
  { h3: "3. Grab or Gojek" },
  {
    p: "Ride-hailing services are also available at Bali Airport. However, passengers generally need to use the designated pickup facilities rather than requesting a driver to collect them directly outside any airport exit. Ngurah Rai Airport provides dedicated Grab and Gojek facilities for passengers.",
  },
  {
    p: "This can be a good option if you are comfortable using the apps and do not mind navigating the pickup process after arrival.",
  },
  { h2: "Private Transfer vs Airport Taxi vs Grab" },
  { p: "Here is a simple comparison of the options available when you land at DPS Airport:" },
  {
    ul: [
      "Private airport transfer - best for convenience and door-to-door service. Booked before arrival, you meet your driver at an arranged meeting point.",
      "Official airport taxi - best for travelers arranging transport after landing. Booked at the airport, you pick up the car in the designated taxi area.",
      "Grab / Gojek - app-based transportation booked after arrival, with pickup at the designated ride-hailing area.",
      "Public transport - the budget option, arranged after arrival from designated stops and routes.",
    ],
  },
  {
    p: "There is no single transportation option that is perfect for everyone. If your priority is the lowest possible cost, app-based transportation or public options may suit you. If your priority is a smooth arrival after a long flight, pre-booking a private transfer usually makes more sense.",
  },
  { h2: "How Much Does a Bali Airport Transfer Cost?" },
  {
    p: "Bali airport transfer prices vary depending on the destination and the vehicle. A short transfer to areas such as Kuta, Jimbaran, Seminyak, or Nusa Dua generally costs less than a long-distance transfer to Amed, Tulamben, Lovina, or other parts of Bali.",
  },
  {
    p: "At Great Bali Airport Transfer, current fixed rates are quoted per vehicle rather than per person. The current fleet starts from:",
  },
  {
    ul: [
      "Standard Car - IDR 250,000",
      "Comfort Car - IDR 300,000",
      "Big Van - IDR 600,000",
    ],
  },
  {
    p: "The exact fare depends on the destination zone and the selected vehicle. For example, current published rates include:",
  },
  {
    ul: [
      "Kuta & Legian - Standard Car IDR 250,000 / Comfort Car IDR 300,000 / Big Van IDR 600,000",
      "Seminyak - Standard Car IDR 250,000 / Comfort Car IDR 300,000 / Big Van IDR 600,000",
      "Nusa Dua - Standard Car IDR 250,000 / Comfort Car IDR 300,000 / Big Van IDR 600,000",
      "Sanur - Standard Car IDR 275,000 / Comfort Car IDR 400,000 / Big Van IDR 650,000",
      "Canggu - Standard Car IDR 325,000 / Comfort Car IDR 450,000 / Big Van IDR 700,000",
      "Uluwatu - Standard Car IDR 325,000 / Comfort Car IDR 450,000 / Big Van IDR 700,000",
      "Ubud Center - Standard Car IDR 400,000 / Comfort Car IDR 500,000 / Big Van IDR 800,000",
      "Amed & Tulamben - Standard Car IDR 850,000 / Comfort Car IDR 1,000,000 / Big Van IDR 1,600,000",
    ],
  },
  {
    p: "These prices are per private vehicle, so the cost is not multiplied by the number of passengers traveling within the vehicle's capacity.",
  },
  {
    p: "Always check the current route rate when booking, because pricing and service conditions can change.",
  },
  { h2: "What Is Included in a Private Bali Airport Transfer?" },
  {
    p: "One of the most important things to check when comparing airport transfers is what is actually included. A low headline price is not necessarily the cheapest final option if additional fees are added later.",
  },
  {
    p: "Great Bali Airport Transfer currently includes the following in its airport transfer service:",
  },
  {
    ul: [
      "Private vehicle",
      "Professional driver",
      "Fuel",
      "Bali Mandara tollway",
      "Airport parking",
      "Airport meet and greet",
      "Flight tracking",
      "Complimentary waiting time",
      "Door-to-door hotel, resort, or villa transfer",
    ],
  },
  {
    p: "The service currently provides 90 minutes of complimentary waiting time for airport arrivals. The driver can also track your flight, which is useful if the aircraft arrives later than originally scheduled.",
  },
  { h2: "Which Vehicle Should You Choose?" },
  {
    p: "Choosing the right vehicle is more important than many travelers realize. Your passenger count is not the only factor, you also need to consider luggage.",
  },
  { h3: "Standard Car" },
  {
    p: "The standard option uses a Toyota Avanza or Veloz. It is designed for smaller groups and is suitable for couples, small families, and travelers with a moderate amount of luggage. Current capacity is listed at up to four passengers, with luggage capacity depending on the amount and size of your bags.",
  },
  { img: "standardCar" },
  { h3: "Comfort Car" },
  {
    p: "The comfort option uses a Toyota Innova Zenix. This is a good choice if you want more interior space and a more comfortable ride. It is listed for up to five passengers, with additional luggage capacity compared with the standard vehicle. A child or baby seat can also be requested.",
  },
  { img: "comfortCar" },
  { h3: "Big Van" },
  {
    p: "For larger groups, the Toyota HiAce provides significantly more passenger and luggage space. It is listed for up to 12 passengers and is particularly useful for families traveling together, groups, surfboards, large suitcases, and multiple pieces of luggage.",
  },
  { img: "bigVan" },
  {
    p: "If you are unsure whether a standard car will fit your group and your luggage, choosing the larger vehicle can avoid an uncomfortable airport transfer.",
  },
  { h2: "Bali Airport to Popular Destinations" },
  {
    p: "One of the most common questions travelers ask is: how long does it take from Bali Airport to my hotel?",
  },
  {
    p: "The answer depends heavily on traffic. The distance may look short on a map, but Bali's traffic can significantly affect travel time. The estimates below are the typical route times quoted for a private airport transfer from DPS Airport.",
  },
  { h3: "Bali Airport to Kuta" },
  {
    p: "Kuta is one of the closest major tourist areas to DPS Airport. The typical distance is approximately 6 km, with a typical driving time of 15 to 25 minutes. Legian, Tuban, and the Beachwalk shopping area sit within the same transfer zone.",
  },
  { h3: "Bali Airport to Seminyak" },
  {
    p: "Seminyak is approximately 12 km from the airport, with a typical travel time of 30 to 45 minutes. Traffic can make the journey longer during busy periods, especially along Jalan Kayu Aya after 5 PM.",
  },
  { img: "seminyak" },
  { h3: "Bali Airport to Sanur" },
  {
    p: "Sanur is approximately 16 km from DPS Airport, with a typical travel time of 25 to 35 minutes. Sanur is also an important departure area for travelers continuing to Nusa Penida or Nusa Lembongan by fast boat, so early morning pickups are common.",
  },
  { h3: "Bali Airport to Canggu" },
  {
    p: "Canggu is approximately 19 km from the airport, with a typical travel time of 45 to 75 minutes. This route can be significantly affected by traffic, particularly in the late afternoon around the Canggu shortcut and Jalan Pantai Berawa. If you are staying in Canggu, arranging transportation in advance can save you from trying to figure out the route immediately after landing.",
  },
  { h3: "Bali Airport to Uluwatu" },
  {
    p: "Uluwatu and the Bukit Peninsula are approximately 22 km from DPS Airport, with a typical travel time of 45 to 65 minutes. This makes Uluwatu one of the more popular private airport transfer routes for travelers staying in southern Bali, especially around sunset when traffic builds near Uluwatu Temple.",
  },
  { img: "uluwatu" },
  { h3: "Bali Airport to Ubud" },
  {
    p: "Ubud Center is approximately 38 km from DPS Airport, with a typical travel time of 60 to 90 minutes. If you are staying farther north of central Ubud, the journey can take longer. For remote Ubud area hotels, resorts, and villas, always provide the exact accommodation name when booking.",
  },
  { img: "ubud" },
  { h2: "Why Airport Transfer Times Can Change" },
  { p: "Do not plan your airport transfer based only on distance. Bali traffic can vary considerably depending on:" },
  {
    ul: [
      "Time of day",
      "Day of the week",
      "Weather",
      "Road conditions",
      "Local ceremonies and events",
      "Tourist traffic",
      "Your exact hotel location",
    ],
  },
  {
    quote:
      "A route that normally takes 30 minutes can take considerably longer during a busy period, so always allow extra time.",
  },
  {
    p: "This is why experienced local drivers can be useful. They are familiar with common routes and can adjust the route when conditions change. However, no driver can completely eliminate Bali traffic. If you have a flight to catch, always allow enough time for the journey.",
  },
  { h2: "How Bali Airport Pickup Works" },
  {
    p: "If you have never booked a private airport transfer before, the process is relatively simple and follows five steps.",
  },
  { h4: "Step 1: Book Your Transfer" },
  {
    p: "Provide your flight number, arrival date, arrival time, passenger count, hotel or villa name, and preferred vehicle.",
  },
  { h4: "Step 2: Your Flight Is Tracked" },
  {
    p: "The driver monitors your flight information. If the flight is delayed, the driver can adjust the pickup timing accordingly.",
  },
  { h4: "Step 3: Follow the Meeting Instructions" },
  {
    p: "After completing the airport arrival process, follow the meeting point instructions provided by your transfer company. A private airport transfer should give you clear information about where the driver will meet you.",
  },
  { h4: "Step 4: Meet Your Driver" },
  {
    p: "The driver identifies you using the agreed meeting method, such as a welcome name sign with your name on it.",
  },
  { h4: "Step 5: Travel Directly to Your Hotel" },
  {
    p: "Once you have met your driver and loaded your luggage, you travel directly to your destination. There is no need to arrange another ride along the way.",
  },
  { h2: "What If Your Flight Is Delayed?" },
  {
    p: "Flight delays are one of the reasons pre-booked airport transfers are useful. When booking, provide your actual flight number rather than only giving an estimated arrival time. This allows the transportation provider to monitor the flight and adjust the pickup accordingly.",
  },
  {
    p: "At Great Bali Airport Transfer, flight tracking and 90 minutes of complimentary airport waiting time are currently included in the airport transfer service. Always check the provider's current cancellation and waiting time policy before booking.",
  },
  { h2: "What If You Arrive Late at Night?" },
  {
    p: "Bali receives flights throughout the day and night. If your flight arrives late, having transportation arranged in advance can be more comfortable than trying to organize a ride after landing.",
  },
  { p: "Before booking a late-night airport transfer, confirm:" },
  {
    ul: [
      "Pickup availability at your arrival time",
      "The exact meeting point",
      "The waiting policy if immigration takes longer than expected",
      "The payment method accepted",
      "Your destination address or villa name",
      "The vehicle type you have booked",
    ],
  },
  {
    p: "The most important thing is knowing exactly what to do after leaving the arrivals area.",
  },
  { h2: "Bali Airport Transfer for Families" },
  { p: "Traveling with children requires a little more planning. Consider child seats, luggage space, travel time, late-night arrivals, and your hotel location." },
  {
    p: "A vehicle that comfortably fits adults may feel cramped once you add child seats, strollers, and multiple suitcases. For families, the Toyota Innova Zenix comfort option provides additional interior space, while child or baby seats can be requested. For larger families, a Toyota HiAce can provide substantially more room.",
  },
  { h2: "Bali Airport Transfer for Groups" },
  {
    p: "Groups often have a different transportation problem. A group of eight people does not necessarily need two small cars. Depending on luggage requirements, a larger private van can be more practical.",
  },
  {
    p: "A Toyota HiAce is designed for larger groups and is listed for up to 12 passengers. It also provides substantially more luggage capacity than a standard car. For group arrivals, make sure everyone has the same pickup instructions so that nobody waits at the wrong meeting point.",
  },
  { h2: "What About Surfboards and Large Luggage?" },
  { p: "Bali is a popular destination for surfers, divers, and travelers carrying sports equipment. If you are traveling with:" },
  {
    ul: [
      "Surfboards",
      "Diving equipment",
      "Large suitcases",
      "Multiple backpacks",
      "Baby equipment such as strollers or travel cots",
    ],
  },
  {
    p: "Tell the transportation provider before booking. A standard vehicle may technically fit the passenger count but still not have enough luggage space. The HiAce is specifically positioned for larger groups, surfboards, and additional luggage.",
  },
  { h2: "Hotel, Villa & Resort Pickup" },
  { p: "Not every Bali accommodation is a conventional hotel. You may be staying at a private villa, a boutique hotel, a resort, a guesthouse, or apartment-style accommodation." },
  {
    p: "Some villas are located inside narrow residential roads or areas where the exact entrance can be difficult to identify. When booking an airport transfer, provide the exact accommodation name and location whenever possible. For private villas, providing the address or a Google Maps location can make the pickup process easier.",
  },
  {
    quote:
      "A clear meeting point and the exact villa or hotel name are the two details that prevent almost every airport pickup problem.",
  },
  { h2: "How to Choose a Bali Airport Transfer" },
  { p: "Before booking, compare more than just the price. Here are the main things to check." },
  { h4: "1. Is the fare fixed?" },
  {
    p: "A fixed fare makes it easier to understand your transportation cost before you arrive, with no surprises at the end of the journey.",
  },
  { h4: "2. Is the price per person or per vehicle?" },
  {
    p: "Private airport transfers are often quoted per vehicle. Confirm this before comparing providers, because the final cost per person changes completely depending on the answer.",
  },
  { h4: "3. Is flight tracking included?" },
  {
    p: "This is particularly useful if your flight is delayed, and it means the driver knows your real arrival time rather than the schedule.",
  },
  { h4: "4. How long is the complimentary waiting time?" },
  {
    p: "This can matter if immigration, visa on arrival, or baggage collection takes longer than expected.",
  },
  { h4: "5. Are tolls and parking included?" },
  {
    p: "Check whether airport parking and highway tolls such as the Bali Mandara tollway are included or charged separately.",
  },
  { h4: "6. Where will the driver meet you?" },
  { p: "A clear meeting point is essential, especially at a busy international arrivals hall." },
  { h4: "7. Is the vehicle large enough?" },
  { p: "Consider luggage as well as passenger count before you confirm the booking." },
  { h4: "8. What happens if your flight is delayed?" },
  { p: "Read the provider's waiting and cancellation policy so you know your options in advance." },
  { h4: "9. How can you contact the driver?" },
  { p: "Make sure you have a reliable communication method, usually WhatsApp, before you arrive." },
  { h2: "Bali Airport Transfer vs Hiring a Driver for the Day" },
  {
    p: "An airport transfer and a private driver service are not exactly the same thing. An airport transfer is generally designed for a single direct journey: airport to hotel, or hotel to airport. You travel directly to your destination without sightseeing stops.",
  },
  {
    p: "A private driver for the day is different. You might use a driver for a full itinerary such as hotel, temple, waterfall, lunch, rice terrace, and back to the hotel. If you need transportation for sightseeing after arrival, consider a separate private chauffeur or day-trip service rather than booking an airport transfer alone.",
  },
  { h2: "Common Bali Airport Transfer Mistakes" },
  { h3: "Mistake 1: Waiting Until You Land" },
  {
    p: "You can arrange transportation after arriving, but this can be stressful after a long flight. If you already know your hotel and arrival details, booking ahead is often simpler.",
  },
  { h3: "Mistake 2: Choosing a Vehicle Based Only on Passenger Count" },
  {
    p: "Always consider luggage. Four passengers with four large suitcases have very different transportation needs compared with four passengers carrying small backpacks.",
  },
  { h3: "Mistake 3: Not Providing Your Flight Number" },
  {
    p: "Your flight number allows the transportation provider to monitor the arrival and adjust the pickup if the flight is early or delayed.",
  },
  { h3: "Mistake 4: Not Checking the Meeting Point" },
  {
    p: "Do not assume the driver can meet you anywhere inside the airport. Read the pickup instructions carefully before you travel.",
  },
  { h3: "Mistake 5: Assuming Every Transfer Has the Same Inclusions" },
  {
    p: "Some companies include fuel, tolls, parking, waiting time, or flight tracking. Others may charge additional fees. Always compare the complete service, not only the headline price.",
  },
  { h2: "Do You Need to Book a Bali Airport Transfer in Advance?" },
  { p: "For many travelers, booking ahead is worthwhile. It is particularly useful if:" },
  {
    ul: [
      "Your flight arrives late",
      "You are traveling with children",
      "You are traveling as a group",
      "You have a lot of luggage",
      "You are staying in a private villa",
      "You are traveling to Ubud or another destination outside South Bali",
      "You do not want to arrange transportation after landing",
    ],
  },
  {
    p: "For very short trips, or for travelers who are comfortable using ride-hailing apps, arranging transportation after arrival can also work. The choice comes down to how much convenience and certainty you want on arrival day.",
  },
  { h2: "Frequently Asked Questions" },
  { h3: "What is the best airport transfer in Bali?" },
  {
    p: "There is no single option that suits every traveler. Private transfers prioritize convenience and pre-arranged transportation, while airport taxis and ride-hailing services provide alternatives for travelers who prefer to arrange transportation after arrival.",
  },
  { h3: "How much is a Bali airport transfer?" },
  {
    p: "Prices depend on your destination and vehicle. Current Great Bali Airport Transfer rates start from IDR 250,000 for a standard private car, IDR 300,000 for a comfort car, and IDR 600,000 for a Big Van, quoted per vehicle rather than per person.",
  },
  { h3: "Is a Bali airport transfer per person?" },
  {
    p: "Private airport transfers are commonly priced per vehicle. Great Bali Airport Transfer's published rates are per vehicle, subject to the vehicle's passenger capacity.",
  },
  { h3: "How far is Ubud from Bali Airport?" },
  {
    p: "Ubud Center is approximately 38 km from DPS Airport. Typical driving time is around 60 to 90 minutes, although traffic can affect the journey.",
  },
  { h3: "How long does Bali Airport to Canggu take?" },
  {
    p: "The route is approximately 19 km and typically takes around 45 to 75 minutes, depending on traffic.",
  },
  { h3: "Can I book an airport transfer to a private villa?" },
  {
    p: "Yes. When booking, provide the exact villa name and location so the driver can identify the correct destination, especially for villas located on narrow residential roads.",
  },
  { h3: "What happens if my flight is delayed?" },
  {
    p: "If your provider offers flight tracking, the driver can monitor the flight and adjust the pickup timing, while the complimentary waiting time covers longer immigration queues. Always check the provider's waiting time and cancellation policy.",
  },
  { h3: "Is Grab available at Bali Airport?" },
  {
    p: "Yes. Ngurah Rai Airport provides designated Grab facilities for passengers, so pickups are arranged at the official ride-hailing area rather than at any terminal exit.",
  },
  { h3: "Can I get a taxi at Bali Airport?" },
  {
    p: "Yes. The airport provides official taxi facilities for arriving passengers, and you can arrange the ride at the airport instead of booking in advance.",
  },
  { h3: "What vehicle should I book for a family?" },
  {
    p: "For a small family, a standard car may be sufficient. Families needing additional luggage space or child seats may prefer a larger comfort vehicle such as the Toyota Innova Zenix, while larger families and groups can consider a Toyota HiAce.",
  },
  { h2: "Final Thoughts: Making Your Bali Arrival Easier" },
  {
    p: "Your first journey in Bali does not need to be complicated. There are several ways to get from DPS Airport to your accommodation, including official airport taxis, ride-hailing services, and private airport transfers.",
  },
  {
    p: "The right choice depends on your priorities. If you want to arrange everything before your flight, have a driver waiting for you, and travel directly from the airport to your hotel or villa, a private Bali airport transfer can be a convenient option. If you are comfortable arranging transportation after landing, Grab, Gojek, and official airport taxis are alternatives worth considering.",
  },
  {
    p: "Whichever option you choose, check the vehicle capacity, meeting point, waiting policy, inclusions, and destination before booking. A little planning before your flight can make your first hour in Bali much easier.",
  },
  {
    p: "If you prefer a pre-arranged private ride with a fixed fare, you can review the available Bali airport transfer routes and choose the vehicle that fits your trip. Prices above are per vehicle and include the Bali Mandara tollway, airport parking, meet and greet, flight tracking, and 90 minutes of complimentary waiting time.",
  },
];

/* ------------------------------------------------------------------ */
/* Portable Text builders                                             */
/* ------------------------------------------------------------------ */

let keySeed = 0;

/** Sanity only needs keys to be unique inside the array - they are not persisted elsewhere. */
function nextKey(prefix) {
  keySeed += 1;
  return `${prefix}-${keySeed.toString(36)}`;
}

function textBlock(style, text, listItem) {
  return {
    _type: "block",
    _key: nextKey(style),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: nextKey("span"), marks: [], text }],
    ...(listItem ? { listItem, level: 1 } : {}),
  };
}

/** Turn the CONTENT source above into Portable Text blocks + Sanity image blocks. */
function buildBody(content, assetRefs) {
  const body = [];
  for (const node of content) {
    if (node.p) body.push(textBlock("normal", node.p));
    else if (node.h2) body.push(textBlock("h2", node.h2));
    else if (node.h3) body.push(textBlock("h3", node.h3));
    else if (node.h4) body.push(textBlock("h4", node.h4));
    else if (node.quote) body.push(textBlock("blockquote", node.quote));
    else if (node.ul) node.ul.forEach((text) => body.push(textBlock("normal", text, "bullet")));
    else if (node.ol) node.ol.forEach((text) => body.push(textBlock("normal", text, "number")));
    else if (node.img) {
      body.push({
        _type: "image",
        _key: nextKey("image"),
        asset: { _type: "reference", _ref: assetRefs[node.img] },
        alt: IMAGES[node.img].alt,
      });
    } else {
      throw new Error(`Unsupported content node: ${JSON.stringify(node).slice(0, 80)}`);
    }
  }
  return body;
}

function countWords(body) {
  return body.reduce((total, node) => {
    const text = node.children
      ? node.children.map((child) => child.text).join(" ")
      : node.alt || "";
    return total + text.split(/\s+/).filter(Boolean).length;
  }, 0);
}

/* ------------------------------------------------------------------ */
/* Sanity CLI plumbing (uses the logged-in session, not an API token)  */
/* ------------------------------------------------------------------ */

function sanityCli(args) {
  // Quote arguments that contain spaces for cmd.exe (Windows paths in this repo do).
  const quoted = args.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg));
  const result = spawnSync("npx", ["--no-install", "sanity", ...quoted], {
    cwd: projectRoot,
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `sanity ${args.join(" ")} failed with exit code ${result.status}\n${result.stdout ?? ""}\n${
        result.stderr ?? ""
      }`
    );
  }
  return result.stdout ?? "";
}

/** The CLI mixes decorations with output, so slice out the outer JSON object. */
function extractJson(output) {
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start === -1 || end <= start) {
    throw new Error(`No JSON found in Sanity CLI output:\n${output}`);
  }
  return JSON.parse(output.slice(start, end + 1));
}

/** Upload one local image and return the asset id Sanity stored it under. */
function uploadImage(relativePath) {
  const output = sanityCli([
    "assets",
    "upload",
    "--file",
    path.join(projectRoot, relativePath),
    "--type",
    "image",
    "--dataset",
    dataset,
  ]);
  const reference = extractJson(output)?.reference?.asset?._ref;
  if (!reference) throw new Error(`Upload of ${relativePath} returned no asset reference`);
  console.log(`  ${relativePath} -> ${reference}`);
  return reference;
}

/* ------------------------------------------------------------------ */
/* Entry point                                                        */
/* ------------------------------------------------------------------ */

function main() {
  console.log(`Seeding article draft "${title}"`);
  console.log(`  project:  ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j1m80m30"}`);
  console.log(`  dataset:  ${dataset}`);
  console.log(`  draft id: ${draftId}`);

  console.log("\nUploading images:");
  const assetRefs = {};
  for (const [key, image] of Object.entries(IMAGES)) {
    assetRefs[key] = uploadImage(image.file);
  }

  const body = buildBody(CONTENT, assetRefs);
  const words = countWords(body);
  const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

  if (excerpt.length > 160) {
    console.warn(`  ! excerpt is ${excerpt.length} chars - trim it to <= 160 for search snippets`);
  }

  const document = {
    _id: draftId,
    _type: "post",
    title,
    slug: { _type: "slug", current: slug },
    excerpt,
    category,
    featured,
    publishedAt: new Date().toISOString(),
    readTime,
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetRefs.heroMeetGreet },
      alt: IMAGES.heroMeetGreet.alt,
    },
    body,
  };

  const payloadPath = path.join(tmpdir(), `${documentId}.json`);
  writeFileSync(payloadPath, `${JSON.stringify(document, null, 2)}\n`, "utf8");

  // Re-runnable: drop any previous version of this draft before recreating it.
  // Only the `drafts.` id is touched, never a published document.
  const previous = spawnSync(
    "npx",
    ["--no-install", "sanity", "documents", "get", draftId, "--dataset", dataset],
    { cwd: projectRoot, shell: true, encoding: "utf8" }
  );
  if (previous.status === 0) {
    console.log(`\nReplacing existing draft ${draftId}`);
    sanityCli(["documents", "delete", draftId, "--dataset", dataset]);
  }

  console.log(
    `\nCreating draft: ${body.length} blocks, ${words} words, ${readTime} (payload: ${payloadPath})`
  );
  sanityCli(["documents", "create", payloadPath, "--dataset", dataset]);

  const stored = extractJson(sanityCli(["documents", "get", draftId, "--dataset", dataset]));
  const imageBlocks = stored.body.filter((node) => node._type === "image").length;

  console.log("\nDraft stored (nothing was published):");
  console.log(`  _id:       ${stored._id}`);
  console.log(`  title:     ${stored.title}`);
  console.log(`  slug:      ${stored.slug?.current}`);
  console.log(`  body:      ${stored.body.length} blocks, ${imageBlocks} inline images`);
  console.log(`  mainImage: ${stored.mainImage?.alt ? "uploaded with alt text" : "MISSING"}`);
  console.log("\nReview it in Sanity Studio (/studio) and press Publish when you are ready.");
}

try {
  main();
} catch (error) {
  console.error(`\nDraft seeding failed: ${error.message}`);
  process.exitCode = 1;
}

