import { createContext } from "react";

export type ActiveSession = { id: string, taskId: string; startedAt: string } | null;

interface ActiveSessionContextType {
  activeSession: ActiveSession;
  start: (taskId: string) => Promise<void>;
  stop: () => Promise<void>;
}

export const ActiveSessionContext = createContext<ActiveSessionContextType | null>(null);
