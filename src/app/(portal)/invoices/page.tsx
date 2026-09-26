"use client";

import { useState } from "react";
import { MOCK_INVOICES, MOCK_CLIENT_COMPANIES } from "@/lib/mockData";
import { Invoice, QuotationLineItem, Currency, MilestoneStage } from "@/types/domain";
import { money } from "@/lib/finance/currency";
import { InvoicePdfView } from "@/components/invoices/InvoicePdfView";
import { Receipt, TrendingUp, Calendar, Printer, Plus, X, CheckCircle2, Building2, UserCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedInvoiceForPdf, setSelectedInvoiceForPdf] = useState<Invoice | null>(null);

  // New Invoice Modal State
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedClientId, setSelectedClientId] = useState<string>("cli-01");
  const [customerName, setCustomerName] = useState<string>("TotalEnergies E&P USA Inc.");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [milestoneStage, setMilestoneStage] = useState<MilestoneStage>("ADVANCE_MOBILIZATION_20");
  const [issueDate, setIssueDate] = useState<string>("2026-09-20");
  const [dueDate, setDueDate] = useState<string>("2026-10-20");

  const [lines, setLines] = useState<QuotationLineItem[]>([
    {
      description: "Mobilization Advance Deposit (20%) - Deepwater Survey Scope",
      category: "MOBILIZATION_DEMOB",
      quantity: 1,
      unit: "lot",
      unitPrice: 42000,
      taxRate: 18,
      currency: "USD",
      total: 42000
    },
    {
      description: "Upfront Offshore Seaman Visa Fees & LOI Clearance (3 Crew)",
      category: "SPECIALIST_CREWING",
      quantity: 3,
      unit: "pax",
      unitPrice: 1200,
      taxRate: 18,
      currency: "USD",
      total: 3600
    }
  ]);

  function handleSelectClient(clientId: string) {
    setSelectedClientId(clientId);
    const client = MOCK_CLIENT_COMPANIES.find((c) => c.id === clientId);
    if (client) {
      setCustomerName(client.companyName);
      setCurrency(client.preferredCurrency);
      // update line currency
      setLines((prev) => prev.map((l) => ({ ...l, currency: client.preferredCurrency })));
    }
  }

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  const taxGst = subtotal * 0.18;
  const taxTds = currency === "INR" ? subtotal * 0.02 : 0;
  const grandTotal = subtotal + taxGst - taxTds;

  function handleCreateInvoice(e: React.FormEvent) {
    e.preventDefault();
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `SED-INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      projectId: "proj-001",
      customerName,
      currency,
      status: "ISSUED",
      milestoneStage,
      issueDate,
      dueDate,
      subtotal,
      taxGst,
      taxTds,
      total: grandTotal,
      lines
    };

    setInvoices([newInv, ...invoices]);
    setShowCreateModal(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#07142F] font-bold mb-1">
            <Receipt className="h-4 w-4 text-[#07142F]" />
            Commercial Financial Settlement &amp; Billing
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Pro-Forma &amp; Issued Commercial Invoices
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Prepare invoices by selecting saved clients, track FX variances, GST/TDS tax deductions, and print corporate PDF invoices.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 font-extrabold shadow-md"
        >
          <Plus className="h-4 w-4 text-[#FACC15]" />
          Prepare New Commercial Invoice
        </Button>
      </div>

      {/* Invoice List */}
      <div className="space-y-6">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 hover:border-[#07142F] transition-all shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#07142F] font-bold">
                  <span>{inv.invoiceNumber}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold border ${
                      inv.status === "PAID"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{inv.customerName}</h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right font-mono">
                  <span className="text-xs text-slate-500 block">Total Amount ({inv.currency})</span>
                  <span className="text-2xl font-extrabold text-[#07142F]">
                    {money(inv.total, inv.currency)}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedInvoiceForPdf(inv)}
                  className="bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
                >
                  <Printer className="h-4 w-4 text-[#FACC15]" />
                  <span>View / Download PDF</span>
                </button>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-slate-500 uppercase block">Billing Line Items</span>
              <div className="space-y-1.5">
                {inv.lines.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 p-3 text-xs font-mono text-slate-700 border border-slate-200"
                  >
                    <span className="font-sans text-slate-900 font-semibold">{line.description}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500">{line.quantity} {line.unit} @ {money(line.unitPrice, inv.currency)}</span>
                      <span className="text-[#07142F] font-bold">{money(line.total, inv.currency)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settlement Metadata & FX Variance */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs font-mono text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Issued: {inv.issueDate}
                </span>
                <span className="font-medium">Due: {inv.dueDate}</span>
              </div>

              {inv.exchangeGainLoss && (
                <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  <span>FX Realized Gain: ₹{inv.exchangeGainLoss.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prepare New Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#07142F]" />
                <h3 className="font-black text-slate-900 text-lg">Prepare Commercial Invoice</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs font-sans">
              {/* Saved Enterprise Client Selector */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <label className="block font-mono text-[11px] font-bold uppercase text-[#07142F] flex items-center justify-between">
                  <span>1. Select Saved Enterprise Client:</span>
                  <span className="text-emerald-700 font-bold">Auto-Populates Client Info &amp; Tax ID</span>
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => handleSelectClient(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold text-slate-900 focus:border-[#07142F] focus:outline-none"
                >
                  {MOCK_CLIENT_COMPANIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.contactPerson}) — [{c.gstTaxId}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer & Billing Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                    Billed Customer Name:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                    Currency:
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-xs font-bold text-slate-900"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              {/* Milestone & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                    Milestone Stage:
                  </label>
                  <select
                    value={milestoneStage}
                    onChange={(e) => setMilestoneStage(e.target.value as MilestoneStage)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-[11px] font-bold text-slate-900"
                  >
                    <option value="ADVANCE_MOBILIZATION_20">20% Advance Mobilization</option>
                    <option value="ACQUISITION_SIGNOFF_40">40% Acquisition Signoff</option>
                    <option value="FINAL_DELIVERY_ACCEPTANCE_40">40% Final Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">Issue Date:</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-[11px] font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">Due Date:</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-[11px] font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Line Items Breakdown */}
              <div className="space-y-2 pt-2">
                <label className="block font-mono text-xs font-bold uppercase text-slate-700">
                  2. Billable Scope Line Items:
                </label>
                {lines.map((item, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_40px] gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs items-center">
                    <div>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, description: val } : l));
                        }}
                        className="w-full bg-white border border-slate-300 rounded p-1 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, quantity: qty, total: qty * l.unitPrice } : l));
                        }}
                        className="w-full bg-white border border-slate-300 rounded p-1 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => {
                          const price = Number(e.target.value);
                          setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, unitPrice: price, total: l.quantity * price } : l));
                        }}
                        className="w-full bg-white border border-slate-300 rounded p-1 font-bold text-slate-900"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setLines((prev) => prev.filter((_, idx) => idx !== i))}
                      disabled={lines.length <= 1}
                      className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Totals Summary */}
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 font-mono text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Scope:</span>
                  <span className="font-bold text-slate-900">{money(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST Tax (18%):</span>
                  <span className="font-bold text-slate-900">{money(taxGst, currency)}</span>
                </div>
                {currency === "INR" && (
                  <div className="flex justify-between text-slate-600">
                    <span>Less TDS Withholding (2%):</span>
                    <span className="font-bold text-slate-900">-{money(taxTds, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-[#07142F] text-sm border-t border-slate-200 pt-2">
                  <span>GRAND TOTAL INVOICED:</span>
                  <span>{money(grandTotal, currency)}</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="border border-slate-300 text-slate-700 font-bold px-5 py-2 rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#07142F] text-white hover:bg-slate-800 font-extrabold uppercase tracking-wider px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#FACC15]" />
                  <span>Issue Invoice &amp; Render PDF</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice PDF Modal View */}
      {selectedInvoiceForPdf && (
        <InvoicePdfView
          invoice={selectedInvoiceForPdf}
          onClose={() => setSelectedInvoiceForPdf(null)}
        />
      )}
    </div>
  );
}

