import { cookies } from "next/headers";
import { z } from "zod";

import { signAuthToken } from "@/lib/auth";
import { handleApiError, jsonResponse, readJsonBody } from "@/lib/http";
import { authenticateUser } from "@/services/authService";
import { loginSchema } from "@/validators/authValidator";

export async function POST(request: Request) {
  try {
    const body = await readJsonBody<unknown>(request);
    const { email, password } = loginSchema.parse(body);
    const user = authenticateUser(email, password);

    const token = signAuthToken({
      userId: user.id,
      email: user.email
    });

    cookies().set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24
    });

    return jsonResponse({ data: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ error: error.issues[0]?.message ?? "Invalid payload" }, 400);
    }

    return handleApiError(error);
  }
}