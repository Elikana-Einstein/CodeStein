import { useMemo, useState } from "react";
import { GitPullRequest } from "lucide-react";

import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import ReviewCard from "../components/reviews/ReviewCard";
import ReviewFilters from "../components/reviews/ReviewFilters";

import { useApp } from "../context/useApp";

export default function Reviews() {
  const { reviews, projects } = useApp();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [project, setProject] = useState("all");

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        `${review.title} ${review.project}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" || review.status === status;

      const matchesProject =
        project === "all" ||
        review.projectId === project;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProject
      );
    });
  }, [reviews, search, status, project]);

  return (
    <>
      <PageHeader
        title="Reviews"
        description="Every code review performed across your connected projects."
      />

      <ReviewFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        project={project}
        setProject={setProject}
        projects={projects}
      />

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))
        ) : (
          <div className="p-5">
            <EmptyState
              icon={GitPullRequest}
              title="No reviews found"
              description="Try changing your filters or run a review from a connected project."
            />
          </div>
        )}
      </div>
    </>
  );
}