import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { randomUUID } from 'node:crypto';
import { TeamSide } from '../../common/constants/team-side.enum';
import { DRIZZLE_DB } from '../../database/database.constants';
import { lobbiesTable, lobbyPlayersTable } from '../../database/schema';
import { CreateLobbyInput } from './dto/create-lobby.input';
import { JoinLobbyInput } from './dto/join-lobby.input';
import { LobbyType } from './entities/lobby.type';
import type { LobbyRepository } from './lobby.repository';

@Injectable()
export class DrizzleLobbyRepository implements LobbyRepository {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: NodePgDatabase,
  ) {}

  async create(input: CreateLobbyInput, hostUserId: string): Promise<LobbyType> {
    const lobbyId = `lobby_${randomUUID()}`;
    await this.db.transaction(async (tx) => {
      await tx.insert(lobbiesTable).values({
        id: lobbyId,
        game: input.game,
        region: input.region,
        stakePerPlayerCents: input.stakePerPlayerCents,
        status: 'OPEN',
      });

      await tx.insert(lobbyPlayersTable).values({
        lobbyId,
        userId: hostUserId,
        teamSide: TeamSide.A,
      });
    });

    return this.findLobbyById(lobbyId);
  }

  async join(input: JoinLobbyInput, userId: string): Promise<LobbyType> {
    return this.db.transaction(async (tx) => {
      const [lobby] = await tx.select().from(lobbiesTable).where(eq(lobbiesTable.id, input.lobbyId)).limit(1);
      if (!lobby) {
        throw new NotFoundException('Lobby not found');
      }

      const existingPlayers = await tx
        .select()
        .from(lobbyPlayersTable)
        .where(eq(lobbyPlayersTable.lobbyId, input.lobbyId));

      if (existingPlayers.some((player) => player.userId === userId)) {
        return this.toLobbyType(lobby, existingPlayers);
      }

      const teamPlayersCount = existingPlayers.filter((player) => player.teamSide === input.teamSide).length;
      if (teamPlayersCount >= 5) {
        throw new BadRequestException('Team is full');
      }

      await tx.insert(lobbyPlayersTable).values({
        lobbyId: input.lobbyId,
        userId,
        teamSide: input.teamSide,
      });

      const playersAfterJoin = await tx
        .select()
        .from(lobbyPlayersTable)
        .where(eq(lobbyPlayersTable.lobbyId, input.lobbyId));

      const teamAReady = playersAfterJoin.filter((player) => player.teamSide === TeamSide.A).length === 5;
      const teamBReady = playersAfterJoin.filter((player) => player.teamSide === TeamSide.B).length === 5;

      let status = lobby.status;
      if (teamAReady && teamBReady && lobby.status !== 'READY') {
        status = 'READY';
        await tx.update(lobbiesTable).set({ status }).where(eq(lobbiesTable.id, input.lobbyId));
      }

      return this.toLobbyType({ ...lobby, status }, playersAfterJoin);
    });
  }

  async list(): Promise<LobbyType[]> {
    const lobbies = await this.db.select().from(lobbiesTable);
    if (!lobbies.length) {
      return [];
    }

    const lobbyIds = lobbies.map((lobby) => lobby.id);
    const players = await this.db
      .select()
      .from(lobbyPlayersTable)
      .where(inArray(lobbyPlayersTable.lobbyId, lobbyIds));

    return lobbies.map((lobby) => {
      const lobbyPlayers = players.filter((player) => player.lobbyId === lobby.id);
      return this.toLobbyType(lobby, lobbyPlayers);
    });
  }

  private async findLobbyById(lobbyId: string): Promise<LobbyType> {
    const [lobby] = await this.db.select().from(lobbiesTable).where(eq(lobbiesTable.id, lobbyId)).limit(1);
    if (!lobby) {
      throw new NotFoundException('Lobby not found');
    }

    const players = await this.db.select().from(lobbyPlayersTable).where(eq(lobbyPlayersTable.lobbyId, lobbyId));
    return this.toLobbyType(lobby, players);
  }

  private toLobbyType(
    lobby: typeof lobbiesTable.$inferSelect,
    players: Array<typeof lobbyPlayersTable.$inferSelect>,
  ): LobbyType {
    return {
      id: lobby.id,
      game: lobby.game,
      region: lobby.region,
      stakePerPlayerCents: lobby.stakePerPlayerCents,
      teamAUserIds: players.filter((player) => player.teamSide === TeamSide.A).map((player) => player.userId),
      teamBUserIds: players.filter((player) => player.teamSide === TeamSide.B).map((player) => player.userId),
      status: lobby.status,
    };
  }
}
