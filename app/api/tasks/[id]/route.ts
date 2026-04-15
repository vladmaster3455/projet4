import { z } from "zod";

import { ApiError, handleApiError, jsonResponse, readJsonBody } from "@/lib/http";
import { requireAuth } from "@/lib/serverAuth";
import { deleteTask, getTaskById, updateTask } from "@/services/taskService";
import { updateTaskSchema } from "@/validators/taskValidator";

interface RouteParams {
  params: {
    id: string;
  };
}

function parseId(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, "Invalid task id");
  }

  return id;
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    requireAuth();
    const task = getTaskById(parseId(params.id));
    return jsonResponse({ data: task });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    requireAuth();
    const body = await readJsonBody<unknown>(request);
    const validated = updateTaskSchema.parse(body);
    const task = updateTask(parseId(params.id), validated);
    return jsonResponse({ data: task });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ error: error.issues[0]?.message ?? "Invalid payload" }, 400);
    }

    return handleApiError(error);
  }
}

export async function DELETE(_: Request, { params }: RouteParams) {
  try {
    requireAuth();
    deleteTask(parseId(params.id));
    return jsonResponse({ data: { success: true } });
  } catch (error) {
    return handleApiError(error);
  }
}