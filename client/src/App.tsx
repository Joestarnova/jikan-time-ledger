import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { TasksProvider } from "./context/tasks";
import { SessionsProvider } from "./context/sessions";
import OverviewPage from "./features/pages/OverviewPage";
import AnalyticsPage from "./features/pages/AnalyticsPage";
import SessionsPage from "./features/pages/SessionsPage";
import TasksPage from "./features/pages/TasksPage";
import { ActiveSessionProvider } from "./context/activeSession";


export default function App() {

  return (
    <>
      <Toaster />
      <TasksProvider>
        <SessionsProvider>
          <ActiveSessionProvider>
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
            </Routes>
          </ActiveSessionProvider>
        </SessionsProvider>
      </TasksProvider>
    </>
  );
}
