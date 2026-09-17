// src/components/dashboard/ProjectCard.jsx

import {
  FolderGit2,
  ChevronRight,
} from "lucide-react";

import ProjectStatus from "../projects/ProjectStatus";

export default function ProjectCard({
  project,
}) {
  return (
    <div className="group flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <FolderGit2 size={19} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-medium text-slate-900">
              {project.name}
            </h3>

            <ProjectStatus status={project.status} />
          </div>

          <p className="mt-1 truncate font-mono text-xs text-slate-400">
            {project.path}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 pl-13 sm:pl-0">
        <div>
          <p className="text-xs text-slate-400">
            Reviews
          </p>

          <p className="mt-0.5 text-sm font-medium text-slate-700">
            {project.reviews}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Issues
          </p>

          <p className="mt-0.5 text-sm font-medium text-slate-700">
            {project.issues}
          </p>
        </div>

        <ChevronRight
          size={17}
          className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-600"
        />
      </div>
    </div>
  );
}