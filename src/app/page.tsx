import React from "react";
import { HomeClient } from "@/components/HomeClient";
import { HomePageStructuredData } from "@/components/StructuredData";
import { TrustBar } from "@/components/TrustBar";
import { QuickAnswersSection } from "@/components/QuickAnswersSection";
import { ArrivalGuide } from "@/components/ArrivalGuide";
import { TransportComparisonSection } from "@/components/TransportComparisonSection";
import { LatestGuidesSection } from "@/components/LatestGuidesSection";
import { Footer } from "@/components/Footer";
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
  const siteSettings = dynamicContent.siteSettings;

  return (
    <>
      <HomePageStructuredData faqItems={faqItems} />
      <HomeClient
        exchangeRates={fxResult.rates}
        ratesAreLive={fxResult.isLive}
        heroBadge={siteSettings?.heroBadge}
        heroSubtext={siteSettings?.heroSubtext}
        dynamicFaqItems={faqItems}
        aboveRoutesSlot={
          <>
            <TrustBar />
            <div className="cv-auto">
              <QuickAnswersSection
                usps={siteSettings?.usps}
                directAnswers={siteSettings?.directAnswers}
                liveNotice={siteSettings?.liveNotice}
                ratesAreLive={fxResult.isLive}
              />
            </div>
          </>
        }
        belowFleetSlot={
          <>
            <div className="cv-auto">
              <ArrivalGuide />
            </div>
            <div className="cv-auto">
              <TransportComparisonSection />
            </div>
            <div className="cv-auto">
              <LatestGuidesSection posts={posts} />
            </div>
          </>
        }
        footerSlot={
          <div className="cv-auto">
            <Footer />
          </div>
        }
      />
    </>
  );
}
