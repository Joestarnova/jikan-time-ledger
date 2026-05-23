import styles from "./tasks.module.css";

type Task = { taskEmoji: string; taskName: string; id: string };
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
  return (
    <li>
      <div className={styles.list}>
        <div>
          <div>{task.taskEmoji}</div>
          {task.taskName}
        </div>{" "}
        <button onClick={() => onDeleteTask(task.id)}>&times;</button>
      </div>
    </li>
  );
}
