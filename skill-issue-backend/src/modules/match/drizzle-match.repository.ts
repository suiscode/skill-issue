import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { randomUUID } from 'node:crypto';
import { TeamSide } from '../../common/constants/team-side.enum';
import { DRIZZLE_DB } from '../../database/database.constants';
import { matchesTable } from '../../database/schema';
import { CreateMatchInput } from './dto/create-match.input';
import { SubmitMatchResultInput } from './dto/submit-match-result.input';
import { MatchStatus } from './entities/match-status.enum';
import { MatchType } from './entities/match.type';
import type { MatchRepository } from './match.repository';

@Injectable()
export class DrizzleMatchRepository implements MatchRepository {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: NodePgDatabase,
  ) {}

  async create(input: CreateMatchInput): Promise<MatchType> {
    const [createdMatch] = await this.db
      .insert(matchesTable)
      .values({
        id: `match_${randomUUID()}`,
        lobbyId: input.lobbyId,
        betPerPlayerCents: input.betPerPlayerCents,
        status: MatchStatus.OPEN,
      })
      .returning();

    return this.toMatchType(createdMatch);
  }

  async submitResult(input: SubmitMatchResultInput): Promise<MatchType> {
    const [updatedMatch] = await this.db
      .update(matchesTable)
      .set({
        status: MatchStatus.RESULT_PENDING,
        winnerTeamSide: input.winnerTeamSide,
        resultEvidence: input.resultEvidence,
      })
      .where(eq(matchesTable.id, input.matchId))
      .returning();

    if (!updatedMatch) {
      throw new NotFoundException('Match not found');
    }

    return this.toMatchType(updatedMatch);
  }

  async findById(id: string): Promise<MatchType> {
    const [match] = await this.db
      .select()
      .from(matchesTable)
      .where(eq(matchesTable.id, id))
      .limit(1);
    if (!match) {
      throw new NotFoundException('Match not found');
    }

    return this.toMatchType(match);
  }

  async list(): Promise<MatchType[]> {
    const matches = await this.db.select().from(matchesTable);
    return matches.map((match) => this.toMatchType(match));
  }

  private toMatchType(match: typeof matchesTable.$inferSelect): MatchType {
    return {
      id: match.id,
      lobbyId: match.lobbyId,
      betPerPlayerCents: match.betPerPlayerCents,
      status: match.status as MatchStatus,
      winnerTeamSide: match.winnerTeamSide as TeamSide | undefined,
      resultEvidence: match.resultEvidence ?? undefined,
    };
  }
}
