import { PortalSidebar } from "@/components/navigation/PortalSidebar";

export default function PortalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
      <PortalSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
