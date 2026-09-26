"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, KeyRound, RefreshCw, ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";

function maskEmailAddress(emailStr: string) {
  if (!emailStr || !emailStr.includes("@")) return "your registered email";
  const [name, domain] = emailStr.split("@");
  if (name.length <= 2) return `${name[0]}*@${domain}`;
  return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 2))}@${domain}`;
}

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [mailSent, setMailSent] = useState<boolean>(false);
  const [maskedEmail, setMaskedEmail] = useState<string>("");
  const [fallbackOtp, setFallbackOtp] = useState<string | null>(null);
  const [smtpNotice, setSmtpNotice] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Step 1: Send OTP via SMTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, action: "send-otp" })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.error || "Authentication failed. Please verify email & password credentials.");
        setIsLoading(false);
        return;
      }

      setOtpToken(data.otpToken || null);
      setExpiresAt(data.expiresAt || null);
      setMailSent(!!data.mailSent);
      setMaskedEmail(data.maskedEmail || maskEmailAddress(email));
      setFallbackOtp(data.fallbackOtp || null);
      setSmtpNotice(data.message || null);

      if (data.fallbackOtp) {
        setOtp(data.fallbackOtp);
      } else {
        setOtp("");
      }

      setStep("otp");
      setIsLoading(false);
    } catch (err: any) {
      setAuthError(err.message || "Security Gateway Connection Error");
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          otp,
          otpToken,
          expiresAt,
          action: "verify-otp"
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.error || "Invalid 6-digit OTP code entered. Please check your email inbox.");
        setIsLoading(false);
        return;
      }

      setAuthSuccess("2FA Security Verification Successful! Opening Executive Portal...");
      setTimeout(() => {
        setIsLoading(false);
        router.push("/portal");
      }, 600);
    } catch (err: any) {
      setAuthError(err.message || "OTP Verification Error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07142F] text-white flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Branding */}
      <div className="relative z-10 pt-8 pb-4 text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white shadow-2xl ring-2 ring-white/30 mb-2">
          <img
            src="/bhusri-logo.png"
            alt="BHUSRI Geosciences & Engineering Solutions"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 border border-sky-400/30 bg-sky-500/10 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-sky-300 uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
              <span>Restricted Executive Gateway</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {step === "credentials" ? "Single Sign-On Authentication" : "2FA Email OTP Verification"}
            </h1>
            <p className="text-xs text-slate-300 font-sans">
              Authorized Executive Access for <br />
              <strong className="text-white">BHUSRI GEOSCIENCES PRIVATE LIMITED</strong>
            </p>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="p-3.5 rounded-xl border border-red-500/40 bg-red-950/50 text-xs font-mono text-red-200 flex items-center gap-2 backdrop-blur-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Success Banner */}
          {authSuccess && (
            <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/50 text-xs font-mono text-emerald-200 flex items-center gap-2 backdrop-blur-md">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* OTP Dispatched Info Banner */}
          {step === "otp" && !authError && !authSuccess && (
            <div className={`p-3.5 rounded-xl border text-xs font-mono backdrop-blur-md flex items-start gap-2.5 ${
              mailSent ? "border-emerald-400/40 bg-emerald-950/40 text-emerald-200" : "border-sky-400/40 bg-sky-950/50 text-sky-200"
            }`}>
              <Send className={`h-4 w-4 shrink-0 mt-0.5 ${mailSent ? "text-emerald-400" : "text-sky-400"}`} />
              <div>
                <p className="font-bold text-white">
                  {mailSent ? "6-Digit OTP Dispatched!" : "2FA Security Code Ready"}
                </p>
                <p className="text-[11px] mt-0.5">
                  {mailSent ? (
                    <span>Sent via SMTP to <strong>{maskedEmail}</strong>. Please check your inbox.</span>
                  ) : (
                    <span>{smtpNotice}</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* STEP 1: CREDENTIALS FORM */}
          {step === "credentials" ? (
            <form onSubmit={handleSendOtp} className="space-y-4 pt-2">
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
                    placeholder="admin@company.com"
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
                  disabled={isLoading}
                  className="w-full bg-white text-[#07142F] hover:bg-slate-100 font-black text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-[#07142F] border-t-transparent animate-spin" />
                      <span>Dispatching Email OTP...</span>
                    </span>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 text-[#07142F]" />
                      <span>Send Email OTP Code</span>
                      <ArrowRight className="h-4 w-4 text-[#07142F]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: OTP VERIFICATION FORM */
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                  Enter 6-Digit Email Security OTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="123456"
                    autoFocus
                    className="w-full rounded-xl border border-sky-400/40 bg-white/10 px-4 py-3 text-center font-mono text-xl font-bold tracking-[0.4em] text-white placeholder-slate-500 focus:border-sky-300 focus:bg-white/20 focus:outline-none transition-all shadow-inner"
                  />
                  <KeyRound className="absolute right-3.5 top-3.5 h-5 w-5 text-sky-400" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Sent to {maskedEmail || maskEmailAddress(email)}</span>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-sky-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Resend Code
                  </button>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sky-400 text-[#07142F] hover:bg-sky-300 font-black text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-[#07142F] border-t-transparent animate-spin" />
                      <span>Verifying OTP...</span>
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#07142F]" />
                      <span>Verify OTP &amp; Access Portal</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setAuthError(null);
                  }}
                  className="w-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Credentials</span>
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 text-center">
            <span className="text-[11px] font-mono text-slate-400">
              Authorized Single-Admin Access · <span className="text-emerald-400 font-bold">SMTP 2FA TLS Encrypted</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="relative z-10 pb-6 text-center text-xs text-slate-400 font-mono space-y-1">
        <p>BHUSRI GEOSCIENCES &amp; ENGINEERING SOLUTIONS PRIVATE LIMITED</p>
        <p className="text-[11px] text-slate-500">
          Strictly for authorized executive personnel. All 2FA security events logged.
        </p>
      </div>
    </div>
  );
}
