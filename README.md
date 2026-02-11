# skill-issue-backend

NestJS backend scaffold for a skill-based 5v5 betting platform.

This setup is intentionally **without Docker**:
- PostgreSQL: **Supabase**
- Redis: **Redis Cloud**
- Local runtime: **NestJS**
- Deployment: **Railway**

## 1. Prerequisites

- Node.js 20+
- npm 10+
- Supabase project
- Redis Cloud database
- Railway account/project

## 2. Environment Setup

Copy and fill env values:

```bash
cp .env.example .env
```

Required values:

- `DATABASE_URL`: Supabase Postgres connection string
  - Prefer Supabase **transaction pooler** URL for app traffic.
- `REDIS_URL`: Redis Cloud URL
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`

Example formats:

```bash
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@<host>:6543/postgres
REDIS_URL=redis://default:<password>@<host>:<port>
```

## 3. Local Development (No Docker)

Install dependencies:

```bash
npm install
```

Run app:

```bash
npm run start:dev
```

GraphQL endpoint:

- `http://localhost:3000/graphql`

## 4. Database (Drizzle + Supabase)

Schema files live in:

- `src/database/schema`

Drizzle config:

- `drizzle.config.ts`

Commands:

```bash
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

Notes:
- `db:generate` creates SQL migrations from schema changes.
- `db:migrate` applies generated migrations.
- `db:push` applies schema directly (useful early; prefer migrations later).

## 5. Redis (Redis Cloud)

Redis client is configured in:

- `src/realtime/redis.module.ts`

It uses `REDIS_URL` and lazy connection to keep local boot reliable.

## 6. Railway Deployment

`railway.json` is included with:
- build via Nixpacks
- start command: `npm run start:prod`

### Railway steps

1. Create a Railway project and link this repo.
2. Set environment variables in Railway:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `DATABASE_URL` (Supabase)
   - `REDIS_URL` (Redis Cloud)
   - `JWT_ACCESS_SECRET`
   - `JWT_REFRESH_SECRET`
3. Deploy.
4. After deploy, run migrations from CI or a release step using:
   - `npm run db:migrate`

## 7. Scripts

- `npm run start:dev` - dev server
- `npm run build` - compile
- `npm run start:prod` - production start
- `npm run test` - unit tests
- `npm run test:e2e` - e2e tests
- `npm run db:generate` - create migration files
- `npm run db:migrate` - apply migrations
- `npm run db:push` - direct schema push
- `npm run db:studio` - open Drizzle Studio
