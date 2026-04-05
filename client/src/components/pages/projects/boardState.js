export const COLUMN_ORDER = ["planning", "inProgress", "review", "completed"];

export const COLUMN_LABEL = {
  planning: "Planning",
  inProgress: "In Progress",
  review: "Review",
  completed: "Completed",
};

export const initialBoard = {
  planning: [
    { id: "p1", name: "CRM rollout", assignee: "Amit", due: "2026-04-20", priority: "High" },
  ],
  inProgress: [{ id: "p2", name: "Lead forms", assignee: "Neha", due: "2026-04-12", priority: "Med" }],
  review: [],
  completed: [{ id: "p3", name: "Brand kit", assignee: "Riya", due: "2026-03-01", priority: "Low" }],
};
