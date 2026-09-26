"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Calculator,
  Receipt,
  FileCheck,
  Lock,
  Building2
} from "lucide-react";

export function PortalSidebar() {
  const pathname = usePathname();

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
      badge: "DEMO"
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shadow-xs">
      <div className="space-y-6">
        <div>
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

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 space-y-1">
        <div className="flex items-center justify-between font-medium">
          <span>ERP System</span>
          <span className="text-emerald-700 font-mono font-bold">ONLINE</span>
        </div>
        <p className="text-[11px] text-slate-500 font-mono">Role Auth · Next.js 15</p>
      </div>
    </aside>
  );
}
