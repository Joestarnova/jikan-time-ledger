import { useState } from "react";
import Layout from "../../components/layout/Layout";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import DailyHoursChart from "../components/analytics/DailyHoursChart";
import TimeDistribution from "../components/analytics/TimeDistribution";
import { useAnalytics, type DateRange } from "../components/analytics/useAnalytics";
import { dateKey } from "../components/analytics/format";

const defaultRange = (): DateRange => {
  const today = new Date();
  const from = new Date();
  from.setDate(today.getDate() - 6);
  return { from: dateKey(from), to: dateKey(today) };
};

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>(defaultRange);
  const [preset, setPreset] = useState("week");
  const data = useAnalytics(range);

  return (
    <Layout>
      <div className="space-y-10">
        <AnalyticsHeader range={range} setRange={setRange} preset={preset} setPreset={setPreset} />
        <AnalyticsSummary data={data} />
        <DailyHoursChart data={data} />
        <TimeDistribution data={data} />
      </div>
    </Layout>
  );
}
