import { Module } from '@nestjs/common';
import { DbService } from '../utils/db.service';
import { Utils } from '../utils/utils.service';
import { UserController } from './user/user.controller';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    ArtistController,
    TrackController,
    AlbumController,
    FavoritesController,
  ],
  providers: [PrismaService, DbService, FavoritesService, Utils],
})
export class AppModule {}
