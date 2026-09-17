import { useMemo, useState } from "react";
import {
  FolderGit2,
  Plus,
  Search,
} from "lucide-react";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import ProjectCard from "../components/projects/ProjectCard";
import ConnectProject from "../components/projects/ConnectProject";

import { useApp } from "../context/useApp";

export default function Projects() {
  const { projects, addProject } = useApp();

  const [search, setSearch] = useState("");
  const [connectOpen, setConnectOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return projects;

    return projects.filter((project) =>
      `${project.name} ${project.path} ${project.language}`
        .toLowerCase()
        .includes(query)
    );
  }, [projects, search]);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage the local repositories connected to CodeGuard."
      >
        <Button
          icon={Plus}
          onClick={() => setConnectOpen(true)}
        >
          Connect Project
        </Button>
      </PageHeader>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
        <div className="relative max-w-lg">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
            className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects found"
          description="Connect a local project or change your search."
          action={
            <Button
              icon={Plus}
              onClick={() => setConnectOpen(true)}
            >
              Connect Project
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}

      <ConnectProject
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        onConnect={addProject}
      />
    </>
  );
}