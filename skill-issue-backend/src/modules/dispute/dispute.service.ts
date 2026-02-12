import { Injectable } from '@nestjs/common';
@Injectable()
export class DisputeService {
  getStatus(): string {
    return 'dispute module ready';
  }
}
