import { EXCHANGE_RATES } from "@/data/destinations";

export type CurrencyRateMap = Record<
  string,
  { symbol: string; rate: number; label: string }
>;

export interface LiveExchangeRatesResult {
  rates: CurrencyRateMap;
  isLive: boolean;
  fetchedAt: string;
}

/**
 * Fetches current IDR -> USD/AUD/EUR/GBP exchange rates with Next.js 6-hour ISR
 * caching and a strict 2.5s timeout so SSR/builds never block. Falls back cleanly
 * to the static EXCHANGE_RATES map if offline or rate-limited.
 */
export async function fetchLiveExchangeRates(): Promise<LiveExchangeRatesResult> {
  const fallback: LiveExchangeRatesResult = {
    rates: EXCHANGE_RATES,
    isLive: false,
    fetchedAt: new Date().toISOString().split("T")[0],
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);

    const res = await fetch("https://open.er-api.com/v6/latest/IDR", {
      signal: controller.signal,
      next: { revalidate: 21600 },
    });
    clearTimeout(timer);

    if (!res.ok) return fallback;
    const data = (await res.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_utc?: string;
    };

    if (data?.result !== "success" || !data.rates) return fallback;

    const updated: CurrencyRateMap = { ...EXCHANGE_RATES };
    for (const code of ["USD", "AUD", "EUR", "GBP"] as const) {
      const apiRate = data.rates[code];
      if (typeof apiRate === "number" && apiRate > 0) {
        updated[code] = {
          ...EXCHANGE_RATES[code],
          rate: apiRate,
        };
      }
    }

    return {
      rates: updated,
      isLive: true,
      fetchedAt: new Date().toISOString().split("T")[0],
    };
  } catch {
    return fallback;
  }
}
