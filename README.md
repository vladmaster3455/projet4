# Fullstack Internship Demo (Next.js)

Projet full stack realiste pour un profil ingenieur junior (bac+5), base sur Next.js App Router avec backend integre.

## Stack technique

- Next.js 14 (App Router) + TypeScript
- API REST via `app/api`
- SQLite (`better-sqlite3`) pour la persistance
- JWT en cookie HTTP-only pour une authentification simple
- Validation serveur avec `zod`

## Fonctionnalites

- Frontend dynamique (chargement, creation, edition, suppression des taches)
- CRUD complet via API REST
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `GET /api/tasks/:id`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- Authentification
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- Middleware pour proteger la route `/dashboard`
- Gestion d'erreurs cote backend et frontend

## Structure simplifiee

```
app/
  api/
    auth/
    tasks/
  dashboard/
  login/
lib/
  auth.ts
  db.ts
  http.ts
  serverAuth.ts
services/
  authService.ts
  taskService.ts
validators/
  authValidator.ts
  taskValidator.ts
types/
  task.ts
```

## Lancer le projet

1. Installer Node.js 18+.
2. Copier `.env.example` vers `.env.local` et definir `JWT_SECRET`.
3. Installer les dependances:

```bash
npm install
```

4. Demarrer:

```bash
npm run dev
```

## Compte de demonstration

- Email: `student@demo.dev`
- Mot de passe: `demo1234`

Le compte est seed automatiquement au premier lancement dans la base SQLite.