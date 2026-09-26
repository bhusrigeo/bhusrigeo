import Link from "next/link";
import { ProjectKanban } from "@/components/dashboard/ProjectKanban";
import { TelemetryFeed } from "@/components/dashboard/TelemetryFeed";
import { MOCK_PROJECTS, MOCK_INVOICES, MOCK_RFPS } from "@/lib/mockData";
import { money } from "@/lib/finance/currency";
import {
  KanbanSquare,
  Calculator,
  Radio,
  Building2,
  TrendingUp,
  Anchor,
  ArrowUpRight,
  ShieldCheck,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalPage() {
  const activeAcquisitions = MOCK_PROJECTS.filter(
    (p) => p.stage === "ACQUISITION" || p.stage === "REMOTE_PROCESSING_QC"
  ).length;

  const totalInvoicedInr = MOCK_INVOICES.reduce((sum, inv) => {
    return inv.currency === "INR" ? sum + inv.total : sum + inv.total * 83.45;
  }, 0);

  return (
    <div className="space-y-8">
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
            <Button size="sm" className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 shadow-md">
              <Calculator className="h-4 w-4" />
              Quotation Engine
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" size="sm" className="gap-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50">
              <KanbanSquare className="h-4 w-4 text-[#07142F]" />
              Project Kanban Board
            </Button>
          </Link>
        </div>
      </div>

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
            <span className="font-mono text-xs font-bold uppercase">Pending Commercial RFPs</span>
            <Building2 className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-600">{MOCK_RFPS.length} Active Leads</div>
          <p className="text-[11px] text-slate-500 font-sans">TotalEnergies &amp; L&amp;T Hydrocarbon</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-mono text-xs font-bold uppercase">YTD Invoiced Volume</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-700">
            {money(totalInvoicedInr, "INR")}
          </div>
          <p className="text-[11px] text-slate-500 font-sans">USD &amp; INR Consolidated Billing</p>
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
    </div>
  );
}
