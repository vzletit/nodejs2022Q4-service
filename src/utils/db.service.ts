import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class DbService {
  private db = {
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
    return targetDbArray.find((item) => item.id === itemId);
  }

  addOne(entityName: string, itemBody) {
    if (typeof itemBody === 'object') itemBody.id = randomUUID();
    const target = this.pathByEntity(entityName);
    target.push(itemBody);
    return itemBody;
  }

  updateOne(entityName: string, itemId: string, updatedItemBody) {
    const targetDbArray = this.pathByEntity(entityName);
    const item = targetDbArray.find((item) => item.id === itemId);
    const itemIndex = targetDbArray.indexOf(item);
    const updatedItem = { ...item, ...updatedItemBody };
    targetDbArray[itemIndex] = updatedItem;
    return updatedItem;
  }

  deleteOne(entityName: string, itemId: string) {
    const targetDbArray = this.pathByEntity(entityName);

    const item = targetDbArray.find(
      (item) => item === itemId || item?.id === itemId, // targetDbArray can be string[] or object[]
    );

    if (item) {
      const itemIndex = targetDbArray.indexOf(item);
      targetDbArray.splice(itemIndex, 1);
    }
  }
}
