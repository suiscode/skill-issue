import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';

export const createPgPool = (connectionString: string): Pool =>
  new Pool({
    connectionString,
    ssl: connectionString.includes('supabase.co')
      ? { rejectUnauthorized: false }
      : undefined,
  });

export const createDrizzleDb = (pool: Pool) =>
  drizzle(pool, {
    schema,
  });
