import { Injectable } from '@nestjs/common';
import { Entity } from 'src/Interfaces/interfaces';
import { DbService } from '../../utils/db.service';

@Injectable()
export class FavoritesService {
  constructor(private dbService: DbService) {}

  async getFavs() {
    const allFavsObj = await this.dbService.getMany('favorites');

    const getFavItems = (arr: Entity[], arrKeys: string[]) =>
      arr.filter((item: Entity) => arrKeys.includes(item.id));

    const result = await Object.keys(allFavsObj).reduce(
      async (acc, key) => ({
        ...(await acc),
        [key]: getFavItems(await this.dbService.getMany(key), allFavsObj[key]),
      }),
      Promise.resolve({}),
    );

    return result;
  }

  async getFavsByType(type: string) {
    return await this.dbService.getMany(`favorites/${type}`);
  }

  async addToFavs(type: string, entityId: string) {
    return await this.dbService.addOne(`favorites/${type}`, entityId);
  }

  async removeFromFavs(type: string, entityId: string) {
    return await this.dbService.deleteOne(`favorites/${type}`, entityId);
  }
}
