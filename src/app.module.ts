import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AntiCheatModule } from './modules/anticheat/anticheat.module';
import { AuthModule } from './modules/auth/auth.module';
import { DisputeModule } from './modules/dispute/dispute.module';
import { HealthModule } from './modules/health/health.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { LobbyModule } from './modules/lobby/lobby.module';
import { MatchModule } from './modules/match/match.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SettlementModule } from './modules/settlement/settlement.module';
import { UsersModule } from './modules/users/users.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { DatabaseModule } from './database/database.module';
import { RealtimeModule } from './realtime/realtime.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    DatabaseModule,
    RealtimeModule,
    AuthModule,
    UsersModule,
    WalletModule,
    LedgerModule,
    LobbyModule,
    MatchModule,
    SettlementModule,
    AntiCheatModule,
    DisputeModule,
    NotificationModule,
    AdminModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
