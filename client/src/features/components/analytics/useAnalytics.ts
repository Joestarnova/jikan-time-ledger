import { useMemo } from "react";
import { useSessions } from "../../../context/sessions";
import { useTasks } from "../../../context/tasks";
import type { Session, Task } from "../../../types";
import { dateKey, startOfDay, endOfDay } from "./format";

export type DateRange = { from: string; to: string }; // yyyy-mm-dd

export function useAnalytics({ from, to }: DateRange) {
  const { sessions } = useSessions();
  const { tasks } = useTasks();

  return useMemo(() => {
    const start = startOfDay(from).getTime();
    const end = endOfDay(to).getTime();

    const inRange = sessions.filter((s) => {
      const t = new Date(s.startedAt).getTime();
      return t >= start && t <= end;
    });

    const totalSeconds = inRange.reduce((sum, s) => sum + (s.durationSeconds ?? 0), 0);

    // active days = distinct calendar days that have at least one session
    const activeDays = new Set(
      inRange.map((s) => dateKey(new Date(s.startedAt)))
    ).size;
    const dailyAverageSeconds =
      activeDays === 0 ? 0 : Math.round(totalSeconds / activeDays);

    // per-task totals -> distribution (sorted desc) -> top subject
    const totals = new Map<string, number>();
    for (const s of inRange) {
      totals.set(s.taskId, (totals.get(s.taskId) ?? 0) + (s.durationSeconds ?? 0));
    }
    const distribution = [...totals.entries()]
      .map(([taskId, seconds]) => ({
        task: tasks.find((t) => t.id === taskId),
        seconds,
        pct: totalSeconds === 0 ? 0 : (seconds / totalSeconds) * 100,
      }))
      .sort((a, b) => b.seconds - a.seconds);

    const topSubject = distribution[0] ?? null;

    // longest single session in range
    let longest: { session: Session; task?: Task } | null = null;
    for (const s of inRange) {
      if (!longest || (s.durationSeconds ?? 0) > (longest.session.durationSeconds?? 0)) {
        longest = { session: s, task: tasks.find((t) => t.id === s.taskId) };
      }
    }

    // one bucket per calendar day across the range (for the area chart)
    const todayKey = dateKey(new Date());
    const daily: { key: string; label: string; hours: number; isToday: boolean }[] = [];
    const cursor = startOfDay(from);
    const last = startOfDay(to).getTime();
    while (cursor.getTime() <= last) {
      const key = dateKey(cursor);
      const secs = inRange
        .filter((s) => dateKey(new Date(s.startedAt)) === key)
        .reduce((sum, s) => sum + (s.durationSeconds ?? 0), 0);
      daily.push({
        key,
        label: cursor.toLocaleDateString([], { weekday: "narrow" }), // M T W…
        hours: secs / 3600,
        isToday: key === todayKey,
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    return {
      totalSeconds,
      activeDays,
      dailyAverageSeconds,
      distribution,
      topSubject,
      longest,
      daily,
    };
  }, [sessions, tasks, from, to]);
}
