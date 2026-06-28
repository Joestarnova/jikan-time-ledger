import { useEffect, useState } from "react";
import type { Task } from "../../types";
import { TasksContext } from "./tasksContext";
import { api } from "../../lib/api";

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
    let cancelled = false;
     
    (async () => {
      try {
        const data = await api.getTasks();
      if (!cancelled) {
        setTasks(data);
      }
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    })()

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

