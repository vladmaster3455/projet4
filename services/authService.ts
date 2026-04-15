import db from "@/lib/db";
import { ApiError } from "@/lib/http";

interface UserRow {
  id: number;
  email: string;
  password: string;
  name: string;
}

export function authenticateUser(email: string, password: string) {
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as UserRow | undefined;

  if (!user || user.password !== password) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
}