import { ProjectKanban } from "@/components/dashboard/ProjectKanban";
import { KanbanSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
            <KanbanSquare className="h-4 w-4" />
            Project Operations Management
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Offshore Survey Pipeline &amp; Stage Control
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="gap-2 bg-[#00a3e0] text-white hover:bg-sky-600 shadow-md shadow-sky-500/15">
            <Plus className="h-4 w-4" />
            New Survey Project
          </Button>
        </div>
      </div>

      <ProjectKanban />
    </div>
  );
}
