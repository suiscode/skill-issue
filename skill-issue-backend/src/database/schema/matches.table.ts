import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { lobbiesTable } from './lobbies.table';

export const matchesTable = pgTable('matches', {
  id: text('id').primaryKey(),
  lobbyId: text('lobby_id')
    .notNull()
    .references(() => lobbiesTable.id, { onDelete: 'restrict' }),
  betPerPlayerCents: integer('bet_per_player_cents').notNull(),
  status: text('status').notNull().default('OPEN'),
  winnerTeamSide: text('winner_team_side'),
  resultEvidence: text('result_evidence'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
