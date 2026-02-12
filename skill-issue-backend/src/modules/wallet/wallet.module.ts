import { Module } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { DrizzleWalletRepository } from './drizzle-wallet.repository';
import { WalletResolver } from './wallet.resolver';
import { WalletService } from './wallet.service';
import { WALLET_REPOSITORY } from './wallet.repository';

@Module({
  providers: [
    WalletService,
    WalletResolver,
    GqlAuthGuard,
    DrizzleWalletRepository,
    {
      provide: WALLET_REPOSITORY,
      useExisting: DrizzleWalletRepository,
    },
  ],
  exports: [WalletService, WALLET_REPOSITORY],
})
export class WalletModule {}
