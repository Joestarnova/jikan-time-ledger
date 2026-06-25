import { useEffect, useState } from "react";
import { api, type Analytics } from "../../../lib/api";
import { dateKey } from "./format";

export type Period = "today" | "7d" | "30d";

// The shape the chart components consume (AnalyticsSummary / DailyHoursChart / TimeDistribution)
type AnalyticsView = {
  totalSeconds: number;
  dailyAverageSeconds: number;
  topSubject: {
    task: { taskName: string; taskColor: string };
    pct: number;
  } | null;
  longest: {
    task: { taskName: string };
    session: { durationSeconds: number; startedAt: string };
  } | null;
  distribution: {
    task: { taskName: string; taskColor: string };
    seconds: number;
    pct: number;
  }[];
  daily: { key: string; label: string; hours: number; isToday: boolean }[];
};

const EMPTY: AnalyticsView = {
  totalSeconds: 0,
  dailyAverageSeconds: 0,
  topSubject: null,
  longest: null,
  distribution: [],
  daily: [],
};

const dayCount = (p: Period) => (p === "today" ? 1 : p === "7d" ? 7 : 30);

// Build one continuous bucket per calendar day, filled from the backend breakdown
function buildDaily(res: Analytics, period: Period): AnalyticsView["daily"] {
  const byDate = new Map(
    res.dailyBreakdown.map((d) => [d.date, d.totalSeconds]),
  );
  const todayKey = dateKey(new Date());
  const days = dayCount(period);

  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() - (days - 1));

  const out: AnalyticsView["daily"] = [];
  for (let i = 0; i < days; i++) {
    const key = dateKey(cursor);
    const secs = byDate.get(key) ?? 0;
    out.push({
      key,
      label: cursor.toLocaleDateString([], { weekday: "narrow" }),
      hours: secs / 3600,
      isToday: key === todayKey,
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

function toView(res: Analytics, period: Period): AnalyticsView {
  return {
    totalSeconds: res.totalSeconds,
    dailyAverageSeconds: res.dailyAvgSeconds,
    topSubject: res.topTask
      ? {
          task: { taskName: res.topTask.name, taskColor: res.topTask.color },
          pct: res.topTask.percent,
        }
      : null,
    longest: res.longestSession
      ? {
          task: { taskName: res.longestSession.taskName },
          session: {
            durationSeconds: res.longestSession.duration,
            startedAt: res.longestSession.date,
          },
        }
      : null,
    distribution: res.distribution.map((d) => ({
      task: { taskName: d.name, taskColor: d.color },
      seconds: Math.round((res.totalSeconds * d.percent) / 100),
      pct: d.percent,
    })),
    daily: buildDaily(res, period),
  };
}

export function useAnalytics(period: Period) {
  const [data, setData] = useState<AnalyticsView>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    api
      .getAnalytics(period)
      .then((res) => {
        if (!cancelled) setData(toView(res, period));
      })
      .catch((err) => {
        console.error("Failed to load analytics:", err);
        if (!cancelled) setData(EMPTY);
      });
    return () => {
      cancelled = true;
    };
  }, [period]);

  return data;
}
