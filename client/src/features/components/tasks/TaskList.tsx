import styles from "./tasks.module.css";
import { useState } from "react";

type Task = {
  taskEmoji: string;
  taskName: string;
  taskColor: string;
  id: string;
};
type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
};
type TaskProps = {
  task: Task;
  onDeleteTask: (id: string) => void;
};

export default function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </ul>
  );
}

function Task({ task, onDeleteTask }: TaskProps) {
  const [isFav, setIsFav] = useState(false);

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
              color: isFav ? "#f59e0b" : "#6b6b6b",
              border: `1px solid ${isFav ? "#f59e0b" : "#6b6b6b"}`,
            }}
            onClick={() => setIsFav((prev) => !prev)}
          >
            {isFav ? "★" : "☆"}
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
