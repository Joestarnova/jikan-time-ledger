export type Task ={
  id: string;
  taskName: string;
  taskEmoji: string;
  taskColor: string;
  isFavorite: boolean;
};

type TaskRow ={
  id: number;
  name: string;
  emoji: string;
  color: string;
  is_favorite: boolean;
  created_at: string;
}

export function mapTask(row: TaskRow): Task {
  return {
    id: String(row.id),
    taskName: row.name,
    taskEmoji: row.emoji,
    taskColor: row.color,
    isFavorite: row.is_favorite,
  }
}