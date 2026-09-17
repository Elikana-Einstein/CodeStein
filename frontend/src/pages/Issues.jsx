import { useMemo, useState } from "react";
import { CircleAlert, Search } from "lucide-react";

import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import SeverityBadge from "../components/reviews/SeverityBadge";

import { useApp } from "../context/useApp";

export default function Issues() {
  const { issues } = useApp();

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        `${issue.title} ${issue.project} ${issue.category}`
          .toLowerCase()
          .includes(query);

      const matchesSeverity =
        severity === "all" ||
        issue.severity === severity;

      const matchesStatus =
        status === "all" || issue.status === status;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [issues, search, severity, status]);

  return (
    <>
      <PageHeader
        title="Issues"
        description="Problems detected across your connected projects."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search issues..."
              className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All statuses</option>
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
            <option value="Ignored">Ignored</option>
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {filteredIssues.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-5 transition hover:bg-slate-50/60"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <div className="mt-0.5 text-slate-500">
                      <CircleAlert size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {issue.title}
                        </h3>

                        <SeverityBadge
                          severity={issue.severity}
                        />
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {issue.project} · {issue.category}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {issue.description}
                      </p>

                      <p className="mt-3 font-mono text-xs text-slate-400">
                        {issue.location}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {issue.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5">
            <EmptyState
              icon={CircleAlert}
              title="No issues found"
              description="There are no issues matching your current filters."
            />
          </div>
        )}
      </div>
    </>
  );
}