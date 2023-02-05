import { Injectable } from '@nestjs/common';
import { Entity } from 'src/Interfaces/interfaces';
import { DbService } from '../../utils/db.service';

@Injectable()
export class FavoritesService {
  constructor(private dbService: DbService) {}

  getFavs() {
    const allFavsObj = this.dbService.getMany('favorites');

    const getFavItems = (arr: Entity[], arrKeys: string[]) =>
      arr.filter((item: Entity) => arrKeys.includes(item.id));

    return Object.keys(allFavsObj).reduce(
      (acc, key) => ({
        ...acc,
        [key]: getFavItems(this.dbService.getMany(key), allFavsObj[key]),
      }),
      {},
    );
  }

  getFavsByType(type: string) {
    return this.dbService.getMany(`favorites/${type}`);
  }

  addToFavs(type: string, entityId: string) {
    return this.dbService.addOne(`favorites/${type}`, entityId);
  }

  removeFromFavs(type: string, entityId: string) {
    return this.dbService.deleteOne(`favorites/${type}`, entityId);
  }
}
