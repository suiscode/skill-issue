import {
  Global,
  Inject,
  Injectable,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DRIZZLE_DB, PG_POOL } from './database.constants';
import { createDrizzleDb, createPgPool } from './drizzle/drizzle.client';

@Injectable()
class DatabaseLifecycle implements OnModuleDestroy {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}

@Global()
@Module({
  providers: [
    {
      provide: PG_POOL,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString =
          configService.get<string>('DATABASE_URL') ??
          'postgresql://postgres:postgres@127.0.0.1:5432/postgres';
        return createPgPool(connectionString);
      },
    },
    {
      provide: DRIZZLE_DB,
      inject: [PG_POOL],
      useFactory: (pool: Pool) => createDrizzleDb(pool),
    },
    DatabaseLifecycle,
  ],
  exports: [PG_POOL, DRIZZLE_DB],
})
export class DatabaseModule {}
