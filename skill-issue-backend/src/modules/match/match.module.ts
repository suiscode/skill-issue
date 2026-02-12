import { Module } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { DrizzleMatchRepository } from './drizzle-match.repository';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';
import { MATCH_REPOSITORY } from './match.repository';

@Module({
  providers: [
    MatchService,
    MatchResolver,
    GqlAuthGuard,
    DrizzleMatchRepository,
    {
      provide: MATCH_REPOSITORY,
      useExisting: DrizzleMatchRepository,
    },
  ],
  exports: [MatchService, MATCH_REPOSITORY],
})
export class MatchModule {}
