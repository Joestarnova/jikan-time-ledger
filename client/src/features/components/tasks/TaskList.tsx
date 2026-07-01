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
  if (tasks.length === 0) {
    return <p className="text-sm text-zinc-500">No tasks yet. Add one above.</p>;
  }
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} onToggleFavorite={onToggleFavorite} />
      ))}
    </ul>
  );
}

function TaskItem({ task, onDeleteTask, onToggleFavorite }: TaskProps) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-md text-base"
          style={{ backgroundColor: task.taskColor + "33", border: `1px solid ${task.taskColor}55` }}
        >
          {task.taskEmoji}
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(task.id)}
          aria-label={task.isFavorite ? "Unfavorite" : "Favorite"}
          className="text-base leading-none transition"
          style={{ color: task.isFavorite ? "#f59e0b" : "#52525b" }}
        >
          {task.isFavorite ? "★" : "☆"}
        </button>
        <span className="text-sm font-medium text-zinc-100">{task.taskName}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-zinc-600">48 sessions · 22h 30m</span>
        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          aria-label="Delete task"
          className="text-zinc-600 transition hover:text-red-400"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
