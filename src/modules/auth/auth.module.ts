import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { SupabaseAuthService } from './supabase-auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, SupabaseAuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
