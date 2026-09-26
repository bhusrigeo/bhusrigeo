"use client";

import { useState, useEffect } from "react";
import { DEFAULT_COMPANY_PROFILE, MOCK_OPERATIONAL_HUBS } from "@/lib/mockData";
import { CompanyProfile, OperationalHub } from "@/types/domain";
import { Building2, Save, CheckCircle2, ShieldCheck, FileText, Globe, Mail, Phone, MapPin, Award, RefreshCw, Plus, Trash2, Edit3, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCompanyProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile>(DEFAULT_COMPANY_PROFILE);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [certInput, setCertInput] = useState<string>("");

  // Operational Hubs State
  const [hubs, setHubs] = useState<OperationalHub[]>(MOCK_OPERATIONAL_HUBS);
  const [editingHubId, setEditingHubId] = useState<string | null>(null);
  const [showAddHubModal, setShowAddHubModal] = useState<boolean>(false);

  // Form state for adding new hub
  const [newCity, setNewCity] = useState<string>("");
  const [newCountry, setNewCountry] = useState<string>("India (East Coast Operations)");
  const [newDomain, setNewDomain] = useState<string>("bhusrimarine.com");
  const [newAddress, setNewAddress] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newFocus, setNewFocus] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    const cachedHubs = localStorage.getItem("bhusri_operational_hubs");
    if (cachedHubs) {
      try {
        setHubs(JSON.parse(cachedHubs));
      } catch (err) {
        console.error("Failed to parse cached hubs", err);
      }
    }
  }, []);

  function saveHubsToStorage(updatedHubs: OperationalHub[]) {
    setHubs(updatedHubs);
    localStorage.setItem("bhusri_operational_hubs", JSON.stringify(updatedHubs));
  }

  function handleAddHub(e: React.FormEvent) {
    e.preventDefault();
    const newHub: OperationalHub = {
      id: `hub-${Date.now()}`,
      city: newCity || "Kakinada Operations Base",
      country: newCountry,
      domain: newDomain,
      address: newAddress || "Port Jetty Complex, Kakinada, AP",
      phone: newPhone || "+91 884 235 9910",
      email: newEmail || "kakinada.ops@bhusrigeo.com",
      focus: newFocus || "KG Basin & Deepwater Logistics",
      image: "/logo-mark.png"
    };

    const updated = [...hubs, newHub];
    saveHubsToStorage(updated);
    setShowAddHubModal(false);
    setNewCity("");
    setNewAddress("");
    setNewPhone("");
    setNewEmail("");
    setNewFocus("");
  }

  function updateHub(id: string, patch: Partial<OperationalHub>) {
    const updated = hubs.map((h) => (h.id === id ? { ...h, ...patch } : h));
    saveHubsToStorage(updated);
  }

  function deleteHub(id: string) {
    const updated = hubs.filter((h) => h.id !== id);
    saveHubsToStorage(updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("bhusri_company_profile", JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  }

  function addCert() {
    if (!certInput.trim()) return;
    setProfile((prev) => ({ ...prev, certifications: [...prev.certifications, certInput.trim()] }));
    setCertInput("");
  }

  function removeCert(idx: number) {
    setProfile((prev) => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== idx) }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#07142F] font-bold mb-1">
            <Building2 className="h-4 w-4 text-[#07142F]" />
            System Governance &amp; Brand Settings
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Admin Company Profile &amp; Global Synchronization
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Manage your corporate identity, GST tax registration, IMCA/ISO certifications, address, contact details, and brand logo.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-xs">
          <RefreshCw className="h-3.5 w-3.5 text-emerald-600 animate-spin" />
          <span>Global Real-Time Sync Active</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Settings Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-[#07142F] flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#07142F]" />
              Corporate Identity &amp; Statutory Registration
            </h3>
          </div>

          {/* Firm Name & Legal Entity */}
          <div className="grid sm:grid-cols-2 gap-4 font-sans text-xs">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
                Firm / Company Name:
              </label>
              <input
                type="text"
                value={profile.firmName}
                onChange={(e) => setProfile({ ...profile, firmName: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-bold text-slate-900 focus:border-[#07142F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
                Legal Entity Description:
              </label>
              <input
                type="text"
                value={profile.legalEntity}
                onChange={(e) => setProfile({ ...profile, legalEntity: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-sans text-slate-900 focus:border-[#07142F] focus:outline-none"
              />
            </div>
          </div>

          {/* GST & CIN */}
          <div className="grid sm:grid-cols-2 gap-4 font-sans text-xs">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
                GST / Tax Registration No:
              </label>
              <input
                type="text"
                value={profile.gstNo}
                onChange={(e) => setProfile({ ...profile, gstNo: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-mono font-bold text-slate-900 focus:border-[#07142F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
                CIN / Corporate Registration No:
              </label>
              <input
                type="text"
                value={profile.cinNo}
                onChange={(e) => setProfile({ ...profile, cinNo: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-mono text-slate-900 focus:border-[#07142F] focus:outline-none"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid sm:grid-cols-3 gap-4 font-sans text-xs">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
                Corporate Email:
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-mono text-slate-900 focus:border-[#07142F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
                Mobile / Phone No:
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-mono text-slate-900 focus:border-[#07142F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
                Website Domain:
              </label>
              <input
                type="text"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-mono text-slate-900 focus:border-[#07142F] focus:outline-none"
              />
            </div>
          </div>

          {/* Headquarters Address */}
          <div>
            <label className="block font-mono text-[11px] font-bold uppercase text-slate-700 mb-1">
              Headquarters Registered Address:
            </label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-sans text-xs text-slate-900 focus:border-[#07142F] focus:outline-none"
            />
          </div>

          {/* Certifications Manager */}
          <div className="space-y-3 pt-2">
            <label className="block font-mono text-[11px] font-bold uppercase text-slate-700">
              Industry Certifications &amp; Standards (Synced to Quotation &amp; Invoice PDFs):
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. IMCA Offshore Hydrographic Certified"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 font-sans text-xs"
              />
              <button
                type="button"
                onClick={addCert}
                className="bg-[#07142F] text-white hover:bg-slate-800 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Add Cert
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {profile.certifications.map((c, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 font-mono text-xs text-slate-800 font-bold"
                >
                  <Award className="h-3.5 w-3.5 text-[#07142F]" />
                  <span>{c}</span>
                  <button
                    type="button"
                    onClick={() => removeCert(idx)}
                    className="text-slate-400 hover:text-rose-600 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {savedSuccess && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 font-mono text-xs text-emerald-800 flex items-center gap-3 font-bold">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>Company Profile &amp; GST Details Saved &amp; Synced Globally Across All Modules!</span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button
              type="submit"
              className="gap-2 bg-[#07142F] text-white hover:bg-slate-800 font-extrabold px-6 py-2.5 shadow-md"
            >
              <Save className="h-4 w-4 text-[#FACC15]" />
              <span>Save &amp; Sync Company Profile</span>
            </Button>
          </div>
        </form>

        {/* Global Synchronization Target Cards */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-slate-900">
            <h3 className="text-base font-extrabold text-[#07142F] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="h-5 w-5 text-[#07142F]" />
              Global Synchronization Destinations
            </h3>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Updating your admin profile instantly synchronizes firm branding, GST registration, and contact information across all output channels:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <FileText className="h-4 w-4 text-[#07142F]" />
                  <span>Invoice PDFs &amp; Billing Remittance</span>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Populates Firm Name, GST No ({profile.gstNo}), Address, and Wire Details on all client invoices.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <FileText className="h-4 w-4 text-[#07142F]" />
                  <span>Quotation PDFs &amp; Email Proposals</span>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Renders corporate letterhead, certifications, and commercial terms in client proposals.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-[#07142F]" />
                  <span>Contractor Offer Letters &amp; Payslips</span>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Applies firm legal entity and contact info on specialist service agreements.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Globe className="h-4 w-4 text-[#07142F]" />
                  <span>Website Home &amp; Footer Section</span>
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Syncs address, email ({profile.email}), and mobile ({profile.phone}) to public website pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OFFSHORE LOGISTICS & REMOTE QC PROCESSING HUBS MANAGER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-6 text-slate-900 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#07142F] font-bold mb-1">
              <MapPin className="h-4 w-4 text-[#07142F]" />
              Website &amp; Operational Hubs Synchronization
            </div>
            <h2 className="text-xl font-extrabold text-[#07142F]">
              Offshore Logistics &amp; Remote QC Processing Hubs Manager
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-sans">
              Manage your deepwater logistics hubs, shore bases (e.g. Kakinada, Mumbai, Houston), domains, contact numbers, and sector focus. Live synced to the public site.
            </p>
          </div>

          <button
            onClick={() => setShowAddHubModal(true)}
            className="bg-[#07142F] text-white hover:bg-slate-800 font-bold text-xs uppercase px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#FACC15]" />
            <span>+ Add New Logistics Hub</span>
          </button>
        </div>

        {/* Hubs Cards Editor Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {hubs.map((hub) => (
            <div
              key={hub.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#07142F] transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                  <div className="w-full">
                    <span className="font-mono text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase block mb-1">
                      {hub.domain}
                    </span>
                    <input
                      type="text"
                      value={hub.city}
                      onChange={(e) => updateHub(hub.id, { city: e.target.value })}
                      className="font-extrabold text-sm text-[#07142F] bg-white border border-slate-200 rounded px-2 py-1 w-full font-sans focus:border-[#07142F] focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => deleteHub(hub.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded ml-2 shrink-0"
                    title="Delete Hub"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs font-sans">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Region / Country:</label>
                    <input
                      type="text"
                      value={hub.country}
                      onChange={(e) => updateHub(hub.id, { country: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono text-[11px] font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Port / Base Address:</label>
                    <input
                      type="text"
                      value={hub.address}
                      onChange={(e) => updateHub(hub.id, { address: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-sans text-xs text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Dispatch Phone:</label>
                      <input
                        type="text"
                        value={hub.phone}
                        onChange={(e) => updateHub(hub.id, { phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono text-[10px] text-slate-800 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase">Ops Email:</label>
                      <input
                        type="text"
                        value={hub.email}
                        onChange={(e) => updateHub(hub.id, { email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono text-[10px] text-blue-700 font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Sector Focus &amp; Operations:</label>
                <input
                  type="text"
                  value={hub.focus}
                  onChange={(e) => updateHub(hub.id, { focus: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 font-mono text-[11px] text-slate-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD NEW LOGISTICS HUB MODAL */}
      {showAddHubModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs p-4 flex justify-center items-center">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 space-y-6 text-slate-900 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#07142F]">Add New Offshore Logistics Base / Hub</h3>
                <p className="text-xs text-slate-500">Configure new shore base, deepwater jetty, or remote processing center</p>
              </div>
              <button onClick={() => setShowAddHubModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleAddHub} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hub Name &amp; Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Visakhapatnam Subsea Support Base"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-sans outline-none focus:ring-2 focus:ring-[#07142F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Region / Sector</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. India (East Coast Deepwater)"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 font-sans outline-none focus:ring-2 focus:ring-[#07142F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operating Domain</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 font-mono outline-none focus:ring-2 focus:ring-[#07142F]"
                  >
                    <option value="bhusrimarine.com">bhusrimarine.com</option>
                    <option value="bhusrigeo.com">bhusrigeo.com</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Base Port Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coastal Jetty Complex, Port Area, Visakhapatnam 530035"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-sans outline-none focus:ring-2 focus:ring-[#07142F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dispatch Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 891 278 4400"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 font-mono outline-none focus:ring-2 focus:ring-[#07142F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ops Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vizag.ops@bhusrigeo.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 font-mono outline-none focus:ring-2 focus:ring-[#07142F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sector Focus</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bay of Bengal, KG-D6 Block, Coromandel Coast"
                  value={newFocus}
                  onChange={(e) => setNewFocus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 font-sans outline-none focus:ring-2 focus:ring-[#07142F]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddHubModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-[#07142F] hover:bg-slate-800 shadow"
                >
                  Save New Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
