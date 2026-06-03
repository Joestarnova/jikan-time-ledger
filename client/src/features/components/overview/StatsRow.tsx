import SectionLabel from "../../../components/ui/SectionLabel";
import { useSessions } from "../../../context/sessions";

type Stat = {
  label: string;
  value: string;
  caption?: string;
  accent?: boolean;
};

function StatBlock({ label, value, caption, accent }: Stat) {
  return (
    <div className="space-y-3">
      <SectionLabel>{label}</SectionLabel>
      <div
        className={[
          "font-mono text-4xl tracking-tight",
          accent ? "text-amber-500" : "text-zinc-100",
        ].join(" ")}
      >
        {value}
      </div>
      {caption && <div className="text-xs text-zinc-500">{caption}</div>}
    </div>
  );
}

export default function StatsRow() {
  const { sessions } = useSessions();

  const isToday = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const todaysSessions = sessions.filter((s) => isToday(s.startedAt));

  const totalSeconds = todaysSessions.reduce(
    (sum, s) => sum + s.durationSeconds,
    0
  );

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const tasksTrackedToday = new Set(todaysSessions.map((s) => s.taskId)).size;

  return (
    <section className="grid grid-cols-1 gap-8 border-t border-zinc-900 pt-6 md:grid-cols-2">
      <StatBlock label="Tracked Today" value={formatDuration(totalSeconds)} accent />
      <StatBlock
        label="Tasks"
        value={String(tasksTrackedToday)}
        caption="tracked today"
      />
    </section>
  );
}

