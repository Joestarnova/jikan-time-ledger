import Layout from "../../components/layout/Layout";
import ActiveTimer from "../components/overview/ActiveTimer";
import CurrentTasks from "../components/overview/CurrentTasks";
import FavoritesSection from "../components/overview/FavoritesSection";
import StatsRow from "../components/overview/StatsRow";
import WorkingHoursSection from "../components/overview/WorkingHoursSection";

export default function OverviewPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-100">
          {today}
        </h1>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <WorkingHoursSection />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <StatsRow />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <ActiveTimer />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <CurrentTasks />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <FavoritesSection />
        </div>
      </div>
    </Layout>
  );
}
