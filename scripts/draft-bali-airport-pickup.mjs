import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j1m80m30";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";

function readCliToken() {
  const configPath = path.join(
    process.env.USERPROFILE || process.env.HOME || "",
    ".config",
    "sanity",
    "config.json"
  );
  const token = JSON.parse(readFileSync(configPath, "utf8")).authToken;
  if (!token) {
    throw new Error("No Sanity CLI authToken found. Run `npx sanity login` first.");
  }
  return token;
}

let keyCounter = 1;
function k(prefix = "k") {
  return `${prefix}-${(keyCounter++).toString(36)}`;
}

function p(spans, markDefs = []) {
  const children = Array.isArray(spans)
    ? spans.map((s, idx) => {
        if (typeof s === "string") {
          return { _key: k("sp"), _type: "span", text: s, marks: [] };
        }
        return {
          _key: k("sp"),
          _type: "span",
          text: s.text,
          marks: s.marks || [],
        };
      })
    : [{ _key: k("sp"), _type: "span", text: spans, marks: [] }];

  return {
    _key: k("blk"),
    _type: "block",
    style: "normal",
    children,
    markDefs,
  };
}

function heading(level, text, markDefs = [], spans = null) {
  const children = spans
    ? spans.map((s) =>
        typeof s === "string"
          ? { _key: k("sp"), _type: "span", text: s, marks: [] }
          : { _key: k("sp"), _type: "span", text: s.text, marks: s.marks || [] }
      )
    : [{ _key: k("sp"), _type: "span", text, marks: [] }];

  return {
    _key: k("h"),
    _type: "block",
    style: level, // 'h2', 'h3', 'h4'
    children,
    markDefs,
  };
}

function bquote(spans, markDefs = []) {
  const children = Array.isArray(spans)
    ? spans.map((s) =>
        typeof s === "string"
          ? { _key: k("sp"), _type: "span", text: s, marks: [] }
          : { _key: k("sp"), _type: "span", text: s.text, marks: s.marks || [] }
      )
    : [{ _key: k("sp"), _type: "span", text: spans, marks: [] }];

  return {
    _key: k("bq"),
    _type: "block",
    style: "blockquote",
    children,
    markDefs,
  };
}

function bullet(spans, markDefs = []) {
  const children = Array.isArray(spans)
    ? spans.map((s) =>
        typeof s === "string"
          ? { _key: k("sp"), _type: "span", text: s, marks: [] }
          : { _key: k("sp"), _type: "span", text: s.text, marks: s.marks || [] }
      )
    : [{ _key: k("sp"), _type: "span", text: spans, marks: [] }];

  return {
    _key: k("li"),
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children,
    markDefs,
  };
}

function numItem(spans, markDefs = []) {
  const children = Array.isArray(spans)
    ? spans.map((s) =>
        typeof s === "string"
          ? { _key: k("sp"), _type: "span", text: s, marks: [] }
          : { _key: k("sp"), _type: "span", text: s.text, marks: s.marks || [] }
      )
    : [{ _key: k("sp"), _type: "span", text: spans, marks: [] }];

  return {
    _key: k("num"),
    _type: "block",
    style: "normal",
    listItem: "number",
    level: 1,
    children,
    markDefs,
  };
}

function img(assetRef, alt) {
  return {
    _key: k("img"),
    _type: "image",
    alt,
    asset: {
      _type: "reference",
      _ref: assetRef,
    },
  };
}

function tbl(caption, rows) {
  return {
    _key: k("tbl"),
    _type: "table",
    caption,
    rows: rows.map((cells) => ({
      _key: k("row"),
      _type: "tableRow",
      cells,
    })),
  };
}

