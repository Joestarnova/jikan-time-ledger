CREATE TABLE IF NOT EXISTS settings (
  id                  integer PRIMARY KEY CHECK (id = 1),
  working_hours_start time NOT NULL DEFAULT '08:00',
  working_hours_end   time NOT NULL DEFAULT '18:00'
);

INSERT INTO settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;