import { Module } from '@nestjs/common';
import { DrizzleUsersRepository } from './drizzle-users.repository';
import { UsersService } from './users.service';
import { USERS_REPOSITORY } from './users.repository';

@Module({
  providers: [
    UsersService,
    DrizzleUsersRepository,
    {
      provide: USERS_REPOSITORY,
      useExisting: DrizzleUsersRepository,
    },
  ],

  exports: [UsersService, USERS_REPOSITORY],
})
export class UsersModule {}
