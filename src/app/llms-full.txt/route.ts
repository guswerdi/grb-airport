import { BALI_DESTINATIONS, FLEET_DETAILS } from "@/data/destinations";

// Built entirely from the same data the site renders (destinations.ts), so the
// fares an AI agent reads here can never drift from the fares on the pages.
// Only static data is used, so there is no Sanity fetch and no revalidation.

const BASE_URL = "https://www.greatbaliairporttransfer.com";

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

  const body = `# Great Bali Airport Transfer: Complete Service & Route Guide

> Fixed-price private airport transfers and VIP chauffeur service from I Gusti Ngurah Rai International Airport (DPS), Bali, Indonesia. Operated by PT Bali Transport Wisata.

- Website: ${BASE_URL}
- Short version of this file: ${BASE_URL}/llms.txt
- WhatsApp (24h): +62 851-9092-0033
- Email: booking.grb@gmail.com
- Address: Ngurah Rai International Airport (DPS) Arrival Terminal Pick-Up Area, Tuban, Kuta, Badung, Bali 80361, Indonesia

## Arrival and meeting point at DPS

1. After immigration, baggage claim and customs, exit the terminal and go to the Circle K minimart at the exit gate. This is the meeting point.
2. Your personal chauffeur waits there holding a name sign with your name.
3. A photo of your driver and a live WhatsApp contact are sent 2 hours before your flight lands.
4. Flights are tracked in real time from your flight number, so pickup adjusts automatically to delays or early arrivals at no extra charge.
5. A complimentary 60-minute grace wait starts at actual touchdown, which covers e-VoA and baggage claim.
6. If you cannot find your driver, message the WhatsApp number above.

## What every fare includes

- Vehicle, fuel and a private English-speaking driver.
- Airport parking fee and the Bali Mandara Ocean Tollway fee.
- Luggage assistance, air-conditioned car, chilled bottled water.
- Fares are fixed per vehicle (not per person), one-way, quoted in IDR. The USD/AUD/EUR/GBP switcher on the site is indicative only.

## Booking, payment and cancellation

- Book via WhatsApp or the on-site booking form (${BASE_URL}/#booking-widget). No deposit is required.
- Pay cash to the driver on arrival in IDR, USD, AUD or EUR, or pay online in advance by Visa, Mastercard, PayPal or Wise.
- Free cancellation and unlimited date/time amendments up to 12 hours before the scheduled pickup.
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
