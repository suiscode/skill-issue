import { Injectable } from '@nestjs/common';
@Injectable()
export class AntiCheatService {
  getStatus(): string {
    return 'anticheat module ready';
  }
}
