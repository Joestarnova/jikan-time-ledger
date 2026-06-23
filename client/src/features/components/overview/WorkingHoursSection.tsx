import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import toast from "react-hot-toast";
import SectionLabel from "../../../components/ui/SectionLabel";

export default function WorkingHoursSection() {
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("18:00");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const settings = await api.getSettings();
        if (cancelled) return;
        setStart(settings.workingHoursStart);
        setEnd(settings.workingHoursEnd);
      } catch {
        toast.error("Failed to load working hours");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave() {
    setSaving(true);

    try {
      await api.patchSettings({
        workingHoursStart: start,
        workingHoursEnd: end,
      });
      toast.success("Working hours saved");
    } catch {
      toast.error("Failed to save working hours");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-4">
      <SectionLabel>Working Hours</SectionLabel>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TimeField label="Start" value={start} onChange={setStart} />
        <TimeField label="End" value={end} onChange={setEnd} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-zinc-500">
          Day resets at {start} based on your working-hours start.
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading || saving}
          className="rounded=md border border-zinc-700 px-3 py-2 text-xs text-zinc-200 transition hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-40"
        >
          {saving ? "Saving..." : loading ? "Loading..." : "Save"}
        </button>
      </div>
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
