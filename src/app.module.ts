import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    TrackController,
    AlbumController,
  ],
  providers: [
    AppService,
    UserService,
    DbService,
    ArtistService,
    TrackService,
    AlbumService,
  ],
})
export class AppModule {}
