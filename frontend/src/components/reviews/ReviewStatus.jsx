import Badge from "../ui/Badge";

const config = {
  Completed: {
    variant: "success",
    dot: true,
  },
  Running: {
    variant: "info",
    dot: true,
  },
  Failed: {
    variant: "danger",
    dot: true,
  },
  Pending: {
    variant: "warning",
    dot: true,
  },
};

export default function ReviewStatus({ status }) {
  const current = config[status] || config.Pending;

  return (
    <Badge variant={current.variant} dot={current.dot}>
      {status}
    </Badge>
  );
}