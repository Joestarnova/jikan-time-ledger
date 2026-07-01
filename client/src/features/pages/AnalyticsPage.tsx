import { useState } from "react";
import Layout from "../../components/layout/Layout";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import DailyHoursChart from "../components/analytics/DailyHoursChart";
import TimeDistribution from "../components/analytics/TimeDistribution";
import { useAnalytics, type Period } from "../components/analytics/useAnalytics";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("7d");
  const data = useAnalytics(period);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium tracking-tight text-zinc-100">Analytics</h1>
          <AnalyticsHeader period={period} setPeriod={setPeriod} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <AnalyticsSummary data={data} />
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <TimeDistribution data={data} />
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <DailyHoursChart data={data} />
        </div>
      </div>
    </Layout>
  );
}
