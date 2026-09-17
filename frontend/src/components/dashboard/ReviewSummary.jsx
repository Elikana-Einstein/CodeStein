// src/components/dashboard/ReviewSummary.jsx

import {
  FolderGit2,
  GitPullRequest,
  CircleAlert,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Connected Projects",
    value: "3",
    change: "+1 this month",
    icon: FolderGit2,
    iconClass: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Total Reviews",
    value: "51",
    change: "+18%",
    icon: GitPullRequest,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Open Issues",
    value: "11",
    change: "+4",
    icon: CircleAlert,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    label: "Issues Prevented",
    value: "137",
    change: "+23%",
    icon: ShieldCheck,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
];

function SummaryCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconClass}`}
        >
          <Icon size={20} />
        </div>

        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <ArrowUpRight size={14} />
          {stat.change}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-slate-500">
          {stat.label}
        </p>

        <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          {stat.value}
        </p>
      </div>
    </div>
  );
}

export default function ReviewSummary() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <SummaryCard
          key={stat.label}
          stat={stat}
        />
      ))}
    </section>
  );
}