import { createContext } from "react";

export type ActiveSession = { taskId: string; startedAt: string } | null;

interface ActiveSessionContextType {
  activeSession: ActiveSession;
  start: (taskId: string) => void;
  stop: () => void;
}

export const ActiveSessionContext = createContext<ActiveSessionContextType | null>(null);
