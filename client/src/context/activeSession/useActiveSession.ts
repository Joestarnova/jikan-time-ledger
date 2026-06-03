import { useContext } from "react";
import { ActiveSessionContext } from "./activeSessionContext";

export function useActiveSession() {
  const context = useContext(ActiveSessionContext);
  if (!context) throw new Error("useActiveSession must be used inside ActiveSessionProvider");
  return context;
}
