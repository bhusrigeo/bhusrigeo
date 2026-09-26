"use client";

import { Invoice } from "@/types/domain";
import { money } from "@/lib/finance/currency";
import { Printer, Download, ArrowLeft, CheckCircle2, Building2, Calendar, FileText } from "lucide-react";

export function InvoicePdfView({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
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
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

        {/* Printable PDF Document Layout */}
        <div className="printable-pdf-document rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-2xl space-y-8 text-slate-900 print:shadow-none print:border-none print:p-0 print:m-0 print:space-y-4">
          {/* Invoice Corporate Header */}
          <div className="flex flex-wrap justify-between items-start border-b border-slate-200 pb-6 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src="/bhusri-logo.png" alt="BHUSRI Geosciences Logo" className="h-14 w-auto object-contain" />
              </div>
              <div className="text-xs text-slate-500 font-mono space-y-0.5">
                <p className="font-bold text-slate-800">BHUSRI GEOSCIENCES &amp; ENGINEERING SOLUTIONS PRIVATE LIMITED</p>
                <p>JNPT Logistics Zone, Navi Mumbai 400707, Maharashtra, India</p>
                <p>Email: billing@bhusrigeo.com · Web: bhusrigeo.com</p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="font-mono text-xs font-bold text-[#07142F] bg-slate-100 px-3 py-1 rounded">
                COMMERCIAL INVOICE
              </span>
              <h2 className="text-2xl font-mono font-black text-slate-900 mt-2">{invoice.invoiceNumber}</h2>
              <span className="inline-block font-mono text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                STATUS: {invoice.status}
              </span>
            </div>
          </div>

          {/* Client & Date Details Grid */}
          <div className="grid sm:grid-cols-2 gap-6 text-xs font-sans rounded-2xl bg-slate-50 p-6 border border-slate-200">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Billed To Customer:</span>
              <h3 className="font-extrabold text-slate-900 text-base">{invoice.customerName}</h3>
              <p className="text-slate-600 font-mono">Project Reference: {invoice.projectId}</p>
              <p className="text-slate-600 font-mono">Billing Currency: {invoice.currency}</p>
            </div>

            <div className="space-y-1.5 sm:text-right font-mono">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Invoice Metadata:</span>
              <p className="text-slate-700 font-medium">Issue Date: <span className="font-bold text-slate-900">{invoice.issueDate}</span></p>
              <p className="text-slate-700 font-medium">Payment Due Date: <span className="font-bold text-slate-900">{invoice.dueDate}</span></p>
              <p className="text-slate-700 font-medium">Milestone Stage: <span className="font-bold text-slate-900">{invoice.milestoneStage}</span></p>
            </div>
          </div>

          {/* Detailed Line Items Table */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase text-slate-500 block">
              Billable Line Items &amp; Services Scope:
            </span>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#07142F] text-white font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3.5">Scope Description</th>
                    <th className="p-3.5 text-center">Category</th>
                    <th className="p-3.5 text-center">Qty / Days</th>
                    <th className="p-3.5 text-right">Unit Price</th>
                    <th className="p-3.5 text-right">Tax Rate</th>
                    <th className="p-3.5 text-right">Total ({invoice.currency})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {invoice.lines.map((line, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900 max-w-xs">{line.description}</td>
                      <td className="p-3.5 text-center font-mono text-[11px]">
                        <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
                          {line.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold">{line.quantity} {line.unit}</td>
                      <td className="p-3.5 text-right font-mono">{money(line.unitPrice, invoice.currency)}</td>
                      <td className="p-3.5 text-right font-mono">{line.taxRate}% GST</td>
                      <td className="p-3.5 text-right font-mono font-extrabold text-slate-900">
                        {money(line.total, invoice.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Calculation Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start pt-4 border-t border-slate-200 gap-6">
            <div className="space-y-2 text-xs text-slate-500 max-w-sm font-sans">
              <span className="font-mono text-[10px] font-bold uppercase text-slate-400 block">Payment Terms &amp; Wire Info:</span>
              <p>Payment due within 30 days of invoice issue. Electronic wire transfer to BHUSRI Geosciences bank account.</p>
              <p className="font-mono text-[11px] text-slate-700 font-bold">SWIFT: BHUSRIINBB / IFSC: SBIN0000001</p>
            </div>

            <div className="w-full sm:w-80 rounded-2xl bg-slate-50 p-5 space-y-2.5 border border-slate-200 text-xs font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Scope:</span>
                <span className="font-bold text-slate-900">{money(invoice.subtotal, invoice.currency)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST Tax (18%):</span>
                <span className="font-bold text-slate-900">{money(invoice.taxGst, invoice.currency)}</span>
              </div>
              {invoice.taxTds > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Less TDS Withholding (2%):</span>
                  <span className="font-bold text-slate-900">-{money(invoice.taxTds, invoice.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-[#07142F] border-t border-slate-200 pt-3">
                <span>Total Amount Due:</span>
                <span>{money(invoice.total, invoice.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
