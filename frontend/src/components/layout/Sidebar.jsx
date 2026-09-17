import {
  LayoutDashboard,
  FolderGit2,
  GitPullRequest,
  CircleAlert,
  Settings,
  ShieldCheck,
  HelpCircle,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainNavigation = [
  {
    label: "Dashboard",
    to: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    to: "/app/projects",
    icon: FolderGit2,
  },
  {
    label: "Reviews",
    to: "/app/reviews",
    icon: GitPullRequest,
  },
  {
    label: "Issues",
    to: "/app/issues",
    icon: CircleAlert,
  },
];

const secondaryNavigation = [
  {
    label: "Settings",
    to: "/app/settings",
    icon: Settings,
  },
];

function NavigationLink({ item, onNavigate }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`
      }
    >
      <Icon size={18} />
      <span>{item.label}</span>
    </NavLink>
  );
}

export default function Sidebar({ mobileOpen = false, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:z-30 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:flex`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <NavLink to="/app/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <ShieldCheck size={18} className="text-white" />
            </div>

            <span className="text-base font-semibold tracking-tight text-slate-900">
              CodeGuard
            </span>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {mainNavigation.map((item) => (
              <NavigationLink
                key={item.to}
                item={item}
                onNavigate={onClose}
              />
            ))}
          </nav>

          <p className="mt-8 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            System
          </p>

          <nav className="space-y-1">
            {secondaryNavigation.map((item) => (
              <NavigationLink
                key={item.to}
                item={item}
                onNavigate={onClose}
              />
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-2 px-2 text-xs text-slate-500">
            <HelpCircle size={15} />
            <span>Need help?</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              JD
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                John Doe
              </p>
              <p className="truncate text-xs text-slate-500">
                Developer
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}