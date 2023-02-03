import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class DbService {
  private db = {
    users: [{ id: 12, login: 'admin', password: 'admin' }],
    artists: [],
    albums: [],
    tracks: [],
    favorites: [],
  };

  getMany(entityName: string) {
    return this.db[entityName];
  }
  getOne(entityName: string, itemId: string) {
    return (
      this.db[entityName].find((item) => item.id === itemId) ||
      new Error(`No such item`)
    );
  }

  addOne(entityName: string, itemBody) {
    itemBody.id = randomUUID();
    console.log(itemBody.id);
    this.db[entityName].push(itemBody);
  }

  updateOne(entityName: string, itemId: string, updatedItemBody) {
    const item = this.db[entityName].find((item) => item.id === itemId);
    const itemIndex = this.db[entityName].indexOf(item);
    const updatedItem = { ...item, ...updatedItemBody };
    this.db[entityName][itemIndex] = updatedItem;
  }

  deleteOne(entityName: string, itemId: string) {
    const item = this.db[entityName].find((item) => item.id === itemId);
    const itemIndex = this.db[entityName].indexOf(item);
    if (itemIndex === -1) {
      throw new Error(`No such item`);
    }

    this.db[entityName].splice(itemIndex, 1);
  }
}
