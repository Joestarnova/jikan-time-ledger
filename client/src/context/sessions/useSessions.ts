import { useContext } from "react";
import { SessionsContext } from "./sessionsContext";

export function useSessions() {
  const context = useContext(SessionsContext);
  if (!context) throw new Error("useSessions must be used inside SessionsProvider");
  return context;
}
