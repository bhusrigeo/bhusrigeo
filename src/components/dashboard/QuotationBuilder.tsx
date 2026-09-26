"use client";

import { useEffect, useMemo, useState } from "react";
import { money } from "@/lib/finance/currency";
import { MOCK_DUAL_MARGIN_QUOTES, MOCK_CLIENT_COMPANIES } from "@/lib/mockData";
import type { Currency, DualMarginLineItem } from "@/types/domain";
import { Plus, Trash2, RefreshCw, Calculator, Mail, CheckCircle2, TrendingUp, Layers, Send, FileText, X, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuotationPdfView } from "@/components/quotations/QuotationPdfView";

export function QuotationBuilder() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rate, setRate] = useState<number>(83.45);
  const [loadingRate, setLoadingRate] = useState<boolean>(false);
  const [dualLines, setDualLines] = useState<DualMarginLineItem[]>(MOCK_DUAL_MARGIN_QUOTES);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState<boolean>(false);

  // Saved Client selection state
  const [selectedClientId, setSelectedClientId] = useState<string>("cli-01");
  const [recipientEmail, setRecipientEmail] = useState<string>("c.bennett@totalenergies.com");
  const [clientCompany, setClientCompany] = useState<string>("TotalEnergies E&P USA Inc.");
  const [emailSubject, setEmailSubject] = useState<string>("BHUSRI Commercial Proposal: Offshore Survey Crewing & Telemetry Scope");

  // Editable Commercial Terms & Conditions state
  const [terms, setTerms] = useState<{ id: string; title: string; text: string }[]>([
    {
      id: "term-1",
      title: "Advance Mobilization Deposit",
      text: "20% mobilization advance + upfront visa/flight costs billed upon project confirmation."
    },
    {
      id: "term-2",
      title: "Standby & Weather Delay",
      text: "Standby daily rates apply at 100% of quoted daily rate during weather or operational hold-ups."
    },
    {
      id: "term-3",
      title: "Certifications & Compliance",
      text: "All BHUSRI offshore specialists are fully certified under BOSIET / STCW 95 / OGUK / CDC."
    },
    {
      id: "term-4",
      title: "Validity",
      text: "Proposal valid for 30 calendar days from issue date."
    }
  ]);

  function updateTerm(id: string, patch: Partial<{ title: string; text: string }>) {
    setTerms((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function addTerm() {
    const newTerm = {
      id: `term-${Date.now()}`,
      title: "Custom Commercial Clause",
      text: "Enter specific project terms, payment milestones, or vessel logistics agreements here."
    };
    setTerms((prev) => [...prev, newTerm]);
  }

  function removeTerm(id: string) {
    if (terms.length <= 1) return;
    setTerms((prev) => prev.filter((t) => t.id !== id));
  }

  function handleSelectSavedClient(clientId: string) {
    setSelectedClientId(clientId);
    const client = MOCK_CLIENT_COMPANIES.find((c) => c.id === clientId);
    if (client) {
      setClientCompany(client.companyName);
      setRecipientEmail(client.email);
      setCurrency(client.preferredCurrency);
    }
  }

  async function fetchFxRate() {
    setLoadingRate(true);
    try {
      const response = await fetch("/api/exchange-rates");
      const data = await response.json();
      if (data.usdToInr) {
        setRate(Number(data.usdToInr));
      }
    } catch {
      // fallback
    } finally {
      setLoadingRate(false);
    }
  }

  useEffect(() => {
    fetchFxRate();
  }, []);

  // Commercial totals calculation
  const totalClientBilling = useMemo(() => {
    return dualLines.reduce((sum, item) => sum + item.clientBillingRateDay * item.quantityDays, 0);
  }, [dualLines]);

  const totalStaffCost = useMemo(() => {
    return dualLines.reduce((sum, item) => sum + item.staffPayRateDay * item.quantityDays, 0);
  }, [dualLines]);

  const totalBhusriMargin = totalClientBilling - totalStaffCost;
  const overallMarginPercent = totalClientBilling > 0 ? (totalBhusriMargin / totalClientBilling) * 100 : 0;

  const displayMultiplier = currency === "USD" ? 1 : rate;

  function updateLine(id: string, patch: Partial<DualMarginLineItem>) {
    setDualLines((current) =>
      current.map((line) => {
        if (line.id !== id) return line;
        const updated = { ...line, ...patch };

        // Recalculate margins
        const clientRate = updated.clientBillingRateDay;
        const staffRate = updated.staffPayRateDay;
        const days = updated.quantityDays;

        const marginDay = clientRate - staffRate;
        const marginPercent = clientRate > 0 ? (marginDay / clientRate) * 100 : 0;

        return {
          ...updated,
          marginDay,
          marginPercent: Math.round(marginPercent * 10) / 10,
          totalClientBilling: clientRate * days,
          totalStaffCost: staffRate * days
        };
      })
    );
  }

  function addLine() {
    const newLine: DualMarginLineItem = {
      id: crypto.randomUUID(),
      roleTitle: "Senior Hydrographic Surveyor Scope",
      discipline: "HYDROGRAPHER",
      clientBillingRateDay: 1100,
      staffPayRateDay: 750,
      quantityDays: 14,
      currency: "USD",
      marginDay: 350,
      marginPercent: 31.8,
      totalClientBilling: 15400,
      totalStaffCost: 10500
    };
    setDualLines((curr) => [...curr, newLine]);
  }

  function removeLine(id: string) {
    if (dualLines.length <= 1) return;
    setDualLines((curr) => curr.filter((l) => l.id !== id));
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSentSuccess(true);
    setTimeout(() => {
      setEmailSentSuccess(false);
      setShowEmailModal(false);
    }, 1200);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-[#07142F] shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#07142F]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#07142F] font-extrabold">
              Dual-Margin Quotation Engine
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#07142F] mt-1">
            Client Billing vs Staff Pay Rate Commercial Engine
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Quote high rates to enterprise customers while calculating staff contractor pay rates based on experience &amp; certifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1 font-mono text-xs">
            <button
              onClick={() => setCurrency("USD")}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-[#07142F] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#07142F]"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all cursor-pointer ${
                currency === "INR"
                  ? "bg-[#07142F] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#07142F]"
              }`}
            >
              INR (₹)
            </button>
          </div>

          <Button
            onClick={fetchFxRate}
            variant="outline"
            size="sm"
            disabled={loadingRate}
            className="gap-1.5 font-mono text-xs border-slate-300 text-slate-700 hover:bg-slate-50 font-bold"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingRate ? "animate-spin" : ""}`} />
            Sync FX
          </Button>
        </div>
      </div>

      {/* BHUSRI Commercial Profit Ticker */}
      <div className="grid gap-4 sm:grid-cols-3 rounded-2xl bg-[#07142F] text-white p-6 shadow-md">
        <div className="border-l-2 border-white pl-4">
          <span className="font-mono text-xs text-slate-300 uppercase block font-medium">Total Client Quote Billing</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">
            {money(totalClientBilling * displayMultiplier, currency)}
          </span>
        </div>

        <div className="border-l-2 border-slate-500 pl-4">
          <span className="font-mono text-xs text-slate-300 uppercase block font-medium">Total Staff Payout Cost</span>
          <span className="text-2xl font-black text-slate-300 font-mono mt-1 block">
            {money(totalStaffCost * displayMultiplier, currency)}
          </span>
        </div>

        <div className="border-l-2 border-emerald-400 pl-4">
          <span className="font-mono text-xs text-emerald-300 uppercase block font-bold">BHUSRI Gross Profit Margin</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {money(totalBhusriMargin * displayMultiplier, currency)}
            </span>
            <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded">
              {overallMarginPercent.toFixed(1)}% MARGIN
            </span>
          </div>
        </div>
      </div>

      {/* Dual Margin Table Header */}
      <div className="hidden md:grid grid-cols-[2.5fr_1fr_1.2fr_1.2fr_1.2fr_40px] gap-3 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
        <span>Role &amp; Specialist Scope</span>
        <span>Duration (Days)</span>
        <span>Client Rate ({currency}/day)</span>
        <span>Staff Pay ({currency}/day)</span>
        <span>BHUSRI Margin / Day</span>
        <span></span>
      </div>

      {/* Table Rows */}
      <div className="space-y-3">
        {dualLines.map((line) => {
          const clientRateDisplay = currency === "INR" ? line.clientBillingRateDay * rate : line.clientBillingRateDay;
          const staffRateDisplay = currency === "INR" ? line.staffPayRateDay * rate : line.staffPayRateDay;
          const marginDayDisplay = currency === "INR" ? line.marginDay * rate : line.marginDay;

          return (
            <div
              key={line.id}
              className="grid gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/70 md:grid-cols-[2.5fr_1fr_1.2fr_1.2fr_1.2fr_40px] items-center hover:border-[#07142F] transition-colors"
            >
              <div>
                <span className="md:hidden text-[10px] font-mono text-slate-500 block mb-1">Role Title</span>
                <input
                  type="text"
                  value={line.roleTitle}
                  onChange={(e) => updateLine(line.id, { roleTitle: e.target.value })}
                  className="w-full text-sm font-bold text-slate-900 border-b border-transparent focus:border-[#07142F] focus:outline-none bg-transparent"
                />
              </div>

              <div>
                <span className="md:hidden text-[10px] font-mono text-slate-500 block mb-1">Days</span>
                <input
                  type="number"
                  min="1"
                  value={line.quantityDays}
                  onChange={(e) => updateLine(line.id, { quantityDays: Number(e.target.value) })}
                  className="w-full text-sm font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <span className="md:hidden text-[10px] font-mono text-slate-500 block mb-1">Client Quote Rate</span>
                <input
                  type="number"
                  value={clientRateDisplay}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateLine(line.id, {
                      clientBillingRateDay: currency === "INR" ? val / rate : val
                    });
                  }}
                  className="w-full text-sm font-mono text-slate-900 font-bold bg-white border border-slate-300 px-2 py-1 rounded"
                />
              </div>

              <div>
                <span className="md:hidden text-[10px] font-mono text-slate-500 block mb-1">Staff Pay Rate</span>
                <input
                  type="number"
                  value={staffRateDisplay}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateLine(line.id, {
                      staffPayRateDay: currency === "INR" ? val / rate : val
                    });
                  }}
                  className="w-full text-sm font-mono text-slate-700 font-bold bg-white border border-slate-300 px-2 py-1 rounded"
                />
              </div>

              <div>
                <span className="md:hidden text-[10px] font-mono text-slate-500 block mb-1">Margin / Day</span>
                <div className="font-mono text-xs">
                  <span className="font-extrabold text-emerald-700 block">{money(marginDayDisplay, currency)}/d</span>
                  <span className="text-[10px] text-emerald-600 font-bold">({line.marginPercent}%)</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  disabled={dualLines.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editable Commercial Terms & Clauses Section */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-3 font-sans text-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#07142F]" />
            <h4 className="font-extrabold text-slate-900 text-sm">
              Editable Commercial Terms &amp; Conditions Clauses
            </h4>
          </div>
          <Button
            type="button"
            onClick={addTerm}
            variant="outline"
            size="sm"
            className="gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-[11px] py-1 h-7"
          >
            <Plus className="h-3 w-3 text-[#07142F]" />
            Add Custom Clause
          </Button>
        </div>

        <div className="space-y-3">
          {terms.map((t) => (
            <div key={t.id} className="grid grid-cols-[1.5fr_3fr_40px] gap-3 p-3 rounded-xl bg-white border border-slate-200 items-start">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Clause Title:</label>
                <input
                  type="text"
                  value={t.title}
                  onChange={(e) => updateTerm(t.id, { title: e.target.value })}
                  className="w-full font-bold text-slate-900 border border-slate-300 rounded p-1.5 font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Clause Details / Text:</label>
                <textarea
                  rows={2}
                  value={t.text}
                  onChange={(e) => updateTerm(t.id, { text: e.target.value })}
                  className="w-full text-slate-700 border border-slate-300 rounded p-1.5 font-sans text-xs resize-none"
                />
              </div>

              <div className="flex justify-end pt-5">
                <button
                  type="button"
                  onClick={() => removeTerm(t.id)}
                  disabled={terms.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
        <Button
          onClick={addLine}
          variant="outline"
          size="sm"
          className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-bold"
        >
          <Plus className="h-4 w-4 text-[#07142F]" />
          Add Role Scope Item
        </Button>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowPdfModal(true)}
            variant="outline"
            className="gap-2 border-[#07142F] text-[#07142F] hover:bg-slate-50 font-extrabold shadow-sm"
          >
            <FileText className="h-4 w-4 text-[#07142F]" />
            View Commercial Proposal PDF
          </Button>

          <Button
            onClick={() => setShowEmailModal(true)}
            className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 font-extrabold shadow-md"
          >
            <Mail className="h-4 w-4 text-[#FACC15]" />
            View &amp; Dispatch Client Proposal Email
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. PDF Proposal View Modal */}
      {/* ------------------------------------------------------------- */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 overflow-y-auto print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:block">
          <div className="printable-pdf-document w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-slate-900 print:shadow-none print:border-none print:p-0 print:max-w-full print:m-0 print:max-h-none print:space-y-4">
            {/* Document Header / Letterhead */}
            <div className="flex items-start justify-between border-b-2 border-[#07142F] pb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-extrabold block">
                  Commercial Proposal Document
                </span>
                <h3 className="text-3xl font-black text-[#07142F] tracking-tight mt-0.5">
                  BHUSRI GEOSCIENCES &amp; ENGINEERING SOLUTIONS
                </h3>
                <p className="text-xs font-mono text-slate-600 mt-1">
                  bhusrigeo.com | bhusrimarine.com | Houston · Aberdeen · Dubai · Hyderabad
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block rounded-lg bg-[#07142F] px-3 py-1 font-mono text-xs font-bold text-white uppercase print:border print:border-slate-800 print:text-black">
                  REF: SED-PROP-2026-089
                </span>
                <p className="text-xs font-mono text-slate-500 mt-2">
                  Date: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs print:bg-white">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">PREPARED FOR:</span>
                <p className="font-extrabold text-slate-900 text-sm mt-0.5">{clientCompany}</p>
                <p className="text-slate-600 mt-0.5">Attn: Enterprise Procurement Team</p>
                <p className="text-slate-600">{recipientEmail}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">SERVICE DOMAIN:</span>
                <p className="font-bold text-[#07142F] mt-0.5">Offshore Survey Manpower &amp; Data QC Telemetry</p>
                <p className="text-slate-600 mt-0.5">Vessel Mobilization &amp; Crewing Support</p>
                <p className="text-emerald-700 font-bold">Currency: {currency}</p>
              </div>
            </div>

            {/* Quotation Line Items Table (Client View - High Billing Rates Only) */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase text-slate-700 mb-2">Commercial Schedule of Daily Rates</h4>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#07142F] font-mono text-white text-[11px] uppercase print:bg-slate-900">
                    <tr>
                      <th className="p-3">Specialist Scope / Role</th>
                      <th className="p-3 text-center">Duration</th>
                      <th className="p-3 text-right">Quoted Client Daily Rate</th>
                      <th className="p-3 text-right">Line Total ({currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {dualLines.map((line) => {
                      const clientRate = currency === "INR" ? line.clientBillingRateDay * rate : line.clientBillingRateDay;
                      const lineTotal = clientRate * line.quantityDays;
                      return (
                        <tr key={line.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{line.roleTitle}</td>
                          <td className="p-3 font-mono text-center">{line.quantityDays} Days</td>
                          <td className="p-3 font-mono text-right font-bold text-slate-900">{money(clientRate, currency)}/day</td>
                          <td className="p-3 font-mono text-right font-extrabold text-[#07142F]">{money(lineTotal, currency)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-100 font-mono font-bold text-slate-900 border-t-2 border-slate-300">
                    <tr>
                      <td colSpan={3} className="p-3 text-right uppercase text-slate-700">Total Commercial Investment:</td>
                      <td className="p-3 text-right text-base text-[#07142F] font-black">{money(totalClientBilling * displayMultiplier, currency)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Commercial Terms & Conditions (Dynamic & Editable) */}
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
              <h4 className="font-mono text-xs font-bold uppercase text-slate-800">Commercial Terms &amp; Conditions:</h4>
              <ul className="list-disc pl-5 space-y-1.5 font-sans text-[11px]">
                {terms.map((t) => (
                  <li key={t.id}>
                    <strong>{t.title}:</strong> {t.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions (Hidden in Print) */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 print:hidden">
              <button
                onClick={() => setShowPdfModal(false)}
                className="border border-slate-300 text-slate-700 font-bold px-5 py-2 rounded-xl hover:bg-slate-100 text-xs"
              >
                Close Preview
              </button>

              <div className="flex gap-3">
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-400 text-slate-800 font-bold"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print / Save PDF
                </Button>

                <Button
                  onClick={() => {
                    setShowPdfModal(false);
                    setShowEmailModal(true);
                  }}
                  size="sm"
                  className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 font-bold"
                >
                  <Mail className="h-3.5 w-3.5 text-[#FACC15]" />
                  Proceed to Email Dispatch
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Client Proposal Email Format Preview & Dispatcher Modal */}
      {/* ------------------------------------------------------------- */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#07142F]" />
                <h3 className="font-black text-slate-900 text-lg">Client Proposal Email Format &amp; Dispatcher</h3>
              </div>
              <button onClick={() => setShowEmailModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4 text-xs font-sans">
              {/* Saved Enterprise Client Selector */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <label className="block font-mono text-[11px] font-bold uppercase text-[#07142F] flex items-center justify-between">
                  <span>Select Saved Enterprise Client:</span>
                  <span className="text-emerald-700 font-bold">Auto-Populates Client Info &amp; Rates</span>
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => handleSelectSavedClient(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold text-slate-900 focus:border-[#07142F] focus:outline-none"
                >
                  {MOCK_CLIENT_COMPANIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.contactPerson}) — [{c.preferredCurrency}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Recipient Email:
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 font-mono text-xs text-slate-900 focus:border-[#07142F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Client Operator Company:
                  </label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 font-sans text-xs text-slate-900 focus:border-[#07142F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Email Subject Line:
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 font-sans text-xs text-slate-900 focus:border-[#07142F] focus:outline-none"
                />
              </div>

              {/* Email Content Body Preview Box */}
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Email Body Preview (Formatted Client Proposal):
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 space-y-4 font-sans text-xs text-slate-800 leading-relaxed max-h-[300px] overflow-y-auto">
                  <p className="font-semibold text-slate-900">Dear Procurement &amp; Operations Team at {clientCompany},</p>
                  
                  <p>
                    Thank you for contacting <strong>BHUSRI GEOSCIENCES &amp; SUBSEA</strong> regarding your upcoming offshore survey campaign. Based on your vessel and survey crew requirements, we are pleased to submit our formal commercial proposal.
                  </p>

                  <div className="rounded-lg bg-white border border-slate-200 p-3 font-mono text-xs space-y-2">
                    <div className="font-bold text-[#07142F] border-b border-slate-200 pb-1">
                      COMMERCIAL QUOTATION SUMMARY ({currency})
                    </div>
                    {dualLines.map((l) => (
                      <div key={l.id} className="flex justify-between text-slate-700">
                        <span>• {l.roleTitle} ({l.quantityDays} days)</span>
                        <span className="font-bold text-slate-900">{money(currency === "INR" ? l.clientBillingRateDay * rate : l.clientBillingRateDay, currency)}/day</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 text-sm">
                      <span>Total Client Commercial Investment:</span>
                      <span className="text-[#07142F]">{money(totalClientBilling * displayMultiplier, currency)}</span>
                    </div>
                  </div>

                  <p>
                    <strong>Next Steps upon Acceptance:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Confirm acceptance of this quotation and scope of work.</li>
                    <li>BHUSRI issues the Advance Mobilization Invoice (covering upfront visa, flights &amp; deposit).</li>
                    <li>BHUSRI assigns verified offshore specialists from our certified roster and issues LOI / Visa applications.</li>
                  </ol>

                  <p className="pt-2 text-slate-600 font-mono text-[11px]">
                    Attached File: <strong>BHUSRI_Commercial_Proposal_2026.pdf</strong><br />
                    Best regards,<br />
                    <strong className="text-slate-900">Commercial Director | BHUSRI GEOSCIENCES &amp; SUBSEA</strong>
                  </p>
                </div>
              </div>

              {emailSentSuccess && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-mono text-emerald-800 flex items-center gap-2 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Quotation Email &amp; Proposal PDF Dispatched to Client!</span>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="border border-slate-300 text-slate-700 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={emailSentSuccess}
                  className="bg-[#07142F] text-white hover:bg-slate-800 font-extrabold uppercase tracking-wider px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Dispatch Email &amp; PDF</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Commercial Quotation & Technical Proposal PDF Modal */}
      {showPdfModal && (
        <QuotationPdfView
          quoteNumber="BHS-QT-2026-014"
          clientName={clientCompany}
          projectName="KG-DWN-98/2 Rig-Site Clearance & Technical Manpower"
          location="KG Basin, Bay of Bengal"
          currency={currency}
          items={dualLines}
          mobWindow="Immediate (Q4 2026)"
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </section>
  );
}
