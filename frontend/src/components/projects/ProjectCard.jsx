import {
  FolderGit2,
  GitPullRequest,
  CircleAlert,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProjectStatus from "./ProjectStatus";
import Dropdown from "../ui/Dropdown";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={() =>
            navigate(`/app/projects/${project.id}`)
          }
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <FolderGit2 size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {project.name}
            </h3>

            <p className="mt-1 truncate font-mono text-xs text-slate-400">
              {project.path}
            </p>
          </div>
        </button>

        <Dropdown
          trigger={
            <button
              type="button"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <MoreHorizontal size={17} />
            </button>
          }
        >
          <button
            type="button"
            onClick={() =>
              navigate(`/app/projects/${project.id}`)
            }
            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            Open project
          </button>

          <button
            type="button"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            Review changes
          </button>
        </Dropdown>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <ProjectStatus status={project.status} />

        <span className="text-xs text-slate-500">
          {project.language}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <GitPullRequest size={15} />
            <span className="text-xs">Reviews</span>
          </div>

          <p className="mt-2 text-lg font-semibold text-slate-900">
            {project.reviews}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <CircleAlert size={15} />
            <span className="text-xs">Issues</span>
          </div>

          <p className="mt-2 text-lg font-semibold text-slate-900">
            {project.issues}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          navigate(`/app/projects/${project.id}`)
        }
        className="mt-5 flex w-full items-center justify-between border-t border-slate-100 pt-4 text-sm font-medium text-slate-600 hover:text-indigo-600"
      >
        <span>View project</span>
        <ChevronRight size={16} />
      </button>
    </article>
  );
}