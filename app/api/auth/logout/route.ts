import { cookies } from "next/headers";

import { jsonResponse } from "@/lib/http";

export async function POST() {
  cookies().delete("token");
  return jsonResponse({ data: { success: true } });
}