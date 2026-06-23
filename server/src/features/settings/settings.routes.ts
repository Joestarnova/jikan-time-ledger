import { Router } from "express";
import { getSettings, patchSettings } from "./settings.controller.js";

export const settingsRouter = Router()

settingsRouter.get("/", getSettings);
settingsRouter.patch("/", patchSettings);