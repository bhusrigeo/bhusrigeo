"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, ArrowRight, Radio, Lock, Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isPortal = pathname?.startsWith("/portal") || pathname?.startsWith("/projects") || pathname?.startsWith("/quotations") || pathname?.startsWith("/invoices") || pathname?.startsWith("/contracts") || pathname?.startsWith("/freelancers") || pathname?.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/15 bg-[#07142F]/95 backdrop-blur-xl text-white shadow-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Official BHUSRI Logo Header Badge */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative flex items-center justify-center px-3 py-1.5 sm:px-3.5 rounded-xl bg-white shadow-xl ring-2 ring-white/30 group-hover:bg-slate-50 group-hover:scale-[1.02] transition-all duration-300 max-h-14">
            <img
              src="/bhusri-logo.png"
              alt="BHUSRI Geosciences & Engineering Solutions"
              className="h-9 sm:h-12 w-auto max-w-[180px] sm:max-w-[260px] object-contain transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation Items */}
        {!isPortal ? (
          <nav className="hidden md:flex items-center gap-9 text-sm font-medium tracking-wide">
            <Link
              href="/"
              className={`transition-colors py-1 hover:text-white ${
                pathname === "/" ? "text-white font-bold border-b-2 border-white" : "text-slate-300"
              }`}
            >
              Industries &amp; Overview
            </Link>
            <Link
              href="/services"
              className={`transition-colors py-1 hover:text-white ${
                pathname === "/services" ? "text-white font-bold border-b-2 border-white" : "text-slate-300"
              }`}
            >
              Capabilities &amp; Services
            </Link>
            <Link
              href="/contact"
              className={`transition-colors py-1 hover:text-white ${
                pathname === "/contact" ? "text-white font-bold border-b-2 border-white" : "text-slate-300"
              }`}
            >
              Global Logistics &amp; Fleet
            </Link>
          </nav>
        ) : (
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">
            <Radio className="h-3.5 w-3.5 text-white animate-pulse" />
            LIVE STARLINK TELEMETRY &amp; ERP PORTAL
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isPortal && (
            <Link href="/">
              <button className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5 cursor-pointer">
                <Compass className="h-4 w-4 text-white" />
                <span>Corporate Site</span>
              </button>
            </Link>
          )}

          <Link href="/login">
            <button className="flex items-center gap-1.5 sm:gap-2 border border-white/30 bg-white/10 hover:bg-white hover:text-[#07142F] text-white px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 backdrop-blur-md shadow-xs cursor-pointer">
              <Lock className="h-3.5 w-3.5" />
              <span>Login</span>
            </button>
          </Link>

          <a href="/#request" className="hidden sm:block">
            <button className="border border-white bg-transparent text-white hover:bg-white hover:text-[#07142F] px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer">
              <span>Get In Touch</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          {!isPortal && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-white/20 bg-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Slide-Over Menu Drawer */}
      {!isPortal && mobileMenuOpen && (
        <div className="md:hidden border-t border-white/15 bg-[#07142F] px-6 py-5 space-y-4 shadow-2xl animate-fade-in">
          <nav className="flex flex-col space-y-3 font-medium text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg transition-colors ${
                pathname === "/" ? "bg-white/15 text-white font-bold" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              Industries &amp; Overview
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg transition-colors ${
                pathname === "/services" ? "bg-white/15 text-white font-bold" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              Capabilities &amp; Services
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg transition-colors ${
                pathname === "/contact" ? "bg-white/15 text-white font-bold" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              Global Logistics &amp; Fleet
            </Link>
          </nav>

          <div className="pt-2 border-t border-white/10">
            <a href="/#request" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-white text-[#07142F] hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <span>Request Survey Quote</span>
                <ArrowRight className="h-4 w-4 text-[#07142F]" />
              </button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
