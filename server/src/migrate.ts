import { readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pool } from "./config/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// async function migrate() {
//   const sql = readFileSync(
//     join(__dirname, "../migrations/001_init.sql"),
//     "utf-8",
//   );
//   try {
//     await pool.query(sql);
//     console.log("Migration applied successfully");
//   } catch (err) {
//     console.error("Migration failed:", err);
//   } finally {
//     await pool.end();
//   }
// }

// migrate();

async function migrate() {
  const migrationsDir = join(__dirname, "../migrations");
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW() )`);

    const migrationFiles = readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    const appliedRows = await client.query<{filename: string}>(
      "SELECT filename FROM schema_migrations",
    );
    const applied = new Set(appliedRows.rows.map((row) => row.filename));

    for (const fileName of migrationFiles) {
      if (applied.has(fileName)) {
        continue;
      }

      const sql = readFileSync(join(migrationsDir, fileName), "utf-8");

      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query(
          "INSERT INTO schema_migrations (filename) VALUES ($1)",
          [fileName],
        );
        await client.query("COMMIT");
        console.log(`Applied migration: ${fileName}`);
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    }

    console.log("Migrations completed successfully");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();