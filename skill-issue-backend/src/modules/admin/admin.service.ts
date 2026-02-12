import { Injectable } from '@nestjs/common';
@Injectable()
export class AdminService {
  getStatus(): string {
    return 'admin module ready';
  }
}
