import { Injectable } from '@nestjs/common';
import { Entity } from 'src/Interfaces/interfaces';
import { DbService } from './db.service';
@Injectable()
export class Utils {
  constructor(private dbService: DbService) {}

  nullAnyMention(type: string, { nameId, valueId }) {
    const items = this.dbService.getMany(type);
    items.forEach((item: Entity) => {
      if (item[nameId] === valueId) {
        const updatedObj = { ...item, [nameId]: null };
        this.dbService.updateOne(type, updatedObj.id, updatedObj);
      }
    });
  }
}
