import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavs() {
    return {
      artists: await this.prisma.artist.findMany({
        where: { favorite: { isNot: null } },
      }),
      albums: await this.prisma.album.findMany({
        where: { favorite: { isNot: null } },
      }),
      tracks: await this.prisma.track.findMany({
        where: { favorite: { isNot: null } },
      }),
    };
  }

  async getFav(type, id) {
    return this.prisma[type].findUnique({ where: { id } });
  }

  async addToFavs(type, id) {
    const typeKey = type + 'Fav';
    const keyId = type + 'Id';

    return await this.prisma[typeKey].create({ data: { [keyId]: id } });
  }

  async deleteFav(type, id) {
    const typeKey = type + 'Fav';
    const keyId = type + 'Id';
    return await this.prisma[typeKey].delete({ where: { [keyId]: id } });
  }
}
