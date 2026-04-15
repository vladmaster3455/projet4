import { handleApiError, jsonResponse } from "@/lib/http";
import { requireAuth } from "@/lib/serverAuth";

export async function GET() {
  try {
    const user = requireAuth();
    return jsonResponse({ data: user });
  } catch (error) {
    return handleApiError(error);
  }
}