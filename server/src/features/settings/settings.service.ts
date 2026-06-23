import { pool } from "../../config/db.js";
import { mapSettings } from "./settings.mapper.js";
import type { Settings, SettingsRow } from "./settings.mapper.js";


const DEFAULT_SETTINGS: Settings = {
  workingHoursStart: "08:00",
  workingHoursEnd: "18:00",
};

export async function getSettings(): Promise<Settings> {
  const result = await pool.query<SettingsRow>(
    "SELECT working_hours_start, working_hours_end FROM settings WHERE id = 1",
  );

  if (result.rows.length === 0) {
    return DEFAULT_SETTINGS;
  }

  const row = result.rows[0];

  if (!row) {
    return DEFAULT_SETTINGS;
  }

  return mapSettings(row);
}

export async function updateSettings(
  fields: Partial<Settings>,
): Promise<Settings> {
  const current = await getSettings();

  const next: Settings = {
    workingHoursStart: fields.workingHoursStart ?? current.workingHoursStart,
    workingHoursEnd: fields.workingHoursEnd ?? current.workingHoursEnd,
  };

  await pool.query(
    `INSERT INTO settings (id, working_hours_start, working_hours_end)
     VALUES (1, $1, $2)
     ON CONFLICT (id) DO UPDATE
     SET working_hours_start = EXCLUDED.working_hours_start,
         working_hours_end = EXCLUDED. working_hours_end`,
    [next.workingHoursStart, next.workingHoursEnd],
  );

  return next;
}
