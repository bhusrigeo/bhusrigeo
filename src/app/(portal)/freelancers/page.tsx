"use client";

import { useState } from "react";
import { MOCK_FREELANCERS } from "@/lib/mockData";
import { AvailabilityStatus, SpecialistRecord } from "@/types/domain";
import { AiRosterMatcher } from "@/components/ai/AiRosterMatcher";
import { money } from "@/lib/finance/currency";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Briefcase,
  Award,
  FileCheck,
  UserCheck,
  Building2,
  MapPin,
  X
} from "lucide-react";

export default function FreelancersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistRecord | null>(null);

  const filteredSpecialists = (MOCK_FREELANCERS || []).filter((s) => {
    if (!s || !s.specialistId) return false;
    const matchesSearch =
      (s.specialistId?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (s.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (s.roleTitle?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (s.certifications || []).some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const availableCount = (MOCK_FREELANCERS || []).filter((s) => s && s.status === "AVAILABLE").length;
  const deployedCount = (MOCK_FREELANCERS || []).filter((s) => s && s.status === "DEPLOYED").length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#07142F] font-bold mb-1">
            <Users className="h-4 w-4 text-[#07142F]" />
            Offshore Specialist &amp; Freelancer Roster Database
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Specialist Roster &amp; Crewing Operations
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Managing hydrographic party chiefs, geophysicists, CPT leads, ROV pilots, and client representatives.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 font-mono text-xs">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 font-bold text-emerald-800">
            <span className="block text-lg text-emerald-700">{availableCount} Available</span>
            <span className="text-[10px] uppercase text-emerald-600 font-semibold">Ready for Mobilization</span>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 font-bold text-amber-800">
            <span className="block text-lg text-amber-700">{deployedCount} Deployed</span>
            <span className="text-[10px] uppercase text-amber-600 font-semibold">Mobilized in Field</span>
          </div>
        </div>
      </div>

      {/* AI Smart Roster Matcher Widget */}
      <AiRosterMatcher />

      {/* Roster Controls: Search & Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID (e.g. SED-HYD-042), Name, Role, or Certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-2 text-xs font-mono text-slate-900 focus:border-[#07142F] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-slate-500 font-bold uppercase">Status Filter:</span>
          {["ALL", "AVAILABLE", "DEPLOYED", "STANDBY"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 font-bold uppercase transition-all ${
                statusFilter === st
                  ? "bg-[#07142F] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Specialist Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSpecialists.map((specialist) => (
          <div
            key={specialist.id}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl hover:border-[#07142F] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-black text-[#07142F] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
                    {specialist.specialistId}
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 mt-2">{specialist.fullName}</h3>
                  <span className="text-xs font-semibold text-slate-600 block">{specialist.roleTitle}</span>
                </div>
                <span
                  className={`font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                    specialist.status === "AVAILABLE"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : specialist.status === "DEPLOYED"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {specialist.status}
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs font-sans">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-mono text-slate-400">Experience:</span>
                  <span className="font-bold text-slate-900">{specialist.yearsExperience} Years Offshore</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-mono text-slate-400">Hub Base:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#00A3E0]" />
                    {specialist.hubLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-mono text-slate-400">Day Rate:</span>
                  <span className="font-mono font-extrabold text-[#07142F]">
                    ${specialist.dayRateUsd} <span className="text-slate-400 font-normal">({money(specialist.dayRateInr, "INR")})</span>
                  </span>
                </div>
              </div>

              {/* Certifications List */}
              <div className="space-y-1.5 pt-1">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                  Offshore Certifications:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(specialist.certifications || []).map((cert, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-700"
                    >
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Project Deployment */}
              {specialist.currentProject && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs">
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-800 block">
                    Active Deployment Scope:
                  </span>
                  <span className="font-bold text-amber-900 block mt-0.5">{specialist.currentProject}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => setSelectedSpecialist(specialist)}
                className="w-full border border-slate-300 bg-white hover:bg-[#07142F] hover:text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all"
              >
                Inspect Specialist Record
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Specialist Record Drawer Modal */}
      {selectedSpecialist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#07142F] bg-slate-100 px-2.5 py-1 rounded">
                    {selectedSpecialist.specialistId}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {selectedSpecialist.status}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mt-2">{selectedSpecialist.fullName}</h2>
                <span className="text-sm font-semibold text-slate-600">{selectedSpecialist.roleTitle}</span>
              </div>
              <button
                onClick={() => setSelectedSpecialist(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-xs font-sans">
              <div className="rounded-xl bg-slate-50 p-4 space-y-2 border border-slate-200">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Contact Information</span>
                <p className="font-mono text-slate-800">Email: {selectedSpecialist.email}</p>
                <p className="font-mono text-slate-800">Phone: {selectedSpecialist.phone}</p>
                <p className="font-mono text-slate-800">Hub Base: {selectedSpecialist.hubLocation}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 space-y-2 border border-slate-200">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Commercial Day Rates</span>
                <p className="font-mono text-lg font-black text-[#07142F]">${selectedSpecialist.dayRateUsd} / Day (USD)</p>
                <p className="font-mono text-slate-600">{money(selectedSpecialist.dayRateInr, "INR")} / Day (INR)</p>
              </div>
            </div>

            {/* Software Skills */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase text-slate-600 block">Software &amp; System Competencies:</span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedSpecialist.softwareSkills || []).map((sk, i) => (
                  <span key={i} className="rounded bg-sky-50 border border-sky-200 px-2.5 py-1 text-xs font-mono font-bold text-sky-800">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Historical Offshore Project Log */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase text-slate-600 block">
                Offshore Project &amp; Campaign History:
              </span>
              <div className="space-y-2">
                {(selectedSpecialist.projectHistory || []).map((hp, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-3 text-xs flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-900">{hp.projectName}</h4>
                      <span className="text-slate-500 font-mono text-[11px]">Operator: {hp.operator} · Role: {hp.role}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                      {hp.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSpecialist(null)}
                className="bg-[#07142F] text-white font-bold text-xs uppercase px-6 py-2.5 rounded-xl"
              >
                Close Record View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
