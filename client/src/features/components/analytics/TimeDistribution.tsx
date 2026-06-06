import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SectionLabel from "../../../components/ui/SectionLabel";
import type { useAnalytics } from "./useAnalytics";

type Analytics = ReturnType<typeof useAnalytics>;

export default function TimeDistribution({ data }: { data: Analytics }) {
  const pieData = data.distribution.map((d) => ({
    name: d.task?.taskName ?? "Unknown",
    value: d.seconds,
    color: d.task?.taskColor ?? "#52525b",
    pct: d.pct,
  }));
  const totalHours = Math.round(data.totalSeconds / 3600);

  return (
    <section className="space-y-6">
      <SectionLabel>Time Distribution</SectionLabel>
      <div className="flex flex-col items-center gap-10 sm:flex-row">
        <div className="relative h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={58} outerRadius={80}
                paddingAngle={2} stroke="none" startAngle={90} endAngle={-270}>
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl text-zinc-100">{totalHours}h</span>
            <span className="text-xs text-zinc-500">total</span>
          </div>
        </div>

        <ul className="w-full flex-1 space-y-3">
          {pieData.map((d, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-3 text-zinc-200">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
              <span className="font-mono text-zinc-500">{Math.round(d.pct)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
