import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";

const opusFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-opus",
  display: "swap"
});

export const metadata: Metadata = {
  title: "BHUSRI GEOSCIENCES & ENGINEERING SOLUTIONS | Offshore Survey & Subsea Crewing ERP",
  description: "Precision subsea geosciences, offshore technical crewing mobilization, remote data processing, and bathymetric deliverable engineering."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={opusFont.variable}>
      <body className={`${opusFont.className} min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased`}>
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
