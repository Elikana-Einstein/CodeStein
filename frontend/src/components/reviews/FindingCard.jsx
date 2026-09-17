import {
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
} from "lucide-react";

import SeverityBadge from "./SeverityBadge";

const iconMap = {
  Critical: ShieldAlert,
  High: AlertTriangle,
  Medium: AlertTriangle,
  Low: Info,
};

export default function FindingCard({ finding }) {
  const Icon = iconMap[finding.severity] || Info;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-slate-500">
          <Icon size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {finding.title}
            </h3>

            <SeverityBadge severity={finding.severity} />
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {finding.description}
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="font-mono text-xs text-slate-500">
              {finding.location}
            </p>

            <pre className="mt-2 overflow-x-auto text-xs leading-5 text-slate-700">
              <code>{finding.code}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 p-3">
            <p className="text-xs font-semibold text-indigo-900">
              Recommendation
            </p>

            <p className="mt-1 text-sm leading-6 text-indigo-800">
              {finding.recommendation}
            </p>
          </div>
        </div>

        <CheckCircle2
          size={18}
          className="shrink-0 text-slate-300"
        />
      </div>
    </article>
  );
}