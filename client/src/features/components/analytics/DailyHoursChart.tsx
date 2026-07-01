import {
  Area, AreaChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import SectionLabel from "../../../components/ui/SectionLabel";
import type { useAnalytics } from "./useAnalytics";

type Analytics = ReturnType<typeof useAnalytics>;

export default function DailyHoursChart({ data }: { data: Analytics }) {
  const chartData = data.daily.map((d) => ({
    label: d.isToday ? "today" : d.label,
    hours: Number(d.hours.toFixed(2)),
  }));
  const todayLabel = data.daily.some((d) => d.isToday) ? "today" : null;

  return (
    <section className="space-y-4">
      <SectionLabel>Daily Tracked Hours — Last 7 Days</SectionLabel>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="fillAmber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" axisLine={false} tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }} />
            <YAxis orientation="right" width={36} axisLine={false} tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }} tickFormatter={(v) => `${v}h`} />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8 }}
              labelStyle={{ color: "#a1a1aa" }}
              formatter={(v) => [`${v}h`, "Tracked"]} />
            {todayLabel && <ReferenceLine x={todayLabel} stroke="#f59e0b" strokeDasharray="4 4" />}
            <Area type="monotone" dataKey="hours" stroke="#f59e0b" strokeWidth={2}
              fill="url(#fillAmber)" dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
              activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
