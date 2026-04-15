import { z } from "zod";

export const taskStatusSchema = z.enum(["todo", "in_progress", "done"]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(3, "Title must contain at least 3 characters").max(120),
  description: z.string().trim().min(5, "Description must contain at least 5 characters").max(1000),
  status: taskStatusSchema.default("todo")
});

export const updateTaskSchema = createTaskSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "At least one field must be provided for update"
);