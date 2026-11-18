import React from "react";
import { BALI_FAQS } from "@/data/faqs";
import { BALI_DESTINATIONS, FLEET_DETAILS } from "@/data/destinations";

export const StructuredData: React.FC = () => {
  const allRates = BALI_DESTINATIONS.flatMap((d) => [
    d.rates.standard,
    d.rates.comfort,
    d.rates.van,
  ]);
  const lowPrice = Math.min(...allRates);
  const highPrice = Math.max(...allRates);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService"],
    name: "Great Bali Airport Transfer",
    alternateName: "Great Rides Bali",
    image: "https://www.greatbaliairporttransfer.com/images/innova-zenix.jpg",
    logo: "https://www.greatbaliairporttransfer.com/icon1.png",
    "@id": "https://www.greatbaliairporttransfer.com/#organization",
    url: "https://www.greatbaliairporttransfer.com",
    sameAs: [
      "https://wa.me/6285190920033",
      "mailto:booking.grb@gmail.com",
    ],
    telephone: "+6285190920033",
    email: "booking.grb@gmail.com",
    priceRange: `IDR ${lowPrice.toLocaleString("en-US")} - ${highPrice.toLocaleString("en-US")}`,
    currenciesAccepted: "IDR, USD, AUD, EUR, GBP",
    paymentAccepted: "Cash, Credit Card, Wise, PayPal",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ngurah Rai International Airport (DPS) Arrival Pick-Up Area",
      addressLocality: "Tuban, Kuta, Badung",
      addressRegion: "Bali",
      postalCode: "80361",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.7482,
      longitude: 115.1672,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      { "@type": "City", name: "Ubud" },
      { "@type": "City", name: "Seminyak" },
      { "@type": "City", name: "Canggu" },
      { "@type": "City", name: "Uluwatu" },
      { "@type": "City", name: "Nusa Dua" },
      { "@type": "City", name: "Sanur" },
      { "@type": "City", name: "Jimbaran" },
      { "@type": "City", name: "Kuta" },
      { "@type": "City", name: "Amed" },
      { "@type": "AdministrativeArea", name: "Bali" },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.greatbaliairporttransfer.com/#website",
    name: "Great Bali Airport Transfer",
    // NOTE: no `alternateName` carrying the bare domain. Google's site-name docs
    // sanction the lowercase domain in `alternateName` as a *fallback* that it
    // will "strongly consider using if your preferred name isn't selected" -
    // and for a while the SERP showed exactly that (the raw domain) instead of
    // this brand name. Hand Google the brand only.
    url: "https://www.greatbaliairporttransfer.com",
    inLanguage: "en",
    publisher: {
      "@type": ["Organization", "LocalBusiness", "TaxiService"],
      "@id": "https://www.greatbaliairporttransfer.com/#organization",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

/**
 * Homepage-only structured data (Service + AggregateOffer + FAQPage).
 * Kept separate from RootLayout so route pages and blog articles do not emit
 * duplicate FAQPage / Service schemas alongside their own page-specific ones.
 */
export const HomePageStructuredData: React.FC = () => {
  const allRates = BALI_DESTINATIONS.flatMap((d) => [
    d.rates.standard,
    d.rates.comfort,
    d.rates.van,
  ]);
  const lowPrice = Math.min(...allRates);
  const highPrice = Math.max(...allRates);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.greatbaliairporttransfer.com/#service",
    serviceType: "Private Airport Transfer",
    name: "Bali Airport Transfer & Private DPS Pickup",
    description:
      "Fixed-price private airport transfers from I Gusti Ngurah Rai International Airport (DPS) across Bali. Includes Circle K exit gate meet-and-greet with name sign, 60-minute complimentary grace wait, flight tracking, Bali Mandara tollway, and airport parking.",
    provider: {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": "https://www.greatbaliairporttransfer.com/#organization",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bali, Indonesia",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: String(lowPrice),
      highPrice: String(highPrice),
      offerCount: String(BALI_DESTINATIONS.length * FLEET_DETAILS.length),
      availability: "https://schema.org/InStock",
      url: "https://www.greatbaliairporttransfer.com/#rates-table",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bali Airport Transfer Fleet Categories",
      itemListElement: FLEET_DETAILS.map((vehicle) => {
        const key = vehicle.id as "standard" | "comfort" | "van";
        const minFare = Math.min(...BALI_DESTINATIONS.map((d) => d.rates[key]));
        return {
          "@type": "Offer",
          name: `${vehicle.name} (${vehicle.model}, 1-${vehicle.passengers} pax, up to ${vehicle.luggage} bags)`,
          price: String(minFare),
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          url: "https://www.greatbaliairporttransfer.com/#fleet",
        };
      }),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BALI_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
