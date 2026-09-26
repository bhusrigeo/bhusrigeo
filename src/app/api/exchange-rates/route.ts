import { NextResponse } from "next/server";
import { getUsdToInrRate } from "@/lib/finance/currency";

export async function GET() {
  try {
    const usdToInr = await getUsdToInrRate();

    return NextResponse.json({
      base: "USD",
      quote: "INR",
      usdToInr,
      observedAt: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      { error: "Exchange rate unavailable", usdToInr: 83.45 },
      { status: 200 }
    );
  }
}
