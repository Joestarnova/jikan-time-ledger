import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AddTask from "../components/tasks/AddTask";
import TaskList from "../components/tasks/TaskList";
import type { Task } from "../../types";
import { useTasks } from "../../context/tasks";
import { api } from "../../lib/api";

type TaskDraft = Pick<Task, "taskName" | "taskEmoji" | "taskColor">;

export default function TasksPage() {
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      const data = await api.getTasks();
      if (!cancelled) {
        setTasks(data);
      }
    }

    loadTasks().catch((err) => {
      console.error("Failed to load tasks:", err);
    });

    return () => {
      cancelled = true;
    };
  }, [setTasks]);

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
      <AddTask tasks={tasks} onAddTasks={handleAddTasks} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleFavorite={handleToggleFavorite}
      />
    </Layout>
  );
}