const body = [
  // Introduction
  p([
    "Arriving at Bali's Ngurah Rai International Airport (DPS) should be the easy part of your holiday. But after immigration, baggage claim, and customs, many first-time visitors have the same question: ",
    { text: "Where do I meet my driver at Bali Airport?", marks: ["strong"] },
  ]),
  p("If you have pre-booked a private Bali airport pickup, the process is straightforward once you know where to go."),
  p(
    [
      "At ",
      { text: "Great Bali Airport Transfer", marks: ["link-home"] },
      ", passengers arriving at DPS are directed to the Circle K minimart at the exit gate, where their private chauffeur waits with a personalized name sign. Driver details, including the driver's name, photo, WhatsApp number, vehicle model, and license plate, are sent approximately two hours before landing.",
    ],
    [{ _key: "link-home", _type: "link", href: "https://www.greatbaliairporttransfer.com/" }]
  ),
  p("This guide explains exactly how the Bali airport pickup process works, where to meet your driver, what happens if your flight is delayed, and how to avoid common airport transportation problems."),

  // Quick Answer
  heading("h2", "Quick Answer: Where Do I Meet My Driver at Bali Airport?"),
  p("If you book a private airport transfer with Great Bali Airport Transfer, your meeting point is:"),
  bquote([
    {
      text: "Circle K minimart at the exit gate of the DPS arrivals terminal.",
      marks: ["strong"],
    },
  ]),
  p(
    "After completing immigration, collecting your luggage, and passing customs, follow the exit signs toward the public arrivals area. Once outside the terminal, go directly to Circle K. Your chauffeur will be waiting there with a sign displaying your name. You will also receive the driver's photo, WhatsApp contact, vehicle model, and license plate before your arrival."
  ),
  p([
    { text: "The process in five steps: ", marks: ["strong"] },
    "Land at DPS → Immigration → Baggage & Customs → Exit terminal → Circle K → Meet your driver. It really is that simple.",
  ]),

  // How Bali Airport Pickup Works at DPS
  heading("h2", "How Bali Airport Pickup Works at DPS"),
  p("Knowing the process before you land can make your arrival much less stressful."),

  heading("h3", "1. Land at Ngurah Rai International Airport"),
  p(
    [
      "After your flight arrives at DPS, follow the airport signs toward immigration. International passengers will need to complete the applicable immigration and arrival procedures before continuing to baggage claim. If you have already arranged your ",
      { text: "Bali airport transfer", marks: ["link-pillar"] },
      ", you don't need to look for a taxi immediately after leaving the aircraft. Your driver is waiting based on your booking and flight information.",
    ],
    [{ _key: "link-pillar", _type: "link", href: "/blog/bali-airport-transfer-guide" }]
  ),

  heading("h3", "2. Complete Immigration"),
  p(
    "After leaving the aircraft, proceed through immigration. The amount of time this takes can vary depending on how many international flights arrive around the same time. Don't worry if this takes longer than expected: a flight-tracked private transfer is designed to account for changes in your actual arrival time."
  ),

  heading("h3", "3. Collect Your Luggage"),
  p(
    "After immigration, collect your checked baggage. Make sure you have everything before proceeding toward customs and the terminal exit. If you're traveling with several suitcases, a stroller, surfboards, or other oversized equipment, your vehicle choice becomes particularly important."
  ),

  heading("h3", "4. Pass Through Customs and Exit"),
  p(
    "Once you have completed customs, follow the airport signs toward the public arrivals area. This is the point where many first-time visitors become unsure about where to go. If you've booked a private transfer, don't start looking for a random taxi outside the terminal. Instead, follow your pre-arranged meeting instructions."
  ),

  // Where Is the Bali Airport Pickup Meeting Point?
  heading("h2", "Where Is the Bali Airport Pickup Meeting Point?"),
  p("The meeting point for Great Bali Airport Transfer is:"),
  bquote([{ text: "Circle K at the arrivals exit gate", marks: ["strong"] }]),
  p(
    "After leaving the terminal, walk directly toward the Circle K minimart. The chauffeur waits in front of the meeting point with a clear name board or tablet displaying your name. The driver also has access to the vehicle information that was sent to you before arrival."
  ),
  p([
    { text: "This creates a simple verification process: ", marks: ["strong"] },
    "Your name → Driver photo → Vehicle model → License plate.",
  ]),
  p("Once everything matches, the driver assists with your luggage and escorts you to the pickup bay. The vehicle pickup bay is usually around a 2–3 minute walk from the meeting point."),

  // What Information Will I Receive Before Landing?
  heading("h2", "What Information Will I Receive Before Landing?"),
  p("Approximately two hours before your flight lands, Great Bali Airport Transfer sends your driver information via WhatsApp. You receive:"),
  bullet("Driver name"),
  bullet("Driver photo"),
  bullet("Driver WhatsApp number"),
  bullet("Vehicle model"),
  bullet("License plate number"),
  p(
    "The company recommends taking a screenshot of these details before leaving the airport, particularly if you don't have reliable mobile data after landing. This is especially useful for international travelers who may not immediately have roaming data or a local SIM card."
  ),

  // What If My Flight Is Delayed?
  heading("h2", "What If My Flight Is Delayed?"),
  p(
    "This is one of the biggest advantages of booking a flight-tracked Bali airport pickup. When you provide your flight number, the driver can monitor the flight's arrival."
  ),
  p(
    "Great Bali Airport Transfer currently includes 60 minutes of complimentary waiting time for airport arrivals and provides real-time flight tracking. For example, if your flight is scheduled to land at 3:00 PM but arrives later, the driver can follow the updated arrival information instead of simply relying on the original schedule. It's still important to provide the correct flight number when booking."
  ),

  // What If Immigration Takes a Long Time?
  heading("h2", "What If Immigration or Baggage Claim Takes a Long Time?"),
  p("Your arrival time isn't necessarily the same as the time you walk out of the airport. You may need additional time for:"),
  bullet("Immigration and Visa on Arrival (VoA)"),
  bullet("Baggage collection"),
  bullet("Customs electronic declaration (e-CD)"),
  bullet("Terminal walk to arrivals exit"),
  p(
    "This is why flight tracking and a defined waiting policy matter. Great Bali Airport Transfer provides 60 minutes of complimentary waiting from actual touchdown and asks passengers who need assistance to message the team through WhatsApp. If you're experiencing an unusually long delay inside the terminal, simply communicate with your driver or transfer coordinator rather than worrying."
  ),

  // What If I Can't Find My Driver?
  heading("h2", "What If I Can't Find My Driver?"),
  p("Don't leave the arrivals area looking for the vehicle. Instead, follow these steps:"),
  numItem([{ text: "Step 1: ", marks: ["strong"] }, "Check the WhatsApp message you received."]),
  numItem([{ text: "Step 2: ", marks: ["strong"] }, "Confirm the driver's name and photo."]),
  numItem([{ text: "Step 3: ", marks: ["strong"] }, "Check the vehicle model and license plate."]),
  numItem([{ text: "Step 4: ", marks: ["strong"] }, "Make sure you're at the Circle K meeting point."]),
  numItem([
    { text: "Step 5: ", marks: ["strong"] },
    "If you still cannot find the driver, contact the transfer team directly on WhatsApp.",
  ]),
  p(
    "The official instructions specifically tell passengers who cannot locate their chauffeur to stay inside the arrivals hall and contact the team with their location. The chauffeur can then walk over to assist. This is much safer than wandering around the parking garage or airport perimeter."
  ),

  // Don't Follow Random Taxi Drivers
  heading("h2", "Don't Follow Random Taxi Drivers at the Exit"),
  p(
    "One of the most useful things first-time visitors can know about Bali Airport is that you don't have to accept transportation from people approaching you after you exit. If you've already booked your airport transfer, simply follow your meeting instructions."
  ),
  p("Great Bali Airport Transfer specifically advises pre-booked passengers to ignore freelance transportation offers and continue straight toward the Circle K meeting point."),
  bquote([
    {
      text: "The goal is simple: Don't negotiate twice. You've already arranged your transportation. Just find your driver.",
      marks: ["strong"],
    },
  ]),

  // Comparison Table
  heading("h2", "Bali Airport Pickup vs Grab or Gojek"),
  p(
    "There are several transportation options from DPS Airport. Ride-hailing services such as Grab and Gojek are available through designated airport arrangements, while private transfers are pre-booked before arrival. The main difference is the pickup experience."
  ),
  tbl("Private Airport Transfer vs Grab / Gojek vs Airport Taxi", [
    ["Feature", "Private Airport Transfer", "Grab / Gojek", "Airport Taxi"],
    ["Book before arrival", "Yes", "Usually after arrival", "No"],
    ["Fixed fare", "Yes", "Can vary", "Depends on service"],
    ["Driver waiting for you", "Yes", "No", "No"],
    ["Personalized name sign", "Yes", "No", "No"],
    ["Flight tracking", "Yes", "No", "No"],
    ["Vehicle selected in advance", "Yes", "Depends", "Limited"],
    ["Larger vehicle options", "Yes", "Depends", "Limited"],
    ["Door-to-door", "Yes", "Yes", "Yes"],
  ]),
  p(
    "Fixed fares, real-time flight tracking, personalized meet-and-greet, and guaranteed vehicle sizing are key advantages over app-based transportation. For travelers who simply want the cheapest available ride, an app-based option may be suitable. For travelers who want someone waiting after a tiring flight, a private airport pickup is substantially more seamless."
  ),

  // Pricing Section
  heading("h2", "How Much Does Bali Airport Pickup Cost?"),
  p("The price depends on your destination and vehicle. Great Bali Airport Transfer publishes transparent fixed rates per vehicle, not per person."),
  tbl("Starting Rates by Vehicle Class (All-Inclusive)", [
    ["Vehicle Class", "Starting Price"],
    ["Standard Car — Toyota Avanza / Veloz", "IDR 250,000"],
    ["Comfort Car — Toyota Innova Zenix", "IDR 300,000"],
    ["Big Van — Toyota HiAce", "IDR 600,000"],
  ]),
  p(
    "These are starting rates; the actual fare depends on your destination zone. The published rate matrix includes airport parking, fuel, and the Bali Mandara tollway in the listed transfer fares. For example:"
  ),
  bullet([
    { text: "Bali Airport to Seminyak", marks: ["strong", "link-seminyak"] },
    ": from IDR 250,000",
  ], [{ _key: "link-seminyak", _type: "link", href: "/bali-airport-transfer-to-seminyak" }]),
  bullet([
    { text: "Bali Airport to Nusa Dua", marks: ["strong", "link-nusadua"] },
    ": from IDR 250,000",
  ], [{ _key: "link-nusadua", _type: "link", href: "/bali-airport-transfer-to-nusa-dua" }]),
  bullet([
    { text: "Bali Airport to Sanur", marks: ["strong", "link-sanur"] },
    ": from IDR 275,000",
  ], [{ _key: "link-sanur", _type: "link", href: "/bali-airport-transfer-to-sanur" }]),
  bullet([
    { text: "Bali Airport to Canggu", marks: ["strong", "link-canggu"] },
    ": from IDR 325,000",
  ], [{ _key: "link-canggu", _type: "link", href: "/bali-airport-transfer-to-canggu" }]),
  bullet([
    { text: "Bali Airport to Uluwatu", marks: ["strong", "link-uluwatu"] },
    ": from IDR 325,000",
  ], [{ _key: "link-uluwatu", _type: "link", href: "/bali-airport-transfer-to-uluwatu" }]),
  bullet([
    { text: "Bali Airport to Ubud", marks: ["strong", "link-ubud"] },
    ": from IDR 400,000",
  ], [{ _key: "link-ubud", _type: "link", href: "/bali-airport-transfer-to-ubud" }]),
  bullet([
    { text: "Bali Airport to Amed", marks: ["strong", "link-amed"] },
    ": from IDR 850,000",
  ], [{ _key: "link-amed", _type: "link", href: "/bali-airport-transfer-to-amed" }]),
  p(
    [
      "The published rates are per private vehicle, so the price does not multiply simply because you have several passengers traveling within the vehicle's capacity. For a complete breakdown, see our ",
      { text: "Bali airport transfer price guide", marks: ["link-price-guide"] },
      ".",
    ],
    [
      {
        _key: "link-price-guide",
        _type: "link",
        href: "/blog/bali-airport-transfer-guide#how-much-does-a-bali-airport-transfer-cost",
      },
    ]
  ),

  // Which Vehicle Should You Choose?
  heading("h2", "Which Vehicle Should You Choose?"),
  p("The number of passengers isn't the only thing to consider. Luggage matters just as much."),

  heading("h3", "Standard Car — Toyota Avanza / Veloz"),
  p("Best for couples, small families, up to 4 passengers, and moderate luggage. The vehicle specification lists a capacity of up to four passengers and three standard bags."),
  img("image-99a1270b70804cac6e679fab34f06c1a939d76d4-1376x768-jpg", "Standard Car private airport transfer Toyota Avanza Veloz in Bali"),

  heading("h3", "Comfort Car — Toyota Innova Zenix"),
  p(
    "A better choice when you want more space and comfort. Capacity: up to 5 passengers, up to 4 bags, with extra legroom, quiet cabin, phone charging, and Wi-Fi. Child or baby seats can also be requested (IDR 50,000 per seat)."
  ),
  img("image-0d1eec982ddb436f27f8db856b3e63c027a5c4d4-1376x768-jpg", "Comfort Car Toyota Innova Zenix for private airport pickup in Bali"),

  heading("h3", "Big Van — Toyota HiAce"),
  p(
    "Ideal for larger families, groups, surf trips, and generous luggage. The HiAce accommodates up to 12 passengers and 10 bags, with an expansive luggage area suitable for surfboards and oversized cases."
  ),
  img("image-b701dff356d885806756c4d0715671865ed2acc3-1376x768-jpg", "Toyota HiAce 12-seater Big Van for group Bali airport transfer"),

  // Families
  heading("h2", "Bali Airport Pickup for Families"),
  p(
    "Families often underestimate how much space they need. A family of four with two large suitcases, two carry-ons, a stroller, and baby equipment may need considerably more luggage space than four adults traveling with backpacks."
  ),
  p("For families, the Innova Zenix provides generous comfort, while the HiAce is ideal for extended families or bulky equipment. If you need a baby or child seat, simply request it during booking."),

  // Surfboards
  heading("h2", "Bali Airport Pickup for Surfboards"),
  p(
    "Bali is a world-class surf destination, so airport transfers frequently accommodate board bags. If you're bringing surfboards, notify your transportation provider when booking."
  ),
  p(
    "The Toyota HiAce is particularly popular with surf travelers thanks to its dedicated luggage compartment and board-friendly capacity. Don't assume that a standard four-passenger car will comfortably carry four people, several suitcases, and multiple boardbags."
  ),

  // Popular Routes
  heading("h2", "Popular Bali Airport Pickup Routes"),
  p("Your airport pickup can take you directly to destinations across Bali. Here is what to expect for key routes:"),

  heading("h3", "Bali Airport to Seminyak", [{ _key: "link-route-semi", _type: "link", href: "/bali-airport-transfer-to-seminyak" }], [
    { text: "Bali Airport to Seminyak", marks: ["link-route-semi"] },
  ]),
  p("Distance: approximately 12 km | Typical travel time: 30–45 minutes. Seminyak is a buzzing beach club and restaurant hub close to DPS."),

  heading("h3", "Bali Airport to Canggu", [{ _key: "link-route-canggu", _type: "link", href: "/bali-airport-transfer-to-canggu" }], [
    { text: "Bali Airport to Canggu", marks: ["link-route-canggu"] },
  ]),
  p("Distance: approximately 19 km | Typical travel time: 45–75 minutes. Traffic around the Berawa and Batu Bolong shortcuts can be heavy during late afternoon."),

  heading("h3", "Bali Airport to Uluwatu", [{ _key: "link-route-ulu", _type: "link", href: "/bali-airport-transfer-to-uluwatu" }], [
    { text: "Bali Airport to Uluwatu", marks: ["link-route-ulu"] },
  ]),
  p("Distance: approximately 22 km | Typical travel time: 45–65 minutes. A scenic route heading south to clifftop resorts and beaches on the Bukit Peninsula."),

  heading("h3", "Bali Airport to Ubud", [{ _key: "link-route-ubud", _type: "link", href: "/bali-airport-transfer-to-ubud" }], [
    { text: "Bali Airport to Ubud", marks: ["link-route-ubud"] },
  ]),
  p("Distance: approximately 38 km | Typical travel time: 60–90 minutes. Ubud is Bali's cultural heart, nestled among rice paddies and rainforest."),

  heading("h3", "Bali Airport to Nusa Dua", [{ _key: "link-route-nd", _type: "link", href: "/bali-airport-transfer-to-nusa-dua" }], [
    { text: "Bali Airport to Nusa Dua", marks: ["link-route-nd"] },
  ]),
  p("Distance: approximately 12 km | Typical travel time: 20–35 minutes. Fast connection via the Bali Mandara over-water tollway directly to 5-star gated resort enclaves."),

  heading("h3", "Bali Airport to Sanur", [{ _key: "link-route-sanur", _type: "link", href: "/bali-airport-transfer-to-sanur" }], [
    { text: "Bali Airport to Sanur", marks: ["link-route-sanur"] },
  ]),
  p("Distance: approximately 16 km | Typical travel time: 25–35 minutes. Relaxed seaside town and the main departure harbor for speedboats heading to Nusa Penida and Lembongan."),

  heading("h3", "Bali Airport to Amed", [{ _key: "link-route-amed", _type: "link", href: "/bali-airport-transfer-to-amed" }], [
    { text: "Bali Airport to Amed", marks: ["link-route-amed"] },
  ]),
  p("Distance: approximately 98 km | Typical travel time: 2.5–3.5 hours. East Bali's serene black-sand coast, famous for diving at the USAT Liberty wreck and coral gardens."),

  bquote("Note: These travel times are realistic estimates. Bali traffic, local ceremonies, weather, and your specific resort entrance can impact the final duration."),

  // Inclusions
  heading("h2", "What Is Included in a Private Bali Airport Pickup?"),
  p("When comparing airport transfer services, don't look only at the headline price. Check the full package. Great Bali Airport Transfer includes:"),
  bullet("Private clean, air-conditioned vehicle"),
  bullet("Professional English-speaking chauffeur"),
  bullet("Fuel charges"),
  bullet("Bali Mandara toll fees"),
  bullet("Airport parking tickets"),
  bullet("Real-time flight tracking"),
  bullet("60 minutes of complimentary waiting time after landing"),
  bullet("Personalized meet and greet with name sign at Circle K"),
  bullet("Direct door-to-door transfer to your hotel, villa, or resort"),
  bullet("Complimentary chilled bottled water"),
  p("With fixed vehicle-based pricing, there are no surprise fees or post-flight negotiations."),

  // Tips for an easier pickup
  heading("h2", "How to Make Your Bali Airport Pickup Easier"),
  p("Before departing for Bali, save these essential details:"),
  bullet([{ text: "Your flight number: ", marks: ["strong"] }, "Allows your driver to track delays automatically."]),
  bullet([{ text: "Driver's information: ", marks: ["strong"] }, "Save name, photo, and WhatsApp number sent 2 hours before landing."]),
  bullet([{ text: "Vehicle details: ", marks: ["strong"] }, "Save car model and license plate number for easy matching."]),
  bullet([{ text: "Meeting point: ", marks: ["strong"] }, "Remember: Circle K minimart at the arrivals exit gate."]),
  bullet([{ text: "Accommodation details: ", marks: ["strong"] }, "Keep your hotel, villa name, and address handy."]),
  bullet([{ text: "Charged smartphone: ", marks: ["strong"] }, "Keep battery ready to send a quick WhatsApp update upon landing."]),
  p("Tip: Taking a screenshot of your driver message before taking off ensures you have the details even before connecting to airport Wi-Fi."),

  // Checklist
  heading("h2", "Bali Airport Pickup Checklist"),
  p("Before boarding your flight, ensure you have ticked off:"),
  bullet("✓ Flight number verified on booking"),
  bullet("✓ Arrival date and scheduled touchdown time"),
  bullet("✓ Hotel or villa name and full address"),
  bullet("✓ Passenger count matches vehicle capacity"),
  bullet("✓ Luggage count matches vehicle space"),
  bullet("✓ Driver name and photo noted"),
  bullet("✓ Driver WhatsApp saved"),
  bullet("✓ Vehicle license plate noted"),
  bullet("✓ Circle K meeting point confirmed"),

  // FAQ
  heading("h2", "Frequently Asked Questions"),

  heading("h3", "Where do I meet my driver at Bali Airport?"),
  p("For Great Bali Airport Transfer, the meeting point is Circle K at the exit gate of the DPS arrivals terminal. Your chauffeur waits directly in front with a personalized name board or tablet."),

  heading("h3", "How long will my Bali airport pickup driver wait?"),
  p("The service includes 60 minutes of complimentary waiting time starting from your actual touchdown, backed by live flight monitoring."),

  heading("h3", "What if my flight is delayed?"),
  p("Because flights are monitored with your flight number, your driver automatically adjusts their arrival time to your updated landing schedule."),

  heading("h3", "What if I can't find my driver?"),
  p("Stay inside the arrivals hall and message the transfer team on WhatsApp with your exact location. Do not wander away or search the parking lots; your chauffeur will come find you."),

  heading("h3", "How will I recognize my driver?"),
  p("You receive your driver's photo, name, WhatsApp number, car model, and license plate number approximately two hours before landing. At Circle K, your driver holds a name sign."),

  heading("h3", "How much does Bali airport pickup cost?"),
  p("Rates start from IDR 250,000 for Standard Car, IDR 300,000 for Comfort Car, and IDR 600,000 for Big Van, including all tolls, parking, and fuel."),

  heading("h3", "Is the airport transfer price per person?"),
  p("No. All published transfer rates are per private vehicle, up to the vehicle's passenger and luggage limits."),

  heading("h3", "Can I book airport pickup to a villa?"),
  p("Yes. Transfers service hotels, luxury resorts, and private villas across Bali. Provide the villa name and address or Google Maps pin during booking."),

  heading("h3", "Can I request a baby seat?"),
  p("Yes. Child and baby seats can be requested for the Comfort Car at IDR 50,000 per seat."),

  heading("h3", "Can a HiAce carry surfboards?"),
  p("Yes. The Toyota HiAce has dedicated space for up to 12 passengers, 10 bags, and multiple surfboard bags."),

  // Final Thoughts
  heading("h2", "Final Thoughts"),
  p("A Bali airport pickup doesn't have to be complicated. The simplest approach is to arrange your transportation before flying, provide your flight number, save your driver's details, and follow the meeting instructions after you arrive."),
  p([
    "For Great Bali Airport Transfer, the process is: ",
    {
      text: "Book your transfer → receive driver details → land at DPS → clear immigration and customs → exit the terminal → walk to Circle K → find your name sign → meet your chauffeur → continue directly to your hotel.",
      marks: ["strong"],
    },
  ]),
  p(
    [
      "The company currently provides flight tracking, a personalized meet and greet, fixed vehicle-based fares, and 60 minutes of complimentary airport waiting. If you're looking for a hassle-free ",
      { text: "Bali airport transfer", marks: ["link-footer-trans"] },
      " with a pre-arranged driver and fixed fare, you can ",
      { text: "book online or inquire via WhatsApp", marks: ["link-wa"] },
      " before your flight.",
    ],
    [
      { _key: "link-footer-trans", _type: "link", href: "/blog/bali-airport-transfer-guide" },
      {
        _key: "link-wa",
        _type: "link",
        href: "https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer,%20I%20want%20to%20book%20a%20private%20airport%20transfer",
      },
    ]
  ),
];

