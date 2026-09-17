import Badge from "../ui/Badge";

const severityMap = {
  Critical: "danger",
  High: "warning",
  Medium: "warning",
  Low: "info",
};

export default function SeverityBadge({ severity }) {
  return (
    <Badge variant={severityMap[severity] || "default"}>
      {severity}
    </Badge>
  );
}