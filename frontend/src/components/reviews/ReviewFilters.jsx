import { Search, SlidersHorizontal } from "lucide-react";

export default function ReviewFilters({
  search,
  setSearch,
  status,
  setStatus,
  project,
  setProject,
  projects = [],
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={17} className="text-slate-400" />

        <span className="text-sm font-medium text-slate-700">
          Filters
        </span>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search reviews..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          value={project}
          onChange={(event) => setProject(event.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="all">All projects</option>

          {projects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="all">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="Running">Running</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    </div>
  );
}