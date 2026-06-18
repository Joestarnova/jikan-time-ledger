import { pool } from "../../config/db.js";

type Period = "7d" | "30d" | "today" | "yesterday";

type AnalyticsResponse = {
  totalSeconds: number;
  dailyAvgSeconds: number;
  topTask: { name: string; color: string; percent: number } | null;
  longestSession: { duration: number; taskName: string; date: string } | null;
  dailyBreakdown: { date: string; totalSeconds: number }[];
  distribution: {
    taskId: string;
    name: string;
    color: string;
    percent: number;
  }[];
};

function getUtcWindow(period: Period) {
  const now = new Date();

  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );

  let start: Date;

  if (period === "today") {
    start = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    return { start, end };
  }

  if (period === "yesterday") {
    end.setUTCDate(end.getUTCDate() - 1);
    start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 1);

    return { start, end };
  }

  const daysBack = period === "7d" ? 6 : 29;
  start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - daysBack,
    ),
  );

  return { start, end };
}

export async function fetchAnalytics(
  period: Period,
): Promise<AnalyticsResponse> {
  const { start, end } = getUtcWindow(period);

  const result = await pool.query(
    `WITH filtered AS (
      SELECT
        s.id,
        s.task_id,
        s.started_at,
        s.ended_at,
        s.duration_seconds,
        t.name AS task_name,
        t.color AS task_color,
        (s.started_at AT TIME ZONE 'UTC')::date AS day
      FROM sessions s
      JOIN tasks t ON t.id = s.task_id
      WHERE s.started_at >= $1
        AND s.started_at < $2
        AND s.duration_seconds IS NOT NULL
    ),
    totals AS (
      SELECT
        COALESCE(SUM(duration_seconds), 0)::bigint AS total_seconds
      FROM filtered
    ),
    by_task AS (
      SELECT
        task_id,
        task_name,
        task_color,
        SUM(duration_seconds)::bigint AS seconds
      FROM filtered
      GROUP BY task_id, task_name, task_color
    ),
    daily AS (
      SELECT
        day::text AS date,
        COALESCE(SUM(duration_seconds), 0)::bigint AS total_seconds
      FROM filtered
      GROUP BY day
    ),
    longest AS (
      SELECT
        duration_seconds,
        task_name,
        started_at
      FROM filtered
      ORDER BY duration_seconds DESC, started_at DESC
      LIMIT 1
    )
    SELECT
      (SELECT total_seconds FROM totals) AS total_seconds,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'date', date,
              'totalSeconds', total_seconds
            )
            ORDER BY date
          )
          FROM daily
        ),
        '[]'::json
      ) AS daily_breakdown,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'taskId', task_id::text,
              'name', task_name,
              'color', task_color,
              'percent', CASE
                WHEN (SELECT total_seconds FROM totals) = 0 THEN 0
                ELSE ROUND((seconds::numeric / (SELECT total_seconds FROM totals)) * 100, 2)
              END
            )
            ORDER BY seconds DESC
          )
          FROM by_task
        ),
        '[]'::json
      ) AS distribution,
      (
        SELECT json_build_object(
          'name', task_name,
          'color', task_color,
          'percent', CASE
            WHEN (SELECT total_seconds FROM totals) = 0 THEN 0
            ELSE ROUND((seconds::numeric / (SELECT total_seconds FROM totals)) * 100, 2)
          END
        )
        FROM by_task
        ORDER BY seconds DESC
        LIMIT 1
      ) AS top_task,
      (
        SELECT json_build_object(
          'duration', duration_seconds,
          'taskName', task_name,
          'date', started_at::date::text
        )
        FROM longest
      ) AS longest_session`,
    [start.toISOString(), end.toISOString()],
  );

  const row = result.rows[0];
  const dailyBreakdown = row.daily_breakdown ?? [];
  const totalSeconds = Number(row.total_seconds ?? 0);
  const activeDays = dailyBreakdown.length;

  return {
    totalSeconds,
    dailyAvgSeconds:
      activeDays === 0 ? 0 : Math.round(totalSeconds / activeDays),
    topTask: row.top_task ?? null,
    longestSession: row.longest_session ?? null,
    dailyBreakdown,
    distribution: row.distribution ?? [],
  };
}
