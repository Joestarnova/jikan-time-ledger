import { dateKey } from "./format";
import type { DateRange } from "./useAnalytics";

const buildPreset = (kind: string): DateRange => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const back = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d;
  };
  switch (kind) {
    case "today":     return { from: dateKey(today), to: dateKey(today) };
    case "week":      return { from: dateKey(back(6)), to: dateKey(today) };
    case "month":     return { from: dateKey(back(29)), to: dateKey(today) };
    case "thisMonth": return { from: dateKey(new Date(today.getFullYear(), today.getMonth(), 1)), to: dateKey(today) };
    default:          return { from: dateKey(back(6)), to: dateKey(today) };
  }
};

export default function AnalyticsHeader({
  range, setRange, preset, setPreset,
}: {
  range: DateRange;
  setRange: (r: DateRange) => void;
  preset: string;
  setPreset: (p: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
          Global Analytics
        </span>
        <select
          value={preset}
          onChange={(e) => {
            const v = e.target.value;
            setPreset(v);
            if (v !== "custom") setRange(buildPreset(v));
          }}
          className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200"
        >
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="flex items-center gap-2 text-sm text-zinc-300">
        <input
          type="date"
          value={range.from}
          onChange={(e) => { setPreset("custom"); setRange({ ...range, from: e.target.value }); }}
          className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 color-scheme:dark"
        />
        <span className="text-zinc-500">to</span>
        <input
          type="date"
          value={range.to}
          onChange={(e) => { setPreset("custom"); setRange({ ...range, to: e.target.value }); }}
          className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 color-scheme:dark"
        />
      </div>
    </div>
  );
}
