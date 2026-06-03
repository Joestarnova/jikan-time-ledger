import { useState } from "react";
import SectionLabel from "../../../components/ui/SectionLabel";


export default function WorkingHoursSection() {
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("18:00");
  
  return (
    <section className="space-y-4">
      <SectionLabel>Working Hours</SectionLabel>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TimeField label="Start" value={start} onChange={setStart} />
        <TimeField label="End" value={end} onChange={setEnd} />
      </div>
      <p className="font-mono text-xs text-zinc-500">
        Day resets at {start} based on your working-hours start.
      </p>
    </section>
  );
}

function TimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (        
    <label className="block">
      <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
        {label}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900/50 px-4 py-3 focus-within:border-amber-500/50">
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent font-mono text-base tracking-wider text-zinc-100 outline-none scheme-dark"
        />
      </div>
    </label>
  );
}