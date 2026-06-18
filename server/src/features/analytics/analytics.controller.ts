import type { Request, Response } from "express";
import { fetchAnalytics } from "./analytics.service.js";

const ALLOWED_PERIODS = new Set(["7d", "30d", "today", "yesterday"]);

export async function getAnalytics(req: Request, res: Response) {
  try {
    const period = req.query.period;

    if (typeof period !== "string" || !ALLOWED_PERIODS.has(period)) {
      return res
        .status(400)
        .json({ error: "Invalid period. Use 7d, 30d, today or yesterday" });
    }

    const analytics = await fetchAnalytics(
      period as "7d" | "30d" | "today" | "yesterday",
    );
    return res.status(200).json(analytics);
  } catch (err) {
    console.error("GET /api/analytics failed:", err);
    return res.status(500).json({ error: "Failed to fetch analytics" });
  }
}
