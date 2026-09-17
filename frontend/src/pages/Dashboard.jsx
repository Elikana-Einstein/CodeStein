// src/pages/Dashboard.jsx

import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";

import ReviewSummary from "../components/dashboard/ReviewSummary";
import ProjectCard from "../components/dashboard/ProjectCard";
import RecentReviews from "../components/dashboard/RecentReviews";
import ActivityFeed from "../components/dashboard/ActivityFeed";

const projects = [
  {
    id: 1,
    name: "CodeReview AI",
    path: "~/projects/code-review-ai",
    status: "Connected",
    reviews: 24,
    issues: 7,
  },
  {
    id: 2,
    name: "E-commerce API",
    path: "~/projects/ecommerce-api",
    status: "Connected",
    reviews: 18,
    issues: 3,
  },
  {
    id: 3,
    name: "Portfolio",
    path: "~/projects/portfolio",
    status: "Disconnected",
    reviews: 9,
    issues: 1,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      <PageHeader
        title="Good morning, John"
        description="Here's what's happening with your projects today."
      >
        <Button
          icon={Plus}
          onClick={() => navigate("/app/projects")}
        >
          Connect Project
        </Button>
      </PageHeader>

      <ReviewSummary />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Connected Projects */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Connected Projects
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Your local projects connected to CodeGuard
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/app/projects")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </section>

        <ActivityFeed />
      </div>

      <div className="mt-6">
        <RecentReviews />
      </div>
    </div>
  );
}