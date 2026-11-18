import type { Metadata } from "next";
import { TermsAndPoliciesContent } from "@/components/TermsAndPoliciesContent";

export const metadata: Metadata = {
  title: "Terms, Payments & Policies | Great Bali Airport Transfer",
  description:
    "Official booking terms for Great Bali Airport Transfer: zero deposit, cash or online payment link, 60-min free flight wait & 24h free cancellation.",
  alternates: {
    canonical: "https://greatbaliairporttransfer.com/terms-and-policies",
  },
  openGraph: {
    title: "Terms, Payments & Policies | Great Bali Airport Transfer",
    description:
      "Zero deposit, cash on drop-off or online prepay link, 60-min complimentary DPS wait, and 24-hour free cancellation.",
    url: "https://greatbaliairporttransfer.com/terms-and-policies",
    siteName: "Great Bali Airport Transfer",
    locale: "en_US",
    type: "website",
  },
};

export default function TermsAndPoliciesPage() {
  return <TermsAndPoliciesContent />;
}
