import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB } from '../../database/database.constants';
import { usersTable } from '../../database/schema';
import { UserType } from './entities/user.type';
import type { CreateUserParams, UsersRepository } from './users.repository';

@Injectable()
export class DrizzleUsersRepository implements UsersRepository {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: NodePgDatabase,
  ) {}

  async findByEmail(email: string): Promise<UserType | undefined> {
    const [user] = await this.db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    return user ? this.toUserType(user) : undefined;
  }

  async findById(id: string): Promise<UserType | undefined> {
    const [user] = await this.db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    return user ? this.toUserType(user) : undefined;
  }

  async create(params: CreateUserParams): Promise<UserType> {
    const [createdUser] = await this.db
      .insert(usersTable)
      .values({
        id: params.id,
        email: params.email,
        username: params.username,
        passwordHash: params.passwordHash ?? 'SUPABASE_AUTH',
      })
      .returning();

    return this.toUserType(createdUser);
  }

  private toUserType(user: typeof usersTable.$inferSelect): UserType {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      mmr: user.mmr,
      region: user.region,
    };
  }
}
