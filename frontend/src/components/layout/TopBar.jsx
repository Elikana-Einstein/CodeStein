import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  CircleAlert,
  Clock3,
  FolderGit2,
  GitPullRequest,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../context/useApp";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { projects, reviews, issues } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const searchRef = useRef(null);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return [
      ...projects.map((project) => ({
        id: project.id,
        type: "Project",
        title: project.name,
        description: project.path,
        icon: FolderGit2,
        path: `/app/projects/${project.id}`,
      })),
      ...reviews.map((review) => ({
        id: review.id,
        type: "Review",
        title: review.title,
        description: review.project,
        icon: GitPullRequest,
        path: `/app/reviews/${review.id}`,
      })),
      ...issues.map((issue) => ({
        id: issue.id,
        type: "Issue",
        title: issue.title,
        description: `${issue.project} · ${issue.severity}`,
        icon: CircleAlert,
        path: "/app/issues",
      })),
    ]
      .filter((result) =>
        `${result.title} ${result.description} ${result.type}`
          .toLowerCase()
          .includes(query)
      )
      .slice(0, 8);
  }, [issues, projects, reviews, search]);

  const notifications = useMemo(
    () => [
      ...issues.slice(0, 3).map((issue) => ({
        id: `issue-${issue.id}`,
        title: issue.title,
        description: `${issue.severity} issue in ${issue.project}`,
        time: issue.createdAt,
        icon: CircleAlert,
        path: "/app/issues",
      })),
      ...reviews.slice(0, 2).map((review) => ({
        id: `review-${review.id}`,
        title: "Review completed",
        description: review.title,
        time: review.time,
        icon: GitPullRequest,
        path: `/app/reviews/${review.id}`,
      })),
    ],
    [issues, reviews]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/" && event.target.tagName !== "INPUT") {
        event.preventDefault();
        setSearchOpen(true);
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openResult = (path) => {
    navigate(path);
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-sm font-medium text-slate-900">
            Development Workspace
          </p>

          <p className="hidden text-xs text-slate-500 sm:block">
            Review your code before it reaches GitHub.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50"
          >
            <Search size={15} />
            <span>Search</span>
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px]">
              /
            </kbd>
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-12 z-50 w-96 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-100 px-3">
                <Search size={16} className="text-slate-400" />
                <input
                  ref={searchRef}
                  autoFocus
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search projects, reviews, issues..."
                  className="h-11 min-w-0 flex-1 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="rounded p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X size={16} />
                </button>
              </div>

              {search ? (
                searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto p-1">
                    {searchResults.map((result) => {
                      const Icon = result.icon;

                      return (
                        <button
                          key={`${result.type}-${result.id}`}
                          type="button"
                          onClick={() => openResult(result.path)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-slate-50"
                        >
                          <Icon size={17} className="shrink-0 text-indigo-500" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-slate-800">
                              {result.title}
                            </span>
                            <span className="block truncate text-xs text-slate-500">
                              {result.type} · {result.description}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="px-4 py-6 text-center text-sm text-slate-500">
                    No matching results
                  </p>
                )
              ) : (
                <p className="px-4 py-4 text-xs text-slate-500">
                  Search across your workspace
                </p>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setSearchOpen(false);
            }}
            aria-label="Open notifications"
            className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <Bell size={18} />
            {!notificationsRead && notifications.length > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>
                <button
                  type="button"
                  onClick={() => setNotificationsRead(true)}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Mark all read
                </button>
              </div>

              {notifications.length > 0 ? (
                <div className="max-h-80 overflow-y-auto p-1">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;

                    return (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() => openResult(notification.path)}
                        className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left hover:bg-slate-50"
                      >
                        <Icon size={17} className="mt-0.5 shrink-0 text-indigo-500" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-slate-800">
                            {notification.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {notification.description}
                          </span>
                          <span className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock3 size={11} />
                            {notification.time}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="px-4 py-6 text-center text-sm text-slate-500">
                  You are all caught up
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
          JD
        </div>
      </div>
    </header>
  );
}