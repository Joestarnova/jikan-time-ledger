import { pool } from "../../config/db.js";
import { mapTask } from "./tasks.mapper.js";
import type { Task } from "./tasks.mapper.js";

export async function getAllTasks(): Promise<Task[]> {
  const result = await pool.query("SELECT * FROM tasks ORDER BY created_at");
  return result.rows.map(mapTask);
}

export async function createTask(
  taskName: string,
  taskEmoji: string,
  taskColor: string,
): Promise<Task> {
  const result = await pool.query(
    "INSERT INTO tasks (name, emoji, color) VALUES ($1, $2, $3) RETURNING *",
    [taskName, taskEmoji, taskColor],
  );
  return mapTask(result.rows[0]);
}

export async function updateTask(
  id: string,
  fields: {
    taskName?: string;
    taskEmoji?: string;
    taskColor?: string;
    isFavorite?: boolean;
  },
): Promise<Task | null> {
  const result = await pool.query(
    `UPDATE tasks
          SET name            = COALESCE($1, name),
              emoji           = COALESCE($2, emoji),
              color           = COALESCE($3, color),
              is_favorite     = COALESCE($4, is_favorite)
       WHERE id = $5
       RETURNING *`,
    [
      fields.taskName ?? null,
      fields.taskEmoji ?? null,
      fields.taskColor ?? null,
      fields.isFavorite ?? null,
      id,
    ],
  );
  if (result.rows.length === 0) return null;
  return mapTask(result.rows[0]);
}

export async function deleteTask(id: string): Promise<boolean> {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return result.rowCount !== 0;
}
