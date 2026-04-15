import jwt from "jsonwebtoken";

interface AuthPayload {
  userId: number;
  email: string;
}

const TOKEN_EXPIRY = "1d";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  return secret;
}

export function signAuthToken(payload: AuthPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_EXPIRY });
}

export function verifyAuthToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as AuthPayload;
  } catch {
    return null;
  }
}

export type { AuthPayload };