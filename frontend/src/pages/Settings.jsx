import { useState } from "react";
import {
  Bell,
  Bot,
  User,
  ShieldCheck,
} from "lucide-react";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-indigo-600" : "bg-slate-300"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    reviewNotifications: true,
    securityChecks: true,
    performanceChecks: true,
    autoReview: false,
  });

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your CodeGuard workspace."
      />

      <div className="max-w-4xl space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <User size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Profile
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Your personal workspace information.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <label>
              <span className="text-sm font-medium text-slate-700">
                Full name
              </span>

              <input
                defaultValue="John Doe"
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label>
              <span className="text-sm font-medium text-slate-700">
                Email
              </span>

              <input
                defaultValue="john@example.com"
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>

          <div className="border-t border-slate-200 px-5 py-4">
            <Button>Save profile</Button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Bot size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Review preferences
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Choose what CodeGuard should inspect.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                key: "securityChecks",
                title: "Security checks",
                description:
                  "Look for authentication, authorization, injection, and secret-management issues.",
              },
              {
                key: "performanceChecks",
                title: "Performance checks",
                description:
                  "Identify expensive patterns and avoidable resource usage.",
              },
              {
                key: "autoReview",
                title: "Automatic review",
                description:
                  "Automatically review local changes when the workspace changes.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-5 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {item.title}
                  </p>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <Toggle
                  enabled={settings[item.key]}
                  onChange={(value) =>
                    updateSetting(item.key, value)
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Bell size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Notifications
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Control how CodeGuard communicates review activity.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                key: "emailNotifications",
                title: "Email notifications",
                description:
                  "Receive important review and account updates by email.",
              },
              {
                key: "reviewNotifications",
                title: "Review notifications",
                description:
                  "Receive a notification when a local review finishes.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-5 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <Toggle
                  enabled={settings[item.key]}
                  onChange={(value) =>
                    updateSetting(item.key, value)
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-indigo-600" size={20} />

            <div>
              <h2 className="text-sm font-semibold text-indigo-950">
                Local-first review architecture
              </h2>

              <p className="mt-1 text-sm leading-6 text-indigo-800">
                The VS Code extension will be responsible for accessing your
                local workspace and sending the relevant changes to the review
                engine.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}