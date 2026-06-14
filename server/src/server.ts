import express from "express";
import cors from "cors";
import { tasksRouter } from "./features/tasks/tasks.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
