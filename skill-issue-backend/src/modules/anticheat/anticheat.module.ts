import { Module } from '@nestjs/common';
import { AntiCheatService } from './anticheat.service';
@Module({
  providers: [AntiCheatService],
  exports: [AntiCheatService],
})
export class AntiCheatModule {}
