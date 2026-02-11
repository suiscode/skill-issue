import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const lobbiesTable = pgTable('lobbies', {
  id: text('id').primaryKey(),
  game: text('game').notNull(),
  region: text('region').notNull(),
  stakePerPlayerCents: integer('stake_per_player_cents').notNull(),
  status: text('status').notNull().default('OPEN'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
