import SectionLabel from "../../../components/ui/SectionLabel";
import type { Task } from "../../../types";
import { useTasks } from "../../../context/tasks";
import { useActiveSession } from "../../../context/activeSession";

type FavoriteCardProps = {
  task: Task;
  onStart: () => void;
  disabled: boolean;
}

function FavoriteCard({
  task,
  onStart,
  disabled,
}: FavoriteCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-900 bg-zinc-900/40 p-4">
      <div className="flex items-center gap-3">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: task.taskColor }}
        />
        <div>
          <div className="text-sm font-medium text-zinc-100">{task.taskName}</div>
          <div className="font-mono text-xs text-zinc-500">Favorite task</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        disabled={disabled}
        aria-label={`Start ${task.taskName}`}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-zinc-950 transition hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3.5 w-3.5 translate-x-px"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}


export default function FavoritesSection() {
  const { tasks, isLoading } = useTasks();
  const { start, activeSession } = useActiveSession();
  const favorites = tasks.filter((task) => task.isFavorite);

  return (
    <section className="space-y-4">
      <SectionLabel>Favorites</SectionLabel>
      {favorites.length === 0 ? (
        <p className="text-sm text-zinc-500">
          {isLoading ? "Loading....": "No tasks yet, Star a task to add it here"}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {favorites.map((task) => (
            <FavoriteCard
              key={task.id}
              task={task}
              onStart={() => start(task.id)}
              disabled={!!activeSession}
            />
          ))}
        </div>
      )}
    </section>
  );
}
