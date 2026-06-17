import { Router } from "express";
import {
  startSession,
  stopSession,
  getActiveSession,
  getSessions,
} from "./sessions.controller.js";

export const sessionsRouter = Router();

sessionsRouter.post("/start", startSession);
sessionsRouter.post("/:id/stop", stopSession);
sessionsRouter.get("/active", getActiveSession);
sessionsRouter.get("/", getSessions);
