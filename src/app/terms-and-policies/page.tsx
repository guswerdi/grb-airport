import type { Metadata } from "next";
import { TermsAndPoliciesContent } from "@/components/TermsAndPoliciesContent";

export const metadata: Metadata = {
  title: "Terms of Service & Customer Policies | Great Bali Airport Transfer",
  description:
    "Official service terms, transparent pricing, 100% free cancellation policy, flight delay tracking guarantees, and privacy commitments for Great Bali Airport Transfer (Great Rides Bali).",
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com/terms-and-policies",
  },
  openGraph: {
    title: "Terms of Service & Customer Policies | Great Bali Airport Transfer",
    description:
      "All-inclusive rates, zero-deposit reservations, 24-hour free cancellation, and 60-min complimentary grace wait at DPS Airport.",
    url: "https://www.greatbaliairporttransfer.com/terms-and-policies",
    siteName: "Great Bali Airport Transfer",
    locale: "en_US",
    type: "website",
  },
};

export default function TermsAndPoliciesPage() {
  return <TermsAndPoliciesContent />;
}
