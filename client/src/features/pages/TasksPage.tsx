import Layout from "../../components/layout/Layout";
import AddTask from "../components/tasks/AddTask";
import TaskList from "../components/tasks/TaskList";
import { useState } from "react"

export default function TasksPage() {
  type Task = { taskEmoji: string; taskName: string; taskColor: string; id: string };

  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTasks = (task: Task) => {
    setTasks((tasks) => [...tasks, task])
  }

  const handleDeleteTask = (id: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <Layout>
      <AddTask tasks={tasks} onAddTasks={handleAddTasks}/>
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </Layout>
  );
}
 