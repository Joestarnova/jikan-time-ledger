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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-zinc-950">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>
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
