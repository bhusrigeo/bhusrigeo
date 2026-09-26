"use client";

import { DualMarginLineItem, Currency } from "@/types/domain";
import { money } from "@/lib/finance/currency";
import { Printer, Download, ArrowLeft, CheckCircle2, Building2, Calendar, FileText, ShieldCheck } from "lucide-react";

interface QuotationPdfViewProps {
  quoteNumber: string;
  clientName: string;
  projectName: string;
  location: string;
  currency: Currency;
  items: DualMarginLineItem[];
  mobWindow: string;
  onClose: () => void;
}

export function QuotationPdfView({
  quoteNumber,
  clientName,
  projectName,
  location,
  currency,
  items,
  mobWindow,
  onClose
}: QuotationPdfViewProps) {
  const subtotal = items.reduce((sum, item) => sum + item.totalClientBilling, 0);
  const gstTax = currency === "INR" ? subtotal * 0.18 : 0;
  const total = subtotal + gstTax;

  const mobAdvance30 = total * 0.3;
  const demobPayment20 = total * 0.2;
  const finalBalance50 = total * 0.5;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs p-4 sm:p-6 lg:p-8 flex justify-center print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:block">
      <div className="w-full max-w-4xl space-y-6 print:space-y-0 print:max-w-full print:m-0">
        {/* Top Control Bar (Non-Printable) */}
        <div className="print:hidden flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quotation Builder
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Printer className="h-4 w-4 text-[#FACC15]" />
              <span>Print / Download Commercial Quote PDF</span>
            </button>
          </div>
        </div>

        {/* Printable PDF Commercial Proposal Document */}
        <div className="printable-pdf-document rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-2xl space-y-8 text-slate-900 print:shadow-none print:border-none print:p-0 print:m-0 print:space-y-4">
          {/* Corporate Header */}
          <div className="flex flex-wrap justify-between items-start border-b border-slate-200 pb-6 gap-6">
            <div className="space-y-3">
              <img src="/bhusri-logo.png" alt="BHUSRI Logo" className="h-14 w-auto object-contain" />
              <div className="text-xs text-slate-600 font-mono space-y-0.5">
                <p className="font-bold text-slate-900">BHUSRI GEOSCIENCES &amp; ENGINEERING SOLUTIONS PRIVATE LIMITED</p>
                <p>HITEC City, Hyderabad · JNPT Logistics Base, Navi Mumbai, India</p>
                <p>Email: commercial@bhusrigeo.com · Web: bhusrigeo.com</p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="font-mono text-xs font-bold text-[#07142F] bg-slate-100 px-3 py-1 rounded">
                COMMERCIAL PROPOSAL &amp; QUOTATION
              </span>
              <h2 className="text-2xl font-mono font-black text-slate-900 mt-2">{quoteNumber}</h2>
              <p className="text-xs font-mono text-slate-500">Date: {new Date().toLocaleDateString()}</p>
              <p className="text-xs font-mono text-slate-500">Validity: 30 Days from Issue</p>
            </div>
          </div>

          {/* Project & Client Context */}
          <div className="grid sm:grid-cols-2 gap-6 text-xs font-sans rounded-2xl bg-slate-50 p-6 border border-slate-200">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Client Account / Operator:</span>
              <h3 className="font-extrabold text-slate-900 text-base">{clientName}</h3>
              <p className="text-slate-700 font-medium">Scope: Technical Personnel &amp; Post-Processing</p>
              <p className="text-slate-600 font-mono">Location: {location}</p>
            </div>

            <div className="space-y-1.5 text-right sm:text-right">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Mobilization Details:</span>
              <p className="font-bold text-[#07142F] font-mono text-sm">{projectName}</p>
              <p className="text-slate-700 font-mono">Target Window: {mobWindow}</p>
              <p className="text-slate-700 font-mono">Billing Currency: {currency}</p>
            </div>
          </div>

          {/* Specialist Day-Rate Breakdown Table */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-extrabold text-[#07142F] tracking-wider">
              1. Technical Staffing &amp; Specialist Day-Rates
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#07142F] text-white uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Specialist Role &amp; Discipline</th>
                    <th className="p-3 text-center">Days</th>
                    <th className="p-3 text-right">Client Rate / Day</th>
                    <th className="p-3 text-right">Line Total ({currency})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-sans font-medium text-slate-900">
                        {item.roleTitle}
                        <span className="block font-mono text-[10px] text-slate-500">{item.discipline}</span>
                      </td>
                      <td className="p-3 text-center font-bold">{item.quantityDays} days</td>
                      <td className="p-3 text-right">{money(item.clientBillingRateDay, currency)}</td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        {money(item.totalClientBilling, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Totals & Payment Milestones */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {/* Commercial Milestone Payment Terms */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
              <h4 className="font-mono text-xs uppercase font-bold text-[#07142F] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> 2. Commercial Milestone Billing Schedule
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-600 font-sans">30% Mob Deposit (Crew Delivery)</span>
                  <span className="font-bold text-slate-900">{money(mobAdvance30, currency)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-600 font-sans">20% Demob Milestone (Return to India)</span>
                  <span className="font-bold text-slate-900">{money(demobPayment20, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-sans">50% Final Balance (Deliverable Handover)</span>
                  <span className="font-bold text-slate-900">{money(finalBalance50, currency)}</span>
                </div>
              </div>
            </div>

            {/* Total Financial Summary */}
            <div className="space-y-2 font-mono text-xs text-right bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex justify-between text-slate-600 border-b border-slate-100 pb-2">
                <span>Subtotal Staffing Fees</span>
                <span className="font-bold">{money(subtotal, currency)}</span>
              </div>
              {currency === "INR" && (
                <div className="flex justify-between text-slate-600 border-b border-slate-100 pb-2">
                  <span>GST Output Tax (18%)</span>
                  <span>{money(gstTax, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-[#07142F] pt-2">
                <span>Total Commercial Quotation</span>
                <span className="text-emerald-700">{money(total, currency)}</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-600 space-y-1 font-sans">
            <p className="font-mono font-bold text-slate-800 uppercase">Commercial Terms &amp; Assumptions:</p>
            <p>1. Client provides vessel, survey spread, fuel, and accommodation. Bhusri provides technical personnel &amp; data processing.</p>
            <p>2. Weather standby delay hours billed at 80% of agreed daily rate as per Master Services Agreement (MSA).</p>
            <p>3. Final processed deliverables (CARIS DTMs, SEG-Y, CAD alignment sheets) released upon milestone clearance.</p>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs font-mono">
            <div>
              <p className="text-slate-400 uppercase text-[10px] font-bold">Authorized Representative</p>
              <div className="h-10 border-b border-slate-300 w-48 mt-1" />
              <p className="font-bold text-slate-900 mt-1">BHUSRI Commercial Director</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 uppercase text-[10px] font-bold">Client Acceptance &amp; Stamp</p>
              <div className="h-10 border-b border-slate-300 w-48 mt-1 ml-auto" />
              <p className="font-bold text-slate-900 mt-1">{clientName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
