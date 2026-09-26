"use client";

import { useState } from "react";
import { MOCK_FREELANCERS } from "@/lib/mockData";
import { SpecialistRecord } from "@/types/domain";
import { Sparkles } from "lucide-react";

export function AiRosterMatcher() {
  const [selectedRequirement, setSelectedRequirement] = useState<string>("mbes_party_chief");
  const [isMatching, setIsMatching] = useState<boolean>(false);

  const presets = [
    {
      id: "mbes_party_chief",
      label: "Deepwater MBES Survey - IMCA Senior Party Chief",
      desc: "Requires IMCA certification, CARIS software skills, and > 10 years offshore experience."
    },
    {
      id: "geohazard_geophysicist",
      label: "Shallow Gas DHI & Sub-bottom Geophysicist",
      desc: "Requires Kingdom/Petrel competency and SEG-Y noise processing expertise."
    },
    {
      id: "cpt_engineer",
      label: "Seabed CPT Geotechnical Specialist",
      desc: "Requires Datem 200kN CPT certification and borehole logging experience."
    },
    {
      id: "client_rep",
      label: "Independent Client Representative",
      desc: "Requires Master Mariner / IMCA Client Rep certification for third-party vessel audits."
    }
  ];

  const handleMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
    }, 400);
  };

  // Mock AI matching engine logic
  const getMatchedSpecialists = (): { specialist: SpecialistRecord; score: number; matchReason: string }[] => {
    const list = MOCK_FREELANCERS || [];
    if (selectedRequirement === "mbes_party_chief") {
      return [
        {
          specialist: list[0],
          score: 98,
          matchReason: "Certified IMCA Party Chief, 14 yrs experience, CARIS & EIVA expert."
        },
        {
          specialist: list[3],
          score: 91,
          matchReason: "Master Mariner / Category A Hydrographer, Client Rep certified."
        }
      ].filter((item) => item.specialist && item.specialist.specialistId);
    } else if (selectedRequirement === "geohazard_geophysicist") {
      return [
        {
          specialist: list[1],
          score: 96,
          matchReason: "Lead Sub-Bottom Geophysicist, Petrel & Kingdom DHI specialist."
        }
      ].filter((item) => item.specialist && item.specialist.specialistId);
    } else if (selectedRequirement === "cpt_engineer") {
      return [
        {
          specialist: list[2],
          score: 99,
          matchReason: "Datem CPT Lead, 12 yrs deepwater CPT & soil mechanics experience."
        }
      ].filter((item) => item.specialist && item.specialist.specialistId);
    } else {
      return [
        {
          specialist: list[3],
          score: 100,
          matchReason: "IMCA Certified Client Rep, Master Mariner, 18 yrs offshore auditing."
        }
      ].filter((item) => item.specialist && item.specialist.specialistId);
    }
  };

  const matches = getMatchedSpecialists();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#07142F] text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">AI Specialist Matchmaker &amp; Roster Recommender</h3>
            <p className="text-xs text-slate-500 font-sans">
              Matches offshore project scopes with qualified freelancers based on role, certifications, and availability.
            </p>
          </div>
        </div>
        <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          AI MODEL ACTIVE
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-12 items-end">
        <div className="md:col-span-8 space-y-1.5">
          <label className="block font-mono text-xs uppercase font-bold text-slate-600">
            Select Active Scope Requirement
          </label>
          <select
            value={selectedRequirement}
            onChange={(e) => {
              setSelectedRequirement(e.target.value);
              handleMatch();
            }}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-900 focus:border-[#07142F] focus:outline-none"
          >
            {presets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4">
          <button
            onClick={handleMatch}
            disabled={isMatching}
            className="w-full bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isMatching ? "Calculating Match..." : "Run AI Matchmaker"}</span>
          </button>
        </div>
      </div>

      {/* AI Recommendation Result List */}
      <div className="space-y-3 pt-2">
        <span className="font-mono text-xs uppercase font-bold text-slate-500 block">
          AI Recommended Specialists ({matches.length} Matches Found):
        </span>

        <div className="grid gap-3 sm:grid-cols-2">
          {matches.map(({ specialist, score, matchReason }) => {
            if (!specialist) return null;
            return (
              <div
                key={specialist.id}
                className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3 hover:border-[#07142F] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-extrabold text-[#07142F] bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {specialist.specialistId}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{specialist.fullName}</h4>
                    <span className="text-xs text-slate-600 font-medium block">{specialist.roleTitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {score}% MATCH
                    </span>
                    <span className="block font-mono text-[10px] text-slate-500 mt-1">${specialist.dayRateUsd}/day</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-sans leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                  <strong className="text-[#07142F]">AI Recommendation:</strong> {matchReason}
                </p>

                <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                  <span className="text-slate-500">{specialist.hubLocation}</span>
                  <span className={`font-bold ${specialist.status === "AVAILABLE" ? "text-emerald-700" : "text-amber-700"}`}>
                    {specialist.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
