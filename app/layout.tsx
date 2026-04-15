import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fullstack Demo - Internship Project",
  description: "Next.js fullstack demo with REST API, SQLite and JWT auth"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}