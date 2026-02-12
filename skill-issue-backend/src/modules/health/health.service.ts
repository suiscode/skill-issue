import { Injectable } from '@nestjs/common';
@Injectable()
export class HealthService {
  getStatus(): string {
    return 'health module ready';
  }
}
