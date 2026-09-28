import React from "react";
import { BALI_FAQS } from "@/data/faqs";

export const StructuredData: React.FC = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService"],
    name: "Great Bali Airport Transfer - VIP Chauffeurs & Fixed Rates",
    image: "https://www.greatbaliairporttransfer.com/images/innova-zenix.jpg",
    logo: "https://www.greatbaliairporttransfer.com/logo-mark.svg",
    "@id": "https://www.greatbaliairporttransfer.com/#organization",
    url: "https://www.greatbaliairporttransfer.com",
    sameAs: [
      "https://wa.me/6285190920033",
      "mailto:booking.grb@gmail.com",
    ],
    telephone: "+6285190920033",
    priceRange: "IDR 250,000 - 1,500,000",
    currenciesAccepted: "IDR, USD, AUD, EUR, GBP",
    paymentAccepted: "Cash, Credit Card, Wise, PayPal",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ngurah Rai International Airport Terminal Arrivals",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "4850",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "City", name: "Ubud" },
      { "@type": "City", name: "Seminyak" },
      { "@type": "City", name: "Canggu" },
      { "@type": "City", name: "Uluwatu" },
      { "@type": "City", name: "Nusa Dua" },
      { "@type": "City", name: "Sanur" },
      { "@type": "City", name: "Jimbaran" },
      { "@type": "City", name: "Amed" },
      { "@type": "AdministrativeArea", name: "Bali" },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.greatbaliairporttransfer.com/#website",
    name: "Great Bali Airport Transfer",
    alternateName: "greatbaliairporttransfer.com",
    url: "https://www.greatbaliairporttransfer.com",
    inLanguage: "en",
    publisher: {
      "@type": ["Organization", "LocalBusiness", "TaxiService"],
      "@id": "https://www.greatbaliairporttransfer.com/#organization",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
