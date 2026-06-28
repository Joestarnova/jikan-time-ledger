import SectionLabel from "../../../components/ui/SectionLabel";
import TaskBar from "./TaskBar";
import { useTasks } from "../../../context/tasks";
import { useSessions } from "../../../context/sessions";
import { useActiveSession } from "../../../context/activeSession";



export default function CurrentTasks() {
  const { tasks, isLoading } = useTasks();
  const { sessions } = useSessions();
    const { start, activeSession } = useActiveSession();


  const isToday = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const minutesByTask = sessions
    .filter((s) => isToday(s.startedAt))
    .reduce<Record<string, number>>((acc, s) => {
      acc[s.taskId] = (acc[s.taskId] ?? 0) + (s.durationSeconds ?? 0) / 60;
      return acc;
    }, {});

  const minutesFor = (id: string) => Math.round(minutesByTask[id] ?? 0);

  const totalMinutes = Math.max(
  1,
  tasks.reduce((sum, t) => sum + minutesFor(t.id), 0)
);

  return (
    <section className="space-y-4">
      <SectionLabel trailing="today">Current Tasks</SectionLabel>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-zinc-500">{isLoading ? "Loading....": "No tasks yet"}</p>
        ) : (
                    tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <div className="flex-1">
                <TaskBar
                  name={task.taskName}
                  minutes={minutesFor(task.id)}
                  totalMinutes={totalMinutes}
                  taskColor={task.taskColor}
                />
              </div>
              <button
                type="button"
                onClick={() => start(task.id)}
                disabled={!!activeSession}
                aria-label={`Start timer for ${task.taskName}`}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 text-xs text-zinc-300 transition hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-30 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300"
              >
                ▶
              </button>
            </div>
          ))

        )}
      </div>
    </section>
  );
}
