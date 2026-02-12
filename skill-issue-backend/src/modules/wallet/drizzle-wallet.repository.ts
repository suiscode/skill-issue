import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB } from '../../database/database.constants';
import { walletBalancesTable } from '../../database/schema';
import { WalletBalanceType } from './entities/wallet-balance.type';
import type { WalletRepository } from './wallet.repository';

@Injectable()
export class DrizzleWalletRepository implements WalletRepository {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: NodePgDatabase,
  ) {}

  async getWalletBalance(userId: string): Promise<WalletBalanceType> {
    const [walletBalance] = await this.db
      .select()
      .from(walletBalancesTable)
      .where(eq(walletBalancesTable.userId, userId))
      .limit(1);

    if (!walletBalance) {
      return {
        availableCents: 0,
        escrowedCents: 0,
        currency: 'USD',
      };
    }

    return {
      availableCents: walletBalance.availableCents,
      escrowedCents: walletBalance.escrowedCents,
      currency: walletBalance.currency,
    };
  }
}
