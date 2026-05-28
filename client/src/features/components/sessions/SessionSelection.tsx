import type { Task } from "../../../types"
import styles from "./sessions.module.css"

interface SessionSelectionProps {
  tasks: Task[];
}
interface SelectionProps {
  task: Task;
}


export default function SessionSelection({tasks}: SessionSelectionProps ) {
  return (
    <div>
      <div>All</div>
      {tasks.map((task) => <Selection key={task.id} task={task}/>)}
    </div>
  )
}


function Selection({task}: SelectionProps) {
  return (
    <div className={styles.selection}>
      {task.taskName}
    </div>
  )
}