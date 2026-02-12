import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import type { AuthUser } from '../../common/types/auth-user.type';
import { WalletBalanceType } from './entities/wallet-balance.type';
import { WalletService } from './wallet.service';

@Resolver()
export class WalletResolver {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => WalletBalanceType)
  walletBalance(@CurrentUser() user: AuthUser): Promise<WalletBalanceType> {
    return this.walletService.getWalletBalance(user.userId);
  }
}
