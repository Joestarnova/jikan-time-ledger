import type { Task } from "../../../types";
import { useSessions } from "../../../context/sessions";

interface SessionListProps {
  tasks: Task[];
  selected: string;
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const formatClock = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const dayKey = (iso: string) => new Date(iso).toDateString();

const dayLabel = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const dateStr = d
    .toLocaleDateString([], { month: "short", day: "numeric" })
    .toUpperCase();

  if (d.toDateString() === today.toDateString()) return `TODAY · ${dateStr}`;
  if (d.toDateString() === yesterday.toDateString()) return `YESTERDAY · ${dateStr}`;
  return dateStr;
};

export default function SessionList({ tasks, selected }: SessionListProps) {
  const { sessions, loading } = useSessions();

  const filtered = sessions
    .filter((s) => selected === "all" || s.taskId === selected)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );

  if (filtered.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-zinc-500">
        {loading ? "Loading...." : "No sessions logged yet."}
      </div>
    );
  }

  const groups: { key: string; label: string; items: typeof filtered }[] = [];
  for (const session of filtered) {
    const key = dayKey(session.startedAt);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label: dayLabel(session.startedAt), items: [] };
      groups.push(group);
    }
    group.items.push(session);
  }

  return (
    <div>
      {groups.map((group) => (
        <section key={group.key}>
          <h3 className="mb-2 mt-7 font-mono text-[10px] tracking-[0.15em] text-zinc-600 uppercase">
            {group.label}
          </h3>
          <ul className="space-y-0">
            {group.items.map((session) => {
              const task = tasks.find((t) => t.id === session.taskId);
              const endAt =
                session.durationSeconds === null
                  ? null
                  : new Date(
                      new Date(session.startedAt).getTime() +
                        session.durationSeconds * 1000,
                    ).toISOString();

              return (
                <li
                  key={session.id}
                  className="flex items-center gap-4 border-b border-zinc-800/60 px-1 py-3.5"
                >
                  <span
                    className="w-0.5 self-stretch rounded-full shrink-0"
                    style={{ backgroundColor: task?.taskColor }}
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-sm font-medium text-zinc-100">{task?.taskName}</span>
                    <span className="font-mono text-xs text-zinc-500">
                      {formatTime(session.startedAt)} → {endAt ? formatTime(endAt) : "now"}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-zinc-300">
                    {session.durationSeconds === null ? "running…" : formatClock(session.durationSeconds)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
