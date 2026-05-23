import SectionLabel from "../../../components/ui/SectionLabel";

type Stat = {
  label: string;
  value: string;
  caption: string;
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
      <div className="text-xs text-zinc-500">{caption}</div>
    </div>
  );
}

export default function StatsRow() {
  return (
    <section className="grid grid-cols-1 gap-8 border-t border-zinc-900 pt-6 md:grid-cols-2">
      <StatBlock
        label="Tracked Today"
        value="5h 14m"
        caption="+38m vs yesterday"
        accent
      />
      <StatBlock label="Tasks" value="7" caption="completed today" />
    </section>
  );
}
