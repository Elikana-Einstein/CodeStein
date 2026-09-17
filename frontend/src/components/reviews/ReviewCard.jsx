import {
  GitPullRequest,
  Clock3,
  FileDiff,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import ReviewStatus from "./ReviewStatus";

export default function ReviewCard({ review }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/app/reviews/${review.id}`)}
      className="group flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition last:border-b-0 hover:bg-slate-50/70"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <GitPullRequest size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-medium text-slate-900">
            {review.title}
          </h3>

          <ReviewStatus status={review.status} />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{review.project}</span>

          <span className="flex items-center gap-1">
            <Clock3 size={12} />
            {review.time}
          </span>

          <span className="flex items-center gap-1">
            <FileDiff size={12} />
            {review.filesChanged} files
          </span>
        </div>
      </div>

      <div className="hidden items-center gap-5 sm:flex">
        <div className="text-right">
          <p className="text-xs text-slate-400">
            Findings
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-700">
            {review.findings}
          </p>
        </div>

        <ChevronRight
          size={17}
          className="text-slate-400 transition group-hover:translate-x-0.5"
        />
      </div>
    </button>
  );
}