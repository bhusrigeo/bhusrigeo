"use client";

import { useEffect, useMemo, useState } from "react";
import { money } from "@/lib/finance/currency";
import { MOCK_DUAL_MARGIN_QUOTES, MOCK_CLIENT_COMPANIES } from "@/lib/mockData";
import type { Currency, DualMarginLineItem } from "@/types/domain";
import { Plus, Trash2, RefreshCw, Calculator, Mail, CheckCircle2, TrendingUp, Layers, Send, FileText, X, Printer, Anchor, Compass, Navigation, ShieldCheck, Tag } from "lucide-react";
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

  // Technical Scope & Vessel Custom Metadata State
  const [vesselName, setVesselName] = useState<string>("RV Pacific Explorer");
  const [imoNumber, setImoNumber] = useState<string>("IMO 9482012");
  const [offshoreBlock, setOffshoreBlock] = useState<string>("Krishna Godavari Basin (KG-D6)");
  const [mobilizationPort, setMobilizationPort] = useState<string>("Kakinada Deepwater Port");

  // Dynamic Key-Value Custom Metadata Fields
  const [customFields, setCustomFields] = useState<{ id: string; key: string; value: string }[]>([
    { id: "cf-1", key: "DP System Class", value: "DP-2 Dynamic Positioning" },
    { id: "cf-2", key: "Acoustic Equipment", value: "Kongsberg EM304 Multibeam + Edgetech 4200 SSS" }
  ]);

  function addCustomField() {
    setCustomFields((prev) => [
      ...prev,
      { id: `cf-${Date.now()}`, key: "Custom Property", value: "Property Value" }
    ]);
  }

  function updateCustomField(id: string, patch: Partial<{ key: string; value: string }>) {
    setCustomFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function removeCustomField(id: string) {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
  }

  // Editable Commercial Terms & Conditions state
  const [terms, setTerms] = useState<{ id: string; title: string; text: string }[]>([
    {
      id: "term-1",
      title: "Advance Mobilization Deposit",
      text: "30% mobilization advance + upfront visa/flight costs billed upon project confirmation."
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
            Quote enterprise daily rates while managing staff contractor payouts &amp; vessel mobilization scope.
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

      {/* TECHNICAL SCOPE & VESSEL CUSTOM METADATA FORM GRID */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Anchor className="h-4 w-4 text-[#07142F]" />
            <h3 className="font-extrabold text-[#07142F] text-sm">
              Vessel, Survey Block &amp; Technical Metadata Fields
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase bg-slate-200/80 px-2.5 py-0.5 rounded-full">
            Included in Commercial Proposal PDF
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
              Chartered Vessel Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                placeholder="RV Pacific Explorer"
                className="w-full font-bold text-slate-900 border-slate-300"
              />
              <Navigation className="absolute right-3 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
              Vessel IMO Number
            </label>
            <input
              type="text"
              value={imoNumber}
              onChange={(e) => setImoNumber(e.target.value)}
              placeholder="IMO 9482012"
              className="w-full font-mono text-slate-900 border-slate-300 font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
              Offshore Block / Region
            </label>
            <div className="relative">
              <input
                type="text"
                value={offshoreBlock}
                onChange={(e) => setOffshoreBlock(e.target.value)}
                placeholder="Krishna Godavari Basin"
                className="w-full text-slate-900 border-slate-300 font-bold"
              />
              <Compass className="absolute right-3 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
              Mobilization Port
            </label>
            <input
              type="text"
              value={mobilizationPort}
              onChange={(e) => setMobilizationPort(e.target.value)}
              placeholder="Kakinada Deepwater Port"
              className="w-full text-slate-900 border-slate-300 font-bold"
            />
          </div>
        </div>

        {/* DYNAMIC CUSTOM KEY-VALUE FIELDS */}
        <div className="pt-2 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-mono font-bold uppercase text-slate-600 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-[#07142F]" />
              Custom Technical Specifications / Metadata Attributes
            </label>
            <Button
              type="button"
              onClick={addCustomField}
              variant="outline"
              size="sm"
              className="gap-1 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-[11px] py-1 h-7"
            >
              <Plus className="h-3 w-3 text-[#07142F]" />
              Add Custom Attribute
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {customFields.map((field) => (
              <div key={field.id} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={field.key}
                  onChange={(e) => updateCustomField(field.id, { key: e.target.value })}
                  placeholder="Attribute Name"
                  className="w-1/3 font-mono text-xs font-bold text-slate-700 border-slate-300 p-1.5"
                />
                <span className="text-slate-400 font-bold">:</span>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
                  placeholder="Attribute Value"
                  className="w-2/3 text-xs text-slate-900 font-semibold border-slate-300 p-1.5"
                />
                <button
                  type="button"
                  onClick={() => removeCustomField(field.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
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
            className="gap-2 border-[#07142F] text-[#07142F] hover:bg-slate-50 font-extrabold shadow-sm cursor-pointer"
          >
            <FileText className="h-4 w-4 text-[#07142F]" />
            View Commercial Proposal PDF
          </Button>

          <Button
            onClick={() => setShowEmailModal(true)}
            className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 font-extrabold shadow-md cursor-pointer"
          >
            <Mail className="h-4 w-4 text-[#FACC15]" />
            View &amp; Dispatch Client Proposal Email
          </Button>
        </div>
      </div>

      {/* PDF Proposal View Modal */}
      {showPdfModal && (
        <QuotationPdfView
          quoteNumber="BHS-PROP-2026-089"
          clientName={clientCompany}
          projectName={`${offshoreBlock} (${vesselName})`}
          location={mobilizationPort}
          currency={currency}
          items={dualLines}
          mobWindow="Q4 2026 Mobilization"
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {/* Email Dispatch Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#07142F]" />
                <h3 className="font-extrabold text-slate-900 text-base">Dispatch Proposal Email</h3>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {emailSentSuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-800">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-extrabold text-lg">Proposal Email Dispatched!</h4>
                <p className="text-xs text-slate-600 font-mono">
                  Sent to {recipientEmail} via SMTP Gateway.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-3 font-sans text-xs">
                <div>
                  <label className="block font-mono font-bold text-slate-600 uppercase mb-1">Select Client Entity:</label>
                  <select
                    value={selectedClientId}
                    onChange={(e) => handleSelectSavedClient(e.target.value)}
                    className="w-full font-bold text-slate-900"
                  >
                    {MOCK_CLIENT_COMPANIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName} ({c.contactPerson})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono font-bold text-slate-600 uppercase mb-1">Recipient Email:</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required
                    className="w-full font-mono text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-mono font-bold text-slate-600 uppercase mb-1">Email Subject:</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                    className="w-full font-bold text-slate-900"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEmailModal(false)}
                    className="border-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5 text-[#FACC15]" />
                    Send Commercial Proposal
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
