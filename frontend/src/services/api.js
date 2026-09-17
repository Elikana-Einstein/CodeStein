const projects = [
  {
    id: "p1",
    name: "CodeReview AI",
    path: "~/projects/code-review-ai",
    language: "JavaScript",
    status: "Connected",
    reviews: 24,
    issues: 7,
    lastReview: "12 minutes ago",
    filesChanged: 8,
    branch: "main",
    description:
      "Local code review platform for catching issues before pushing changes.",
  },
  {
    id: "p2",
    name: "E-commerce API",
    path: "~/projects/ecommerce-api",
    language: "Python",
    status: "Connected",
    reviews: 18,
    issues: 3,
    lastReview: "2 hours ago",
    filesChanged: 5,
    branch: "main",
    description:
      "Backend services for an e-commerce platform.",
  },
  {
    id: "p3",
    name: "Portfolio",
    path: "~/projects/portfolio",
    language: "React",
    status: "Disconnected",
    reviews: 9,
    issues: 1,
    lastReview: "Yesterday",
    filesChanged: 3,
    branch: "main",
    description:
      "Personal portfolio and project showcase.",
  },
];

const reviews = [
  {
    id: "r1",
    projectId: "p1",
    project: "CodeReview AI",
    title: "Changes to authentication service",
    status: "Completed",
    findings: 4,
    critical: 1,
    high: 1,
    medium: 2,
    low: 0,
    time: "12 minutes ago",
    branch: "feature/auth",
    duration: "18s",
    filesChanged: 8,
    additions: 124,
    deletions: 31,
    score: 82,
    summary:
      "The review identified one critical authentication problem and three lower-severity maintainability concerns.",
  },
  {
    id: "r2",
    projectId: "p2",
    project: "E-commerce API",
    title: "Update payment validation",
    status: "Completed",
    findings: 2,
    critical: 0,
    high: 1,
    medium: 1,
    low: 0,
    time: "2 hours ago",
    branch: "feature/payments",
    duration: "11s",
    filesChanged: 5,
    additions: 71,
    deletions: 12,
    score: 91,
    summary:
      "Payment validation is mostly sound, but one edge case can allow invalid input to move deeper into the service.",
  },
  {
    id: "r3",
    projectId: "p1",
    project: "CodeReview AI",
    title: "Refactor review pipeline",
    status: "Completed",
    findings: 7,
    critical: 0,
    high: 2,
    medium: 4,
    low: 1,
    time: "Yesterday",
    branch: "refactor/review-pipeline",
    duration: "22s",
    filesChanged: 14,
    additions: 286,
    deletions: 190,
    score: 76,
    summary:
      "The refactor improves structure but introduces several maintainability and error-handling issues.",
  },
  {
    id: "r4",
    projectId: "p3",
    project: "Portfolio",
    title: "Update responsive navigation",
    status: "Completed",
    findings: 1,
    critical: 0,
    high: 0,
    medium: 1,
    low: 0,
    time: "Yesterday",
    branch: "feature/mobile-nav",
    duration: "7s",
    filesChanged: 3,
    additions: 38,
    deletions: 11,
    score: 96,
    summary:
      "The navigation update is clean with one minor accessibility concern.",
  },
];

const issues = [
  {
    id: "i1",
    reviewId: "r1",
    projectId: "p1",
    project: "CodeReview AI",
    title: "Missing authentication check",
    severity: "Critical",
    status: "Open",
    category: "Security",
    location: "src/api/auth.js:42",
    line: 42,
    description:
      "This endpoint performs a privileged operation without verifying that the request contains a valid authenticated identity.",
    recommendation:
      "Require authentication before reaching the handler and verify the required permission for the operation.",
    code: `export async function deleteSession(req, res) {
  await sessionStore.delete(req.params.id);
  return res.status(204).send();
}`,
    createdAt: "12 minutes ago",
  },
  {
    id: "i2",
    reviewId: "r1",
    projectId: "p1",
    project: "CodeReview AI",
    title: "Potential null reference",
    severity: "High",
    status: "Open",
    category: "Reliability",
    location: "src/services/review.js:87",
    line: 87,
    description:
      "The returned object can be null, but the next expression reads a property without checking the value first.",
    recommendation:
      "Guard the value before accessing its properties and handle the missing-review case explicitly.",
    code: `const review = reviews.find(
  (item) => item.id === reviewId
);

return review.status;`,
    createdAt: "12 minutes ago",
  },
  {
    id: "i3",
    reviewId: "r2",
    projectId: "p2",
    project: "E-commerce API",
    title: "Unused database connection",
    severity: "Medium",
    status: "Open",
    category: "Performance",
    location: "app/database.py:31",
    line: 31,
    description:
      "The connection is initialized for this path but never consumed, increasing setup cost without providing value.",
    recommendation:
      "Move connection creation closer to the code path that actually requires database access.",
    code: `connection = create_connection()

result = validate_payment(payload)`,
    createdAt: "2 hours ago",
  },
];

export async function getProjects() {
  return [...projects];
}

export async function getProject(projectId) {
  return projects.find((project) => project.id === projectId) || null;
}

export async function getReviews() {
  return [...reviews];
}

export async function getReview(reviewId) {
  return reviews.find((review) => review.id === reviewId) || null;
}

export async function getIssues() {
  return [...issues];
}

export async function getIssue(issueId) {
  return issues.find((issue) => issue.id === issueId) || null;
}