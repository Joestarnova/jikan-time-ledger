import type { Request, Response } from "express";
import * as settingsService from "./settings.service.js";

export async function getSettings(req: Request, res: Response) {
  try {
    const settings = await settingsService.getSettings();
    res.status(200).json(settings);
  } catch (err) {
    console.error("GET /settings failed:", err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
}

export async function patchSettings(req: Request, res: Response) {
  try {
    const { workingHoursStart, workingHoursEnd } = req.body ?? {};

    if (workingHoursStart === undefined && workingHoursEnd === undefined) {
      return res.status(400).json({
        error: "Pleast provide both workingHoursStart and workingHoursEnd",
      });
    }

    if (
      workingHoursStart === undefined &&
      typeof workingHoursStart !== "string"
    ) {
      return res.status(400).json({
        error: "workingHoursStart must be a string",
      });
    }

    if (workingHoursEnd === undefined && typeof workingHoursEnd !== "string") {
      return res.status(400).json({
        error: "workingHoursEnd must be a string",
      });
    }

    const settings = await settingsService.updateSettings({
      workingHoursStart,
      workingHoursEnd,
    });

    return res.status(200).json(settings);
  } catch (err) {
    console.error("PATCH /settings failed:", err);
    res.status(500).json({ error: "Failed to update settings" });
  }
}
