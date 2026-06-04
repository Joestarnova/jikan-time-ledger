import type { Task } from "../../../types";
import styles from "./sessions.module.css";

interface SessionSelectionProps {
  tasks: Task[];
  selected: string;
  setSelected: (id: string) => void;
}

export default function SessionSelection({ tasks, selected, setSelected }: SessionSelectionProps) {

  return (
    <div className={styles.container}>
      <span
        className={`${styles.all} ${selected === "all" ? styles.selected : ""}`}
        onClick={() => setSelected("all")}
      >
        All
      </span>
      {tasks.map((task) => (
        <span
          key={task.id}
          className={`${styles.selection} ${selected === task.id ? styles.selected : ""}`}
          onClick={() => setSelected(task.id)}
        >
          {task.taskName}
        </span>
      ))}
    </div>
  );
}
