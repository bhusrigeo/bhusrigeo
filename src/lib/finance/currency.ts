import type { Currency } from "@/types/domain";

export async function getUsdToInrRate(): Promise<number> {
  try {
    const response = await fetch(
      process.env.EXCHANGE_RATE_API_URL ??
        "https://api.frankfurter.app/latest?from=USD&to=INR",
      {
        next: { revalidate: 900 }
      }
    );

    if (!response.ok) {
      return 83.45; // Default fallback rate
    }

    const data = await response.json();
    return Number(data.rates.INR) || 83.45;
  } catch (err) {
    console.warn("Using fallback FX rate:", err);
    return 83.45;
  }
}

export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency,
  usdToInr: number
): number {
  if (from === to) return amount;

  if (from === "USD" && to === "INR") {
    return amount * usdToInr;
  }

  return amount / usdToInr;
}

export function money(value: number, currency: Currency): string {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}
