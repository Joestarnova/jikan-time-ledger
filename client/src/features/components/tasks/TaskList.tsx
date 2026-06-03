import styles from "./tasks.module.css";
import type { Task } from "../../../types";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};
type TaskProps = {
  task: Task;
  onDeleteTask: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

export default function TaskList({ tasks, onDeleteTask, onToggleFavorite }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDeleteTask={onDeleteTask} onToggleFavorite={onToggleFavorite} />
      ))}
    </ul>
  );
}

function Task({ task, onDeleteTask, onToggleFavorite }: TaskProps) {

  return (
    <li>
      <div className={styles.list}>
        <div>
          <div className={styles.childContainer} style={{ backgroundColor: task.taskColor }}>
            {task.taskEmoji}
          </div>
          <div
            className={`${styles.fav} ${styles.childContainer}`}
            style={{
              color: task.isFavorite ? "#f59e0b" : "#6b6b6b",
              border: `1px solid ${task.isFavorite ? "#f59e0b" : "#6b6b6b"}`,
            }}
            onClick={() => onToggleFavorite(task.id)}
          >
            {task.isFavorite ? "★" : "☆"}
          </div>
          {task.taskName}
        </div>{" "}
        <div className={styles.trailer}>
          <div>48 Session | 7-day avg 2h 12m | 22h 30m</div>
          <button onClick={() => onDeleteTask(task.id)}>⃠</button>
        </div>
      </div>
    </li>
  );
}
