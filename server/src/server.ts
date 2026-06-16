import express from "express";
import cors from "cors";
import { tasksRouter } from "./features/tasks/tasks.routes.js";
import { sessionsRouter } from "./features/sessions/sessions.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);
app.use("/api/sessions", sessionsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
