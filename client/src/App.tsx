import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { useState } from "react"
import type { Task } from "./types";
import OverviewPage from "./features/pages/OverviewPage";
import AnalyticsPage from "./features/pages/AnalyticsPage";
import SessionsPage from "./features/pages/SessionsPage";
import TasksPage from "./features/pages/TasksPage";


export default function App() {

    const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/sessions" element={<SessionsPage tasks={tasks} />} />
        <Route path="/tasks" element={<TasksPage tasks={tasks} setTasks={setTasks}/>} />
      </Routes>
    </>
  );
}
