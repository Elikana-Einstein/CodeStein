import {
  GitPullRequest,
  CircleAlert,
  Clock3,
  FileCode2,
} from "lucide-react";

const stats = [
  {
    key: "reviews",
    label: "Reviews",
    icon: GitPullRequest,
  },
  {
    key: "issues",
    label: "Open Issues",
    icon: CircleAlert,
  },
  {
    key: "lastReview",
    label: "Last Review",
    icon: Clock3,
  },
  {
    key: "filesChanged",
    label: "Files Changed",
    icon: FileCode2,
  },
];

export default function ProjectStats({ project }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Icon size={18} />
            </div>

            <p className="mt-4 text-xs text-slate-500">
              {stat.label}
            </p>

            <p className="mt-1 truncate text-lg font-semibold text-slate-900">
              {project[stat.key]}
            </p>
          </div>
        );
      })}
    </div>
  );
}