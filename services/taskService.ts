import db from "@/lib/db";
import { ApiError } from "@/lib/http";
import type { Task, TaskInput } from "@/types/task";

interface TaskRow {
  id: number;
  title: string;
  description: string;
  status: Task["status"];
  created_at: string;
  updated_at: string;
}

function mapTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function listTasks(): Task[] {
  const rows = db.prepare("SELECT * FROM tasks ORDER BY datetime(created_at) DESC").all() as TaskRow[];
  return rows.map(mapTask);
}

export function getTaskById(id: number): Task {
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as TaskRow | undefined;
  if (!row) {
    throw new ApiError(404, "Task not found");
  }

  return mapTask(row);
}

export function createTask(input: TaskInput): Task {
  const now = new Date().toISOString();
  const result = db
    .prepare(
      "INSERT INTO tasks (title, description, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
    )
    .run(input.title, input.description, input.status, now, now);

  return getTaskById(Number(result.lastInsertRowid));
}

export function updateTask(id: number, input: Partial<TaskInput>): Task {
  const currentTask = getTaskById(id);
  const mergedTask = {
    title: input.title ?? currentTask.title,
    description: input.description ?? currentTask.description,
    status: input.status ?? currentTask.status
  };

  const updatedAt = new Date().toISOString();
  db.prepare("UPDATE tasks SET title = ?, description = ?, status = ?, updated_at = ? WHERE id = ?").run(
    mergedTask.title,
    mergedTask.description,
    mergedTask.status,
    updatedAt,
    id
  );

  return getTaskById(id);
}

export function deleteTask(id: number): void {
  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  if (result.changes === 0) {
    throw new ApiError(404, "Task not found");
  }
}