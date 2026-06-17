import type { Task } from "../../../types";
import { useSessions } from "../../../context/sessions";
import styles from "./sessions.module.css";

interface SessionListProps {
  tasks: Task[];
  selected: string;
}

// "14:32"
const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

// "1:55:00"
const formatClock = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const dayKey = (iso: string) => new Date(iso).toDateString();

const dayLabel = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const dateStr = d
    .toLocaleDateString([], { month: "short", day: "numeric" })
    .toUpperCase(); // "APR 24"

  if (d.toDateString() === today.toDateString()) return `TODAY · ${dateStr}`;
  if (d.toDateString() === yesterday.toDateString())
    return `YESTERDAY · ${dateStr}`;
  return dateStr;
};

export default function SessionList({ tasks, selected }: SessionListProps) {
  const { sessions } = useSessions();

  const filtered = sessions
    .filter((s) => selected === "all" || s.taskId === selected)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );

  if (filtered.length === 0) {
    return <div className={styles.empty}>No sessions logged yet.</div>;
  }

  const groups: { key: string; label: string; items: typeof filtered }[] = [];
  for (const session of filtered) {
    const key = dayKey(session.startedAt);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label: dayLabel(session.startedAt), items: [] };
      groups.push(group);
    }
    group.items.push(session);
  }

  return (
    <div>
      {groups.map((group) => (
        <section key={group.key}>
          <h3 className={styles.dayHeader}>{group.label}</h3>
          <ul className={styles.sessionList}>
            {group.items.map((session) => {
              const task = tasks.find((t) => t.id === session.taskId);
              const endAt =
                session.durationSeconds === null
                  ? null
                  : new Date(
                      new Date(session.startedAt).getTime() +
                        session.durationSeconds * 1000,
                    ).toISOString();

              return (
                <li key={session.id} className={styles.sessionItem}>
                  <span
                    className={styles.bar}
                    style={{ backgroundColor: task?.taskColor }}
                  />
                  <div className={styles.info}>
                    <span className={styles.name}>{task?.taskName}</span>
                    <span className={styles.time}>
                      {formatTime(session.startedAt)} → {endAt ? formatTime(endAt) : "now"}
                    </span>
                  </div>
                  <span className={styles.duration}>
                    {session.durationSeconds === null ? "running…" : formatClock(session.durationSeconds)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
