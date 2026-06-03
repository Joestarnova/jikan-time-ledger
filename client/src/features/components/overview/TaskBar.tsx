type TaskBarProps = {
  name: string;
  minutes: number;
  totalMinutes: number;
  taskColor: string;
};

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
};

export default function TaskBar({ name, minutes, totalMinutes, taskColor }: TaskBarProps) {
  const pct = Math.max(2, Math.min(100, (minutes / totalMinutes) * 100));

    return (
    <div className="grid grid-cols-[7rem_1fr_4rem] items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-zinc-300">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: taskColor }}
        />
        {name}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-900">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: taskColor }}
        />
      </div>
      <div className="text-right font-mono text-xs text-zinc-400 tabular-nums">
        {formatDuration(minutes)}
      </div>
    </div>
  );

}
