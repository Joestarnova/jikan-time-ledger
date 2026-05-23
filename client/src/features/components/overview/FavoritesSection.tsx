import SectionLabel from "../../../components/ui/SectionLabel";

type Favorite = {
  name: string;
  color: string;
};

const favorites: Favorite[] = [
  { name: "Reading", color: "bg-emerald-400" },
  { name: "Meetings", color: "bg-blue-500" },
];

function FavoriteCard({
  name,
  color,
  onStart,
}: Favorite & { onStart?: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-900 bg-zinc-900/40 p-4">
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <div>
          <div className="text-sm font-medium text-zinc-100">{name}</div>
          <div className="font-mono text-xs text-zinc-500">Favorited task</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        aria-label={`Start ${name}`}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-zinc-950 transition hover:bg-amber-400"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3.5 w-3.5 translate-x-px"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}

export default function FavoritesSection() {
  return (
    <section className="space-y-4">
      <SectionLabel>Favorites</SectionLabel>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {favorites.map((fav) => (
          <FavoriteCard key={fav.name} {...fav} />
        ))}
      </div>
    </section>
  );
}
