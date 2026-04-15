import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <section
        style={{
          maxWidth: "800px",
          width: "100%",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid #d9e2ec",
          borderRadius: "16px",
          padding: "2rem"
        }}
      >
        <h1 style={{ marginTop: 0 }}>Projet Full Stack - Gestion de Taches</h1>
        <p>
          Application Next.js App Router avec API REST integree, validation serveur, persistance SQLite,
          gestion des erreurs et authentification JWT simple.
        </p>
        <p>
          Identifiants de demo: <strong>student@demo.dev</strong> / <strong>demo1234</strong>
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <Link
            href="/login"
            style={{
              background: "#0b7285",
              color: "white",
              padding: "0.7rem 1rem",
              borderRadius: "8px"
            }}
          >
            Se connecter
          </Link>
          <Link
            href="/dashboard"
            style={{
              border: "1px solid #0b7285",
              color: "#0b7285",
              padding: "0.7rem 1rem",
              borderRadius: "8px"
            }}
          >
            Aller au dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}