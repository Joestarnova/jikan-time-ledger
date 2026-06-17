import { pool } from "../../config/db.js";
import { mapSession } from "./sessions.mapper.js";
import type { Session } from "./sessions.mapper.js";

export async function getActiveSession(): Promise<Session | null> {
  const result = await pool.query(
    "SELECT * FROM sessions WHERE ended_at IS NULL ORDER BY started_at DESC LIMIT 1",
  );
  if (result.rows.length === 0) return null;
  return mapSession(result.rows[0]);
}

export async function stopSession(id: string): Promise<Session | null> {
  const result = await pool.query(
    `UPDATE sessions 
          SET ended_at = now(), 
              duration_seconds = EXTRACT(EPOCH FROM NOW() - started_at)::int 
        WHERE id = $1 AND ended_at IS NULL 
        RETURNING *`,
    [id],
  );
  if (result.rows.length === 0) return null;
  return mapSession(result.rows[0]);
}

export async function getSessions(filters: {
  taskId?: string | undefined;
  date?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
}): Promise<Session[]> {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (filters.taskId) {
    params.push(filters.taskId);
    clauses.push(`task_id = $${params.length}`);
  }

  if (filters.from || filters.to) {
    if (filters.from) {
      params.push(filters.from);
      clauses.push(`started_at >= $${params.length}`);
    }
    if (filters.to) {
      params.push(filters.to);
      clauses.push(`started_at < $${params.length}`);
    }
  } else if (filters.date) {
    params.push(filters.date);
    clauses.push(`started_at >= $${params.length}::date`);
    clauses.push(`started_at < $${params.length}::date + 1`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await pool.query(
    `SELECT * FROM sessions ${where} ORDER BY started_at DESC`,
    params,
  );
  return result.rows.map(mapSession);
}

export async function startSession(taskId: string): Promise<Session> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    //1. stop any running session
    await client.query(
      `UPDATE sessions
          SET ended_at = NOW(),
              duration_seconds = EXTRACT(EPOCH FROM NOW() - started_at)::int
        WHERE ended_at IS NULL`,
    );

    //2. open new session
    const result = await client.query(
      "INSERT INTO sessions (task_id, started_at) VALUES ($1, NOW()) RETURNING *",
      [taskId],
    );

    await client.query("COMMIT");
    return mapSession(result.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
