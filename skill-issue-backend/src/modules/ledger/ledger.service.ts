import { Injectable } from '@nestjs/common';
@Injectable()
export class LedgerService {
  getStatus(): string {
    return 'ledger module ready';
  }
}
