import Layout from "../../components/layout/Layout";
import AddTask from "../components/tasks/AddTask";
import TaskList from "../components/tasks/TaskList";
import type { Task } from "../../types";
import { useTasks } from "../../context/tasks";
import { api } from "../../lib/api";

type TaskDraft = Pick<Task, "taskName" | "taskEmoji" | "taskColor">;

export default function TasksPage() {
  const { tasks, setTasks } = useTasks();

  const handleAddTasks = async (draft: TaskDraft) => {
    const created = await api.createTask(draft);
    setTasks((tasks) => [...tasks, created]);
  };

  const handleDeleteTask = async (id: string) => {
    await api.deleteTask(id);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const handleToggleFavorite = async (id: string) => {
    const current = tasks.find((tasks) => tasks.id === id);
    if (!current) return;
    const updated = await api.updateTask(id, {
      isFavorite: !current.isFavorite,
    });

    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-100">Tasks</h1>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <AddTask tasks={tasks} onAddTasks={handleAddTasks} />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
    </Layout>
  );
}
