import { ArrowLeft, GitBranch, Timer, FileDiff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ReviewStatus from "../components/reviews/ReviewStatus";
import FindingCard from "../components/reviews/FindingCard";

import { useApp } from "../context/useApp";

const findings = [
  {
    id: 1,
    title: "Missing authentication check",
    severity: "Critical",
    location: "src/api/auth.js:42",
    description:
      "This endpoint performs a privileged operation without verifying the caller's identity.",
    recommendation:
      "Require authentication before executing the operation and validate the user's permission.",
    code: `export async function deleteSession(req, res) {
  await sessionStore.delete(req.params.id);
  return res.status(204).send();
}`,
  },
  {
    id: 2,
    title: "Potential null reference",
    severity: "High",
    location: "src/services/review.js:87",
    description:
      "The result from the lookup can be null before the next expression accesses its status.",
    recommendation:
      "Handle the missing value explicitly before accessing its properties.",
    code: `const review = reviews.find(
  (item) => item.id === reviewId
);

return review.status;`,
  },
];

export default function ReviewDetails() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const { reviews } = useApp();

  const review = reviews.find(
    (item) => item.id === reviewId
  );

  if (!review) {
    return (
      <EmptyState
        title="Review not found"
        description="This review may no longer exist."
        action={
          <Button onClick={() => navigate("/app/reviews")}>
            Back to reviews
          </Button>
        }
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/app/reviews")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to reviews
      </button>

      <PageHeader
        title={review.title}
        description={`${review.project} · ${review.time}`}
      >
        <ReviewStatus status={review.status} />
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <GitBranch size={15} />
                {review.branch}
              </span>

              <span className="flex items-center gap-2">
                <Timer size={15} />
                {review.duration}
              </span>

              <span className="flex items-center gap-2">
                <FileDiff size={15} />
                {review.filesChanged} files
              </span>
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Review summary
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {review.summary}
              </p>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Findings
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Problems identified in this review
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {findings.map((finding) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 xl:sticky xl:top-24">
          <h2 className="text-sm font-semibold text-slate-900">
            Review score
          </h2>

          <div className="mt-5 flex items-end gap-2">
            <span className="text-4xl font-semibold tracking-tight text-slate-900">
              {review.score}
            </span>

            <span className="pb-1 text-sm text-slate-400">
              / 100
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: `${review.score}%` }}
            />
          </div>

          <div className="mt-6 space-y-3">
            {[
              ["Critical", review.critical],
              ["High", review.high],
              ["Medium", review.medium],
              ["Low", review.low],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-500">
                  {label}
                </span>

                <span className="font-semibold text-slate-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}