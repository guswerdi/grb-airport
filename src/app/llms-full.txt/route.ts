import {
  BALI_DESTINATIONS,
  FLEET_DETAILS,
  RATES_LAST_REVIEWED,
} from "@/data/destinations";
import {
  CORE_USPS,
  HOME_DIRECT_ANSWERS,
  PAYMENT_POLICY,
  TRANSFER_EXCLUSIONS,
  TRANSFER_INCLUSIONS,
} from "@/data/policies";

// Built entirely from the same data the site renders (destinations.ts), so the
// fares an AI agent reads here can never drift from the fares on the pages.
// Only static data is used, so there is no Sanity fetch and no revalidation.

const BASE_URL = "https://greatbaliairporttransfer.com";

function idr(n: number): string {
  return `IDR ${n.toLocaleString("en-US")}`;
}

/** Strip the long parenthetical suburb lists some destination names carry. */
function shortName(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

export function GET() {
  const fareRows = BALI_DESTINATIONS.map(
    (d) =>
      `| ${shortName(d.name)} | ${idr(d.rates.standard)} | ${idr(d.rates.comfort)} | ${idr(d.rates.van)} | ${d.distanceKm} km | ${d.durationMinutes} |`
  ).join("\n");

  const fleet = FLEET_DETAILS.map(
    (f) =>
      `- **${f.name} (${f.model}):** 1-${f.passengers} passengers, up to ${f.luggage} large suitcases. ${f.tagline}.`
  ).join("\n");

  const routes = BALI_DESTINATIONS.map((d) => {
    const hotels = d.popularHotels.length
      ? ` Popular drop-offs: ${d.popularHotels.join(", ")}.`
      : "";
    return `### ${shortName(d.name)} (${d.region})
- Page: ${BASE_URL}/${d.slug}
- ${d.distanceKm} km from DPS, ${d.durationMinutes}. Standard ${idr(d.rates.standard)} / Comfort ${idr(d.rates.comfort)} / Big Van ${idr(d.rates.van)}.
- ${d.description}${hotels}
- Driver tip: ${d.trafficTip}`;
  }).join("\n\n");

  const uspList = CORE_USPS.map((u) => `- **${u.title}:** ${u.summary}`).join("\n");
  const directQa = HOME_DIRECT_ANSWERS.map((q) => `- **${q.question}** ${q.answer}`).join("\n");
  const inclusionsList = TRANSFER_INCLUSIONS.map((i) => `- ${i}`).join("\n");
  const exclusionsList = TRANSFER_EXCLUSIONS.map((e) => `- ${e}`).join("\n");

  const body = `# Great Bali Airport Transfer: Complete Service & Route Guide

> Fixed-price private airport transfers and VIP chauffeur service from I Gusti Ngurah Rai International Airport (DPS), Bali, Indonesia. Operated by Great Rides Bali. Rates verified: ${RATES_LAST_REVIEWED}.

- Website: ${BASE_URL}
- About Us & Chauffeur Standards: ${BASE_URL}/about
- Short version of this file: ${BASE_URL}/llms.txt
- Family / Baby Seat Transfers: ${BASE_URL}/bali-airport-transfer-with-baby-seat
- Hotel-to-DPS Departure Transfers: ${BASE_URL}/bali-airport-departure-transfer
- 12-Seat HiAce Van & Surfboard Transfers: ${BASE_URL}/bali-airport-van-transfer-hiace
- Fast-Boat Harbor Transfers (Sanur / Kusamba / Padangbai): ${BASE_URL}/bali-airport-to-fast-boat-harbor
- Terms, payment methods & cancellation policy: ${BASE_URL}/terms-and-policies
- WhatsApp (24h): +62 851-9092-0033
- Email: booking.grb@gmail.com
- Address: Ngurah Rai International Airport (DPS) Arrival Terminal Pick-Up Area, Tuban, Kuta, Badung, Bali 80361, Indonesia

## Why choose Great Bali Airport Transfer (USPs)

${uspList}

## Direct answers at a glance

${directQa}

## Arrival and meeting point at DPS

1. After immigration, baggage claim and customs, exit the terminal and go to the Circle K minimart at the exit gate. This is the meeting point.
2. Your personal chauffeur waits there holding a name sign with your name.
3. Your driver's name, vehicle plate and a live WhatsApp contact are sent 2 hours before your flight lands.
4. A complimentary 60-minute grace wait starts at actual touchdown, which covers e-VoA and baggage claim.
5. If your airline delays or reschedules your flight, message our WhatsApp concierge to update your pickup time at no extra charge.
6. If you cannot find your driver, message the WhatsApp number above.

## What every fare includes (100% all-inclusive)

${inclusionsList}
- Direct fast-boat harbor connections from DPS: Sanur Harbor (IDR 275k Standard / 400k Comfort / 650k HiAce) and Padangbai Harbor (IDR 850k Standard / 1,000k Comfort / 1,100k HiAce).
- Recommended departure buffers (allow 3h before international flights, 2h before domestic): leave Ubud 5–5.5h prior, Canggu 4.5–5h prior, Seminyak 4–4.5h prior (add 30–60 mins during 3 PM–7 PM peak traffic).

## Excluded / optional add-ons (zero hidden fees)

${exclusionsList}

## Booking, payment and cancellation

- ${PAYMENT_POLICY.headline}
- Book via WhatsApp or the on-site booking form (${BASE_URL}/#booking-widget). Zero deposit or credit card hold is required.
- Option A — Cash on Drop-Off: Pay cash directly to your driver on arrival at your hotel/villa in ${PAYMENT_POLICY.cashOnArrival.currencies.join(", ")}.
- Option B — Prepay Online Link: Request an invoice link via WhatsApp ahead of pickup supporting ${PAYMENT_POLICY.onlinePrepay.methods.join(", ")}.
- Important note: Chauffeurs do NOT carry mobile card machines inside cars; card, Wise, and PayPal payments must use the online invoice link prior to pickup.
- ${PAYMENT_POLICY.cancellationRule}
- If an airline reschedules or cancels a flight, message on WhatsApp and the transfer is rescheduled without penalty, subject to vehicle availability.
- Baby car seats (0-2 yrs) and booster seats (3-7 yrs): IDR 50,000 per seat per trip, on request when booking.
- The driver will stop at an ATM, Telkomsel SIM outlet or money changer on the way at no extra charge.

## Fleet and luggage capacity

${fleet}

## Fixed fares from Bali Airport (DPS)

All fares are in IDR per vehicle, one-way.

| Destination | Standard (Avanza) | Comfort (Innova) | Big Van (HiAce) | Distance | Typical duration |
|---|---|---|---|---|---|
${fareRows}

## Route details

${routes}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
