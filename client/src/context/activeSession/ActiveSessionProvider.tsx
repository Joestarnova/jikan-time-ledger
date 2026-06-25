import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import { useSessions } from "../sessions";
import {
  ActiveSessionContext,
  type ActiveSession,
} from "./activeSessionContext";

export function ActiveSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSession, setActiveSession] = useState<ActiveSession>(null);
  const { refresh } = useSessions();

  useEffect(() => {
    let cancelled = false;

    api
      .getActiveSession()
      .then((session) => {
        if (!cancelled && session) {
          setActiveSession({
            id: session.id,
            taskId: session.taskId,
            startedAt: session.startedAt,
          });
        }
      })
      .catch((err) => console.error("Failed to load active session:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const start = async (taskId: string) => {
    try {
      const session = await api.startSession(taskId);
      setActiveSession({
        id: session.id,
        taskId: session.taskId,
        startedAt: session.startedAt,
      });
      await refresh();
    } catch (err) {
      console.error("Failed to start session:", err);
      toast.error("Failed to start timer");
    }
  };

  const stop =  async () => {
   if(!activeSession) return;
   try {
    await api.stopSession(activeSession.id);
    setActiveSession(null)
    await refresh();
   } catch (err) {
    console.error("Failed to stop session:", err);
    toast.error("Failed to stop timer");
   }
  };

  return (
    <ActiveSessionContext.Provider value={{ activeSession, start, stop }}>
      {children}
    </ActiveSessionContext.Provider>
  );
}
