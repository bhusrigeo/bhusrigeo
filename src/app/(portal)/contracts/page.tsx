"use client";

import { useState } from "react";
import { MOCK_OFFER_LETTERS, MOCK_VISA_RECORDS, MOCK_PAYSLIPS, MOCK_FREELANCERS, MOCK_PROJECTS } from "@/lib/mockData";
import { OfferLetter, VisaRecord, ContractorPayslip } from "@/types/domain";
import { money } from "@/lib/finance/currency";
import {
  FileText,
  ShieldCheck,
  Receipt,
  UserCheck,
  Printer,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  Building2,
  Globe,
  Award,
  Download,
  X
} from "lucide-react";

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState<"OFFERS" | "VISAS" | "PAYSLIPS">("OFFERS");

  // Visa Records state for live dropdown status marking
  const [visaRecords, setVisaRecords] = useState<VisaRecord[]>(MOCK_VISA_RECORDS);

  // Offer Letter modal state
  const [selectedOffer, setSelectedOffer] = useState<OfferLetter | null>(null);

  // Payslip modal state
  const [selectedPayslip, setSelectedPayslip] = useState<ContractorPayslip | null>(null);

  // Add New Visa Record Modal state
  const [showAddVisaModal, setShowAddVisaModal] = useState<boolean>(false);
  const [newSpecialistName, setNewSpecialistName] = useState<string>("");
  const [newPassport, setNewPassport] = useState<string>("");
  const [newCdc, setNewCdc] = useState<string>("");
  const [newTargetCountry, setNewTargetCountry] = useState<string>("United States (Gulf of Mexico / Houston)");
  const [newVisaType, setNewVisaType] = useState<string>("C1/D Seaman Transit & US B1/OECS Visa");

  function updateVisaRecord(id: string, patch: Partial<VisaRecord>) {
    setVisaRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, ...patch } : rec))
    );
  }

  function handleAddVisaRecord(e: React.FormEvent) {
    e.preventDefault();
    const newRecord: VisaRecord = {
      id: `visa-${Date.now()}`,
      specialistId: `ARN-OFF-${Math.floor(100 + Math.random() * 900)}`,
      specialistName: newSpecialistName || "New Offshore Specialist",
      passportNumber: newPassport || "GB9982101",
      seamanBookCdc: newCdc || "CDC-UK-9921",
      targetCountry: newTargetCountry,
      visaType: newVisaType,
      loiStatus: "LOI_APPROVED",
      visaStatus: "IN_PROCESS",
      otbClearance: "PENDING",
      stcwBosietExpiry: "2028-12-31",
      medicalExpiry: "2027-06-30"
    };

    setVisaRecords([newRecord, ...visaRecords]);
    setShowAddVisaModal(false);
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#07142F] font-bold mb-1">
            <FileText className="h-4 w-4 text-[#07142F]" />
            Post-Award Crewing, Visas &amp; Contractor Payslips Module
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Offshore Contracting, Visas &amp; Remittance Control
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Release specialist offer letters upon project confirmation, track offshore visas/LOIs/CDCs, and disburse contractor payslips.
          </p>
        </div>

        {/* Tab Selection Controls */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab("OFFERS")}
            className={`rounded-lg px-4 py-2 font-bold transition-all cursor-pointer ${
              activeTab === "OFFERS"
                ? "bg-[#07142F] text-white shadow-xs"
                : "text-slate-600 hover:text-[#07142F]"
            }`}
          >
            1. Offer Letters
          </button>
          <button
            onClick={() => setActiveTab("VISAS")}
            className={`rounded-lg px-4 py-2 font-bold transition-all cursor-pointer ${
              activeTab === "VISAS"
                ? "bg-[#07142F] text-white shadow-xs"
                : "text-slate-600 hover:text-[#07142F]"
            }`}
          >
            2. Visa &amp; CDC Tracker
          </button>
          <button
            onClick={() => setActiveTab("PAYSLIPS")}
            className={`rounded-lg px-4 py-2 font-bold transition-all cursor-pointer ${
              activeTab === "PAYSLIPS"
                ? "bg-[#07142F] text-white shadow-xs"
                : "text-slate-600 hover:text-[#07142F]"
            }`}
          >
            3. Payslips &amp; Remittance
          </button>
        </div>
      </div>

      {/* TAB 1: OFFER LETTERS & SERVICE AGREEMENTS */}
      {activeTab === "OFFERS" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Post-Award Offshore Service Agreements</h2>
            <span className="font-mono text-xs text-slate-500">Released upon client project confirmation</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {MOCK_OFFER_LETTERS.map((offer) => (
              <div
                key={offer.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:border-[#07142F] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-xs font-black text-[#07142F] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                        {offer.offerNumber}
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-900 mt-2">{offer.specialistName}</h3>
                      <span className="text-xs text-slate-600 font-medium block">{offer.roleTitle}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      {offer.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Assigned Project:</span>
                      <span className="font-bold text-slate-900">{offer.projectName}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Operator Client:</span>
                      <span className="font-bold text-slate-900">{offer.operatorName}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Chartered Vessel:</span>
                      <span className="font-bold text-slate-900">{offer.vesselName}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Agreed Staff Day Rate:</span>
                      <span className="font-mono font-extrabold text-[#07142F]">${offer.agreedDayRate}/day</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="w-full bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase py-2.5 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Formal Offer Letter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: OFFSHORE VISA & SEAMAN DOCUMENTATION TRACKER */}
      {activeTab === "VISAS" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Offshore Visa, LOI &amp; Seaman CDC Clearance Matrix</h2>
              <span className="font-mono text-xs text-slate-500">Live Immigration &amp; Flight Authorization Management</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                IMMIGRATION COMPLIANCE ACTIVE
              </span>
              <button
                onClick={() => setShowAddVisaModal(true)}
                className="bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
              >
                + Add Specialist Record
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-md">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#07142F] text-white font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-4">Specialist Name &amp; ID</th>
                  <th className="p-4">Passport &amp; CDC No.</th>
                  <th className="p-4">Target Country / Region</th>
                  <th className="p-4">Letter of Invitation</th>
                  <th className="p-4">Offshore Visa Status</th>
                  <th className="p-4">OK-To-Board (OTB)</th>
                  <th className="p-4">Safety Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visaRecords.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{v.specialistName}</div>
                      <span className="font-mono text-[10px] text-slate-500 font-bold">{v.specialistId}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-700">
                      <div>Pass: {v.passportNumber}</div>
                      <span className="text-slate-500 text-[10px]">CDC: {v.seamanBookCdc}</span>
                    </td>
                    <td className="p-4 font-bold text-[#07142F]">{v.targetCountry}</td>

                    {/* LOI Status Selector */}
                    <td className="p-4 font-mono font-bold">
                      <select
                        value={v.loiStatus}
                        onChange={(e) => updateVisaRecord(v.id, { loiStatus: e.target.value as any })}
                        className="bg-emerald-50 text-emerald-800 border border-emerald-300 rounded px-2 py-1 text-xs font-mono font-bold cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="LOI_APPROVED">LOI_APPROVED</option>
                        <option value="LOI_ISSUED">LOI_ISSUED</option>
                        <option value="LOI_PENDING">LOI_PENDING</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>

                    {/* Visa Status Selector */}
                    <td className="p-4 font-mono font-bold">
                      <select
                        value={v.visaStatus}
                        onChange={(e) => updateVisaRecord(v.id, { visaStatus: e.target.value as any })}
                        className={`border rounded-full px-2.5 py-1 text-[11px] font-mono font-bold cursor-pointer outline-none ${
                          v.visaStatus === "VISA_APPROVED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : v.visaStatus === "IN_PROCESS"
                            ? "bg-blue-50 text-blue-700 border-blue-300"
                            : v.visaStatus === "DOCS_PENDING"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : "bg-rose-50 text-rose-700 border-rose-300"
                        }`}
                      >
                        <option value="VISA_APPROVED">VISA_APPROVED</option>
                        <option value="IN_PROCESS">IN_PROCESS</option>
                        <option value="DOCS_PENDING">DOCS_PENDING</option>
                        <option value="EXPIRED">EXPIRED</option>
                      </select>
                    </td>

                    {/* OTB Clearance Selector */}
                    <td className="p-4 font-mono font-bold">
                      <select
                        value={v.otbClearance}
                        onChange={(e) => updateVisaRecord(v.id, { otbClearance: e.target.value as any })}
                        className={`border rounded px-2 py-1 text-xs font-mono font-bold cursor-pointer outline-none ${
                          v.otbClearance === "OTB_CLEARED"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : v.otbClearance === "FLIGHT_BOOKED"
                            ? "bg-purple-100 text-purple-800 border-purple-300"
                            : "bg-slate-100 text-slate-700 border-slate-300"
                        }`}
                      >
                        <option value="OTB_CLEARED">OTB_CLEARED</option>
                        <option value="FLIGHT_BOOKED">FLIGHT_BOOKED</option>
                        <option value="PENDING">PENDING</option>
                      </select>
                    </td>

                    <td className="p-4 font-mono text-slate-600">
                      <div>BOSIET: {v.stcwBosietExpiry}</div>
                      <div className="text-slate-400 text-[10px]">Medical: {v.medicalExpiry}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CONTRACTOR PAYSLIPS & REMITTANCE */}
      {activeTab === "PAYSLIPS" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Contractor Payslips &amp; Bank Remittance Statements</h2>
            <span className="font-mono text-xs text-slate-500">Automated timesheet day-rate payout engine</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {MOCK_PAYSLIPS.map((ps) => (
              <div
                key={ps.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:border-[#07142F] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-xs font-black text-[#07142F] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                        {ps.payslipNumber}
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-900 mt-2">{ps.specialistName}</h3>
                      <span className="text-xs text-slate-600 font-medium block">{ps.roleTitle}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        {ps.status}
                      </span>
                      <span className="block font-mono text-lg font-black text-[#07142F] mt-1">
                        ${ps.netPay.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Field Campaign:</span>
                      <span className="font-bold text-slate-900">{ps.projectName}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Timesheet Period:</span>
                      <span className="font-mono text-slate-900">{ps.periodStart} to {ps.periodEnd}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Offshore Days Worked:</span>
                      <span className="font-mono font-bold text-slate-900">{ps.daysWorked} Days @ ${ps.dayRate}/day</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-mono text-slate-400">Bank Wire Target:</span>
                      <span className="font-mono text-slate-700">{ps.bankSwiftIfsc}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedPayslip(ps)}
                    className="w-full bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase py-2.5 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Contractor Payslip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OFFER LETTER PRINT MODAL */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs p-4 flex justify-center print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:block">
          <div className="printable-pdf-document w-full max-w-3xl rounded-3xl bg-white p-8 space-y-6 text-slate-900 shadow-2xl print:border-none print:shadow-none my-auto print:p-0 print:m-0 print:max-w-full">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 print:hidden">
              <span className="font-mono text-xs font-bold text-[#07142F]">OFFICIAL OFFSHORE SERVICE AGREEMENT</span>
              <button onClick={() => setSelectedOffer(null)} className="p-1 hover:bg-slate-100 rounded">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            {/* Printable Document Body */}
            <div className="space-y-6 text-xs font-sans">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-[#07142F]">SEDES GEOSCIENCES &amp; SUBSEA</h2>
                  <p className="font-mono text-[10px] text-slate-500">Logistics &amp; Crewing Division</p>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-slate-900">{selectedOffer.offerNumber}</span>
                  <p className="text-slate-500">{selectedOffer.mobilizationDate}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">OFFSHORE SERVICE CONTRACT OFFER LETTER</h3>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  Dear <strong>{selectedOffer.specialistName}</strong> (ID: {selectedOffer.specialistId}),
                </p>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  We are pleased to offer you the offshore position of <strong>{selectedOffer.roleTitle}</strong> for the <strong>{selectedOffer.projectName}</strong> campaign operated on behalf of <strong>{selectedOffer.operatorName}</strong>.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 font-mono space-y-2 border border-slate-200 print:bg-white">
                <div className="flex justify-between"><span>Agreed Daily Rate:</span><span className="font-bold">${selectedOffer.agreedDayRate} USD / Day</span></div>
                <div className="flex justify-between"><span>Offshore Per Diem:</span><span className="font-bold">${selectedOffer.perDiemAllowance} USD / Day</span></div>
                <div className="flex justify-between"><span>Assigned Vessel Spread:</span><span className="font-bold">{selectedOffer.vesselName}</span></div>
                <div className="flex justify-between"><span>Expected Field Duration:</span><span className="font-bold">{selectedOffer.expectedDurationDays} Days</span></div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                <div>
                  <p className="font-bold">Capt. Rajesh Varma</p>
                  <p className="text-slate-500 font-mono text-[10px]">Head of Offshore Operations, SEDES</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="print:hidden bg-[#07142F] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Offer Letter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTRACTOR PAYSLIP PRINT MODAL */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs p-4 flex justify-center print:static print:inset-auto print:bg-white print:p-0 print:m-0 print:block">
          <div className="printable-pdf-document w-full max-w-3xl rounded-3xl bg-white p-8 space-y-6 text-slate-900 shadow-2xl print:border-none print:shadow-none my-auto print:p-0 print:m-0 print:max-w-full">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 print:hidden">
              <span className="font-mono text-xs font-bold text-[#07142F]">CONTRACTOR PAYSLIP &amp; REMITTANCE ADVICE</span>
              <button onClick={() => setSelectedPayslip(null)} className="p-1 hover:bg-slate-100 rounded">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-6 text-xs font-sans">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-[#07142F]">SEDES GEOSCIENCES</h2>
                  <p className="font-mono text-[10px] text-slate-500">Contractor Remittance Advice</p>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-slate-900">{selectedPayslip.payslipNumber}</span>
                  <p className="text-slate-500">Disbursement Status: {selectedPayslip.status}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[10px] block">Specialist Details:</span>
                  <p className="font-bold text-slate-900">{selectedPayslip.specialistName}</p>
                  <p className="text-slate-600">{selectedPayslip.specialistId} · {selectedPayslip.roleTitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] block">Period &amp; Campaign:</span>
                  <p className="font-bold text-slate-900">{selectedPayslip.projectName}</p>
                  <p className="text-slate-600">{selectedPayslip.periodStart} to {selectedPayslip.periodEnd}</p>
                </div>
              </div>

              <div className="space-y-2 font-mono">
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span>Basic Day Rate ({selectedPayslip.daysWorked} Days @ ${selectedPayslip.dayRate}/d):</span>
                  <span className="font-bold">${selectedPayslip.grossPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span>Offshore Per Diem Allowance:</span>
                  <span className="font-bold">${selectedPayslip.perDiemBonus.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 text-base font-black text-[#07142F] border-t border-slate-300">
                  <span>Net Disbursed Amount:</span>
                  <span>${selectedPayslip.netPay.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-end font-mono text-[11px] text-slate-600">
                <div>
                  <p>Bank Swift/IFSC: <strong>{selectedPayslip.bankSwiftIfsc}</strong></p>
                  <p>Target Account: <strong>{selectedPayslip.accountNumber}</strong></p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="print:hidden bg-[#07142F] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Remittance Advice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD SPECIALIST VISA RECORD MODAL */}
      {showAddVisaModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs p-4 flex justify-center items-center">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 space-y-6 text-slate-900 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#07142F]">Add Specialist Visa &amp; Clearance Record</h3>
                <p className="text-xs text-slate-500">Track LOI &amp; Seaman CDC clearances for offshore personnel</p>
              </div>
              <button onClick={() => setShowAddVisaModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleAddVisaRecord} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Specialist Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Capt. David Miller"
                  value={newSpecialistName}
                  onChange={(e) => setNewSpecialistName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-sans outline-none focus:ring-2 focus:ring-[#07142F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Passport Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GB98421044"
                    value={newPassport}
                    onChange={(e) => setNewPassport(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 font-mono outline-none focus:ring-2 focus:ring-[#07142F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Seaman Book (CDC) No.</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CDC-UK-88421"
                    value={newCdc}
                    onChange={(e) => setNewCdc(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 font-mono outline-none focus:ring-2 focus:ring-[#07142F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Overseas Country / Region</label>
                <select
                  value={newTargetCountry}
                  onChange={(e) => setNewTargetCountry(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-sans font-medium outline-none focus:ring-2 focus:ring-[#07142F]"
                >
                  <option value="United States (Gulf of Mexico / Houston)">United States (Gulf of Mexico / Houston)</option>
                  <option value="United Kingdom (North Sea / Aberdeen)">United Kingdom (North Sea / Aberdeen)</option>
                  <option value="United Arab Emirates (Abu Dhabi / Offshore)">United Arab Emirates (Abu Dhabi / Offshore)</option>
                  <option value="Saudi Arabia (Arabian Gulf / Ras Tanura)">Saudi Arabia (Arabian Gulf / Ras Tanura)</option>
                  <option value="Angola (Block 32 Deepwater / Luanda)">Angola (Block 32 Deepwater / Luanda)</option>
                  <option value="Nigeria (Bonny Island / Port Harcourt)">Nigeria (Bonny Island / Port Harcourt)</option>
                  <option value="Australia (Browse Basin / Perth)">Australia (Browse Basin / Perth)</option>
                  <option value="Singapore & Malaysia (Malacca Strait)">Singapore &amp; Malaysia (Malacca Strait)</option>
                  <option value="India (Offshore KG Basin / Mumbai High)">India (Offshore KG Basin / Mumbai High)</option>
                  <option value="Brazil (Santos Basin Pre-Salt)">Brazil (Santos Basin Pre-Salt)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Offshore Visa Category / Permit Type</label>
                <select
                  value={newVisaType}
                  onChange={(e) => setNewVisaType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-sans font-medium outline-none focus:ring-2 focus:ring-[#07142F]"
                >
                  <option value="C1/D Seaman Transit & US B1/OECS Visa">C1/D Seaman Transit &amp; US B1/OECS Visa (USA)</option>
                  <option value="UK Offshore Transit & Frontier Worker">UK Offshore Transit &amp; Frontier Worker (UK/Aberdeen)</option>
                  <option value="UAE Mission Visa & Offshore Pass">UAE Mission Visa &amp; Offshore Pass (UAE)</option>
                  <option value="Saudi Aramco Offshore Gate Pass & Work Permit">Saudi Aramco Offshore Gate Pass (Saudi Arabia)</option>
                  <option value="Angolan Offshore Work Permit (TWP)">Angolan Offshore Work Permit TWP (Angola)</option>
                  <option value="Nigeria TWP & STR Immigration Visa">Nigeria TWP &amp; STR Visa (Nigeria)</option>
                  <option value="Australia Subclass 400 Short Stay Specialist">Australia Subclass 400 Specialist (Australia)</option>
                  <option value="Indian Business & Project Visa (Offshore)">Indian Business &amp; Project Visa (India)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddVisaModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-[#07142F] hover:bg-slate-800 shadow"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
