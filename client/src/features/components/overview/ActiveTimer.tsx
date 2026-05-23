import { useEffect, useState } from "react";
import SectionLabel from "../../../components/ui/SectionLabel";

const formatElapsed = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
};

type ActiveTimerProps = {
  taskName?: string;
  startedAt?: string;
  sessionNumber?: number;
  initialSeconds?: number;
  onStop?: () => void;
};

export default function ActiveTimer({
  taskName = "Deep Work",
  startedAt = "14:32",
  sessionNumber = 3,
  initialSeconds = 2569,
  onStop,
}: ActiveTimerProps) {
  const [elapsed, setElapsed] = useState(initialSeconds);

  useEffect(() => {
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="space-y-3">
      <SectionLabel dot dotClassName="bg-orange-500 animate-pulse">
        Active Timer
      </SectionLabel>

      <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
            <div>
              <div className="font-medium text-zinc-100">{taskName}</div>
              <div className="font-mono text-xs text-zinc-500">
                Started {startedAt} · session #{sessionNumber}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-3xl tracking-tight text-amber-400 tabular-nums">
              {formatElapsed(elapsed)}
            </div>
            <button
              type="button"
              onClick={onStop}
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
