import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Entity, Db } from 'src/Interfaces/interfaces';

@Injectable()
export class DbService {
  private db: Db = {
    users: [],
    artists: [],
    albums: [],
    tracks: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

  private pathByEntity(path: string) {
    if (path.includes('/')) {
      const pathArr = path.split('/');
      return this.db[pathArr[0]][pathArr[1]];
    }
    return this.db[path];
  }

  getAll() {
    return this.db;
  }

  getMany(entityName: string) {
    return this.pathByEntity(entityName);
  }
  getOne(entityName: string, itemId: string) {
    const targetDbArray = this.pathByEntity(entityName);
    return targetDbArray.find((item: Entity) => item.id === itemId);
  }

  addOne<T>(entityName: string, itemBody: T): T {
    const targetArr = this.pathByEntity(entityName);
    let result: T = itemBody;

    if (typeof itemBody === 'object') {
      result = { ...itemBody, id: randomUUID() };
    }

    targetArr.push(result);
    return result;
  }

  updateOne<T>(entityName: string, itemId: string, updatedItemBody: T): T {
    const targetDbArray = this.pathByEntity(entityName);
    const item = targetDbArray.find((item: Entity) => item.id === itemId);
    const itemIndex = targetDbArray.indexOf(item);
    const updatedItem = { ...item, ...updatedItemBody };
    targetDbArray[itemIndex] = updatedItem;
    return updatedItem;
  }

  deleteOne(entityName: string, itemId: string) {
    const targetDbArray = this.pathByEntity(entityName);

    const item = targetDbArray.find((item: Entity | string) =>
      typeof item === 'object' ? item.id === itemId : item === itemId,
    );

    if (item) {
      const itemIndex = targetDbArray.indexOf(item);
      targetDbArray.splice(itemIndex, 1);
    }
  }
}
