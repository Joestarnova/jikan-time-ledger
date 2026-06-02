import Layout from "../../components/layout/Layout";
import AddTask from "../components/tasks/AddTask";
import TaskList from "../components/tasks/TaskList";
import type { Task } from "../../types";
import { useTasks } from '../../context/useTasks'

export default function TasksPage() {
  const {tasks, setTasks} = useTasks()

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
 