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
      <div className="space-y-10">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-100">
          {today}
        </h1>

        <WorkingHoursSection />
        <StatsRow />
        <ActiveTimer />
        <CurrentTasks />
        <FavoritesSection />
      </div>
    </Layout>
  );
}
