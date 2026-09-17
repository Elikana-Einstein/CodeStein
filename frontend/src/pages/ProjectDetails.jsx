import { useMemo } from "react";
import { ArrowLeft, GitPullRequest } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ProjectStatus from "../components/projects/ProjectStatus";
import ProjectStats from "../components/projects/ProjectStats";
import ReviewCard from "../components/reviews/ReviewCard";

import { useApp } from "../context/useApp";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, reviews } = useApp();

  const project = projects.find(
    (item) => item.id === projectId
  );

  const projectReviews = useMemo(
    () =>
      reviews.filter(
        (review) => review.projectId === projectId
      ),
    [reviews, projectId]
  );

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="The project may have been removed or the URL is incorrect."
        action={
          <Button onClick={() => navigate("/app/projects")}>
            Back to projects
          </Button>
        }
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/app/projects")}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to projects
      </button>

      <PageHeader
        title={project.name}
        description={project.description}
      >
        <ProjectStatus status={project.status} />
      </PageHeader>

      <ProjectStats project={project} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Project reviews
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Recent review history for this project
            </p>
          </div>

          {projectReviews.length > 0 ? (
            <div>
              {projectReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                />
              ))}
            </div>
          ) : (
            <div className="p-5">
              <EmptyState
                icon={GitPullRequest}
                title="No reviews yet"
                description="Your first local review will appear here."
              />
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Connection
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-slate-400">
                Local path
              </p>
              <p className="mt-1 break-all font-mono text-sm text-slate-700">
                {project.path}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Branch
              </p>
              <p className="mt-1 font-mono text-sm text-slate-700">
                {project.branch}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Language
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {project.language}
              </p>
            </div>
          </div>

          <Button className="mt-6 w-full">
            Review current changes
          </Button>
        </section>
      </div>
    </>
  );
}