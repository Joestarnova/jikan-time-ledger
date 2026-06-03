import { createContext } from "react";
import type { Task } from "../../types";

interface TasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksContext = createContext<TasksContextType | null>(null);