import { WalletBalanceType } from './entities/wallet-balance.type';

export const WALLET_REPOSITORY = Symbol('WALLET_REPOSITORY');

export interface WalletRepository {
  getWalletBalance(userId: string): Promise<WalletBalanceType>;
}
