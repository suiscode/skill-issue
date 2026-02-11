import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';

export const walletBalancesTable = pgTable('wallet_balances', {
  userId: text('user_id')
    .primaryKey()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  availableCents: integer('available_cents').notNull().default(0),
  escrowedCents: integer('escrowed_cents').notNull().default(0),
  currency: text('currency').notNull().default('USD'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
