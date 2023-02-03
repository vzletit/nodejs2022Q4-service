import { Injectable } from '@nestjs/common';
import { DbService } from './utils/db.service';

@Injectable()
export class AppService {
  constructor(private db: DbService) {}
  getAll() {
    return this.db.getAll();
  }
}
