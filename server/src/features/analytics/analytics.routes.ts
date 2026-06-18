import { Router } from "express";
import { getAnalytics } from "./analytics.controller.js";

export const analyticsRouter = Router();

analyticsRouter.get("/", getAnalytics);