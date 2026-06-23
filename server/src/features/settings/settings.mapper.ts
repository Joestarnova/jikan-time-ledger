export type Settings = {
  workingHoursStart: string;
  workingHoursEnd: string;
};

export type SettingsRow = {
  working_hours_start: string;
  working_hours_end: string;
};

export function mapSettings(row: SettingsRow): Settings {
  return {
    workingHoursStart: row.working_hours_start,
    workingHoursEnd: row.working_hours_end,
  };
}