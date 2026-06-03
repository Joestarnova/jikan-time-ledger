import { createContext } from "react";
import type { Session } from "../../types";

interface SessionsContextType {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

export const SessionsContext = createContext<SessionsContextType | null>(null);
