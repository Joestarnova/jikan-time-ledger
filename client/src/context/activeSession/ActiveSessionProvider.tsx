import { useState } from "react";
import type { Session } from "../../types";
import { useSessions } from "../sessions";
import { ActiveSessionContext, type ActiveSession } from "./activeSessionContext";

export function ActiveSessionProvider({ children }: { children: React.ReactNode }) {
  const [activeSession, setActiveSession] = useState<ActiveSession>(null);
  const { setSessions } = useSessions();

  const start = (taskId: string) => {
    setActiveSession({ taskId, startedAt: new Date().toISOString() });
  };

  const stop = () => {
    if (!activeSession) return;
    const durationSeconds = Math.round(
      (Date.now() - new Date(activeSession.startedAt).getTime()) / 1000
    );
    const session: Session = {
      id: crypto.randomUUID(),
      taskId: activeSession.taskId,
      startedAt: activeSession.startedAt,
      durationSeconds,
    };
    setSessions((prev) => [...prev, session]);
    setActiveSession(null);
  };

  return (
    <ActiveSessionContext.Provider value={{ activeSession, start, stop }}>
      {children}
    </ActiveSessionContext.Provider>
  );
}
