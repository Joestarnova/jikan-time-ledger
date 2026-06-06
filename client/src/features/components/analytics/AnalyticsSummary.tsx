import SectionLabel from "../../../components/ui/SectionLabel";
import { formatHm } from "./format";
import type { useAnalytics } from "./useAnalytics";

type Analytics = ReturnType<typeof useAnalytics>;

function Card({ label, value, caption, accent }: {
  label: string; value: string; caption?: string; accent?: boolean;
}) {
  return (
    <div className="space-y-2">
      <SectionLabel>{label}</SectionLabel>
      <div className={[
        "font-mono text-3xl tracking-tight truncate",
        accent ? "text-amber-500" : "text-zinc-100",
      ].join(" ")}>
        {value}
      </div>
      {caption && <div className="text-xs text-zinc-500">{caption}</div>}
    </div>
  );
}

export default function AnalyticsSummary({ data }: { data: Analytics }) {
  const { totalSeconds, dailyAverageSeconds, topSubject, longest, daily } = data;

  const longestCaption = longest
    ? `${longest.task?.taskName ?? "Unknown"} · ${new Date(longest.session.startedAt)
        .toLocaleDateString([], { month: "short", day: "numeric" })}`
    : "—";

  return (
    <section className="grid grid-cols-1 gap-8 border-y border-zinc-900 py-8 sm:grid-cols-2">
      <Card label="Total Tracked" value={formatHm(totalSeconds)} caption={`${daily.length}-day window`} accent />
      <Card label="Daily Average" value={formatHm(dailyAverageSeconds)} caption="per active day" />
      <Card
        label="Top Subject"
        value={topSubject?.task?.taskName ?? "—"}
        caption={topSubject ? `${Math.round(topSubject.pct)}% of total time` : undefined}
        accent
      />
      <Card
        label="Longest Session"
        value={longest ? formatHm(longest.session.durationSeconds) : "—"}
        caption={longestCaption}
      />
    </section>
  );
}
