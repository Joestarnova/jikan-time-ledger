import { NavLink } from "react-router";

const tabs = [
  { to: "/", label: "Overview", end: true },
  { to: "/tasks", label: "Tasks" },
  { to: "/sessions", label: "Sessions" },
  { to: "/analytics", label: "Analytics" },
];

export default function TabNav() {
  return (
    <nav className="flex items-center gap-6 border-b border-zinc-800">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `relative py-3 text-sm transition-colors,
              ${isActive ? "text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`
          }
        >
          {({ isActive }) => (
            <>
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-amber-500" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

