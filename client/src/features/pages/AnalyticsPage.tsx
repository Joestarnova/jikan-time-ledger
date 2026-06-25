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
      <div className="space-y-10">
        <AnalyticsHeader period={period} setPeriod={setPeriod} />
        <AnalyticsSummary data={data} />
        <DailyHoursChart data={data} />
        <TimeDistribution data={data} />
      </div>
    </Layout>
  );
}
