import type { Request, Response } from "express";
import { pool } from "../../config/db.js";
import { mapTask } from "./tasks.mapper.js";
import * as taskService from "./tasks.service.js";

export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error("GET /tasks failed:", err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const { taskName, taskEmoji, taskColor } = req.body;
    const task = await taskService.createTask(taskName, taskEmoji, taskColor);
    res.status(201).json(task);
  } catch (err) {
    console.error("POST /tasks failed:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid task id" });
    }
    const { taskName, taskEmoji, taskColor, isFavorite } = req.body;
    const task = await taskService.updateTask(id, {
      taskName,
      taskEmoji,
      taskColor,
      isFavorite,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error("PATCH /tasks/:id failed:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid task id" });
    }
    const deleted = await taskService.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /tasks/:id failed:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
}
