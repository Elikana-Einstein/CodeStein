import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Reviews from "../pages/Reviews";
import ReviewDetails from "../pages/ReviewDetails";
import Issues from "../pages/Issues";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashbord" element={<Navigate to="dashboard" replace />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/:reviewId" element={<ReviewDetails />} />
        <Route path="issues" element={<Issues />} />
        <Route path="settings" element={<Settings />} />
        </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}