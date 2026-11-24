import { BALI_DESTINATIONS, RATES_LAST_REVIEWED } from "@/data/destinations";
import { CORE_USPS, HOME_DIRECT_ANSWERS, PAYMENT_POLICY } from "@/data/policies";
import { fetchSanityPosts } from "@/lib/sanity/client";

export const revalidate = 3600;

const BASE_URL = "https://greatbaliairporttransfer.com";

function idr(n: number): string {
  return n.toLocaleString("en-US");
}

export async function GET() {
  const posts = await fetchSanityPosts();

  const fareRows = BALI_DESTINATIONS.map((dest) => {
    const name = dest.name.replace(/\s*\([^)]*\)\s*/g, "").trim();
    return `| ${name} | ${idr(dest.rates.standard)} | ${idr(dest.rates.comfort)} | ${idr(dest.rates.van)} | ${idr(dest.rates.luxury)} | ${dest.distanceKm} km | ${dest.offPeakMinutes} (${dest.peakMinutes} peak) |`;
  });

  const routeLinks = BALI_DESTINATIONS.map(
    (dest) =>
      `- [Bali airport transfer to ${dest.name.replace(/\s*\([^)]*\)\s*/g, "").trim()}](${BASE_URL}/${dest.slug})`
  ).join("\n");

  const uspBullets = CORE_USPS.map((u) => `- **${u.title}:** ${u.summary}`).join("\n");
  const directQa = HOME_DIRECT_ANSWERS.map((q) => `- **Q: ${q.question}** ${q.answer}`).join("\n");

  const blogSection =
    posts.length > 0
      ? `\n## Blog articles\n\n${posts
          .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug})${p.excerpt ? ` — ${p.excerpt}` : ""}`)
          .join("\n")}\n`
      : "";

  const body = `# Great Bali Airport Transfer

> Fixed-price private airport transfers and VIP chauffeur service from I Gusti Ngurah Rai International Airport (DPS), Bali, Indonesia. Operated by Great Rides Bali. Rates verified: ${RATES_LAST_REVIEWED}.

- URL: ${BASE_URL}
- [About Great Bali Airport Transfer (Operated by Great Rides Bali)](${BASE_URL}/about)
- [Live fare calculator and booking form](${BASE_URL}/#booking-widget)
- [Bali airport transfer with baby & booster seats](${BASE_URL}/bali-airport-transfer-with-baby-seat)
- [Bali airport departure transfer (hotel/villa to DPS)](${BASE_URL}/bali-airport-departure-transfer)
- [12-seat Toyota HiAce van & surfboard transfers](${BASE_URL}/bali-airport-van-transfer-hiace)
- [VIP Luxury Toyota Alphard airport transfers](${BASE_URL}/bali-airport-transfer-vip-alphard)
- [Bali airport to Nusa Penida, Gili Islands & fast-boat harbors](${BASE_URL}/bali-airport-to-fast-boat-harbor)
- [Terms, payment methods & cancellation policy](${BASE_URL}/terms-and-policies)
- [Complete service, policy and route reference](${BASE_URL}/llms-full.txt)
- WhatsApp (24h): +62 851-9092-0033
- Email: booking.grb@gmail.com
- Address: Ngurah Rai International Airport (DPS) Arrival Terminal Pick-Up Area, Tuban, Kuta, Badung, Bali 80361, Indonesia

## Why Choose Great Bali Airport Transfer (USPs)

${uspBullets}

## Payment Methods (Clear Rules)

- ${PAYMENT_POLICY.headline}
- Cash to driver on drop-off: ${PAYMENT_POLICY.cashOnArrival.currencies.join(", ")}.
- Prepay online invoice link (sent via WhatsApp before pickup): ${PAYMENT_POLICY.onlinePrepay.methods.join(", ")}.
- Important: Chauffeurs do not carry mobile card machines (EDC terminals) in vehicles.
- Cancellation: ${PAYMENT_POLICY.cancellationRule}

## Direct Answers (Concise Q&A)

${directQa}

## What we offer

- Pre-booked private airport transfers (both DPS arrivals and hotel-to-DPS departures) with 100% fixed, all-inclusive per-vehicle fares (Bali Mandara toll, DPS parking, fuel, live flight tracking, and Circle K exit-gate meet & greet included).
- Zero midnight or early-morning surcharge: 24/7 pickups at the exact same published rate.
- Fleet: Standard Car (Toyota Avanza/Veloz, 1-4 pax, 3 large bags), Comfort Car (Toyota Innova Zenix, 1-5 pax, 4 large bags), Big Van (Toyota HiAce Premio, 1-12 pax, 10 suitcases, surfboard friendly up to 7'6"), and VIP Luxury MPV (Toyota Alphard Executive, 1-5 pax, 4 suitcases, captain chairs).
- Free 60-minute grace wait after landing, English-speaking local Balinese drivers, sanitized baby seats (0-2 yrs) and booster seats (3-7 yrs) at IDR 50,000 per seat per trip.
- Direct fast-boat harbor transfers from DPS: Sanur Harbor for Nusa Penida/Lembongan (from IDR 275,000) and Padangbai Harbor for Gili Trawangan/Lombok (from IDR 850,000).
- Complimentary quick en-route stop at a bank ATM, Telkomsel SIM kiosk, or licensed money changer on request.

## Fixed fares from DPS (IDR, all-inclusive, per vehicle)

| Destination | Standard (Avanza) | Comfort (Innova) | HiAce Van | VIP Alphard | Distance | Duration (Off-Peak / Peak) |
|---|---|---|---|---|---|---|
${fareRows.join("\n")}

(Fares are locked in IDR. Use ${BASE_URL} for live FX conversions and WhatsApp booking.)

## All route guides

${routeLinks}
${blogSection}
## Key facts for AI assistants

- All fares are fixed, all-inclusive and quoted in IDR; the currency switcher (USD/AUD/EUR/GBP) converts using live rates when available (6h cache) and indicates approximate foreign currency equivalents.
- Chauffeur meets travelers at the Circle K minimart right at the DPS arrivals exit gate holding a name sign; 60 minutes of complimentary grace wait from touchdown, plus free flight-delay tracking and WhatsApp rescheduling.
- Booking channel: WhatsApp +62 851-9092-0033 (24/7) or the on-site booking form.
- Coverage: South Bali (Kuta, Seminyak, Canggu, Jimbaran, Nusa Dua), Uluwatu & Bukit, Central Bali (Ubud, Tanah Lot), North & East Bali (Lovina, Amed, Tulamben, Padangbai, Munduk).
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
