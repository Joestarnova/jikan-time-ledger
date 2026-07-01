import type { Task } from "../../../types";

interface SessionSelectionProps {
  tasks: Task[];
  selected: string;
  setSelected: (id: string) => void;
}

export default function SessionSelection({ tasks, selected, setSelected }: SessionSelectionProps) {
  const chipBase = "cursor-pointer rounded-full px-3 py-1.5 text-xs border transition";
  const activeChip = "border-amber-500/60 bg-amber-500/10 text-amber-400";
  const inactiveChip = "border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300";

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-zinc-800">
      <span
        className={`${chipBase} ${selected === "all" ? activeChip : inactiveChip}`}
        onClick={() => setSelected("all")}
      >
        All
      </span>
      {tasks.map((task) => (
        <span
          key={task.id}
          className={`${chipBase} ${selected === task.id ? activeChip : inactiveChip}`}
          onClick={() => setSelected(task.id)}
        >
          {task.taskEmoji} {task.taskName}
        </span>
      ))}
    </div>
  );
}
