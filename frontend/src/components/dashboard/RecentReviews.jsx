// src/components/dashboard/RecentReviews.jsx

import {
  GitPullRequest,
  Clock3,
  ChevronRight,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    project: "CodeReview AI",
    title: "Changes to authentication service",
    status: "Completed",
    findings: 4,
    time: "12 minutes ago",
  },
  {
    id: 2,
    project: "E-commerce API",
    title: "Update payment validation",
    status: "Completed",
    findings: 2,
    time: "2 hours ago",
  },
  {
    id: 3,
    project: "CodeReview AI",
    title: "Refactor review pipeline",
    status: "Completed",
    findings: 7,
    time: "Yesterday",
  },
  {
    id: 4,
    project: "Portfolio",
    title: "Update responsive navigation",
    status: "Completed",
    findings: 1,
    time: "Yesterday",
  },
];

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {status}
    </span>
  );
}

export default function RecentReviews() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Recent Reviews
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Latest code reviews from your projects
          </p>
        </div>

        <button className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700">
          View all
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="group flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50/70"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <GitPullRequest size={17} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-slate-900">
                  {review.title}
                </h3>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    {review.project}
                  </span>

                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock3 size={12} />
                    {review.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <span className="text-xs text-slate-500">
                {review.findings} findings
              </span>

              <StatusBadge status={review.status} />

              <ChevronRight
                size={16}
                className="text-slate-400 transition group-hover:translate-x-0.5"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}