"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { loginRequest } from "@/lib/clientApi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("student@demo.dev");
  const [password, setPassword] = useState("demo1234");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!active) {
          return;
        }

        if (response.ok) {
          router.replace("/dashboard");
          return;
        }
      } catch {
        // Ignore network errors and keep login form available.
      } finally {
        if (active) {
          setIsCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await loginRequest(email, password);

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network error while contacting server";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingSession) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
        <p>Verification de la session...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          border: "1px solid #d9e2ec",
          borderRadius: "12px",
          padding: "1.5rem"
        }}
      >
        <h1 style={{ marginTop: 0 }}>Connexion</h1>

        <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.6rem" }}
        />

        <label htmlFor="password" style={{ display: "block", marginBottom: "0.25rem" }}>
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.6rem" }}
        />

        {errorMessage ? <p style={{ color: "#c92a2a" }}>{errorMessage}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "0.7rem",
            border: "none",
            borderRadius: "8px",
            color: "white",
            background: "#0b7285",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}