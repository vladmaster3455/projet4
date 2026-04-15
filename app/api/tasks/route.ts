import { z } from "zod";

import { handleApiError, jsonResponse, readJsonBody } from "@/lib/http";
import { requireAuth } from "@/lib/serverAuth";
import { createTask, listTasks } from "@/services/taskService";
import { createTaskSchema } from "@/validators/taskValidator";

export async function GET() {
  try {
    requireAuth();
    const tasks = listTasks();
    return jsonResponse({ data: tasks });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    requireAuth();
    const body = await readJsonBody<unknown>(request);
    const validated = createTaskSchema.parse(body);
    const task = createTask(validated);
    return jsonResponse({ data: task }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ error: error.issues[0]?.message ?? "Invalid payload" }, 400);
    }

    return handleApiError(error);
  }
}