import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold tracking-tight text-slate-200">
          404
        </p>

        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          The page you're looking for doesn't exist.
        </p>

        <div className="mt-6">
          <Button onClick={() => navigate("/app/dashboard")}>
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}