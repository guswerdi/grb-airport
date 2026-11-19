import React from "react";
import { HomeClient } from "@/components/HomeClient";
import { HomePageStructuredData } from "@/components/StructuredData";
import { fetchLiveExchangeRates } from "@/lib/exchangeRates";
import { fetchDynamicSiteContent, fetchSanityLatestGuides } from "@/lib/sanity/client";

export const revalidate = 21600;

export default async function HomePage() {
  const [fxResult, posts, dynamicContent] = await Promise.all([
    fetchLiveExchangeRates(),
    fetchSanityLatestGuides(3),
    fetchDynamicSiteContent(),
  ]);

  const faqItems =
    dynamicContent.faqItems.length > 0 ? dynamicContent.faqItems : undefined;

  return (
    <>
      <HomePageStructuredData faqItems={faqItems} />
      <HomeClient
        exchangeRates={fxResult.rates}
        ratesAreLive={fxResult.isLive}
        latestPosts={posts}
        siteSettings={dynamicContent.siteSettings}
        dynamicFaqItems={faqItems}
      />
    </>
  );
}
