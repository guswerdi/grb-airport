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
    (dest) => `- ${BASE_URL}/${dest.slug} — Bali airport transfer to ${dest.name.replace(/\s*\([^)]*\)\s*/g, "").trim()}`
  ).join("\n");

  const blogSection =
    posts.length > 0
      ? `\n## Blog articles\n\n${posts
          .map((p) => `- ${BASE_URL}/blog/${p.slug} — ${p.title}${p.excerpt ? `: ${p.excerpt}` : ""}`)
          .join("\n")}\n`
      : "";

  const body = `# Great Bali Airport Transfer

> Fixed-price private airport transfers and VIP chauffeur service from I Gusti Ngurah Rai International Airport (DPS), Bali, Indonesia. Operated by PT Bali Transport Wisata.

- URL: ${BASE_URL}
- WhatsApp (24h): +62 851-9092-0033
- Email: bookings@greatbaliairporttransfer.com
- Address: Ngurah Rai International Airport (DPS) Arrival Terminal Pick-Up Area, Tuban, Kuta, Badung, Bali 80361, Indonesia

## What we offer

- Pre-booked private airport transfers (arrival & departure) at DPS with 100% fixed, all-inclusive fares (toll, parking, flight tracking, meet & greet with name sign included).
- Fleet: Standard Car (Toyota Avanza, 1-4 pax), Comfort Car (Toyota Innova Zenix, 1-5 pax), Big Van (Toyota HiAce Premio, 1-12 pax, surfboard friendly).
- Free 90-minute flight delay tracking, English-speaking drivers, baby seats available.
- Payments: Cash (IDR), Visa/Mastercard, USD, AUD, EUR, Wise.

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
- Chauffeur meets travelers at DPS arrivals with a name sign; free flight tracking for up to 90 minutes of delay.
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
