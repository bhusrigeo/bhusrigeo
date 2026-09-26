"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("info@bhusrigeo.com");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
        setAuthError(data.error || "Authentication failed. Please verify credentials.");
        setIsLoggingIn(false);
        return;
      }

      setAuthSuccess(true);
      setTimeout(() => {
        setIsLoggingIn(false);
        router.push("/portal");
      }, 500);
    } catch (err: any) {
      setAuthError(err.message || "Security Gateway Error");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07142F] text-white flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Subtle Background Radial Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Branding */}
      <div className="relative z-10 pt-8 pb-4 text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white shadow-2xl ring-2 ring-white/30 mb-4">
          <img
            src="/bhusri-logo.png"
            alt="BHUSRI Geosciences & Engineering Solutions"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Professional Login Card */}
      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 border border-sky-400/30 bg-sky-500/10 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-sky-300 uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
              <span>Restricted Executive Gateway</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Single Sign-On Authentication
            </h1>
            <p className="text-xs text-slate-300 font-sans">
              Authorized Single-User Executive Access for <br />
              <strong className="text-white">BHUSRI GEOSCIENCES PRIVATE LIMITED</strong>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            {authError && (
              <div className="p-3.5 rounded-xl border border-red-500/40 bg-red-950/50 text-xs font-mono text-red-200 flex items-center gap-2 backdrop-blur-md">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/50 text-xs font-mono text-emerald-200 flex items-center gap-2 backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Session Verified! Redirecting to Executive Portal...</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="info@bhusrigeo.com"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-mono text-white placeholder-slate-400 focus:border-sky-400 focus:bg-white/20 focus:outline-none transition-all shadow-inner"
                />
                <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-mono text-white placeholder-slate-400 focus:border-sky-400 focus:bg-white/20 focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-white text-[#07142F] hover:bg-slate-100 font-black text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-[#07142F] border-t-transparent animate-spin" />
                    <span>Verifying Credentials...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-[#07142F]" />
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight className="h-4 w-4 text-[#07142F]" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[11px] font-mono text-slate-400">
              Authorized Single-Admin Access · <span className="text-emerald-400 font-bold">256-Bit TLS Encrypted</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="relative z-10 pb-6 text-center text-xs text-slate-400 font-mono space-y-1">
        <p>BHUSRI GEOSCIENCES &amp; ENGINEERING SOLUTIONS PRIVATE LIMITED</p>
        <p className="text-[11px] text-slate-500">
          Strictly for authorized executive personnel. All access attempts logged.
        </p>
      </div>
    </div>
  );
}
