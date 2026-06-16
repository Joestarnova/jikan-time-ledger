export type Session = {
  id: string;
  taskId: string;
  startedAt: string;
  durationSeconds: number | null;
};

type SessionRow = {
  id: number;
  task_id: number;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
}

export function mapSession(row: SessionRow): Session {
  return {
    id: String(row.id),
    taskId: String(row.task_id),
    startedAt: row.started_at,
    durationSeconds: row.duration_seconds,
  }
}