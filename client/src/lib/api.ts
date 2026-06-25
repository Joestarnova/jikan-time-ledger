import type { Task, Session } from "../types";

export type Settings = {
  workingHoursStart: string;
  workingHoursEnd: string;
};

export type AnalyticsPeriod = "today" | "yesterday" | "7d" | "30d";

export type Analytics = {
  totalSeconds: number;
  dailyAvgSeconds: number;
  topTask: { name: string; color: string; percent: number } | null;
  longestSession: { duration: number; taskName: string; date: string } | null;
  dailyBreakdown: { date: string; totalSeconds: number }[];
  distribution: {
    taskId: string;
    name: string;
    color: string;
    percent: number;
  }[];
};

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  getTasks: () => request<Task[]>("/tasks"),
  createTask: (body: Pick<Task, "taskName" | "taskEmoji" | "taskColor">) =>
    request<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateTask: (
    id: string,
    body: Partial<
      Pick<Task, "taskName" | "taskEmoji" | "taskColor" | "isFavorite">
    >,
  ) =>
    request<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteTask: (id: string) =>
    request<void>(`/tasks/${id}`, {
      method: "DELETE",
    }),

  getSettings: () => request<Settings>("/settings"),
  patchSettings: (body: Partial<Settings>) =>
    request<Settings>("/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  getSessions: () => request<Session[]>("/sessions"),
  getActiveSession: () => request<Session | null>("/sessions/active"),
  startSession: (taskId: string) =>
    request<Session>("/sessions/start", {
      method: "POST",
      body: JSON.stringify({ task_id: taskId }),
    }),
  stopSession: (id: string) =>
    request<Session>(`/sessions/${id}/stop`, {
      method: "POST",
    }),

  getAnalytics:(period: AnalyticsPeriod) =>
    request<Analytics>(`/analytics?period=${period}`),
};
