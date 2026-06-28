import { createContext } from "react";
import type { Session } from "../../types";

interface SessionsContextType {
  sessions: Session[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export const SessionsContext = createContext<SessionsContextType | null>(null);
