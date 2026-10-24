import { GOOD_TO_KNOW_ITEMS, GoodToKnowItem } from "./goodToKnow";

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// Derived automatically from GOOD_TO_KNOW_ITEMS so schema and content never drift
export const BALI_FAQS: FAQItem[] = GOOD_TO_KNOW_ITEMS.map((item) => ({
  question: item.faqQuestion,
  answer: `${item.keyFact} ${item.summary}`,
  category: item.category,
}));

export { GOOD_TO_KNOW_ITEMS, type GoodToKnowItem };
