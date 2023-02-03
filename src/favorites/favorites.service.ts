import { Injectable } from '@nestjs/common';
// import { CreateFavoriteDto } from './dto/create-favorites-dto';
// import { UpdateFavoriteDto } from './dto/update-favorites-dto';
import { DbService } from '../utils/db.service';

@Injectable()
export class FavoritesService {
  constructor(private dbService: DbService) {}

  getFavs() {
    const allFavsObj = this.dbService.getMany('favorites');

    const getFavItems = (arr, arrKeys) =>
      arr.filter((item) => arrKeys.includes(item.id));

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
