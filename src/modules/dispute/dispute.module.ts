import { Module } from '@nestjs/common';
import { DisputeService } from './dispute.service';
@Module({
  providers: [DisputeService],
  exports: [DisputeService],
})
export class DisputeModule {}
