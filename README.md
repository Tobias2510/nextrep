# Hythropa

A fitness tracker app for logging workouts, tracking progress, and hitting personal records.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript (strict mode)
- **UI:** React 19, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Database:** PostgreSQL (or Neon) with Drizzle ORM
- **Auth:** better-auth (email/password)
- **Theme:** Dark mode default, system preference via next-themes

## Prerequisites

- Node.js 20+
- Docker & Docker Compose

## Getting Started

1. **Start the database:**

   ```bash
   docker-compose up -d
   ```

   This starts PostgreSQL (port 5432) and pgAdmin (port 8080).

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy `.env.example` to `.env` (or create `.env`) with:

   ```
   DATABASE_URL=postgresql://root:root@localhost:5432/hythropa_postgres
   BETTER_AUTH_SECRET=<random-secret>
   BETTER_AUTH_URL=http://localhost:3000
   USE_NEON=false
   SHOW_PERSONAL_USE_BANNER=true
   ```

   Set `USE_NEON=true` to use the Neon serverless HTTP driver instead of the standard `pg` Pool.

   Set `SHOW_PERSONAL_USE_BANNER=true` to display a "personal use only" banner on the landing page.

4. **Run database migrations:**

   ```bash
   npx drizzle-kit push
   ```

5. **Start the dev server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

   To test on your phone (same network), access via your machine's IP. Next.js 16 requires `allowedDevOrigins` in `next.config.ts` for this to work.

## Scripts

| Command         | Description           |
| --------------- | --------------------- |
| `npm run dev`   | Start dev server      |
| `npm run build` | Production build      |
| `npm run start` | Run production server |
| `npm run lint`  | Run ESLint            |

## Database

PostgreSQL runs via Docker Compose. pgAdmin is available at [http://localhost:8080](http://localhost:8080) (admin@admin.com / admin).

Schema is managed with Drizzle ORM. To push schema changes:

```bash
npx drizzle-kit push
```
