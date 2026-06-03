import { useState } from "react";
import type { Session } from "../../types";
import { SessionsContext } from "./sessionsContext";

export function SessionsProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);

  return (
    <SessionsContext.Provider value={{ sessions, setSessions }}>
      {children}
    </SessionsContext.Provider>
  );
}
