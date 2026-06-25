import type { Period } from "./useAnalytics";

export default function AnalyticsHeader({
  period,
  setPeriod,
}: {
  period: Period;
  setPeriod: (p: Period) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
        Global Analytics
      </span>
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value as Period)}
        className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200"
      >
        <option value="today">Today</option>
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
      </select>
    </div>
  );
}
