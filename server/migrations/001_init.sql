CREATE TABLE IF NOT EXISTS tasks (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  emoji         TEXT,
  color         TEXT,
  is_favorite   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id                SERIAL PRIMARY KEY,
  task_id           INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  started_at        TIMESTAMPTZ NOT NULL,
  ended_at          TIMESTAMPTZ,
  duration_seconds  INTEGER
);
