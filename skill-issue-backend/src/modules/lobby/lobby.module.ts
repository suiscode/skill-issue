import { Module } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { DrizzleLobbyRepository } from './drizzle-lobby.repository';
import { LobbyResolver } from './lobby.resolver';
import { LobbyService } from './lobby.service';
import { LOBBY_REPOSITORY } from './lobby.repository';

@Module({
  providers: [
    LobbyService,
    LobbyResolver,
    GqlAuthGuard,
    DrizzleLobbyRepository,
    {
      provide: LOBBY_REPOSITORY,
      useExisting: DrizzleLobbyRepository,
    },
  ],
  exports: [LobbyService, LOBBY_REPOSITORY],
})
export class LobbyModule {}
