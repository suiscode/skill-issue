import { Injectable } from '@nestjs/common';
@Injectable()
export class NotificationService {
  getStatus(): string {
    return 'notification module ready';
  }
}
