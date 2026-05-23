import SectionLabel from "../../../components/ui/SectionLabel";
import TaskBar from "./TaskBar";

const tasks = [
  { name: "Deep Work", minutes: 161, color: "bg-amber-500" },
  { name: "Reading", minutes: 82, color: "bg-emerald-400" },
  { name: "Meetings", minutes: 48, color: "bg-blue-500" },
  { name: "Exercise", minutes: 23, color: "bg-violet-500" },
];

export default function CurrentTasks() {
  const max = Math.max(...tasks.map((t) => t.minutes));

  return (
    <section className="space-y-4">
      <SectionLabel trailing="today">Current Tasks</SectionLabel>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskBar
            key={task.name}
            name={task.name}
            minutes={task.minutes}
            maxMinutes={max}
            color={task.color}
          />
        ))}
      </div>
    </section>
  );
}
