"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Calculator,
  Receipt,
  FileCheck,
  Lock,
  Building2,
  Menu,
  X,
  Radio,
  Compass,
  LogOut
} from "lucide-react";

export function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobilePortalOpen, setMobilePortalOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const links = [
    {
      name: "Executive Console",
      href: "/portal",
      icon: LayoutDashboard,
      badge: "LIVE"
    },
    {
      name: "Survey Projects",
      href: "/projects",
      icon: KanbanSquare,
      count: "3"
    },
    {
      name: "Specialist Roster",
      href: "/freelancers",
      icon: Users,
      badge: "AI MATCH"
    },
    {
      name: "Dual-Margin Quotes",
      href: "/quotations",
      icon: Calculator,
      badge: "EMAIL PDF"
    },
    {
      name: "Visas, Offers & Payslips",
      href: "/contracts",
      icon: FileCheck,
      badge: "NEW"
    },
    {
      name: "Invoices & PDF",
      href: "/invoices",
      icon: Receipt,
      count: "2"
    },
    {
      name: "Admin Firm Profile",
      href: "/admin/profile",
      icon: Building2,
      badge: "SYNC"
    },
    {
      name: "Login Credentials",
      href: "/login",
      icon: Lock,
      badge: "SECURE"
    }
  ];

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. Mobile ERP Navigation Header Bar (Visible on < md) */}
      {/* ------------------------------------------------------------- */}
      <div className="md:hidden w-full border-b border-slate-200 bg-white px-4 py-3 flex items-center justify-between shadow-xs sticky top-20 z-40">
        <div className="flex items-center gap-2">
          <img src="/bhusri-logo.png" alt="BHUSRI Logo" className="h-7 w-auto object-contain" />
          <span className="font-mono text-xs font-black text-[#07142F] uppercase">ERP Menu</span>
        </div>

        <button
          onClick={() => setMobilePortalOpen(!mobilePortalOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono font-bold text-[#07142F] hover:bg-slate-100 cursor-pointer"
        >
          {mobilePortalOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span>{mobilePortalOpen ? "Close Menu" : "Modules"}</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobilePortalOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-start pt-20">
          <div className="bg-white p-5 border-b border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <img src="/bhusri-logo.png" alt="BHUSRI Logo" className="h-8 w-auto object-contain" />
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">Executive Navigation</span>
              </div>
              <button onClick={() => setMobilePortalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1.5">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/portal" && pathname?.startsWith(link.href));
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobilePortalOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#07142F] text-white shadow-md"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Link href="/" onClick={() => setMobilePortalOpen(false)}>
                <button className="w-full border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                  <Compass className="h-4 w-4 text-[#07142F]" />
                  <span>Return to Corporate Website</span>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-mono text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-rose-600" />
                <span>Sign Out / Terminate 2FA Session</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Desktop ERP Fixed Sidebar (Visible on >= md) */}
      {/* ------------------------------------------------------------- */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-5rem)] p-4 flex-col justify-between shadow-xs">
        <div className="space-y-6">
          <div>
            <div className="px-3 mb-4 flex items-center">
              <img src="/bhusri-logo.png" alt="BHUSRI Logo" className="h-9 w-auto object-contain" />
            </div>
            <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2">
              BHUSRI ERP Control
            </p>
            <nav className="space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/portal" && pathname?.startsWith(link.href));
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#07142F] text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    {link.count && (
                      <span className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        {link.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2">
              Vessel Telemetry Stream
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Chartered Vessel</span>
                <span className="font-mono text-slate-900 font-bold">RV Pacific Explorer</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Acoustic Stream</span>
                <span className="flex items-center gap-1 text-emerald-700 font-mono font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  300 kHz (99.4%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Water Depth</span>
                <span className="font-mono text-[#07142F] font-bold">1,420.5m</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-medium">
              <span>ERP System</span>
              <span className="text-emerald-700 font-mono font-bold">ONLINE</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Role Auth · Next.js 15</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-mono text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <LogOut className="h-3.5 w-3.5 text-rose-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
