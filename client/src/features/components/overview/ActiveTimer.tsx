import { useEffect, useState } from "react";
import SectionLabel from "../../../components/ui/SectionLabel";
import { useActiveSession } from "../../../context/activeSession";
import { useTasks } from "../../../context/tasks";

const formatElapsed = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
};

export default function ActiveTimer() {
  const { activeSession, stop } = useActiveSession();
  const { tasks } = useTasks();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!activeSession) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [activeSession]);

  if (!activeSession) {
    return (
      <section className="space-y-3">
        <SectionLabel dot dotClassName="bg-zinc-600">
          Active Timer
        </SectionLabel>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-500">
          No timer running. Start one from your tasks below.
        </div>
      </section>
    );
  }

  const task = tasks.find((t) => t.id === activeSession.taskId);
  const elapsed = Math.max(
    0,
    Math.floor((now - new Date(activeSession.startedAt).getTime()) / 1000)
  );
  const startedAtLabel = new Date(activeSession.startedAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="space-y-3">
      <SectionLabel dot dotClassName="bg-orange-500 animate-pulse">
        Active Timer
      </SectionLabel>

      <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              style={{ backgroundColor: task?.taskColor ?? "#f59e0b" }}
            />
            <div>
              <div className="font-medium text-zinc-100">
                {task ? task.taskName : "Unknown task"}
              </div>
              <div className="font-mono text-xs text-zinc-500">
                Started {startedAtLabel}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-3xl tracking-tight text-amber-400 tabular-nums">
              {formatElapsed(elapsed)}
            </div>
            <button
              type="button"
              onClick={stop}
              aria-label="Stop timer"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-red-500/90 text-white transition hover:bg-red-500"
            >
              <span className="block h-3 w-3 rounded-sm bg-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
