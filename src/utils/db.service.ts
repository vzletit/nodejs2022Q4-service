import { Injectable } from '@nestjs/common';
import { Db, Entity } from 'src/Interfaces/interfaces';

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

  async getAll() {
    return this.db;
  }

  async getMany(entityName: string) {
    return this.pathByEntity(entityName);
  }
  async getOne(entityName: string, itemId: string) {
    const targetDbArray = this.pathByEntity(entityName);
    return targetDbArray.find((item: Entity) => item.id === itemId);
  }

  async addOne<T>(entityName: string, itemBody: T) {
    const targetArr = this.pathByEntity(entityName);
    targetArr.push(itemBody);
    return itemBody;
  }

  async updateOne<T>(entityName: string, itemId: string, updatedItemBody: T) {
    const targetDbArray = this.pathByEntity(entityName);
    const item = targetDbArray.find((item: Entity) => item.id === itemId);
    const itemIndex = targetDbArray.indexOf(item);
    const updatedItem = { ...item, ...updatedItemBody };
    targetDbArray[itemIndex] = updatedItem;
    return updatedItem;
  }

  async deleteOne(entityName: string, itemId: string) {
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
