import { QuotationBuilder } from "@/components/dashboard/QuotationBuilder";
import { Calculator } from "lucide-react";

export default function QuotationsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
          <Calculator className="h-4 w-4" />
          Commercial Quotation &amp; Pricing Module
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Multi-Currency Commercial Engine (USD / INR)
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-sans">
          Build offshore day-rate quotes, remote processing shifts, and statutory tax breakdowns with live FX rate integration.
        </p>
      </div>

      <QuotationBuilder />
    </div>
  );
}
