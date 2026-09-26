"use client";

import { useState } from "react";
import { ShieldCheck, UserCheck, Lock, ArrowRight, CheckCircle2, Mail, Server, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("info@bhusrigeo.com");
  const [password, setPassword] = useState<string>("••••••••••••");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.error || "Authentication failed. Please check your admin email.");
        setIsLoggingIn(false);
        return;
      }

      setAuthSuccess(true);
      setTimeout(() => {
        setIsLoggingIn(false);
        router.push("/portal");
      }, 700);
    } catch (err: any) {
      setAuthError(err.message || "Login request error");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid md:grid-cols-12 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Left Side: Single Admin & SMTP Information Panel */}
        <div className="md:col-span-6 bg-[#07142F] text-white p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">
              <ShieldCheck className="h-4 w-4" />
              Single User Executive Admin Auth
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              BHUSRI ERP Single Admin Console
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Authorized Single-User Executive Access for <strong className="text-white">BHUSRI GEOSCIENCES &amp; ENGINEERING SOLUTIONS PRIVATE LIMITED</strong>.
            </p>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-300 uppercase">Single Admin User</span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
                    AUTHORIZED
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-white">
                  <Mail className="h-4 w-4 text-sky-400" />
                  <span>info@bhusrigeo.com</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  SuperAdmin permissions across commercial quotes, PDF invoices, crewing rosters, and project milestones.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase font-bold">SMTP Authentication Gateway:</span>
                  <span className="text-sky-300 font-bold">ACTIVE</span>
                </div>
                <div className="text-[11px] font-mono text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">SMTP Host:</span>
                    <span>smtp.gmail.com (Port 587)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sender Account:</span>
                    <span>info@bhusrigeo.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>256-Bit SSL Single User Auth</span>
            <span className="text-emerald-400 font-bold">BHUSRI ERP SECURE</span>
          </div>
        </div>

        {/* Right Side: Authentication Entry Form */}
        <div className="md:col-span-6 p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/bhusri-logo.png" alt="BHUSRI Logo" className="h-10 w-auto object-contain" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="p-3.5 rounded-xl border border-red-200 bg-red-50 text-xs font-mono text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-mono text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Session Authenticated for info@bhusrigeo.com! Redirecting...</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Single Admin Email (Required)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-mono text-slate-900 focus:border-[#07142F] focus:bg-white focus:outline-none"
                  />
                  <Mail className="absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-600 mb-1">
                  Admin Password / Security Token
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-mono text-slate-900 focus:border-[#07142F] focus:bg-white focus:outline-none"
                  />
                  <Lock className="absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Granted Executive Admin Privileges Box */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500 font-bold uppercase">Executive Level:</span>
                  <span className="font-bold text-[#07142F] bg-slate-200 px-2.5 py-0.5 rounded">
                    SuperAdmin
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Master Privileges Granted:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["FINANCIALS", "INVOICE_PDF", "CREW_VISAS", "PROJECT_APPROVAL", "REMOTE_QC"].map((perm, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-[#07142F] text-white hover:bg-slate-800 font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isLoggingIn ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <span>Log In as info@bhusrigeo.com</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center pt-2">
            <Link href="/portal" className="text-xs font-mono font-bold text-slate-500 hover:text-[#07142F] flex items-center justify-center gap-1">
              <Server className="h-3.5 w-3.5 text-sky-600" />
              <span>Enter Executive ERP Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
