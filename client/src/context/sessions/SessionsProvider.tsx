import { useCallback, useEffect, useState } from "react";
import type { Session } from "../../types";
import { api } from "../../lib/api";
import { SessionsContext } from "./sessionsContext";

export function SessionsProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.getSessions();
      setSessions(data);
    } catch (err) {
      console.error("Failed to load sessions:", err);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await api.getSessions();
        if (active) setSessions(data);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {active = false;};
  },[]);

  return (
    <SessionsContext.Provider value={{ sessions, loading, refresh }}>
      {children}
    </SessionsContext.Provider>
  );
}
