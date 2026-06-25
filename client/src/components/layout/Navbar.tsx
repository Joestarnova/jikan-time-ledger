export default function Navbar() {
  const today = new Date();
  const dateLabel = today
    .toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
    .toUpperCase()
    .replace(",", "");

  return (
    <header className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-3">
     
        <div className="text-lg font-semibold tracking-tight">
          <span className="text-white">Time</span>
          <span className="text-amber-500">Ledger</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 font-mono text-xs tracking-wider text-zinc-300">
          {dateLabel}
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-xs font-semibold tracking-wider text-zinc-200">
          KM
        </div>
      </div>
    </header>
  );
}