const document = {
  _id: "drafts.post-bali-airport-pickup",
  _type: "post",
  title: "Bali Airport Pickup: Where to Meet Your Driver at DPS Airport (2026)",
  metaTitle: "Bali Airport Pickup: Where to Meet Your Driver at DPS (2026)",
  slug: {
    _type: "slug",
    current: "bali-airport-pickup",
  },
  excerpt:
    "Arriving at Bali Airport? Learn where to meet your driver at DPS, how airport pickup works, what happens if your flight is delayed, and current transfer prices.",
  category: "Airport Guide",
  author: {
    _type: "reference",
    _ref: "3c1d5f21-0830-40ce-addd-b8a7de1a6f0b",
  },
  mainImage: {
    _type: "image",
    alt: "Bali airport pickup chauffeur holding a personalized name sign at Circle K arrivals exit gate Ngurah Rai DPS Airport",
    asset: {
      _type: "reference",
      _ref: "image-db0b8aa6b58d5357ba096dd5c1de26f23a756eb4-1344x768-webp",
    },
  },
  publishedAt: new Date().toISOString(),
  readTime: "8 min read",
  featured: false,
  body,
};

console.log("Document payload prepared:");
console.log("ID:", document._id);
console.log("Title:", document.title);
console.log("MetaTitle:", document.metaTitle, `(${document.metaTitle.length} chars)`);
console.log("Slug:", document.slug.current);
console.log("Excerpt:", document.excerpt, `(${document.excerpt.length} chars)`);
console.log("Body blocks count:", document.body.length);

const token = readCliToken();
const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

console.log(`Sending draft mutation to ${url}...`);

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    mutations: [{ createOrReplace: document }],
  }),
});

if (!response.ok) {
  const errText = await response.text();
  console.error("Mutation failed with status", response.status);
  console.error(errText);
  process.exit(1);
}

const resJson = await response.json();
console.log("Mutation response:", JSON.stringify(resJson, null, 2));
console.log("\nSUCCESS: Draft article successfully created in Sanity!");
console.log("Status: DRAFT (drafts.post-bali-airport-pickup) — NOT PUBLISHED.");
