# NextRep

A fitness tracker app for logging workouts, tracking progress, and hitting personal records.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript (strict mode)
- **UI:** React 19, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** better-auth (email/password, OAuth)
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
   DATABASE_URL=postgresql://root:root@localhost:5432/nextrep_postgres
   BETTER_AUTH_SECRET=<random-secret>
   BETTER_AUTH_URL=http://localhost:3000
   ```

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

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                  # Pages and routes (App Router)
│   ├── api/auth/         # Auth API endpoints (better-auth)
│   ├── home/             # Dashboard (authenticated)
│   ├── login/            # Login page
│   ├── page.tsx          # Landing page
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # shadcn/ui primitives
│   └── landing/          # Landing page sections
├── db/
│   ├── schema.ts         # Database schema
│   └── auth-schema.ts    # Auth tables (user, session, account)
└── lib/
    ├── auth.ts           # Auth server config
    ├── auth-client.ts    # Auth client
    ├── db-connection.ts  # Drizzle + PostgreSQL connection
    └── utils.ts          # Utilities (cn helper)
```

## Database

PostgreSQL runs via Docker Compose. pgAdmin is available at [http://localhost:8080](http://localhost:8080) (admin@admin.com / admin).

Schema is managed with Drizzle ORM. To push schema changes:

```bash
npx drizzle-kit push
```
