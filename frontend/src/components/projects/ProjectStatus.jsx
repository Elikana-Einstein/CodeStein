// src/components/projects/ProjectStatus.jsx

export default function ProjectStatus({
  status = "Connected",
}) {
  const styles = {
    Connected: "bg-emerald-50 text-emerald-700",
    Disconnected: "bg-slate-100 text-slate-600",
    Connecting: "bg-blue-50 text-blue-700",
    Error: "bg-red-50 text-red-700",
  };

  const dotStyles = {
    Connected: "bg-emerald-500",
    Disconnected: "bg-slate-400",
    Connecting: "bg-blue-500",
    Error: "bg-red-500",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-2.5 py-1
        text-xs font-medium
        ${styles[status] || styles.Disconnected}
      `}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          dotStyles[status] || dotStyles.Disconnected
        }`}
      />

      {status}
    </span>
  );
}