"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project, ProjectStage } from "@/types/domain";
import { MOCK_PROJECTS } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { money } from "@/lib/finance/currency";
import {
  MapPin,
  Navigation,
  ArrowRight,
  Layers,
  CheckCircle2,
  FileText,
  Plane,
  ShieldCheck,
  Send,
  X,
  CreditCard,
  UserCheck,
  Building2,
  Calendar,
  Plus
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STAGE_PROGRESS_MAP: Record<ProjectStage, number> = {
  TENDER_RFQ: 15,
  REMOTE_PROCESSING_QC: 30,
  MOBILIZATION: 45,
  INTERPRETATION: 60,
  ACQUISITION: 75,
  FINAL_DELIVERY: 90,
  INVOICED_CLOSED: 100
};

const STAGES: { id: ProjectStage; label: string; stepNum: number; color: string }[] = [
  { id: "TENDER_RFQ", label: "1. RFP / Lead Chase", stepNum: 1, color: "border-slate-300" },
  { id: "REMOTE_PROCESSING_QC", label: "2. Staff Quote & Scope", stepNum: 2, color: "border-blue-300" },
  { id: "MOBILIZATION", label: "3. Master Agreement (MSA)", stepNum: 3, color: "border-purple-300" },
  { id: "INTERPRETATION", label: "4. Medical & Visa Process", stepNum: 4, color: "border-amber-300" },
  { id: "ACQUISITION", label: "5. Flight & Crew Delivery (30% Mob)", stepNum: 5, color: "border-sky-300" },
  { id: "FINAL_DELIVERY", label: "6. Demob & Processing (20% Demob)", stepNum: 6, color: "border-emerald-300" },
  { id: "INVOICED_CLOSED", label: "7. Final Handover & 100% Paid", stepNum: 7, color: "border-slate-300" }
];

export function ProjectKanban() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Stage Update Feedback State
  const [stageToast, setStageToast] = useState<string | null>(null);

  // Create New Project Modal Form State
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newClientName, setNewClientName] = useState<string>("ONGC Deepwater Operations");
  const [newTaxonomy, setNewTaxonomy] = useState<any>("GEOHAZARD_RIG_CLEARANCE");
  const [newCurrency, setNewCurrency] = useState<"USD" | "INR">("USD");
  const [newContractValue, setNewContractValue] = useState<number>(210000);
  const [newLocation, setNewLocation] = useState<string>("KG Basin Block 98/2, Bay of Bengal");
  const [newLatitude, setNewLatitude] = useState<number>(16.4215);
  const [newLongitude, setNewLongitude] = useState<number>(82.3550);
  const [newWaterDepth, setNewWaterDepth] = useState<number>(1420);
  const [newUtmZone, setNewUtmZone] = useState<string>("44N");
  const [newGeodeticDatum, setNewGeodeticDatum] = useState<"WGS84">("WGS84");
  const [newVessel, setNewVessel] = useState<string>("Chartered RV Pacific Explorer");
  const [newMobWindow, setNewMobWindow] = useState<string>("Q4 2026");
  const [newScope, setNewScope] = useState<string>("High-resolution multi-beam bathymetry, shallow acoustic profiling, and geotechnical investigation for deepwater field development.");

  // Modal Interactive States
  const [visaResponsibility, setVisaResponsibility] = useState<"BHUSRI" | "CLIENT">("BHUSRI");
  const [visaUpfrontAmount, setVisaUpfrontAmount] = useState<number>(1200);
  const [flightUpfrontAmount, setFlightUpfrontAmount] = useState<number>(2800);
  const [loiDispatched, setLoiDispatched] = useState<boolean>(false);
  const [loiNotice, setLoiNotice] = useState<boolean>(false);

  // Load projects from localStorage on mount
  useEffect(() => {
    const cachedProjects = localStorage.getItem("bhusri_projects");
    if (cachedProjects) {
      try {
        setProjects(JSON.parse(cachedProjects));
      } catch (err) {
        console.error("Failed to parse cached projects", err);
      }
    }
  }, []);

  function saveProjectsToStorage(updated: Project[]) {
    setProjects(updated);
    localStorage.setItem("bhusri_projects", JSON.stringify(updated));
  }

  const filteredProjects = activeFilter === "ALL"
    ? projects
    : projects.filter((p) => p.currency === activeFilter);

  function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    const newProjNum = `SED-2026-${newCurrency === "USD" ? "KG" : "MUM"}-${Math.floor(10 + Math.random() * 89)}`;
    const newProjectObj: Project = {
      id: `proj-${Date.now()}`,
      projectNumber: newProjNum,
      name: newProjectName || "New Offshore Survey Campaign",
      clientId: "usr-client-new",
      clientName: newClientName,
      stage: "TENDER_RFQ",
      taxonomy: newTaxonomy,
      currency: newCurrency,
      contractValue: newContractValue,
      surveyLocation: newLocation,
      latitude: newLatitude,
      longitude: newLongitude,
      waterDepthMeters: newWaterDepth,
      mobilizationWindow: newMobWindow,
      vesselName: newVessel,
      utmZone: newUtmZone,
      geodeticDatum: newGeodeticDatum,
      scopeDetails: newScope,
      assignedManpower: [
        {
          id: `amp-${Date.now()}-1`,
          specialistId: "SED-HYD-042",
          fullName: "Dr. Alistair Vance",
          roleTitle: "Senior Hydrographic Party Chief",
          discipline: "PARTY_CHIEF",
          passportNumber: "GB98421044",
          seamanBookCdc: "CDC-UK-88421",
          visaStatus: "VISA_APPROVED",
          clientBillingRateDay: newCurrency === "USD" ? 1350 : 95000,
          staffPayRateDay: newCurrency === "USD" ? 950 : 68000,
          daysWorked: 0,
          dailyShiftHours: 12,
          totalDaysPlanned: 21
        },
        {
          id: `amp-${Date.now()}-2`,
          specialistId: "SED-GEO-018",
          fullName: "Priya Sundaram",
          roleTitle: "Lead Processing Geophysicist",
          discipline: "PROCESSING_GEOPHYSICIST",
          passportNumber: "IN77429910",
          seamanBookCdc: "CDC-IN-99120",
          visaStatus: "VISA_APPROVED",
          clientBillingRateDay: newCurrency === "USD" ? 1150 : 85000,
          staffPayRateDay: newCurrency === "USD" ? 820 : 60000,
          daysWorked: 0,
          dailyShiftHours: 12,
          totalDaysPlanned: 21
        }
      ],
      progressPercent: STAGE_PROGRESS_MAP.TENDER_RFQ,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newProjectObj, ...projects];
    saveProjectsToStorage(updated);
    setShowCreateModal(false);
    setSelectedProject(newProjectObj);
    setNewProjectName("");
  }

  function handleStageUpdate(projectId: string, newStage: ProjectStage) {
    const newProgress = STAGE_PROGRESS_MAP[newStage] || 50;
    const stageLabel = STAGES.find((s) => s.id === newStage)?.label || newStage;

    const updated = projects.map((p) =>
      p.id === projectId
        ? { ...p, stage: newStage, progressPercent: newProgress, updatedAt: new Date().toISOString() }
        : p
    );

    saveProjectsToStorage(updated);

    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({
        ...selectedProject,
        stage: newStage,
        progressPercent: newProgress
      });
    }

    setStageToast(`Stage updated to ${stageLabel}! Moved on Kanban Board.`);
    setTimeout(() => {
      setStageToast(null);
    }, 2500);
  }

  function handleSaveMasterProjectSpecs(patch: Partial<Project>) {
    if (!selectedProject) return;

    const updatedProject = { ...selectedProject, ...patch, updatedAt: new Date().toISOString() };
    const updatedList = projects.map((p) => (p.id === selectedProject.id ? updatedProject : p));

    saveProjectsToStorage(updatedList);
    setSelectedProject(updatedProject);

    setStageToast("Survey Specifications & Coordinates Saved!");
    setTimeout(() => {
      setStageToast(null);
    }, 2000);
  }

  function handleUpdateCrewDays(projectId: string, manpowerId: string, daysWorked: number) {
    const updated = projects.map((p) => {
      if (p.id !== projectId || !p.assignedManpower) return p;
      const updatedCrew = p.assignedManpower.map((c) =>
        c.id === manpowerId ? { ...c, daysWorked } : c
      );
      return { ...p, assignedManpower: updatedCrew };
    });

    saveProjectsToStorage(updated);

    if (selectedProject && selectedProject.id === projectId && selectedProject.assignedManpower) {
      const updatedCrew = selectedProject.assignedManpower.map((c) =>
        c.id === manpowerId ? { ...c, daysWorked } : c
      );
      setSelectedProject({ ...selectedProject, assignedManpower: updatedCrew });
    }
  }

  const handleDispatchLoi = (e: React.FormEvent) => {
    e.preventDefault();
    setLoiNotice(true);
    setLoiDispatched(true);
    setTimeout(() => {
      setLoiNotice(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#07142F]" />
            End-to-End Offshore Crewing &amp; Data Processing Lifecycle Pipeline
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            RFP inquiry &rarr; Staff quotation &rarr; Master Agreement (MSA) &rarr; Medical &amp; Visa audit &rarr; Flight ticketing &rarr; Crew vessel delivery (30% Mob) &rarr; Offshore DPR attendance &rarr; Demob (20% Demob) &rarr; Post-processing in India &rarr; Final handover (100% Paid).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowCreateModal(true)}
            size="sm"
            className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 shadow-md cursor-pointer font-bold"
          >
            <Plus className="h-4 w-4 text-[#FACC15]" />
            <span>+ Create New Project</span>
          </Button>

          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 font-mono text-xs">
            {["ALL", "USD", "INR"].map((cur) => (
              <button
                key={cur}
                onClick={() => setActiveFilter(cur)}
                className={`rounded-lg px-3 py-1 font-bold transition-all cursor-pointer ${
                  activeFilter === cur
                    ? "bg-[#07142F] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid gap-4 overflow-x-auto pb-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {STAGES.map((stage) => {
          const stageProjects = filteredProjects.filter(
            (p) => p.stage === stage.id
          );

          return (
            <div
              key={stage.id}
              className="flex min-w-[260px] flex-col rounded-2xl border border-slate-200 bg-slate-100/70 p-3.5 shadow-sm"
            >
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="font-mono text-xs font-extrabold text-slate-800">
                  {stage.label}
                </span>
                <span className="rounded-full bg-white border border-slate-200 px-2.5 py-0.5 font-mono text-[11px] text-sky-700 font-bold shadow-xs">
                  {stageProjects.length}
                </span>
              </div>

              {/* Cards in stage */}
              <div className="space-y-3 flex-1">
                {stageProjects.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center font-mono text-[11px] text-slate-400">
                    No active projects
                  </div>
                ) : (
                  stageProjects.map((project) => (
                    <Card
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group relative border-slate-200 bg-white hover:border-[#07142F] hover:shadow-lg transition-all cursor-pointer"
                    >
                      <CardContent className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-sky-700">
                            {project.projectNumber}
                          </span>
                          <Badge variant={project.currency === "USD" ? "cyan" : "warning"}>
                            {project.currency}
                          </Badge>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#07142F] transition-colors line-clamp-2">
                          {project.name}
                        </h4>

                        <div className="text-[11px] text-slate-500 space-y-1 font-mono">
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                            <span className="truncate">{project.surveyLocation}</span>
                          </div>
                          {project.vesselName && (
                            <div className="flex items-center gap-1.5 text-sky-700 font-semibold">
                              <Navigation className="h-3 w-3 text-sky-600 shrink-0" />
                              <span>{project.vesselName}</span>
                            </div>
                          )}
                        </div>

                        {/* Financial Snapshot */}
                        {(() => {
                          const val = project.contractValue || 185000;
                          return (
                            <div className="rounded-lg bg-slate-50 p-2 font-mono text-[10px] space-y-1 border border-slate-100">
                              <div className="flex justify-between text-slate-600">
                                <span>Contract Total:</span>
                                <span className="font-bold text-slate-900">{money(val, project.currency)}</span>
                              </div>
                              <div className="flex justify-between text-emerald-700 font-bold">
                                <span>Adv. Invoiced:</span>
                                <span>{money(val * 0.25, project.currency)}</span>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Progress Bar */}
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between font-mono text-[10px] text-slate-500">
                            <span>Stage Progress</span>
                            <span className="text-sky-700 font-bold">{project.progressPercent}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/50">
                            <div
                              className="h-full bg-gradient-to-r from-[#07142F] to-sky-600 transition-all"
                              style={{ width: `${project.progressPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#07142F] hover:underline pt-2 border-t border-slate-100">
                          <span>View Full Job Profile &amp; Crew</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Comprehensive Offshore Project Master Control Modal */}
      {/* ------------------------------------------------------------- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto text-slate-900">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#07142F] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded uppercase">
                    {selectedProject.projectNumber}
                  </span>
                  <Badge variant={selectedProject.currency === "USD" ? "cyan" : "warning"}>
                    {selectedProject.currency}
                  </Badge>
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {selectedProject.taxonomy.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#07142F] mt-2">
                  {selectedProject.name}
                </h3>
                <p className="text-xs font-mono text-slate-600 mt-1 flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <Building2 className="h-3.5 w-3.5 text-[#07142F]" />
                    Operator: {selectedProject.clientName}
                  </span>
                  <span>Vessel Spread: <strong>{selectedProject.vesselName || "TBN"}</strong></span>
                  <span>Location: <strong>{selectedProject.surveyLocation}</strong></span>
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* 1. 7-Stage Project Lifecycle Switcher */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-xs font-bold uppercase text-slate-700">
                  1. Project Lifecycle Stage Status:
                </label>
                <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  Progress: {selectedProject.progressPercent}%
                </span>
              </div>

              {stageToast && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-3 text-xs font-mono text-emerald-800 flex items-center gap-2 font-bold animate-pulse">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{stageToast}</span>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 font-mono text-xs">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleStageUpdate(selectedProject.id, s.id)}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                      selectedProject.stage === s.id
                        ? "bg-[#07142F] text-white border-[#07142F] shadow-md ring-2 ring-[#07142F]/20"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-[9px] text-slate-400 font-normal">Step {s.stepNum}</div>
                    <div className="truncate text-[11px]">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Technical Job Profile & Survey Specs (Editable) */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#07142F]" />
                  <h4 className="font-extrabold text-[#07142F] text-sm">
                    2. Complete Technical Job Profile &amp; Survey Specifications
                  </h4>
                </div>
                <span className="font-mono text-xs font-bold text-slate-600">
                  Target Water Depth: {selectedProject.waterDepthMeters || 1420}m
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
                    Technical Scope Description:
                  </label>
                  <textarea
                    rows={2}
                    value={selectedProject.scopeDetails || ""}
                    onChange={(e) => handleSaveMasterProjectSpecs({ scopeDetails: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 font-sans text-xs text-slate-900 outline-none focus:border-[#07142F]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs bg-white p-3 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-0.5">UTM Zone:</label>
                    <input
                      type="text"
                      value={selectedProject.utmZone || "44N"}
                      onChange={(e) => handleSaveMasterProjectSpecs({ utmZone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-bold text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-0.5">Geodetic Datum:</label>
                    <select
                      value={selectedProject.geodeticDatum || "WGS84"}
                      onChange={(e) => handleSaveMasterProjectSpecs({ geodeticDatum: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-bold text-slate-900 text-xs"
                    >
                      <option value="WGS84">WGS84</option>
                      <option value="ED50">ED50</option>
                      <option value="NAD83">NAD83</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-0.5">Latitude (°N):</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={selectedProject.latitude || 16.4215}
                      onChange={(e) => handleSaveMasterProjectSpecs({ latitude: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-bold text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-0.5">Longitude (°E):</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={selectedProject.longitude || 82.3550}
                      onChange={(e) => handleSaveMasterProjectSpecs({ longitude: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-bold text-slate-900 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Chartered Vessel Spread:</label>
                    <input
                      type="text"
                      value={selectedProject.vesselName || ""}
                      onChange={(e) => handleSaveMasterProjectSpecs({ vesselName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold text-[#07142F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Mobilization Window:</label>
                    <input
                      type="text"
                      value={selectedProject.mobilizationWindow || ""}
                      onChange={(e) => handleSaveMasterProjectSpecs({ mobilizationWindow: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Assigned Offshore Manpower Crew & Timesheet Tracker */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-[#07142F] text-sm flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-[#07142F]" />
                    3. Assigned Offshore Specialist Manpower &amp; Daily Work Hours
                  </h4>
                  <span className="text-xs text-slate-500 font-sans">
                    Track present days worked offshore, daily shift hours, agreed billing rates vs staff pay rates.
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {selectedProject.assignedManpower?.length || 0} Specialists Deployed
                </span>
              </div>

              {!selectedProject.assignedManpower || selectedProject.assignedManpower.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center font-mono text-xs text-slate-500">
                  No manpower crew assigned yet to this campaign.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#07142F] text-white font-mono text-[11px] uppercase">
                      <tr>
                        <th className="p-3">Specialist Name &amp; Role</th>
                        <th className="p-3">Passport &amp; CDC</th>
                        <th className="p-3">Shift Hours</th>
                        <th className="p-3">Present Days Worked</th>
                        <th className="p-3">Client Billing Rate</th>
                        <th className="p-3">Staff Pay Rate</th>
                        <th className="p-3">Total Billed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono">
                      {selectedProject.assignedManpower.map((crew) => {
                        const totalBilled = crew.daysWorked * crew.clientBillingRateDay;
                        const totalCost = crew.daysWorked * crew.staffPayRateDay;

                        return (
                          <tr key={crew.id} className="hover:bg-slate-50">
                            <td className="p-3 font-sans">
                              <div className="font-bold text-slate-900">{crew.fullName}</div>
                              <span className="text-[11px] text-slate-500 font-mono font-medium block">
                                {crew.roleTitle} ({crew.specialistId})
                              </span>
                            </td>
                            <td className="p-3 text-[11px]">
                              <div>Pass: {crew.passportNumber}</div>
                              <div className="text-slate-500 text-[10px]">CDC: {crew.seamanBookCdc}</div>
                            </td>
                            <td className="p-3">
                              <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                                {crew.dailyShiftHours} Hrs/Day
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  max={ crew.totalDaysPlanned }
                                  value={crew.daysWorked}
                                  onChange={(e) =>
                                    handleUpdateCrewDays(
                                      selectedProject.id,
                                      crew.id,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-16 rounded border border-slate-300 bg-white p-1 font-bold text-center text-slate-900"
                                />
                                <span className="text-slate-500 text-[11px]">/ {crew.totalDaysPlanned} Days</span>
                              </div>
                            </td>
                            <td className="p-3 font-bold text-[#07142F]">
                              ${crew.clientBillingRateDay}/d
                            </td>
                            <td className="p-3 text-slate-600">
                              ${crew.staffPayRateDay}/d
                            </td>
                            <td className="p-3 font-extrabold text-emerald-800">
                              ${totalBilled.toLocaleString()}
                              <span className="block text-[10px] text-slate-400 font-normal">
                                (Cost: ${totalCost.toLocaleString()})
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 4. Commercial Upfront Advance & LOI Controller */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#07142F]" />
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    4. Upfront Advance Billing &amp; Visa Logistics Policy
                  </h4>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  BHUSRI Commercial Rule
                </span>
              </div>

              {/* Visa Responsibility Toggle */}
              <div className="space-y-2 font-sans text-xs">
                <span className="font-mono text-[11px] font-bold text-slate-600 uppercase block">
                  Visa &amp; Flight Ticket Responsibility:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisaResponsibility("BHUSRI")}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      visaResponsibility === "BHUSRI"
                        ? "bg-white border-[#07142F] shadow-sm ring-2 ring-[#07142F]/10"
                        : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900">BHUSRI Processes Visas &amp; Flights</div>
                      <div className="text-[11px] text-slate-500 font-mono">Bill Upfront Advance to Client</div>
                    </div>
                    {visaResponsibility === "BHUSRI" && <CheckCircle2 className="h-4 w-4 text-[#07142F]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisaResponsibility("CLIENT")}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      visaResponsibility === "CLIENT"
                        ? "bg-white border-[#07142F] shadow-sm ring-2 ring-[#07142F]/10"
                        : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900">Client Handles Visas Directly</div>
                      <div className="text-[11px] text-slate-500 font-mono">No Upfront Visa Fee Added</div>
                    </div>
                    {visaResponsibility === "CLIENT" && <CheckCircle2 className="h-4 w-4 text-[#07142F]" />}
                  </button>
                </div>
              </div>

              {/* Advance Calculation Summary */}
              {(() => {
                const contractVal = selectedProject.contractValue || 185000;
                const mobAdv = contractVal * 0.25;
                const visaFlightCosts = visaResponsibility === "BHUSRI" ? (visaUpfrontAmount + flightUpfrontAmount) * 3 : 0;
                const totalAdvance = mobAdv + visaFlightCosts;

                return (
                  <div className="rounded-xl bg-white p-4 border border-slate-200 font-mono text-xs space-y-2">
                    <div className="flex justify-between font-bold text-slate-800 border-b border-slate-100 pb-1">
                      <span>Advance Invoice Component</span>
                      <span>Amount ({selectedProject.currency})</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>• Mobilization Advance Deposit (25%):</span>
                      <span>{money(mobAdv, selectedProject.currency)}</span>
                    </div>

                    {visaResponsibility === "BHUSRI" && (
                      <div className="flex justify-between text-slate-600">
                        <span>• Upfront Offshore Visas &amp; Flight Tickets Advance:</span>
                        <span>{money(visaFlightCosts, selectedProject.currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-extrabold text-[#07142F] text-sm border-t border-slate-200 pt-2">
                      <span>TOTAL UPFRONT ADVANCE INVOICE:</span>
                      <span>{money(totalAdvance, selectedProject.currency)}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedProject(null)}
                className="border border-slate-300 text-slate-700 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-100 text-xs"
              >
                Close Window
              </button>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleDispatchLoi}
                  disabled={loiDispatched}
                  className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 font-extrabold text-xs"
                >
                  <Send className="h-3.5 w-3.5 text-[#FACC15]" />
                  <span>{loiDispatched ? "LOI Letter Dispatched" : "Dispatch LOI Request Letter"}</span>
                </Button>

                <Link href={`/invoices`} className="inline-block">
                  <Button className="gap-2 bg-[#00A3E0] text-white hover:bg-sky-600 font-bold text-xs">
                    <FileText className="h-3.5 w-3.5" />
                    View Commercial Invoices
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Create New Offshore Project Modal */}
      {/* ------------------------------------------------------------- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-2xl space-y-6 text-slate-900 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#07142F]">Launch New Offshore Survey Campaign</h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Create new project, assign survey specs, vessel spread, and initial specialist manpower.
                </p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                  Project Campaign Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KG-DWN-98/2 Phase 3 Pipeline Alignment & Bathymetry"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 font-bold text-slate-900 outline-none focus:border-[#07142F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Client / Operator Name
                  </label>
                  <select
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-3 font-sans font-bold text-slate-900 outline-none focus:border-[#07142F]"
                  >
                    <option value="ONGC Deepwater Operations">ONGC Deepwater Operations</option>
                    <option value="TotalEnergies E&P USA">TotalEnergies E&P USA</option>
                    <option value="L&T Hydrocarbon Engineering">L&T Hydrocarbon Engineering</option>
                    <option value="Fugro Subsea Services">Fugro Subsea Services</option>
                    <option value="Shell Offshore Inc.">Shell Offshore Inc.</option>
                    <option value="Subsea7 Global Crewing">Subsea7 Global Crewing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Survey Technical Taxonomy
                  </label>
                  <select
                    value={newTaxonomy}
                    onChange={(e) => setNewTaxonomy(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-3 font-sans font-bold text-slate-900 outline-none focus:border-[#07142F]"
                  >
                    <option value="GEOHAZARD_RIG_CLEARANCE">Geohazard &amp; Rig-Site Clearance</option>
                    <option value="HIGH_RES_GEOPHYSICAL_HYDROGRAPHIC">High-Res Geophysical &amp; Hydrographic</option>
                    <option value="PIPELINE_CABLE_ROUTE">Pipeline &amp; Cable Route Survey</option>
                    <option value="IMR_POST_LAY">IMR &amp; Post-Lay Inspection</option>
                    <option value="BENTHIC_ENVIRONMENTAL_BASELINE">Benthic Environmental Baseline</option>
                    <option value="UXO_TARGET_CLEARANCE">UXO Target Clearance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Contract Currency
                  </label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-300 p-3 font-mono font-bold text-slate-900 outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Contract Total Value
                  </label>
                  <input
                    type="number"
                    required
                    value={newContractValue}
                    onChange={(e) => setNewContractValue(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 p-3 font-mono font-bold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Water Depth (m)
                  </label>
                  <input
                    type="number"
                    required
                    value={newWaterDepth}
                    onChange={(e) => setNewWaterDepth(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 p-3 font-mono text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Survey Location &amp; Offshore Block
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KG Basin Block 98/2, Bay of Bengal"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-3 font-sans text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Chartered Vessel Spread
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chartered RV Pacific Explorer"
                    value={newVessel}
                    onChange={(e) => setNewVessel(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-3 font-sans text-slate-900 outline-none"
                  />
                </div>
              </div>

              {/* Explicit Coordinates & Geodetic Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[10px] uppercase">
                    Latitude (°N)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newLatitude}
                    onChange={(e) => setNewLatitude(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 font-mono font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[10px] uppercase">
                    Longitude (°E)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newLongitude}
                    onChange={(e) => setNewLongitude(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 font-mono font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[10px] uppercase">
                    UTM Zone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 44N"
                    value={newUtmZone}
                    onChange={(e) => setNewUtmZone(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 font-mono font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-[10px] uppercase">
                    Geodetic Datum
                  </label>
                  <select
                    value={newGeodeticDatum}
                    onChange={(e) => setNewGeodeticDatum(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 font-mono font-bold text-slate-900"
                  >
                    <option value="WGS84">WGS84</option>
                    <option value="ED50">ED50</option>
                    <option value="NAD83">NAD83</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                  Mobilization Window
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 2026 / Immediate"
                  value={newMobWindow}
                  onChange={(e) => setNewMobWindow(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 font-sans text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                  Technical Scope Details
                </label>
                <textarea
                  rows={3}
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 font-sans text-slate-900 outline-none text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-extrabold text-white bg-[#07142F] hover:bg-slate-800 shadow-md"
                >
                  Create &amp; Launch Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

