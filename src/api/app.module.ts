import { Module } from '@nestjs/common';
import { DbService } from '../utils/db.service';
import { Utils } from '../utils/utils.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    ArtistController,
    TrackController,
    AlbumController,
    FavoritesController,
  ],
  providers: [
    UserService,
    DbService,
    ArtistService,
    TrackService,
    AlbumService,
    FavoritesService,
    Utils,
  ],
})
export class AppModule {}
