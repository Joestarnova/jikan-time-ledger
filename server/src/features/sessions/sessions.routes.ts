import { Router } from "express";

export const sessionsRouter = Router();

sessionsRouter.post("/start")
sessionsRouter.post("/:id/stop")
sessionsRouter.get("/active")
sessionsRouter.get("/")
