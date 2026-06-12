// "1h 23m" / "23m"
export const formatHm = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h === 0 ? `${m}m` : `${h}h ${m}m`;
};

// Date -> "yyyy-mm-dd" (matches <input type="date"> value, local time)
export const dateKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const startOfDay = (s: string) => new Date(`${s}T00:00:00`);
export const endOfDay = (s: string) => new Date(`${s}T23:59:59.999`);
