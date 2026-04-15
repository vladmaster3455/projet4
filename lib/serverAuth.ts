import { cookies } from "next/headers";

import { verifyAuthToken } from "@/lib/auth";
import { ApiError } from "@/lib/http";

export function requireAuth() {
  const token = cookies().get("token")?.value;
  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    throw new ApiError(401, "Invalid or expired session");
  }

  return payload;
}