"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectKanban } from "@/components/dashboard/ProjectKanban";
import { TelemetryFeed } from "@/components/dashboard/TelemetryFeed";
import { MOCK_PROJECTS, MOCK_INVOICES, MOCK_RFPS, MOCK_FREELANCERS } from "@/lib/mockData";
import { money } from "@/lib/finance/currency";
import { ClientRFP } from "@/types/domain";
import {
  KanbanSquare,
  Calculator,
  Radio,
  Building2,
  TrendingUp,
  Anchor,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Inbox,
  CheckCircle2,
  XCircle,
  Eye,
  UserCheck,
  Plus,
  MapPin,
  FileCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalPage() {
  const [rfps, setRfps] = useState<ClientRFP[]>(MOCK_RFPS);
  const [selectedRfp, setSelectedRfp] = useState<ClientRFP | null>(null);
  const [acceptedToast, setAcceptedToast] = useState<string | null>(null);

  // Mock pending specialist network applicants
  const [pendingApplicants, setPendingApplicants] = useState([
    {
      id: "app-01",
      fullName: "Capt. Jonathan Hayes",
      email: "j.hayes@offshoresurvey.co.uk",
      discipline: "PARTY_CHIEF",
      roleTitle: "Senior Offshore Hydrographic Party Chief",
      yearsExperience: 16,
      hubLocation: "Aberdeen, United Kingdom",
      dayRateUsd: 1250,
      certifications: ["OPITO BOSIET", "OGUK Class 1", "STCW-95 Master 3000 GT", "CARIS HIPS & SIPS"],
      appliedAt: "2026-09-24T11:20:00Z"
    },
    {
      id: "app-02",
      fullName: "Dr. Sandeep Kulkarni",
      email: "sandeep.k@subseageo.in",
      discipline: "PROCESSING_GEOPHYSICIST",
      roleTitle: "Sub-Bottom Profiler & Sparker Geophysicist",
      yearsExperience: 11,
      hubLocation: "Navi Mumbai, India",
      dayRateUsd: 950,
      certifications: ["BOSIET + HUET", "OGUK Medical", "KINGDOM Suite", "DELPH Seismic"],
      appliedAt: "2026-09-25T16:45:00Z"
    }
  ]);

  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);

  const handleAcceptRfp = (rfp: ClientRFP) => {
    setRfps((prev) => prev.filter((r) => r.id !== rfp.id));
    setAcceptedToast(`Client Intake for '${rfp.companyName}' accepted and converted to Project Kanban Stage 1!`);
    setSelectedRfp(null);
    setTimeout(() => setAcceptedToast(null), 4000);
  };

  const handleRejectRfp = (id: string) => {
    setRfps((prev) => prev.filter((r) => r.id !== id));
    setSelectedRfp(null);
  };

  const handleAcceptApplicant = (applicant: any) => {
    setPendingApplicants((prev) => prev.filter((a) => a.id !== applicant.id));
    setAcceptedToast(`Specialist '${applicant.fullName}' approved & added to active roster with status AVAILABLE!`);
    setSelectedApplicant(null);
    setTimeout(() => setAcceptedToast(null), 4000);
  };

  const handleRejectApplicant = (id: string) => {
    setPendingApplicants((prev) => prev.filter((a) => a.id !== id));
    setSelectedApplicant(null);
  };

  const activeAcquisitions = MOCK_PROJECTS.filter(
    (p) => p.stage === "ACQUISITION" || p.stage === "REMOTE_PROCESSING_QC"
  ).length;

  const totalInvoicedInr = MOCK_INVOICES.reduce((sum, inv) => {
    return inv.currency === "INR" ? sum + inv.total : sum + inv.total * 83.45;
  }, 0);

  return (
    <div className="space-y-8 text-[#07142F]">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#07142F] font-extrabold mb-1">
            <Server className="h-4 w-4 text-[#07142F]" />
            ERP Admin Console &amp; Commercial Command
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Executive ERP Portal &amp; Operations Control
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Centralized management of marine survey scopes, telemetry streams, lead RFPs, and multi-currency commercial quotations.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/quotations">
            <Button size="sm" className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 shadow-md cursor-pointer">
              <Calculator className="h-4 w-4" />
              Quotation Engine
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" size="sm" className="gap-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">
              <KanbanSquare className="h-4 w-4 text-[#07142F]" />
              Project Kanban Board
            </Button>
          </Link>
        </div>
      </div>

      {acceptedToast && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-mono font-bold text-emerald-900 flex items-center gap-2.5 shadow-md animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{acceptedToast}</span>
        </div>
      )}

      {/* Key Commercial & Operational Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-xs font-bold uppercase">Active Projects</span>
            <Anchor className="h-4 w-4 text-[#07142F]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900">{activeAcquisitions} Campaigns</div>
          <p className="text-[11px] text-slate-500 font-sans">KG Basin MBES &amp; Offshore Wind CPT</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-xs font-bold uppercase">Pending Client Intakes</span>
            <Building2 className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-600">{rfps.length} Active Intakes</div>
          <p className="text-[11px] text-slate-500 font-sans">Ready for Executive Acceptance</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-xs font-bold uppercase">Pending Specialist Applicants</span>
            <Users className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-sky-600">{pendingApplicants.length} Applicants</div>
          <p className="text-[11px] text-slate-500 font-sans">Specialist Network Applications</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-xs font-bold uppercase">Telemetry Stream Status</span>
            <Radio className="h-4 w-4 text-emerald-600 animate-pulse" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 flex items-center gap-2">
            99.4%
            <span className="text-xs text-emerald-700 font-sans font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">ACTIVE</span>
          </div>
          <p className="text-[11px] text-slate-500 font-sans">Starlink acoustic ping stream</p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* INCOMING CLIENT INTAKES & SPECIALIST APPLICATIONS REVIEW HUB */}
      {/* ------------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Panel 1: Pending Client Intakes (RFPs) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Inbox className="h-5 w-5 text-[#07142F]" />
              <h2 className="font-extrabold text-slate-900 text-base">
                Incoming Client Survey Intakes ({rfps.length})
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
              NEEDS EXECUTIVE ACCEPTANCE
            </span>
          </div>

          {rfps.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              All incoming client survey intakes have been reviewed and accepted!
            </div>
          ) : (
            <div className="space-y-3">
              {rfps.map((rfp) => (
                <div
                  key={rfp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 hover:border-[#07142F] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {rfp.id}
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 mt-1">{rfp.companyName}</h3>
                      <p className="text-xs font-mono text-slate-600">{rfp.contactName} ({rfp.email})</p>
                    </div>
                    <span className="font-mono text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full">
                      {rfp.vesselRequirement}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Location:</span>
                      <span className="font-bold text-slate-800">{rfp.surveyLocation}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Water Depth:</span>
                      <span className="font-bold text-[#07142F]">{rfp.targetWaterDepth} meters</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setSelectedRfp(rfp)}
                      className="flex-1 border border-slate-300 bg-white hover:bg-slate-100 text-[#07142F] font-mono text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Eye className="h-3.5 w-3.5 text-sky-600" />
                      <span>Investigate Details</span>
                    </button>
                    <button
                      onClick={() => handleAcceptRfp(rfp)}
                      className="bg-[#07142F] text-white hover:bg-slate-800 font-mono text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Accept Intake</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel 2: Pending Specialist Network Applicants */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#07142F]" />
              <h2 className="font-extrabold text-slate-900 text-base">
                Pending Specialist Applications ({pendingApplicants.length})
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-full">
              JOIN NETWORK SUBMISSIONS
            </span>
          </div>

          {pendingApplicants.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              All specialist network applications have been audited and approved!
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApplicants.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 hover:border-[#07142F] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        APPLICANT-{app.id}
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 mt-1">{app.fullName}</h3>
                      <p className="text-xs font-semibold text-slate-600">{app.roleTitle}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                      ${app.dayRateUsd}/day
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Experience:</span>
                      <span className="font-bold text-slate-800">{app.yearsExperience} Yrs Offshore</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Hub Location:</span>
                      <span className="font-bold text-[#07142F]">{app.hubLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setSelectedApplicant(app)}
                      className="flex-1 border border-slate-300 bg-white hover:bg-slate-100 text-[#07142F] font-mono text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Eye className="h-3.5 w-3.5 text-sky-600" />
                      <span>Investigate Certs &amp; Bio</span>
                    </button>
                    <button
                      onClick={() => handleAcceptApplicant(app)}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 font-mono text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <UserCheck className="h-3.5 w-3.5 text-white" />
                      <span>Approve Roster</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Telemetry Feed Component */}
      <TelemetryFeed />

      {/* Kanban Quick View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Survey Project Stage Pipeline</h2>
          <Link href="/projects" className="text-xs font-mono text-[#07142F] font-bold hover:underline flex items-center gap-1">
            Full Kanban Board <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <ProjectKanban />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. INVESTIGATE CLIENT INTAKE MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedRfp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  INVESTIGATING INTAKE payload {selectedRfp.id}
                </span>
                <h3 className="text-xl font-extrabold text-[#07142F] mt-1.5">{selectedRfp.companyName}</h3>
              </div>
              <button onClick={() => setSelectedRfp(null)} className="text-slate-400 hover:text-slate-700 p-1">
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Client Contact:</span>
                <p className="font-bold text-slate-900 text-sm">{selectedRfp.contactName}</p>
                <p className="text-sky-700">{selectedRfp.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Survey Location:</span>
                  <span className="font-bold text-slate-900">{selectedRfp.surveyLocation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Target Water Depth:</span>
                  <span className="font-bold text-[#07142F]">{selectedRfp.targetWaterDepth} meters</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Mob Window:</span>
                  <span className="font-bold text-emerald-700">{selectedRfp.mobilizationWindow}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Vessel Spread Req:</span>
                  <span className="font-bold text-slate-800">{selectedRfp.vesselRequirement}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleRejectRfp(selectedRfp.id)}
                className="text-rose-600 hover:bg-rose-50 font-mono text-xs font-bold px-4 py-2 rounded-xl border border-rose-200 cursor-pointer"
              >
                Reject Intake
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedRfp(null)}
                  className="border border-slate-300 font-mono text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleAcceptRfp(selectedRfp)}
                  className="bg-[#07142F] text-white hover:bg-slate-800 font-mono text-xs font-bold px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Accept &amp; Convert to Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. INVESTIGATE SPECIALIST APPLICANT MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                  SPECIALIST NETWORK APPLICANT
                </span>
                <h3 className="text-xl font-extrabold text-[#07142F] mt-1.5">{selectedApplicant.fullName}</h3>
                <span className="text-xs font-semibold text-slate-600 block">{selectedApplicant.roleTitle}</span>
              </div>
              <button onClick={() => setSelectedApplicant(null)} className="text-slate-400 hover:text-slate-700 p-1">
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Contact Email:</span>
                  <span className="font-bold text-slate-900">{selectedApplicant.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Requested Day Rate:</span>
                  <span className="font-bold text-emerald-700">${selectedApplicant.dayRateUsd}/day</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Offshore Experience:</span>
                  <span className="font-bold text-slate-900">{selectedApplicant.yearsExperience} Years</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Hub Location:</span>
                  <span className="font-bold text-slate-900">{selectedApplicant.hubLocation}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Uploaded Safety &amp; STCW Certifications:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApplicant.certifications.map((c: string, idx: number) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded text-[11px] font-bold">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleRejectApplicant(selectedApplicant.id)}
                className="text-rose-600 hover:bg-rose-50 font-mono text-xs font-bold px-4 py-2 rounded-xl border border-rose-200 cursor-pointer"
              >
                Reject Applicant
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="border border-slate-300 font-mono text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleAcceptApplicant(selectedApplicant)}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 font-mono text-xs font-bold px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="h-4 w-4 text-white" />
                  <span>Approve &amp; Add to Roster</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
