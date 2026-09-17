import { useEffect, useMemo, useState } from "react";

import {
  getIssues,
  getProjects,
  getReviews,
} from "../services/api";
import AppContext from "./context";

export function AppProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    let active = true;

    Promise.all([getProjects(), getReviews(), getIssues()]).then(
      ([loadedProjects, loadedReviews, loadedIssues]) => {
        if (!active) return;

        setProjects(loadedProjects);
        setReviews(loadedReviews);
        setIssues(loadedIssues);
      }
    );

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      projects,
      reviews,
      issues,
      addProject: (project) => {
        setProjects((current) => [
          ...current,
          { ...project, id: `p-${Date.now()}` },
        ]);
      },
    }),
    [projects, reviews, issues]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

