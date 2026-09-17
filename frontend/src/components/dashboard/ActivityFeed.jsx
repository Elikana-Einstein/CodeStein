// src/components/dashboard/ActivityFeed.jsx

import {
  CheckCircle2,
  AlertTriangle,
  GitPullRequest,
} from "lucide-react";

const activities = [
  {
    icon: CheckCircle2,
    title: "Review completed",
    description: "CodeReview AI",
    time: "12 min ago",
  },
  {
    icon: AlertTriangle,
    title: "3 issues detected",
    description: "E-commerce API",
    time: "2 hrs ago",
  },
  {
    icon: GitPullRequest,
    title: "Review started",
    description: "CodeReview AI",
    time: "4 hrs ago",
  },
  {
    icon: CheckCircle2,
    title: "Review completed",
    description: "Portfolio",
    time: "Yesterday",
  },
];

export default function ActivityFeed() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Review Activity
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Recent activity across your projects
        </p>
      </div>

      <div className="p-5">
        <div className="relative space-y-6">
          <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-slate-200" />

          {activities.map((activity, index) => {
            return (
              <div
                key={index}
                className="relative flex gap-3"
              >
                <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                </div>

                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {activity.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] text-slate-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}