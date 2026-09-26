"use client";

import { useState } from "react";
import { MOCK_FREELANCERS } from "@/lib/mockData";
import { SpecialistRecord } from "@/types/domain";
import { ShieldCheck, FileCheck, Upload, CheckCircle2, AlertTriangle, Clock, X, FileText, Lock } from "lucide-react";

export function SpecialistDocVerification() {
  const [specialists, setSpecialists] = useState<SpecialistRecord[]>(MOCK_FREELANCERS);
  const [selectedSpecialist, setSelectedSpecialist] = useState<SpecialistRecord | null>(MOCK_FREELANCERS[0]);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);

  // Document verification audit states
  const [passportVerified, setPassportVerified] = useState<boolean>(true);
  const [medicalVerified, setMedicalVerified] = useState<boolean>(true);
  const [bosietVerified, setBosietVerified] = useState<boolean>(true);
  const [visaVerified, setVisaVerified] = useState<boolean>(true);

  const handleSimulateUpload = (docType: string) => {
    setUploadSuccessToast(`${docType} successfully uploaded & SHA-256 verified!`);
    setTimeout(() => {
      setUploadSuccessToast(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold mb-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Offshore Crew Compliance &amp; Document Audit Hub
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Passport, Seaman CDC, OGUK Medical &amp; BOSIET Verification Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Audit mandatory offshore travel &amp; safety credentials prior to client vessel embarkation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            IMCA &amp; STCW-95 Compliant
          </span>
        </div>
      </div>

      {uploadSuccessToast && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-mono font-bold text-emerald-800 flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{uploadSuccessToast}</span>
        </div>
      )}

      {/* Specialist Compliance Matrix Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left List of Specialists */}
        <div className="lg:col-span-4 space-y-3">
          <span className="font-mono text-xs font-bold uppercase text-slate-500 block">
            Deployed &amp; Standby Personnel ({specialists.length})
          </span>
          <div className="space-y-2">
            {specialists.map((sp) => {
              const isSelected = selectedSpecialist?.id === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecialist(sp)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#07142F] text-white border-[#07142F] shadow-lg"
                      : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-[#07142F]"
                      }`}>
                        {sp.specialistId}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        sp.status === "AVAILABLE"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {sp.status}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm mt-1.5">{sp.fullName}</h3>
                    <p className={`text-xs font-sans mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {sp.roleTitle}
                    </p>
                  </div>
                  <FileCheck className={`h-5 w-5 shrink-0 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Compliance Document Audit Center */}
        {selectedSpecialist && (
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#07142F] bg-slate-100 px-2.5 py-1 rounded">
                    {selectedSpecialist.specialistId}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    AUDIT IN PROGRESS
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{selectedSpecialist.fullName}</h3>
                <span className="text-xs font-semibold text-slate-600 block">{selectedSpecialist.roleTitle}</span>
              </div>
            </div>

            {/* Document Verification Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Passport Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-sky-600" /> Passport Bio Page
                  </span>
                  {passportVerified ? (
                    <span className="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                      VERIFIED (VALID 2029)
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
                      EXPIRES &lt; 6 MOS
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-600">Doc No: GB98421044 · Country: United Kingdom</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSimulateUpload("Passport Bio Page")}
                    className="flex-1 border border-slate-300 bg-white hover:bg-slate-100 font-mono text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Upload className="h-3.5 w-3.5 text-sky-600" />
                    <span>Upload New Scan</span>
                  </button>
                </div>
              </div>

              {/* Seaman CDC Book */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <FileCheck className="h-4 w-4 text-purple-600" /> Seaman CDC Book
                  </span>
                  <span className="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-600">CDC No: CDC-UK-88421 · STCW Endorsed</p>
                <button
                  onClick={() => handleSimulateUpload("Seaman Book (CDC)")}
                  className="w-full border border-slate-300 bg-white hover:bg-slate-100 font-mono text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="h-3.5 w-3.5 text-purple-600" />
                  <span>Upload CDC Endorsement</span>
                </button>
              </div>

              {/* OGUK / STCW Offshore Medical */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> OGUK Offshore Medical
                  </span>
                  <span className="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                    CLASS 1 FIT
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-600">Issued by UK Medical Examiner · Valid until Nov 2027</p>
                <button
                  onClick={() => handleSimulateUpload("OGUK Medical Certificate")}
                  className="w-full border border-slate-300 bg-white hover:bg-slate-100 font-mono text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Upload Medical Cert</span>
                </button>
              </div>

              {/* OPITO BOSIET with HUET & CA-EBS */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600" /> OPITO BOSIET + HUET
                  </span>
                  <span className="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                    CERTIFIED
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-600">OPITO Cert ID: OP-984210 · CA-EBS Cleared</p>
                <button
                  onClick={() => handleSimulateUpload("OPITO BOSIET Safety Certificate")}
                  className="w-full border border-slate-300 bg-white hover:bg-slate-100 font-mono text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="h-3.5 w-3.5 text-amber-600" />
                  <span>Upload BOSIET Refresher</span>
                </button>
              </div>
            </div>

            {/* Admin Audit Confirmation Sign-Off */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-500">
                <span>Verification Authority: </span>
                <strong className="text-slate-900">BHUSRI Crewing Operations Compliance Team</strong>
              </div>

              <button
                onClick={() => handleSimulateUpload("Full Specialist Compliance Audit")}
                className="bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Issue Embarkation Compliance Approval</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
