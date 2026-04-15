import type { Task, TaskInput } from "@/types/task";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function parseResponse<T>(response: Response): Promise<T> {
  let payload: ApiResponse<T> = {};

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    if (!response.ok) {
      throw new Error("Unexpected API error");
    }
  }

  if (!response.ok) {
    throw new Error(payload.error ?? "Unexpected API error");
  }

  if (payload.data === undefined) {
    throw new Error("Missing data in API response");
  }

  return payload.data;
}

export async function loginRequest(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return parseResponse<{ id: number; email: string; name: string }>(response);
}

export async function logoutRequest() {
  const response = await fetch("/api/auth/logout", { method: "POST" });
  return parseResponse<{ success: true }>(response);
}

export async function listTasksRequest() {
  const response = await fetch("/api/tasks", { cache: "no-store" });
  return parseResponse<Task[]>(response);
}

export async function createTaskRequest(input: TaskInput) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  return parseResponse<Task>(response);
}

export async function updateTaskRequest(id: number, input: Partial<TaskInput>) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  return parseResponse<Task>(response);
}

export async function deleteTaskRequest(id: number) {
  const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  return parseResponse<{ success: true }>(response);
}