import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';
import { lobbiesTable } from './lobbies.table';
import { usersTable } from './users.table';

export const lobbyPlayersTable = pgTable(
  'lobby_players',
  {
    lobbyId: text('lobby_id')
      .notNull()
      .references(() => lobbiesTable.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    teamSide: text('team_side').notNull(),
    joinedAt: timestamp('joined_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.lobbyId, table.userId] })],
);
