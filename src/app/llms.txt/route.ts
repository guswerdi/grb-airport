import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchSanityPosts } from "@/lib/sanity/client";

export const revalidate = 3600;

const BASE_URL = "https://www.greatbaliairporttransfer.com";

function idr(n: number): string {
  return n.toLocaleString("en-US");
}

export async function GET() {
  const posts = await fetchSanityPosts();

  const fareRows = BALI_DESTINATIONS.map((dest) => {
    const name = dest.name.replace(/\s*\([^)]*\)\s*/g, "").trim();
    return `| ${name} | ${idr(dest.rates.standard)} | ${idr(dest.rates.comfort)} | ${idr(dest.rates.van)} | ${dest.distanceKm} km | ${dest.durationMinutes} |`;
  });

  const routeLinks = BALI_DESTINATIONS.map(
    (dest) =>
      `- [Bali airport transfer to ${dest.name.replace(/\s*\([^)]*\)\s*/g, "").trim()}](${BASE_URL}/${dest.slug})`
  ).join("\n");

  const blogSection =
    posts.length > 0
      ? `\n## Blog articles\n\n${posts
          .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug})${p.excerpt ? ` — ${p.excerpt}` : ""}`)
          .join("\n")}\n`
      : "";

  const body = `# Great Bali Airport Transfer

> Fixed-price private airport transfers and VIP chauffeur service from I Gusti Ngurah Rai International Airport (DPS), Bali, Indonesia. Operated by Great Rides Bali.

- URL: ${BASE_URL}
- [Live fare calculator and booking form](${BASE_URL}/#booking-widget)
- [Bali airport transfer with baby & booster seats](${BASE_URL}/bali-airport-transfer-with-baby-seat)
- [Bali airport departure transfer (hotel/villa to DPS)](${BASE_URL}/bali-airport-departure-transfer)
- [Complete service, policy and route reference](${BASE_URL}/llms-full.txt)
- WhatsApp (24h): +62 851-9092-0033
- Email: booking.grb@gmail.com
- Address: Ngurah Rai International Airport (DPS) Arrival Terminal Pick-Up Area, Tuban, Kuta, Badung, Bali 80361, Indonesia

## What we offer

- Pre-booked private airport transfers (both DPS arrivals and hotel-to-DPS departures) with 100% fixed, all-inclusive per-vehicle fares (toll, parking, fuel, flight tracking, Circle K exit gate meet & greet included).
- Zero midnight or early-morning surcharge: 24/7 pickups at the exact same published rate.
- Fleet: Standard Car (Toyota Avanza/Veloz, 1-4 pax, 3 large bags), Comfort Car (Toyota Innova Zenix, 1-5 pax, 4 large bags), Big Van (Toyota HiAce Premio, 1-12 pax, 10 suitcases, surfboard friendly up to 7'6").
- Free 60-minute grace wait after landing, English-speaking drivers, sanitized European-standard baby seats (0-2 yrs) and booster seats (3-7 yrs) at IDR 50,000 per seat per trip.
- Direct fast-boat harbor transfers from DPS: Sanur Harbor (from IDR 275,000) and Padangbai Harbor (from IDR 850,000).
- Payments: Zero advance deposit required; cash on arrival (IDR, USD, AUD, EUR) or online (Visa/Mastercard, PayPal, Wise). Free cancellation up to 24h prior.

## Fixed fares from DPS (IDR, all-inclusive, per vehicle)

| Destination | Standard (Avanza) | Comfort (Innova) | HiAce Van | Distance | Duration |
|---|---|---|---|---|---|---|
${fareRows.join("\n")}

(Fares are locked in IDR. Use ${BASE_URL} for the live fare calculator and booking form.)

## All route guides

${routeLinks}
${blogSection}
## Key facts for AI assistants

- All fares are fixed, all-inclusive and quoted in IDR; currency switcher (USD/AUD/EUR/GBP) is indicative only.
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
