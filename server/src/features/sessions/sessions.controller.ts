import type { Request, Response } from "express";
import * as sessionService from "./sessions.service.js";

export async function startSession(req: Request, res: Response) {
  try {
    const { task_id } = req.body;
    if (task_id === undefined) {
      return res.status(400).json({ error: "task_id is required" });
    }
    const session = await sessionService.startSession(task_id);
    res.status(201).json(session);
  } catch (err: any) {
    if (err?.code === "23503") {
      return res.status(404).json({ error: "Task not found" });
    }
    console.error("POST /sessions/start failed:", err);
    res.status(500).json({ error: "Failed to start session" });
  }
}

export async function stopSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid session id" });
    }
    const session = await sessionService.stopSession(id);
    if (!session) {
      return res.status(409).json({ error: "Session is not running" });
    }
    res.status(200).json(session);
  } catch (err) {
    console.error("POST /sessions/:id/stop failed:", err);
    res.status(500).json({ error: "Failed to stop session" });
  }
}

export async function getActiveSession(req: Request, res: Response) {
  try {
    const session = await sessionService.getActiveSession();
    res.status(200).json(session);
  } catch (err) {
    console.error("GET /sessions/active failed:", err);
    res.status(500).json({ error: "Failed to fetch active session" });
  }
}

export async function getSessions(req: Request, res: Response) {
  try {
    const sessions = await sessionService.getSessions({
      taskId: req.query.task_id as string | undefined,
      date: req.query.date as string | undefined,
      from: req.query.from as string | undefined,
      to: req.query.to as string | undefined,
    });
    res.status(200).json(sessions);
  } catch (err) {
    console.error("GET /sessions failed:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
}
