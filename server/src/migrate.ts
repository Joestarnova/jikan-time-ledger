import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url"
import { pool } from "./db.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

async function migrate() {
  const sql = readFileSync(join(__dirname, "../migrations/001_init.sql"), "utf-8");
  try {
    await pool.query(sql);
    console.log("Migration applied succefully");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await pool.end()
  }
}

migrate()