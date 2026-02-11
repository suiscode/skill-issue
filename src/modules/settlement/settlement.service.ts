import { Injectable } from '@nestjs/common';
@Injectable()
export class SettlementService {
  getStatus(): string {
    return 'settlement module ready';
  }
}
