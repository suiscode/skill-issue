import { Inject, Injectable } from '@nestjs/common';
import { WalletBalanceType } from './entities/wallet-balance.type';
import { WALLET_REPOSITORY } from './wallet.repository';
import type { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    @Inject(WALLET_REPOSITORY)
    private readonly walletRepository: WalletRepository,
  ) {}

  getWalletBalance(userId: string): Promise<WalletBalanceType> {
    return this.walletRepository.getWalletBalance(userId);
  }
}
