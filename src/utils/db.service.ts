import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class DbService {
  // private db = {
  //   users: [],
  //   artists: [],
  //   albums: [],
  //   tracks: [],
  //   favorites: {
  //     artists: [],
  //     albums: [],
  //     tracks: [],
  //   },
  // };
  private db = {
    users: [
      {
        id: '1beefcf3-9629-4ef7-b1da-9fbfe6f44d88',
        login: 'User1',
        password: '123',
      },
      {
        id: 'e34c6723-03dd-4ae0-9756-408aad62e337',
        login: 'User2',
        password: '123',
      },
    ],
    artists: [
      {
        id: '56cab85e-b9fc-4cbd-b4cc-4709eb57122c',
        name: 'Artist1',
        grammy: false,
      },
      {
        id: '706f5739-4413-4087-bd76-958443601150',
        name: 'Artist2',
        grammy: true,
      },
    ],
    albums: [
      {
        id: 'bb94b1a5-8b01-429d-9e14-5e23dc365d7c',
        name: 'Album of Artist 1',
        year: 2020,
        artistId: '56cab85e-b9fc-4cbd-b4cc-4709eb57122c',
      },
      {
        id: 'f8c0e77e-72c4-44aa-91ac-1cc6bed9ded2',
        name: 'Album of Artist 2 (faved)',
        year: 2020,
        artistId: '706f5739-4413-4087-bd76-958443601150',
      },
    ],
    tracks: [
      {
        id: '21ed4276-0baa-403a-a8d0-5ec8972df6da',
        artistId: '706f5739-4413-4087-bd76-958443601150',
        AlbumId: 'f8c0e77e-72c4-44aa-91ac-1cc6bed9ded2',
        duration: 50,
      },
    ],
    favorites: {
      artists: ['706f5739-4413-4087-bd76-958443601150'],
      albums: [],
      tracks: ['21ed4276-0baa-403a-a8d0-5ec8972df6da'],
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
