import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class DbService {
  private db = {
    users: [],
    artists: [],
    albums: [],
    tracks: [],
    favorites: [],
  };

  getMany(entityName: string) {
    console.log(this.db[entityName]);
    return this.db[entityName];
  }
  getOne(entityName: string, itemId: string) {
    return this.db[entityName].find((item) => item.id === itemId);
  }

  addOne(entityName: string, itemBody) {
    itemBody.id = randomUUID();
    console.log(itemBody.id);
    this.db[entityName].push(itemBody);
    return itemBody;
  }

  updateOne(entityName: string, itemId: string, updatedItemBody) {
    const item = this.db[entityName].find((item) => item.id === itemId);
    const itemIndex = this.db[entityName].indexOf(item);
    const updatedItem = { ...item, ...updatedItemBody };
    this.db[entityName][itemIndex] = updatedItem;
    return updatedItem;
  }

  deleteOne(entityName: string, itemId: string) {
    const item = this.db[entityName].find((item) => item.id === itemId);
    const itemIndex = this.db[entityName].indexOf(item);
    this.db[entityName].splice(itemIndex, 1);
  }
}
